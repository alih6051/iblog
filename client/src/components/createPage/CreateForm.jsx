import {
  Button,
  Input,
  useToast,
  VStack,
  useColorModeValue,
  Box,
  Select,
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
    <VStack spacing={3}>
      <Input
        type="text"
        borderColor={borderColor}
        _placeholder={{ color: "gray" }}
        rounded={"none"}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        name="title"
        placeholder="Title"
      ></Input>

      <Select
        placeholder="Select category"
        _placeholder={{ color: "gray" }}
        borderColor={borderColor}
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        rounded="none"
      >
        <option value="Software Development">Software Development</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Coding">Coding</option>
        <option value="React">React</option>
        <option value="Productivity">Productivity</option>
        <option value="Nodejs">Nodejs</option>
        <option value="Technology">Technology</option>
      </Select>

      <Input
        type="text"
        borderColor={borderColor}
        _placeholder={{ color: "gray" }}
        rounded={"none"}
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
        name="summary"
        placeholder="Summary"
      ></Input>
      <Input
        type="text"
        borderColor={borderColor}
        _placeholder={{ color: "gray" }}
        rounded={"none"}
        value={cover}
        onChange={(e) => {
          setCover(e.target.value);
        }}
        name="cover"
        placeholder="Image Url"
      ></Input>

      <BlogEditor setContent={setContent} content={content} />

      <Button
        colorScheme={colorScheme}
        size="lg"
        rounded={"none"}
        onClick={handleCreatePost}
        w={"100%"}
        isLoading={isPosting}
        loadingText="Publishing"
      >
        Publish
      </Button>
    </VStack>
  );
};

export default CreateForm;
