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
      outline: "2px solid #f5a9b4",
      color: "secondary",
      _hover: {
        bg: mode(darken("secondary", 20), whiten("secondary", 20))(props),
        boxShadow: "md"
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