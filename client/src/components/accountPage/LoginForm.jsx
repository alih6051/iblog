import React, { useEffect, useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authSlice";
import { reset } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const initState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initState);
  const [show, setShow] = useState(false);
  const colorScheme = useColorModeValue("blue", "green");
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      dispatch(reset());
    }

    if (isSuccess) {
      toast({
        title: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(reset());
    }
  }, [isError, isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => dispatch(login(formData));

  const handleClick = () => setShow(!show);

  return (
    <VStack maxW={"2xl"} spacing={5}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          type="email"
          name="email"
          rounded={"0"}
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup mt="5px" size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            rounded={"0"}
            value={formData.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              rounded={"0"}
              variant="link"
              onClick={handleClick}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isDisabled={
          formData.email == "" || formData.password == "" ? true : false
        }
        width="100%"
        rounded={"0"}
        onClick={handleSubmit}
        colorScheme={colorScheme}
        isLoading={isLoading}
        loadingText={"Login"}
        size="lg"
      >
        Login
      </Button>
    </VStack>
  );
}

export default LoginForm;
