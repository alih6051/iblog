import React, { useState } from "react";
import {
  Text,
  Box,
  Avatar,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  HStack,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function EditProfile({ name, img }) {
    const initState={
        name:name,
        img:img
    }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorScheme = useColorModeValue("blue", "green");
  const [formData,setFormData]=useState(initState)

  const handleChange=(e)=>{
    const {name,value}=e.target;

    setFormData({...formData,[name]:value})
  }

  const handleSubmit=()=>console.log(formData)
  return (
    <>
      <Button
        onClick={onOpen}
        fontSize="sm"
        rightIcon={<EditIcon />}
        p="0"
        variant={"unstyled"}
      >
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <FormControl>
              <FormLabel>Photo</FormLabel>
              <Avatar mt="5px" size="lg" src={img} cursor="pointer" />
              <Input
                borderBottom="1px solid grey"
                noOfLines={1}
                overflow="hidden"
                mt="10px"
                rounded="0"
                variant="unstyled"
                name="img"
                value={formData.img}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt="20px" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                borderBottom="1px solid grey"
                rounded="0"
                variant="unstyled"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Text mt="5px" fontSize="14px">
                Appears on your Profile page, as your byline, and in your
                responses.
              </Text>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button rounded="0" onClick={onClose} colorScheme={colorScheme}>
                Cancel
              </Button>
              <Button rounded="0" colorScheme={colorScheme} onClick={handleSubmit}>
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;
