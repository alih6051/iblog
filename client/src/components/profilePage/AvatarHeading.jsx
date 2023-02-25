import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import EditProfile from "./EditProfile";

const AvatarHeading = ({ name, img, edit }) => {
  return (
    <Flex
      display={{ base: "flex", lg: "none" }}
      py={5}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack spacing={5}>
        <Avatar src={img} name={name} />
        <Text fontSize="2xl" fontWeight="bold">
          {name}
        </Text>
      </HStack>
      <Box display={edit}>
        <EditProfile name={name} img={img} />
      </Box>
    </Flex>
  );
};

export default AvatarHeading;
