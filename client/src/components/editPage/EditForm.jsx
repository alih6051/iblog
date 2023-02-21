import {
  Box,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BlogEditor from "../Editor/BlogEditor";
import { useParams } from "react-router-dom";

const EditForm = () => {
  const colorScheme = useColorModeValue("blue", "green");
  const toast = useToast();
  const { id } = useParams();
  const [content, setContent] = useState("");

  const handleSavePost = () => {
    console.log(content);
    toast({
      title: "Saved",
      status: "success",
      isClosable: true,
      duration: 3000,
    });
  };

  useEffect(() => {
    setContent(
      "Micro-EV subscription startup Dance, which launched in 2020,has raised an additional €12 million in an equity and debt round led by existing investors HV Capital, Eurazeo and BlueYard. Dance was launched out of Berlin by former Soundloud and Jimdo founders, but since last year is now also available in Paris, Hamburg, Munich and Vienna."
    );
  }, []);

  console.log(id);
  return (
    <VStack spacing={3} align="left">
      <Heading mb={5}>Edit Post</Heading>
      <BlogEditor content={content} setContent={setContent} />
      <Button
        onClick={handleSavePost}
        colorScheme={colorScheme}
        width={"100%"}
        mt={2}
        rounded="none"
      >
        Save
      </Button>
    </VStack>
  );
};

export default EditForm;
