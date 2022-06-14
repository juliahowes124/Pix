import {Center, Text} from '@chakra-ui/react'

export function PageLayout({title, children}) {
  return (
    <Center px="4rem" flexDir="column">
      <Text fontSize="2rem" textAlign="center" mb={4}>{title}</Text>
      {children}
    </Center>
  )
}