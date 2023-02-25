import { Stack, StackDivider, useColorMode } from "@chakra-ui/react";
import React
 from "react";
import SavedCard from "./SavedCard";

function SavedList({ posts }) {
  const { colorMode } = useColorMode();
  return (
    <Stack divider={colorMode == "light" && <StackDivider />} spacing="5">
      {posts?.map((post) => (
        <SavedCard key={post._id} {...post} />
      ))}
    </Stack>
  );
}

export default SavedList;
