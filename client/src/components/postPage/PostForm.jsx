import {
  Avatar,
  Flex,
  Text,
  Box,
  Heading,
  Image,
  useColorModeValue,
  HStack,
  VStack,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsLink45Deg,
  BsBookmarkPlus,
  BsFillBookmarkPlusFill,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { readingTime } from "../../utils/readingTime";
import PostSkeleton from "./PostSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeToSaved } from "../../redux/auth/authSlice";

function PostForm() {
  const lightColor = useColorModeValue("#757575", "#9aa0a6");
  const toast = useToast();
  const [save, setSave] = useState(false);

  // ROUTER
  const { id } = useParams();

  // FETCH
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  // REDUX
  const dispatch = useDispatch();
  const { saved_posts, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (saved_posts.includes(id)) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [saved_posts]);

  const handleSave = () => {
    if (user) {
      dispatch(addToSaved({ id: id, token: user.token }));
    } else {
      toast({
        title: `Login is required`,
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Something went wrong.",
          description: "Please check for error in console.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }, []);

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <VStack align="left" spacing={3}>
      <Flex
        justifyContent="space-between"
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 5, sm: 0 }}
      >
        <HStack spacing={5}>
          <Avatar src={data?.author.avatar_url} name={data?.author.name} />
          <Flex direction="column">
            
            <Text fontSize={"lg"}>{data?.author.name}</Text>
            <Text color={lightColor}>
              {new Date(data?.createdAt).toDateString()} ·{" "}
              {data && readingTime(data.content)} mins read
            </Text>
          </Flex>
        </HStack>
        <hr />

        <HStack spacing={5}>
          <Tooltip hasArrow label="Share on Twitter" placement="top">
            <Box cursor="pointer">
              <BsTwitter size={20} color={lightColor} />
            </Box>
          </Tooltip>
          <Tooltip hasArrow label="Share on Facebook" placement="top">
            <Box cursor="pointer">
              <BsFacebook size={20} color={lightColor} />
            </Box>
          </Tooltip>
          <Tooltip hasArrow label="Share on Linkedln" placement="top">
            <Box cursor="pointer">
              <BsLinkedin size={20} color={lightColor} />
            </Box>
          </Tooltip>
          <Tooltip hasArrow label="Copy link" placement="top">
            <Box cursor="pointer">
              <BsLink45Deg size={20} color={lightColor} />
            </Box>
          </Tooltip>
          <Tooltip hasArrow label="Save" placement="top">
            <Box cursor="pointer">
              {save ? (
                <BsFillBookmarkPlusFill
                  onClick={() =>
                    dispatch(removeToSaved({ id: id, token: user.token }))
                  }
                  size={20}
                  color={lightColor}
                />
              ) : (
                <BsBookmarkPlus
                  onClick={handleSave}
                  size={20}
                  color={lightColor}
                />
              )}
            </Box>
          </Tooltip>
        </HStack>
      </Flex>

      <Heading>{data?.title}</Heading>

      <Box width={"100%"}>
        <Image
          w={"100%"}
          maxH="500px"
          src={data?.cover}
          objectFit="cover"
          alt="cover"
        />
      </Box>

      <Box dangerouslySetInnerHTML={{ __html: data?.content }} />
    </VStack>
  );
}

export default PostForm;
