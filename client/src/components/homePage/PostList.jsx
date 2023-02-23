import { Box, Stack, useColorMode, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/post/postSlice";
import { StackDivider } from "@chakra-ui/react";
import ListSkeleton from "./ListSkeleton";

const PostList = () => {
  const { colorMode } = useColorMode();

  // REDUX
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (user) {
      setSavedPosts(user.saved_posts);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  if (isLoading) {
    return <ListSkeleton />;
  }

  return (
    <Stack divider={colorMode == "light" && <StackDivider />} spacing="5">
      {posts?.map((post) => (
        <PostCard key={post._id} {...post} savedPosts={savedPosts} />
      ))}
    </Stack>
  );
};

export default PostList;
