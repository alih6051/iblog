import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { readingTime } from "../../utils/readingTime";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeToSaved, reset } from "../../redux/auth/authSlice";

function SavedCard({
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
}) {
  const lightColor = useColorModeValue("#757575", "#9aa0a6");
  const [loading, setLoading] = useState(false);

  //REDUX
  const { isRemovedFromSaved, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRemovedFromSaved) {
      setLoading(false);
      dispatch(reset());
    } else {
      setLoading(false);
      dispatch(reset());
    }
  }, [isRemovedFromSaved]);

  const handleRemove = () => {
    setLoading(true);
    dispatch(removeToSaved({ id: _id, token: user.token }));
  };

  // Navigate
  const handleNavigate = () => navigate(`/posts/${_id}`);

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
          <Flex gap={3} justifyContent="space-between" onClick={handleNavigate}>
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
        </CardBody>

        <CardFooter>
          <Flex justifyContent="space-between" alignContent="center" w="100%">
            <Flex alignItems="center" gap={3}>
              <Tag fontSize="xs">{category}</Tag>
              <Text fontSize="xs" color={lightColor}>
                {readingTime(content)} mins read
              </Text>
            </Flex>

            <Button
              variant={"link"}
              loadingText="Removing"
              onClick={handleRemove}
              isLoading={loading}
            >
              Remove
            </Button>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default SavedCard;
