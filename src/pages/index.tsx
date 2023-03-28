import { HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/image"
import Head from 'next/head';
import { useKeenSlider } from 'keen-slider/react'
import { Handbag } from 'phosphor-react';

import 'keen-slider/keen-slider.min.css';
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { useCartContext } from "@/contexts/useCart";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  formattedPrice: string;
  defaultPriceId: string;
  quantity: number;
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {

  const { addToCart } = useCartContext();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return ( 
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map(product => (
          <Product className='keen-slider__slide' key={product.id}>
            <Link href={`/product/${product.id}`}  >
              <Image 
                src={product.imageUrl} 
                alt='' 
                width={520} 
                height={480} 
              />
            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.formattedPrice}</span>
              </div>
              <button onClick={() => addToCart(product)} title='add to cart'>
                <Handbag weight="bold" size="32px" color="white" />
              </button>
            </footer>
            </Link>

          </Product>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    
    const price = product.default_price as Stripe.Price

    const priceUnitAmount = price.unit_amount && price.unit_amount / 100;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceUnitAmount,
      formattedPrice: priceUnitAmount && new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(priceUnitAmount),
      defaultPriceId: price.id,
      quantity: 1
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}