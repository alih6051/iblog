import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Input,
  StackDivider,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import CommentCard from "./CommentCard";
import { ChatIcon } from "@chakra-ui/icons";

const CommentBtn = ({
  data,
  postId,
  handleCommentUpdate,
  handleReplyUpdate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <HStack cursor="pointer" ref={btnRef} onClick={onOpen}>
        <ChatIcon size={16} />
        <Text size={20}>{data?.comments.length}</Text>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent minW={{ base: "85%", sm: "400px" }}>
          <DrawerCloseButton />
          <DrawerHeader>Responses ({data?.comments.length})</DrawerHeader>

          <DrawerBody>
            {user && (
              <CommentForm
                user={user}
                postId={postId}
                handleCommentUpdate={handleCommentUpdate}
              />
            )}

            {/* RENDER COMMENTS */}
            <VStack marginTop={5} spacing={4} align="stretch">
              {data?.comments.map((item) => (
                <CommentCard
                  key={item._id}
                  {...item}
                  postId={postId}
                  handleReplyUpdate={handleReplyUpdate}
                  handleCommentUpdate={handleCommentUpdate}
                />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommentBtn;
