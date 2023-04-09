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
  Stack,
  Tag,
  Text,
  Tooltip,
  useToast,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button,
  VStack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlOptions } from "react-icons/sl";
import { readingTime } from "../../utils/readingTime";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfilePostCard = ({
  _id,
  cover,
  title,
  author,
  createdAt,
  updatedAt,
  content,
  summary,
  category,
  setPosts,
}) => {
  const lightColor = useColorModeValue("#757575", "#9aa0a6");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  // REDUX
  const { user } = useSelector((state) => state.auth);

  // STATES
  const [loading, setLoading] = useState(false);

  // Post Delete
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/users/profile/delete-post/${_id}`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setPosts(res.data);
        onClose();
        toast({
          title: "Post Deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  //Post Edit
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
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
          <Text fontSize="sm" color={lightColor}>
            {new Date(createdAt).toDateString()}
          </Text>
        </CardHeader>
        <CardBody>
          <Flex gap={3} justifyContent="space-between">
            <Box>
              <Heading
                noOfLines={{ base: 3, md: 2 }}
                size="md"
                fontWeight="700"
                _hover={{ textDecoration: "underline" }}
                onClick={() => {
                  navigate(`/posts/${_id}`);
                }}
                cursor="pointer"
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

            <Popover>
              <PopoverTrigger>
                <Button bg="none" _hover={{ bg: "none" }}>
                  <SlOptions size="20" />
                </Button>
              </PopoverTrigger>
              <PopoverContent width="120px">
                <PopoverArrow />
                <PopoverBody cursor="pointer" onClick={() => handleEdit(_id)}>
                  Edit Story
                </PopoverBody>
                <PopoverBody>
                  <hr />
                </PopoverBody>
                <PopoverBody>
                  <Button
                    variant="link"
                    textDecoration="none"
                    colorScheme="red"
                    onClick={onOpen}
                  >
                    Delete
                  </Button>

                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Delete story
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={handleDelete}
                            ml={3}
                            isLoading={loading}
                            loadingText="Deleting"
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ProfilePostCard;
