import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh'
})

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 1rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  button: {
    all: 'unset',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 6,
    background: '$gray800',
    cursor: 'pointer',

    span: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: -7,
      right: -7,
      width: 22,
      height: 22,
      borderRadius: '100%',
      background: '$green500',
      fontWeight: 700,

      color: 'white',
      fontSize: '$sm'
    },

    '&:disabled': {
      cursor: 'not-allowed'
    },

    '&:hover:not(&:disabled)': {
      opacity: 0.9
    }
  },
})
