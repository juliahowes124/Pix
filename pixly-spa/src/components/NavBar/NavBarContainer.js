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
      bg={["brand.100", "primary.500", "brand.100", "brand.100"]}
      color={["red.100", "black", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  )
}
