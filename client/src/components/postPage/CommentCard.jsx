import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  CardFooter,
  Avatar,
  Heading,
  Text,
  IconButton,
  Button,
  Flex,
  Box,
  Menu,
  Spinner,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import { formatDistance } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ReplyForm from "./ReplyForm";
import ReplyContainer from "./ReplyContainer";
import axios from "axios";

const CommentCard = ({
  _id,
  name,
  text,
  avatar_url,
  date,
  replies,
  user,
  handleCommentUpdate,
  handleReplyUpdate,
  postId,
}) => {
  const userId = useSelector((state) => state.auth?.user?._id);
  const token = useSelector((state) => state.auth?.user?.token);

  const [loading, setLoading] = useState(false);

  const { isOpen, onToggle } = useDisclosure();

  const handleComment = () => {
    setLoading(true);
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/posts/comments/${postId}/${_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        handleCommentUpdate(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card maxW="md">
      <CardHeader py={3}>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar size="sm" name={name} src={avatar_url} />

            <Box>
              <Heading size="sm">{name}</Heading>
              <Text fontSize="sm">
                {formatDistance(new Date(date), Date.now(), {
                  includeSeconds: true,
                })}
              </Text>
            </Box>
          </Flex>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              {loading ? (
                <Spinner
                  thickness="3px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                />
              ) : (
                <BsThreeDotsVertical />
              )}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleComment} isDisabled={userId !== user}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody py={2}>
        <Text>{text}</Text>
      </CardBody>
      <CardFooter py={3}>
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggle}
          leftIcon={<ChatIcon />}
        >
          Replies ({replies.length})
        </Button>
      </CardFooter>
      <Collapse in={isOpen} animateOpacity>
        <Box borderLeft="3px solid grey" paddingLeft={5} paddingBottom={5}>
          <ReplyForm commentId={_id} handleReplyUpdate={handleReplyUpdate} />
          <ReplyContainer replies={replies} />
        </Box>
      </Collapse>
    </Card>
  );
};

export default CommentCard;
