import { Box, Stack, Text, useColorMode, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StackDivider } from "@chakra-ui/react";

const ProfilePostList = () => {
  const { colorMode } = useColorMode();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {}, []);

  //   if (isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  return (
    <Stack
      divider={colorMode == "light" && <StackDivider />}
      spacing="5"
      mt="5"
    >
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
    </Stack>
  );
};

export default ProfilePostList;
