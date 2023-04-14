import {
  Avatar,
  Button,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const CommentForm = ({ user, postId, handleCommentUpdate }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = () => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/posts/comments/${postId}`,
        {
          text: text,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        handleCommentUpdate(res.data.comments);
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <VStack align="left" boxShadow="lg" p={3}>
      <HStack>
        <Avatar size="sm" name={user?.name} src={user?.avatar_url} />
        <Text>{user?.name}</Text>
      </HStack>
      <Textarea
        placeholder="What are your thoughts?"
        variant="unstyled"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        colorScheme="green"
        isLoading={loading}
        loadingText="Respond"
        onClick={handleComment}
      >
        Respond
      </Button>
    </VStack>
  );
};

export default CommentForm;
