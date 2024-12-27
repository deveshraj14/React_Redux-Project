import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../api/posts';
import { fetchPostsComments } from '../api/comments';

export const fetchPostsThunk = createAsyncThunk('post/fetchPosts', async () => {
  const data = await fetchPosts();
  return data;
});

export const fetchCommentsThunk = createAsyncThunk('post/fetchPostComments', async () => {
  // console.log("Fetching comments for postId:", postId);  
  const data = await fetchPostsComments();
  console.log("Fetched comments:", data);  
  return data;
});

const initialState = {
  posts: [],
  comments: [],
  selectedPost: null,
  loading: false,
  error: null,
  currentPage: 1,
  postsPerPage: 5,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setSelectedPostcomments: (state, action) => {
      state.selectedPostcomments = action.payload;
    },
    nextPage: (state) => {
      const totalPages = Math.ceil(state.posts.length / state.postsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage += 1;
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCommentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedPost,setSelectedPostcomments, nextPage, prevPage, setPage } = postSlice.actions;

export const selectPaginatedPosts = (state) => {
  const { posts, currentPage, postsPerPage } = state.post;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  return posts.slice(indexOfFirstPost, indexOfLastPost);
};

export default postSlice.reducer;
