import React from "react"
import { Box } from "@chakra-ui/react"

export default function MenuToggle({ toggle, isOpen }) {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <h1>Close</h1> : <h1>Open</h1>}
    </Box>
  )
}
