import React from "react";
import { Box, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

const PostSkeleton = () => {
  return (
    <VStack align="left" spacing={3}>
      {/* START */}
      <Flex paddingY="5" gap={5} alignItems="center">
        <Skeleton height="48px" width="48px" rounded="full" />
        <Skeleton height="40px" width="200px" />
      </Flex>
      <Box boxShadow="sm">
        <Skeleton height="50px" />
      </Box>
      <Box boxShadow="sm">
        <Skeleton height={["200px", "300px", "400px", "500px"]} />
      </Box>
      <Box boxShadow="sm">
        <Skeleton height="70px" />
      </Box>
      <Box boxShadow="sm">
        <Skeleton height="70px" />
      </Box>
      <Box boxShadow="sm">
        <Skeleton height="70px" />
      </Box>
      <Box boxShadow="sm">
        <Skeleton height="70px" />
      </Box>
      <Box boxShadow="sm">
        <Skeleton height="70px" />
      </Box>
    </VStack>
  );
};

export default PostSkeleton;
