import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },

  shadows: {
    card: '0 0 15px rgba(129, 128, 128, 0.1), 0 0 5px rgba(0,0,0,0.08)',
    cardHover: '0 0 15px rgba(0,0,0,0.15), 0 0 20px rgba(0,0,0,0.1)',
  },

  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },

  components: {
    Badge: {
      baseStyle: {
        rounded: 'full',
        px: 2,
        py: 0.5,
      },
    },

    Button: {
      baseStyle: {
        rounded: 'full',
      },
      defaultProps: {
        colorScheme: 'gray',
        variant: 'solid',
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          _hover: { bg: `${props.colorScheme}.700` },
          color: 'white',
        }),
        outline: {
          borderColor: 'gray.500',
          borderWidth: '1px',
          color: 'gray.800',
          _hover: {
            bg: 'blue.500',
            color: 'white',
            borderColor: 'blue.500',
          },
          _focus: {
            bg: 'blue.500',
            color: 'white',
            borderColor: 'blue.500',
          },
          _active: {
            bg: 'blue.500',
            color: 'white',
            borderColor: 'blue.500',
          },
        },
      },
    },

    Input: {
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        focusBorderColor: 'blue.500',
      },
    },

    Checkbox: {
      baseStyle: {
        control: { rounded: 'md' },
      },
      defaultProps: {
        colorScheme: 'blue',
      },
    },

    Popover: {
      parts: ['content'],
      baseStyle: {
        content: {
          rounded: 'md',
          boxShadow: 'card',
        },
      },
    },
  },
});

export default theme;
