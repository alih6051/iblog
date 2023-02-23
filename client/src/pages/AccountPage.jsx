import React, { useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import LoginForm from "../components/accountPage/LoginForm";
import RegisterForm from "../components/accountPage/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountPage = () => {
  const colorScheme = useColorModeValue("blue", "green");
  const navigate = useNavigate();

  // REDUX
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <Container maxW="lg" mt={5}>
      <Tabs isFitted variant="soft-rounded" colorScheme={colorScheme}>
        <TabList mb="2rem">
          <Tab>LogIn</Tab>
          <Tab>Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <LoginForm />
          </TabPanel>

          <TabPanel p="0">
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AccountPage;
