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
    selectedPost: null,
  },
  reducers: {
    loadNexPostsPage(
      state: ReturnType<typeof slice.initialState>,
      { payload }: { payload: PostType[] }
    ) {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        posts: [...state.posts, ...payload],
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

export const { loadNexPostsPage, selectedPost, dismissPost, dismissAllPosts } =
  slice.actions;

export default slice.reducer;
