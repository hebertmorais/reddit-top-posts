import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PostItem from "../../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSpring, useTransition, animated } from "react-spring";

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

  const transition = useTransition(posts, {
    from: { opacity: 0, marginTop: 5 },
    enter: { opacity: 1, maxHeight: 1000, marginTop: 5 },
    leave: { opacity: 0, maxHeight: 0, marginTop: 0 },
  });

  useEffect(() => {
    posts.length < MAX_POSTS_COUNT && getNextPage();
  }, []);

  const postWasRead = (postId: string) => {
    return readPosts.includes(postId);
  };

  const fadeInListItems = transition((style, post) => {
    return (
      <animated.div style={style}>
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
      </animated.div>
    );
  });

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
        {fadeInListItems}
      </InfiniteScroll>
    </Box>
  );
}

export default PostsList;
