import React from "react"
import { Box, Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        <Link className="home" to="/">Home</Link>
      </Text>
    </Box>
  )
}
