import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PostItem from "../../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
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

  const getNextPage = () => {
    dispatch(fetchPosts(lastItemId));
  };

  useEffect(() => {
    posts.length < MAX_POSTS_COUNT && getNextPage();
  }, []);

  const postWasRead = (postId: string) => {
    return readPosts.includes(postId);
  };
  return (
    <Box>
      <InfiniteScroll
        dataLength={posts.length}
        next={getNextPage}
        hasMore={posts.length < 50}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
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
      </InfiniteScroll>
    </Box>
  );
}

export default PostsList;
