import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";
import { TextStyles as Text } from "./components/textStyles";
import { HeadingStyles as Heading } from "./components/headingStyles";

export const myTheme = extendTheme({
  colors: {
    primary: "#f26177",
    secondary: "#d5e8f0",
    light: "#e1e9fc",
    dark: "#1f3b7d",
  },
  components: {
    Button,
    Text,
    Heading
  }
})