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
      bg: "secondary",
      color: "white",
      _hover: {
        bg: mode(darken("secondary", 20), whiten("secondary", 20))(props),
        boxShadow: "md"
      },
    }),
    defaultProps: {
      variant: "primary"
    },
  }
}