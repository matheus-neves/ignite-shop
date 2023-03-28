import logoImg from '@/assets/logo.svg'
import Image from 'next/image';
import { HeaderContainer } from '@/styles/pages/app';
import { Handbag } from 'phosphor-react';

import { config } from '@/styles/index';
import Link from 'next/link';
import { useCartContext } from '@/contexts/useCart';

export function Header(){
  const { totalItems, toggleSideNav } = useCartContext();
  const isDisabled = totalItems.totalQuantity === 0;

  return (
    <HeaderContainer>
      <Link href='/'>
        <Image src={logoImg} alt="" />
      </Link>
      <button disabled={isDisabled} onClick={toggleSideNav}>
        <Handbag 
          weight="bold" 
          size="24px" 
          color={isDisabled ? config.theme.colors.gray500 : config.theme.colors.gray300} 
        />
        {!isDisabled && <span>{totalItems.totalQuantity}</span>}
      </button>
    </HeaderContainer>
  )
}