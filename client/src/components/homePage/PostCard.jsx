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
  useToast,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BsBookmarkPlus, BsDot, BsFillBookmarkPlusFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { readingTime } from "../../utils/readingTime";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToSaved, removeToSaved } from "../../redux/auth/authSlice";

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

  const [save, setSave] = useState(false);
  const toast = useToast();

  // REDUX
  const dispatch = useDispatch();
  const { saved_posts, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (saved_posts.includes(_id)) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [saved_posts]);

  const handleSave = () => {
    if (user) {
      dispatch(addToSaved({ id: _id, token: user.token }));
    } else {
      toast({
        title: `Login is required`,
        duration: 2000,
        isClosable: true,
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
              <Tooltip hasArrow label="Save" placement="top">
                <Box cursor="pointer">
                  {save ? (
                    <BsFillBookmarkPlusFill
                      onClick={() =>
                        dispatch(removeToSaved({ id: _id, token: user.token }))
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
