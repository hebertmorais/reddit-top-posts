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
    lastItemId: "",
    posts: [],
    isLoading: false,
    isError: false,
    selectedPost: null,
    readPosts: [],
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
      { payload }: { payload: any[] }
    ) {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        posts: [...state.posts, ...payload],
        lastItemId: payload[payload.length - 1].data.id,
        isError: false,
        isLoading: false,
      };
    },
    loadNextPostsPageFail(state: ReturnType<typeof slice.initialState>) {
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
        selectedPost: payload,
        readPosts:
          payload && !state.readPosts.includes(payload.id)
            ? [...state.readPosts, payload.id]
            : state.readPosts,
      };
    },
    dismissPost(
      state: ReturnType<typeof slice.initialState>,
      { payload }: { payload: string }
    ) {
      return {
        ...state,
        selectedPost:
          state.selectedPost && state.selectedPost.id === payload
            ? null
            : state.selectedPost,
        posts: state.posts.filter((post: any) => {
          return post.data.id !== payload;
        }),
        lastItemId: state.posts.length === 1 ? "" : state.lastItemId,
      };
    },
    dismissAllPosts(state: ReturnType<typeof slice.initialState>) {
      return {
        ...state,
        posts: [],
        selectedPost: null,
        lastItemId: "",
      };
    },
  },
});

export const {
  loadNextPostsRequest,
  loadNextPostsPageSuccess,
  loadNextPostsPageFail,
  selectPost,
  dismissPost,
  dismissAllPosts,
} = slice.actions;

export const postsSelector = (state: ReturnType<typeof slice.initialState>) =>
  state;

export default slice.reducer;

export function fetchPosts(lastItemId: string) {
  return async (dispatch: Function) => {
    dispatch(loadNextPostsRequest());
    const beforeQuery = lastItemId ? `&before=${lastItemId}` : "";
    try {
      const response = await fetch(
        `https://www.reddit.com/top.json?count=50${beforeQuery}`
      );
      const {
        data: { children },
      } = await response.json();

      dispatch(loadNextPostsPageSuccess(children));
    } catch (error) {
      dispatch(loadNextPostsPageFail());
    }
  };
}
