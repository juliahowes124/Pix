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
      bg={["dark", "dark", "transparent", "transparent"]}
      color={["light", "light", "dark", "dark"]}
      {...props}
    >
      {children}
    </Flex>
  )
}
