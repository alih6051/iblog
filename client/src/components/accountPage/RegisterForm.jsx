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
import { BiImageAdd } from "react-icons/bi";
import Compressor from "compressorjs";

function RegisterForm() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [formData, setFormData] = useState(null);
  const [avatar_url, setAvatar_url] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorModeValue("blue", "green");
  const toast = useToast();

  // REDUX
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleClick = () => setShow(!show);

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.6,
      success: (res) => {
        if (res.size > 2048000) {
          toast({
            title: "Image size should be less than 2 MB ",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        setAvatar_url(res);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("avatar_url", avatar_url);
    formData.append("email", email);
    formData.append("password", password);

    if (regEx.test(email)) {
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
        <form
          action="/users/register"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
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
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>

            <InputGroup position="relative">
              <InputLeftElement
                pointerEvents="none"
                position="absolute"
                top="1"
                children={<BiImageAdd color="gray" size="25" />}
              />
              <Input
                placeholder="Paste URL*"
                type="file"
                name="avatar_url"
                size="lg"
                accept="image/*"
                sx={{
                  "::file-selector-button": {
                    height: 8,
                    mr: 4,
                    border: "1px solid grey",
                    mt: 2,
                  },
                }}
                onChange={handleCompressedUpload}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                email == "" || avatar_url == "" || name == "" || password == ""
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
        </form>
      </CardBody>
    </Card>
  );
}

export default RegisterForm;
