import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";
import { TextStyles as Text } from "./components/textStyles";
import { HeadingStyles as Heading } from "./components/headingStyles";

export const myTheme = extendTheme({
  colors: {
    primary: "#676767",
    secondary: "",
    accent: "#F6E05E",
    light: "#faf3eb",
    dark: "#676767",
  },
  components: {
    Button,
    Text,
    Heading
  }
})