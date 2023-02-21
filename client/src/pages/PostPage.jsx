import { Container } from "@chakra-ui/react";
import React from "react";
import PostForm from "../components/postPage/PostForm";

const PostPage = () => {
  return (
    <Container maxW="6xl" mt={5}>
      <PostForm />
    </Container>
  );
};

export default PostPage;
