import { Box, Stack, Text, useColorMode, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StackDivider } from "@chakra-ui/react";
import ProfilePostCard from "./ProfilePostCard";

const ProfilePostList = ({ posts }) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      divider={colorMode == "light" && <StackDivider />}
      spacing="5"
      mt="5"
    >
      {posts.map((post) => (
        <ProfilePostCard key={post._id} {...post} />
      ))}
    </Stack>
  );
};

export default ProfilePostList;
