import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PostItem from "../../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import {
  postsSelector,
  fetchPosts,
  selectPost,
  dismissPost,
} from "../../redux/postsSlice";

function PostsList() {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, readPosts } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const postWasRead = (postId: string) => {
    return readPosts.includes(postId);
  };
  return (
    <Box>
      {posts.map((post: any) => (
        <PostItem
          key={post.id}
          post={post.data}
          read={postWasRead(post.data.id)}
          handleDismiss={(event: any) => {
            event.preventDefault();
            event.stopPropagation();

            dispatch(dismissPost(post.data.id));
          }}
          handleClick={() => {
            dispatch(selectPost(post.data));
          }}
        />
      ))}
    </Box>
  );
}

export default PostsList;
