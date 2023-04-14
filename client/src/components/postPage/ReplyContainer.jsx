import React from "react";
import {
  VStack,
  StackDivider,
  Box,
  Text,
  Flex,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";

const ReplyContainer = ({ replies }) => {
  return (
    <VStack align="left" divider={<StackDivider />} spacing={3}>
      {replies?.map((item) => (
        <Box key={item._id}>
          <Flex
            marginBottom={3}
            flex="1"
            gap="4"
            alignItems="center"
            flexWrap="wrap"
          >
            <Avatar size="sm" name={item.name} src={item.avatar_url} />

            <Box>
              <Heading size="sm">{item.name}</Heading>
              <Text fontSize="sm">
                {formatDistance(new Date(item.date), Date.now(), {
                  includeSeconds: true,
                })}
              </Text>
            </Box>
          </Flex>
          <Text>{item.text}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ReplyContainer;
