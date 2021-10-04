import { Box } from "@chakra-ui/react";
import React from "react";
import PostItem from "../../components/PostItem";
import MockPost from "../../components/PostItem/__tests__/mockPost.json";

function PostsList() {
  return (
    <Box>
      {Array(10)
        .fill(0)
        .map((item) => (
          <PostItem post={MockPost} read={false} />
        ))}
    </Box>
  );
}

export default PostsList;
