import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import Image from "next/image";

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer>
       
      </ImageContainer>

      <ProductDetails>
        <h1>T-shit</h1>
        <span>19.90</span>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non at laborum velit officiis! Quaerat at, vitae voluptatem facere molestiae rerum voluptatibus aliquid fugit magnam! Nulla nobis cupiditate rerum id nemo.</p>

        <button>Buy now</button>
      </ProductDetails>
    </ProductContainer>
  )
  
}