import React, { useEffect, useState } from "react";
import { Text, Avatar, Grid, GridItem, Card, CardBody } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AvatarHeading from "./AvatarHeading";
import EditProfile from "./EditProfile";
import ProfilePostList from "./ProfilePostList";
import axios from "axios";
import ProfileSkeleton from "./ProfileSkeleton";

function Profile() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  // REDUX
  const token = useSelector((state) => state.auth?.user?.token);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLoading(false);
        setPosts(res.data.posts);
        setUser(res.data.user);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <Grid templateColumns={"repeat(4,1fr)"} gap={12} mt="10">
      <GridItem colSpan={{ base: "4", lg: "3" }}>
        <Text
          display={{ base: "none", lg: "block" }}
          fontSize="5xl"
          fontWeight="bold"
        >
          {user.name}
        </Text>
        <AvatarHeading name={user.name} img={user.avatar_url} />
        <Text fontSize="xl" fontWeight="bold" mb="5">
          Your Posts
        </Text>
        <hr />
        <ProfilePostList posts={posts} />
      </GridItem>

      <GridItem display={{ base: "none", lg: "block" }}>
        <Card w="100%" variant="outline">
          <CardBody>
            <Avatar size="xl" src={user.avatar_url} cursor="pointer" />
            <Text mt="5" fontWeight="bold">
              {user.name}
            </Text>

            <Text size={"sm"}>{user.email}</Text>
            <EditProfile name={user.name} img={user.avatar_url} />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default Profile;
