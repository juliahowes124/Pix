import {Box, Text} from '@chakra-ui/react'

export function PageLayout({title, children}) {
  return (
    <Box p="4rem">
      <Text fontSize="2rem" textAlign="center" mb="4rem">{title}</Text>
      {children}
    </Box>
  )
}