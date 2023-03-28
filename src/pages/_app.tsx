import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import { Container } from '@/styles/pages/app';

globalStyles();
import { CartContextProvider, useCartContext } from '@/contexts/useCart';
import { Header } from '@/components/Header';
import { Cart } from '@/components/Cart';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
        <Cart />
      </Container>
    </CartContextProvider>
  )
}
