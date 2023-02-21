import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authSlice";

function RegisterForm() {
  const initState = {
    name: "",
    avatar_url: "",
    email: "",
    password: "",
  };

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initState);
  const colorScheme = useColorModeValue("blue", "green");

  // REDUX
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => dispatch(register(formData));

  return (
    <VStack maxW={"2xl"} spacing={5}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your Name"
          rounded={"0"}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Image</FormLabel>
        <Input
          type="url"
          placeholder="Paste Image URL"
          rounded={"0"}
          name="avatar_url"
          value={formData.avatar_url}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          rounded={"0"}
          name="email"
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
          formData.email == "" ||
          formData.image == "" ||
          formData.name == "" ||
          formData.password == ""
            ? true
            : false
        }
        width="100%"
        rounded={"0"}
        onClick={handleSubmit}
        colorScheme={colorScheme}
        size="lg"
        isLoading={isLoading}
        loadingText="Register"
      >
        Register
      </Button>
    </VStack>
  );
}

export default RegisterForm;
