import { stripe } from "@/lib/stripe";
import { ImageContainer, ImageList, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
  quantity: number;
}

export default function Success({ customerName, products, quantity }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Purchase made | Ignite Shop</title>
        <meta name='robots' content="noindex"  />
      </Head>
      <SuccessContainer>
        <h1>Purchase made!</h1>
        <ImageList>
          {
            products.map(product => (
              <ImageContainer key={product.name}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            ))
          }
        </ImageList>
        <p>
          Wohooo! <strong>{customerName}</strong>, your purchase of <strong>{quantity}</strong> shirts is already on its way home.
        </p>
        <Link href="/">
          Back to products
        </Link>
      </SuccessContainer>                 
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details?.name;

  const quantity = session?.line_items?.data.length;

  const products = session?.line_items?.data.map(({ price }) => {
    const { name, images } = price?.product as Stripe.Product;
    return {
      name,
      imageUrl: images[0]
    }
  }).slice(0, 3)

  return {
    props: {
      customerName,
      products,
      quantity
    }
  }
}