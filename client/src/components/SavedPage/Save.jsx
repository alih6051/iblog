import React, { useEffect, useState } from "react";
import { Text, Grid, GridItem } from "@chakra-ui/react";
import AvatarHeading from "../profilePage/AvatarHeading";
import axios from "axios";
import { useSelector } from "react-redux";
import SavedSkeleton from "./SavedSkeleton";
import SavedList from "./SavedList";

function Save() {
  const [user, setUser] = useState();
  const [savedPost, setSavedPost] = useState([]);
  const [loading, setLoading] = useState([]);

  // REDUX
  const token = useSelector((state) => state.auth?.user?.token);
  const { saved_posts } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/profile/list`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLoading(false);
        setSavedPost(res.data.saved_posts.reverse());
        setUser(res.data.user);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [saved_posts]);

  //Loading
  if (loading) {
    return <SavedSkeleton />;
  }
  return (
    <Grid templateColumns={"repeat(4,1fr)"} gap={12} mt="10">
      <GridItem colSpan={{ base: "4", lg: "4" }}>
        <Text
          display={{ base: "none", lg: "block" }}
          fontSize="5xl"
          fontWeight="bold"
        >
          {user.name}
        </Text>
        <AvatarHeading edit="none" name={user.name} img={user.avatar_url} />
        <Text fontSize="xl" fontWeight="bold" mb="5">
          Your Lists
        </Text>
        <hr />
        <SavedList posts={savedPost} />
      </GridItem>
    </Grid>
  );
}

export default Save;
