import React from 'react'
import { Divider, Center,Text, Flex, Container,useColorModeValue } from "@chakra-ui/react";

function ErrorPage() {
    const colorScheme=useColorModeValue("black","white")
  return (
    <Container minW="6xl">
      <Flex h="80vh" alignItems="center" justifyContent="center">
        <Center height="50px" gap="4">
          <Text fontWeight="bold" fontSize="2xl">
            404
          </Text>
          <Divider border={`1px solid ${colorScheme}`} orientation="vertical" />
          <Text>This page could not be found.</Text>
        </Center>
      </Flex>
    </Container>
  );
}

export default ErrorPage
