import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Text,
  Avatar,
  HStack,
  Spinner,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { CiUser } from "react-icons/ci";
import { BsBookmarks } from "react-icons/bs";
import { RiFileList2Line, RiStarSFill, RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdStats } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function SideMenu({ src, name, email }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //Redux
  const dispatch = useDispatch();

  return (
    <>
      <Avatar
        ref={btnRef}
        onClick={onOpen}
        size="sm"
        src={src}
        name={name}
        cursor="pointer"
      ></Avatar>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <RouterLink to="/profile">
              <Flex
                onClick={onClose}
                alignItems="center"
                mb="20px"
                gap="10px"
                cursor="pointer"
              >
                <CiUser size="1.5em" />
                <Text>Profile</Text>
              </Flex>
            </RouterLink>
            <Flex alignItems="center" mb="20px" gap="10px" cursor="pointer">
              <BsBookmarks size="1.5em" />
              <Text>Lists</Text>
            </Flex>
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Flex alignItems="center" mb="20px" gap="10px" cursor="pointer">
                <RiFileList2Line size="1.5em" />
                <Text>Stories</Text>
              </Flex>
            </Tooltip>
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Flex alignItems="center" mb="20px" gap="10px" cursor="pointer">
                <IoMdStats size="1.5em" />
                <Text>Stats</Text>
              </Flex>
            </Tooltip>
            <hr />
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Text mt="15px" mb="20px" cursor="pointer">
                Settings
              </Text>
            </Tooltip>
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Text mb="20px" cursor="pointer">
                Refine recommendations
              </Text>
            </Tooltip>
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Text mb="20px" cursor="pointer">
                Manage Publications
              </Text>
            </Tooltip>
            <hr />
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Flex alignItems="center" gap="70px">
                <Text mt="15px" mb="20px" cursor="pointer">
                  Become a member
                </Text>
                <RiStarSFill size="1.3em" color="#FFD700" />
              </Flex>
            </Tooltip>
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Text mb="20px" cursor="pointer">
                Apply to the Partner Program
              </Text>
            </Tooltip>
            <Tooltip hasArrow label="Work in Progress" placement="right">
              <Text mb="20px" cursor="pointer">
                Gift a membership
              </Text>
            </Tooltip>
            <hr />
            <HStack mt={3} spacing={2}>
              <Text
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    toast({
                      title: `Logged Out`,
                      duration: 2000,
                      isClosable: true,
                    });
                    dispatch(logout());
                    window.location.reload();
                  }, 1000);
                }}
              >
                Sign Out
              </Text>
              <RiLogoutBoxRLine />
              {loading && <Spinner size={"sm"} color="blue.500" />}
            </HStack>
            <Text mt={3} cursor="pointer">
              {email}
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideMenu;
