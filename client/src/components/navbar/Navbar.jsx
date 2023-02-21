import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";
import { EditIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SideMenu from "../menu/Menu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((state) => state.auth.user);

  return (
    <header
      style={{
        position: "sticky",
        top: "0",
        zIndex: "20",
        backgroundColor: colorMode == "light" ? "#FFFFFF" : "#1A202C",
      }}
    >
      <Container maxW="6xl" py={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <RouterLink to="/" fontSize="2xl" fontWeight="500">
            <Text fontSize="2xl" fontWeight="500">
              iBlog
            </Text>
          </RouterLink>
          <HStack spacing={4}>
            <RouterLink to="/create">
              <Flex
                alignItems="center"
                _hover={{ textDecoration: "underline" }}
              >
                <EditIcon />
                <Text ml={2}>Write</Text>
              </Flex>
            </RouterLink>
            {user === null ? (
              <RouterLink to="/account">
                <Text _hover={{ textDecoration: "underline" }}>Sign In</Text>
              </RouterLink>
            ) : (
              <SideMenu
                src={user.avatar_url}
                name={user.name}
                email={user.email}
              />
            )}
            <Button
              onClick={toggleColorMode}
              fontSize="md"
              rounded="full"
              p={0}
            >
              {colorMode === "light" ? <BsMoon /> : <BsSun />}
            </Button>
          </HStack>
        </Flex>
      </Container>
      <hr />
    </header>
  );
};

export default Navbar;
