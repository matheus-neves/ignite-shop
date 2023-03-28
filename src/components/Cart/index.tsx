
import Image from 'next/image';
import { CartContainer, CartContent, CartImage } from '@/styles/components/cart';
import { X } from 'phosphor-react';

import { config } from '@/styles/index';
import {  useCartContext } from '@/contexts/useCart';

export function Cart() {
  const {activeSideNav, cartProducts, removeToCart, toggleSideNav, totalItems, onCheckout} = useCartContext();

  const totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(totalItems.totalPrice)

  const cartIsEmpty = cartProducts.length === 0;

  return (
    <CartContainer active={activeSideNav}>
      <button type="button" onClick={toggleSideNav}>
        <X weight="bold" size="24px" color={config.theme.colors.gray500} />
      </button>
      <h2>Shopping bag</h2>

      {cartIsEmpty && <strong>There are no items in the cart...  🥲 </strong>}

      <ul>
        {
          cartProducts?.map(product => (
            <li key={product.id}>
              <CartImage>
                <Image src={product.imageUrl} alt="" width={102} height={93} />
                <span>{product.quantity}</span>
              </CartImage>
              <CartContent>
                <strong>{product.name}</strong>
                <span>{product.formattedPrice}</span>
                <button onClick={() => removeToCart(product.id)}>Remove</button>
              </CartContent>
            </li>
          ))
        }
      </ul>

      <footer>
        <div>
          <div>
            <span>Quantity</span>
            <span className='quantity'>{totalItems.totalQuantity} items</span>
          </div>
          <div>
            <strong>Total</strong>
            <strong className='total'>{totalPrice}</strong>
          </div>
        </div>
        <button type="submit" disabled={cartIsEmpty} onClick={onCheckout}>Finish purchase</button>
      </footer>
    </CartContainer>
  )
}