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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReplyForm = ({ commentId, handleReplyUpdate }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth?.user?.token);

  const navigate = useNavigate();

  const handleReply = () => {
    if (!token) navigate("/account");

    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/posts/comments/replies/${commentId}`,
        {
          text: text,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        handleReplyUpdate(res.data.replies, commentId);
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <VStack align="right" boxShadow="lg" p={3} marginBottom={5}>
      <Textarea
        placeholder="Enter your reply..."
        variant="unstyled"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        colorScheme="green"
        size="sm"
        isLoading={loading}
        loadingText="Respond"
        onClick={handleReply}
      >
        Reply
      </Button>
    </VStack>
  );
};

export default ReplyForm;
