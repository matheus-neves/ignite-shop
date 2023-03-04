import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Purchase made!</h1>
      <ImageContainer>

      </ImageContainer>

      <p>
        Uhuul! <strong>Diego Fernandes</strong>, your <strong>T-shit</strong> is already on its way home.
      </p>

      <Link href="/">
        Back to products
      </Link>
    </SuccessContainer>
  )
}