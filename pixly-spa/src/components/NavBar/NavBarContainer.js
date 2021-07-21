import { Flex } from "@chakra-ui/layout"

export default function NavBarContainer ({ children, ...props }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["brand.dark", "brand.dark", "brand.transparent", "brand.transparent"]}
      color={["brand.light", "brand.light", "brand.dark", "brand.dark"]}
      {...props}
    >
      {children}
    </Flex>
  )
}
