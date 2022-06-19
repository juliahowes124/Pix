import React from "react"
import { Box } from "@chakra-ui/react"
import { FaTimes, FaBars } from "react-icons/fa";

export default function MenuToggle({ toggle, isOpen }) {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle} color="dark">
      {isOpen ? <FaTimes/> : <FaBars/>}
    </Box>
  )
}

