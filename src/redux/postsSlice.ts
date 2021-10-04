import { createSlice } from "@reduxjs/toolkit";

interface PostType {
  id: string;
  title: string;
  author: string;
  created_utc: number;
  thumbnail: string;
  num_comments: number;
  ups: number;
  subreddit: string;
}

export const slice: any = createSlice({
  name: "posts",
  initialState: {
    currentPage: 1,
    posts: [],
    isLoading: false,
    isError: false,
    selectedPost: null,
  },
  reducers: {
    loadNextPostsRequest(state: ReturnType<typeof slice.initialState>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loadNextPostsPageSuccess(
      state: ReturnType<typeof slice.initialState>,
      { payload }: { payload: PostType[] }
    ) {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        posts: [...state.posts, ...payload],
        isError: false,
        isLoading: false,
      };
    },
    loadNextPostsPageFail(
      state: ReturnType<typeof slice.initialState>,
      { payload }: { payload: PostType[] }
    ) {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    },
    selectPost(
      state: ReturnType<typeof slice.initialState>,
      { payload }: { payload: PostType }
    ) {
      return {
        ...state,
        selectPost: payload,
      };
    },
    dismissPost(
      state: ReturnType<typeof slice.initialState>,
      { payload }: { payload: string }
    ) {
      return {
        ...state,
        posts: state.posts.filter((post: PostType) => post.id !== payload),
      };
    },
    dismissAllPosts(state: ReturnType<typeof slice.initialState>) {
      return {
        ...state,
        posts: [],
      };
    },
  },
});

export const {
  loadNextPostsRequest,
  loadNextPostsPageSuccess,
  loadNextPostsPageFail,
  selectedPost,
  dismissPost,
  dismissAllPosts,
} = slice.actions;

export const postsSelector = (state: ReturnType<typeof slice.initialState>) =>
  state.posts;

export default slice.reducer;

export function fetchPosts() {
  return async (dispatch: Function) => {
    dispatch(loadNextPostsRequest());

    try {
      const response = await fetch("https://www.reddit.com/top.json?limit=50");
      const {
        data: { children },
      } = await response.json();

      dispatch(loadNextPostsPageSuccess(children));
    } catch (error) {
      dispatch(loadNextPostsPageFail());
    }
  };
}
