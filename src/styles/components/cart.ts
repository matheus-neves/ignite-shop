import { styled } from '@/styles';

export const CartImage = styled('div', {
  position: 'relative',
  span: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: '100%',
    background: '$gray100',
    fontWeight: 700,

    color: '$gray900',
    fontSize: '$sm'
  },
  img: {
    width: 102,
    height: 93,
    borderRadius: 8,
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)'
  },
})

export const CartContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '4px 0',

  strong: {
    color: '$gray300',
    fontWeight: 400,
    fontSize: '$md',
    marginBottom: '0.5rem'
  },

  span: {
    color: '$gray100',
    fontWeight: 700,
    fontSize: '$md',
    marginBottom: '1rem'
  },

  button: {
    all: 'unset',
    fontWeight: 700,
    color: '$green500',
    cursor: 'pointer',
    width: 'max-content',
    
    '&:hover': {
      filter: 'brightness(1.5)'
    }
  
  }
})

export const CartContainer = styled('div', {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  top: 0,
  right: 0,
  width: '480px',
  height: '100vh',

  background: '$gray800',
  padding: '3rem',

  h2: {
    color: '$gray100',
    fontSize: '$lg',
    marginBottom: '2rem'
  },

  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    overflowY: 'scroll',
    marginBottom: 16
  },

  li: {
    display: 'flex',
    gap: '1.5rem',
    position: 'relative',
  },

  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,

      div: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    },

    span: {
      color: '$gray100',

      '&.quantity': {
        fontSize: '$md'
      }
    },
    strong: {
      color: '$gray100',
      fontSize: '$md',

      '&.total': {
        fontSize: '$xl'
      }
    },
  },
  
  "button[type='button']": {
    all: 'unset',
    position: 'absolute',
    top: 24,
    right: 24,
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',

    '&:hover': {
      filter: 'brightness(1.2)'
    }
  },

  "button[type='submit']": {
    all: 'unset',
    cursor: 'pointer',
    padding: '1.25rem 2rem',
    background: '$green500',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: '$md',
    color: '#fff',
    marginTop: 55,

    '&:disabled': {
      filter: 'brightness(.8)',
      cursor: 'not-allowed'
    },

    '&:hover:not(&:disabled)': {
      filter: 'brightness(1.2)'
    }
  },

  transition: 'transform .4s', 

  variants: {
    active: {
      false: {
        transform: 'translate(480px)'
      },
      true: {
        translateX: 0
      }
    }
  },
})