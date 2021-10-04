import React, { useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ContentViewer from "./ContentViewer";
import PostsList from "./PostsList";
import { postsSelector } from "../../redux/postsSlice";
import { useSelector } from "react-redux";

function MainContent() {
  const { selectedPost } = useSelector(postsSelector);
  useEffect(() => console.log(selectedPost), [selectedPost]);
  return (
    <Flex width={{ base: "100%", lg: "1200px" }} height="100%">
      <Box width={{ base: "100%", lg: "65%" }} margin={4} padding={4}>
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
          <ContentViewer post={selectedPost} />
        </Box>
      )}
    </Flex>
  );
}

export default MainContent;
