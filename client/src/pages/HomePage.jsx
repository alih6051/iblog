import { Container } from "@chakra-ui/react";
import React from "react";
import PostList from "../components/homePage/PostList";

const HomePage = () => {
  return (
    <Container maxW="6xl" mt={5}>
      <PostList />
    </Container>
  );
};

export default HomePage;
