import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {
    borderRadius: 0
  },
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: "primary",
      color: "white",
      _hover: {
        bg: mode(darken("primary", 10), whiten("primary", 10))(props),
        boxShadow: "md"
      },
    }),
    secondary: () => ({
      bg: "transparent",
      color: "dark",
      _hover: {
        textDecoration: "underline",
      },
    }),
    tertiary: (props) => ({
      bg: "transparent",
      color: "primary",
      _hover: {
        transform: "scale(1.3)"
      },
    }),
    defaultProps: {
      variant: "primary"
    },
  }
}