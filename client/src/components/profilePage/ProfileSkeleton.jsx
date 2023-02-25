import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

function ProfileSkeleton() {
  return (
    <Grid templateColumns={"repeat(4,1fr)"} gap={12} mt="10">
      <GridItem colSpan={{ base: "4", lg: "3" }}>
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
        <Box mt="10">
          <SkeletonText
            mt="4"
            w="60"
            noOfLines={1}
            spacing="4"
            skeletonHeight="3"
          />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="6" />
        </Box>
        <Box mt="10">
          <SkeletonText
            mt="4"
            w="60"
            noOfLines={1}
            spacing="4"
            skeletonHeight="3"
          />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="6" />
        </Box>
        <Box mt="10">
          <SkeletonText
            mt="4"
            w="60"
            noOfLines={1}
            spacing="4"
            skeletonHeight="3"
          />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="6" />
        </Box>
        <Box mt="10">
          <SkeletonText
            mt="4"
            w="60"
            noOfLines={1}
            spacing="4"
            skeletonHeight="3"
          />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="6" />
        </Box>
        <Box mt="10">
          <SkeletonText
            mt="4"
            w="60"
            noOfLines={1}
            spacing="4"
            skeletonHeight="3"
          />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="6" />
        </Box>
      </GridItem>

      <GridItem display={{ base: "none", lg: "block" }}>
        <Card w="100%" variant="outline">
          <CardBody>
            <SkeletonCircle size="20" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="4" />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default ProfileSkeleton;
