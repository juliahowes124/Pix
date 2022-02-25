import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";
import { TextStyles as Text } from "./components/textStyles";
import { HeadingStyles as Heading } from "./components/headingStyles";

export const myTheme = extendTheme({
  colors: {
    primary: "#a14d4d",
    secondary: "#c78989",
    light: "#f2f2f2",
    dark: "#111111",
  },
  components: {
    Button,
    Text,
    Heading
  }
})