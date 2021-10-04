import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PostItem from "../../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { postsSelector, fetchPosts } from "../../redux/postsSlice";

function PostsList() {
  const dispatch = useDispatch();
  const { posts, isLoading, isError } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, posts]);

  return (
    <Box>
      {posts.map((post: any) => (
        <PostItem key={post.id} post={post.data} read={false} />
      ))}
    </Box>
  );
}

export default PostsList;
