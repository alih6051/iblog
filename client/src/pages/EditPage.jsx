import { Container } from "@chakra-ui/react";
import React from "react";
import EditForm from "../components/editPage/EditForm";

const EditPage = () => {
  return (
    <Container maxW="6xl" mt={5}>
      <EditForm />
    </Container>
  );
};

export default EditPage;
