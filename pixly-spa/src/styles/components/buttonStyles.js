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
        bg: mode(darken("primary", 20), whiten("primary", 20))(props),
        boxShadow: "md"
      },
    }),
    secondary: (props) => ({
      bg: "transparent",
      outline: "2px solid gray",
      color: "gray",
      _hover: {
        bg: "darkgray",
        boxShadow: "md"
      },
    }),
    defaultProps: {
      variant: "primary"
    },
  }
}