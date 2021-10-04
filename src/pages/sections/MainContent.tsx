import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import ContentViewer from "./ContentViewer";
import PostsList from "./PostsList";
import MockPost from "../../components/PostItem/__tests__/mockPost.json";

function MainContent() {
  return (
    <Flex width={{ base: "100%", lg: "1000px" }} height="100%">
      <Box width={{ base: "100%", lg: "65%" }} margin={4} padding={4}>
        <PostsList />
      </Box>

      <Box
        borderRadius={8}
        width={{ base: "full", lg: "35%" }}
        height={{ base: "full", lg: "initial" }}
        position={{ base: "absolute", lg: "initial" }}
        margin={4}
      >
        <ContentViewer post={MockPost} />
      </Box>
    </Flex>
  );
}

export default MainContent;
