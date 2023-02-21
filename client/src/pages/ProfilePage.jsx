import { Container } from "@chakra-ui/react";
import React from "react";
import Profile from "../components/profilePage/Profile";

const ProfilePage = () => {
  return (
    <Container maxW="6xl" mt={5}>
     <Profile />
    </Container>
  );
};

export default ProfilePage;
