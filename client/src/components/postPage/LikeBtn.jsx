import { Button, HStack, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LikeBtn = ({ posId, setData, likes, data }) => {
  // REDUX
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updateLike = (postId) => {
    if (!user) return navigate("/account");

    setLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/posts/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: user?.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setData({ ...data, likes: res.data.likes });
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong, please check console.");
        console.log(err);
      });
  };

  return (
    <Button
      size="xs"
      variant={"unstyled"}
      isDisabled={loading}
      onClick={() => updateLike(posId)}
    >
      <HStack color={likes?.includes(user?._id) ? "blue.400" : ""}>
        <BiLike size={20} />
        {loading ? (
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="sm"
          />
        ) : (
          <Text fontSize={16}>{likes?.length}</Text>
        )}
      </HStack>
    </Button>
  );
};

export default LikeBtn;
