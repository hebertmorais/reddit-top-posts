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

const MAX_POSTS_COUNT = 50;

function PostsList() {
  const dispatch = useDispatch();
  const postsSelect = useSelector(postsSelector);
  const { posts, isLoading, isError, readPosts, lastItemId } = postsSelect;

  useEffect(() => {
    posts.length < MAX_POSTS_COUNT && dispatch(fetchPosts(lastItemId));
  }, []);

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
