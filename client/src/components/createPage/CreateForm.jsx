import {
  Button,
  Input,
  useToast,
  VStack,
  useColorModeValue,
  Box,
  Select,
  Flex,
  Heading,
  Divider,
  Image
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BlogEditor from "../Editor/BlogEditor";
import { useDispatch, useSelector } from "react-redux";
import { publish, reset } from "../../redux/post/postSlice";

const CreateForm = () => {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [cover, setCover] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const colorScheme = useColorModeValue("blue", "green");
  const borderColor = useColorModeValue("gray.300", "gray.300");


  // REDUX
  const dispatch = useDispatch();
  const { isPosting, isPosted, isErrorInPosting, message } = useSelector(
    (state) => state.post
  );
  const { token } = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (isPosted) {
      toast({
        status: "success",
        description: message,
        duration: 2000,
        isClosable: true,
      });
      dispatch(reset());
    }

    if (isErrorInPosting) {
      toast({
        status: "error",
        description: message,
        duration: 2000,
        isClosable: true,
      });
      dispatch(reset());
    }
  }, [isPosted, isErrorInPosting]);

  const handleCreatePost = () => {
    if (
      title.length == 0 ||
      summary.length == 0 ||
      content.length == 0 ||
      cover.length == 0 ||
      category.length == 0
    ) {
      toast({
        description: "Please fill all details",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const post = {
      title: title,
      category: category,
      summary: summary,
      content: content,
      cover: cover,
    };
    dispatch(publish({ post, token }));
    // after sending Data
  };

  return (
    <VStack spacing={5}>
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Heading fontSize={{ base: "2xl", md: "4xl" }}>
          Publish a Article
        </Heading>
        <Button
          colorScheme={colorScheme}
          onClick={handleCreatePost}
          isLoading={isPosting}
          loadingText="Publishing"
        >
          Publish
        </Button>
      </Flex>

      <Divider borderColor={"gray.400"} />

      {cover.length > 0 && (
        <>
          <Image w="100%" src={cover} />
        </>
      )}

      <Input
        type="text"
        placeholder="Topic"
        variant="unstyled"
        fontSize={{ base: "xl", md: "2xl" }}
        size="xl"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        name="title"
      />

      <Input
        placeholder="㊉ Add a Summary"
        variant="unstyled"
        fontSize={{ base: "xl", md: "2xl" }}
        size="xl"
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
        name="summary"
      />

      <Input
        placeholder="㊉ Add a Image"
        variant="unstyled"
        fontSize={{ base: "xl", md: "2xl" }}
        size="xl"
        value={cover}
        onChange={(e) => {
          setCover(e.target.value);
        }}
        name="cover"
      />

      <Select
        // variant="unstyled"
        fontSize={{ base: "lg", md: "xl" }}
        placeholder="Select category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="Software Development">Software Development</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Coding">Coding</option>
        <option value="React">React</option>
        <option value="Productivity">Productivity</option>
        <option value="Nodejs">Nodejs</option>
        <option value="Technology">Technology</option>
      </Select>

      <BlogEditor setContent={setContent} content={content} />
    </VStack>
  );
};

export default CreateForm;
