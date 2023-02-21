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
  InputLeftElement,
  useToast,
  Card,
  CardBody,
} from "@chakra-ui/react";
import {
  EmailIcon,
  LinkIcon,
  UnlockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { CiUser } from "react-icons/ci";
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
  const toast = useToast();

  // REDUX
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    if (regEx.test(formData.email)) {
      dispatch(register(formData));
    } else {
      toast({
        title: "Invalid Email Address",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Card py="3">
      <CardBody>
        <VStack maxW={"2xl"} spacing={5}>
          <InputGroup position="relative">
            <InputLeftElement
              pointerEvents="none"
              position="absolute"
              top="1"
              children={<CiUser color="gray" size="23" />}
            />
            <Input
              placeholder="Name*"
              type="name"
              name="name"
              size="lg"
              value={formData.name}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup position="relative">
            <InputLeftElement
              pointerEvents="none"
              position="absolute"
              top="1"
              children={<LinkIcon color="gray.400" boxSize={4} />}
            />
            <Input
              placeholder="Paste URL*"
              type="url"
              name="avatar_url"
              size="lg"
              value={formData.avatar_url}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup position="relative">
            <InputLeftElement
              pointerEvents="none"
              position="absolute"
              top="1"
              children={<EmailIcon color="gray.400" boxSize={5} />}
            />
            <Input
              placeholder="Email*"
              type="email"
              name="email"
              size="lg"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup position="relative">
            <InputLeftElement
              pointerEvents="none"
              position="absolute"
              top="1"
              children={<UnlockIcon color="gray.400" boxSize={5} />}
            />
            <Input
              type={show ? "text" : "password"}
              placeholder="Password*"
              name="password"
              size="lg"
              value={formData.password}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem" position="absolute" top="1">
              <Button
                h="1.75rem"
                size="sm"
                variant="link"
                onClick={handleClick}
              >
                {show ? (
                  <ViewOffIcon color="gray.400" boxSize={5} />
                ) : (
                  <ViewIcon color="gray.400" boxSize={5} />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>

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
            onClick={handleSubmit}
            colorScheme={colorScheme}
            size="lg"
            isLoading={isLoading}
            loadingText="Register"
          >
            Register
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default RegisterForm;
