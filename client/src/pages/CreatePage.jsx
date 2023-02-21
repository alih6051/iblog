import { Container } from "@chakra-ui/react";
import React from "react";
import CreateForm from "../components/createPage/CreateForm";

const CreatePage = () => {
  return (
    <Container maxW="6xl" mt={5}>
      <CreateForm />
    </Container>
  );
};

export default CreatePage;
