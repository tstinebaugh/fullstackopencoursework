import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const sortBlogs = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes);
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlogs(state, action) {
      const update = action.payload;
      const newBlogs = state.map((b) => (b.id !== update.id ? b : update));
      sortBlogs(newBlogs);
      return newBlogs;
    },
    deleteBlog(state, action) {
      const deleteId = action.payload;
      const newBlogs = state.filter((b) => b.id !== deleteId);
      return newBlogs;
    },
  },
});

export const { appendBlog, setBlogs, updateBlogs, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    sortBlogs(blogs);
    dispatch(setBlogs(blogs));
  };
};

export const createNew = (content, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.post(content, token);
    dispatch(appendBlog(newBlog));
  };
};

export const vote = (blog, token) => {
  return async (dispatch) => {
    const votedblog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.put(votedblog, token);
    dispatch(updateBlogs(votedblog));
  };
};

export const removeBlog = (blogId, token) => {
  return async (dispatch) => {
    await blogService.remove(blogId, token);
    dispatch(deleteBlog(blogId));
  };
};

export default blogSlice.reducer;
