import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  StackDivider,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const ListSkeleton = () => {
  const { colorMode } = useColorMode();

  return (
    <Stack divider={colorMode == "light" && <StackDivider />} spacing="5">
      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>

      <Box padding="6" boxShadow="sm">
        <Flex gap={3} alignItems="center">
          <Skeleton height="32px" width="32px" rounded="full" />
          <Skeleton height="26px" width="180px" />
        </Flex>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
      </Box>
    </Stack>
  );
};

export default ListSkeleton;
