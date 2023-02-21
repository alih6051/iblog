import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BsBookmarkPlus, BsDot, BsFillBookmarkPlusFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { readingTime } from "../../utils/readingTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateSaved } from "../../redux/auth/authSlice";

const PostCard = ({
  _id,
  cover,
  title,
  author,
  createdAt,
  updatedAt,
  content,
  summary,
  category,
  savedPosts,
}) => {
  const lightColor = useColorModeValue("#757575", "#9aa0a6");
  const { user } = useSelector((state) => state.auth);
  const [save, setSave] = useState(savedPosts.includes(_id));
  console.log(save);
  const [loading, setLoading] = useState(false);

  // REDUX
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (user) {
      const token =
        JSON.parse(sessionStorage.getItem("jwt_iblog_user"))?.token || null;
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/posts/saved/${_id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setLoading(false);
          setSave(!save);
          dispatch(updateSaved(_id));
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <Card
      rounded="none"
      shadow="none"
      direction={{ base: "column", sm: "column", md: "row" }}
      overflow="hidden"
    >
      <Stack w="100%">
        <CardHeader paddingBottom="0">
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar size="sm" name={author.name} src={author.avatar_url} />

              <Flex alignItems="center">
                <Heading size="sm">{author.name}</Heading>
                <BsDot style={{ color: lightColor }} />
                <Text fontSize="sm" color={lightColor}>
                  {new Date(createdAt).toDateString()}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <RouterLink to={`posts/${_id}`}>
            <Flex gap={3} justifyContent="space-between">
              <Box>
                <Heading
                  noOfLines={{ base: 3, md: 2 }}
                  size="md"
                  fontWeight="700"
                  _hover={{ textDecoration: "underline" }}
                >
                  {title}
                </Heading>
                <Box display={{ base: "none", md: "block" }}>
                  <Text noOfLines={3}>{summary}</Text>
                </Box>
              </Box>
              <Box>
                <Image
                  src={cover}
                  marginY="auto"
                  maxW={{ base: "112px", sm: "130px", md: "200px" }}
                ></Image>
              </Box>
            </Flex>
          </RouterLink>
        </CardBody>

        <CardFooter>
          <Flex justifyContent="space-between" alignContent="center" w="100%">
            <Flex alignItems="center" gap={3}>
              <Tag fontSize="xs">{category}</Tag>
              <Text fontSize="xs" color={lightColor}>
                {readingTime(content)} mins read
              </Text>
            </Flex>

            <HStack spacing={5} color={lightColor} fontSize="lg">
              <Tooltip
                hasArrow
                label={user ? "Save" : "Login to save"}
                placement="top"
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <Box cursor="pointer" onClick={handleSave} _disabled={true}>
                    {save ? (
                      <BsFillBookmarkPlusFill size={20} color={lightColor} />
                    ) : (
                      <BsBookmarkPlus size={20} color={lightColor} />
                    )}
                  </Box>
                )}
              </Tooltip>

              <Tooltip hasArrow label="Options" placement="top">
                <Box cursor="pointer">
                  <SlOptions />
                </Box>
              </Tooltip>
            </HStack>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default PostCard;
