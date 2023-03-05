import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

function SavedSkeleton() {
  return (
    <Grid templateColumns={"repeat(4,1fr)"} gap={12} mt="10">
      <GridItem colSpan={{ base: "4", lg: "4" }}>
        <Flex
          justifyContent="space-between"
          display={{ base: "Flex", lg: "none" }}
        >
          <HStack>
            <SkeletonCircle size="10" />
            <SkeletonText
              mt="4"
              w="36"
              noOfLines={1}
              spacing="4"
              skeletonHeight="5"
            />
          </HStack>
        </Flex>
        <SkeletonText
          mt="4"
          w="40"
          noOfLines={2}
          spacing="4"
          skeletonHeight="5"
          display={{ base: "none", lg: "block" }}
        />
        <Box mt="12" p="3" boxShadow="sm">
          <Flex gap={3} alignItems="center">
            <Skeleton height="32px" width="32px" rounded="full" />
            <Skeleton height="26px" width="180px" />
          </Flex>
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
        </Box>
        <Box mt="12" p="3" boxShadow="sm">
          <Flex gap={3} alignItems="center">
            <Skeleton height="32px" width="32px" rounded="full" />
            <Skeleton height="26px" width="180px" />
          </Flex>
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
        </Box>
        <Box mt="12" p="3" boxShadow="sm">
          <Flex gap={3} alignItems="center">
            <Skeleton height="32px" width="32px" rounded="full" />
            <Skeleton height="26px" width="180px" />
          </Flex>
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
        </Box>
        <Box mt="12" p="3" boxShadow="sm">
          <Flex gap={3} alignItems="center">
            <Skeleton height="32px" width="32px" rounded="full" />
            <Skeleton height="26px" width="180px" />
          </Flex>
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
        </Box>
        <Box mt="12" p="3" boxShadow="sm">
          <Flex gap={3} alignItems="center">
            <Skeleton height="32px" width="32px" rounded="full" />
            <Skeleton height="26px" width="180px" />
          </Flex>
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="7" />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default SavedSkeleton;
