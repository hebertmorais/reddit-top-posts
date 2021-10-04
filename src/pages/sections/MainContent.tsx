import React from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import ContentViewer from "./ContentViewer";
import PostsList from "./PostsList";
import {
  postsSelector,
  selectPost,
  dismissAllPosts,
} from "../../redux/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { SmallCloseIcon } from "@chakra-ui/icons";

function MainContent() {
  const { posts, selectedPost } = useSelector(postsSelector);
  const dispatch = useDispatch();

  return (
    <>
      <Flex width={{ base: "100%", lg: "1200px" }} height="100%">
        <Box width={{ base: "100%", lg: "65%" }} margin={4} padding={4}>
          <Flex flex="1">
            {posts.length > 0 && (
              <Button
                leftIcon={<SmallCloseIcon />}
                colorScheme="orange"
                variant="outline"
                size="small"
                padding={1}
                margin={1}
                borderRadius="full"
                onClick={() => dispatch(dismissAllPosts(null))}
              >
                Dismiss all
              </Button>
            )}
          </Flex>
          <PostsList />
        </Box>

        {selectedPost && (
          <Box
            borderRadius={8}
            width={{ base: "full", lg: "35%" }}
            height={{ base: "full", lg: "initial" }}
            position={{ base: "absolute", lg: "initial" }}
            margin={4}
          >
            <ContentViewer
              post={selectedPost}
              onClose={() => {
                dispatch(selectPost(null));
              }}
            />
          </Box>
        )}
      </Flex>
    </>
  );
}

export default MainContent;
