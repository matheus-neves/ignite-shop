import { useCartContext } from "@/contexts/useCart";
import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    formattedPrice: string;
    description: string;
    defaultPriceId: string;
    quantity: number;
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const { addToCart } = useCartContext();
 


  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{product?.formattedPrice}</span>

          <p>{product?.description}</p>

          <button onClick={() => addToCart(product)}>Put in cart</button>
        </ProductDetails>
      </ProductContainer>
    </>
    
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NOVL7rBvzK6DyP' } },
      // { params: { id: 'prod_NOVKFinP43mPBI' } },
      // { params: { id: 'prod_NOVJSXtFSslj5H' } },
      // { params: { id: 'prod_NOVIG8RvIePW3S' } },
    ],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const productId = params?.id as string;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  const priceUnitAmount = price.unit_amount && price.unit_amount / 100;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceUnitAmount,
        formattedPrice: priceUnitAmount && new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(priceUnitAmount),
        description: product.description,
        defaultPriceId: price.id,
        quantity: 1
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}