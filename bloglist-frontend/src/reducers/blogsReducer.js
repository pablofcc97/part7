import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id);
    },
    likeBlog(state, action) {
      return state.map((b) => {
        return b.id === action.payload.id ? action.payload : b;
      });
    },
    commentBlog(state, action) {
      return state.map((b) => {
        return b.id === action.payload.id ? action.payload : b;
      });
    },
  },
});

export const { setBlogs, appendBlog, deleteBlog, likeBlog, commentBlog } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  };
};

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      blogService.create(blogObject).then((blog) => dispatch(appendBlog(blog)));
      dispatch(
        showNotification(
          {
            message: `a new blog '${blogObject.title}' by ${blogObject.author} added`,
            success: true,
          },
          3000,
        ),
      );
    } catch (exception) {
      dispatch(
        showNotification(
          { message: `Error: ${exception}`, success: false },
          3000,
        ),
      );
      console.log(exception);
    }
  };
};

export const eraseBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      blogService
        .deleteBlog(blogObject.id)
        .then(() => dispatch(deleteBlog(blogObject)));
      dispatch(
        showNotification(
          { message: `blog deleted correctly`, success: true },
          3000,
        ),
      );
    } catch (exception) {
      dispatch(
        showNotification(
          { message: `Error: ${exception}`, success: false },
          3000,
        ),
      );
      console.log(exception);
    }
  };
};

export const voteBlog = (blogObject) => {
  const newBlog = {
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url,
    likes: blogObject.likes + 1,
    comments: blogObject.comments,
  };
  return async (dispatch) => {
    try {
      blogService
        .likeBlog(newBlog, blogObject.id)
        .then((blog) => dispatch(likeBlog(blog)));
    } catch (exception) {
      dispatch(
        showNotification(
          { message: `Error: ${exception}`, success: false },
          3000,
        ),
      );
      console.log(exception);
    }
  };
};

export const addComment = (blogObject, blogId) => {
  const newBlog = {
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url,
    likes: blogObject.likes,
    comments: blogObject.comments,
  };
  return async (dispatch) => {
    try {
      blogService
        .comment(newBlog, blogId)
        .then((blog) => dispatch(commentBlog(blog)));
    } catch (exception) {
      dispatch(
        showNotification(
          { message: `Error: ${exception}`, success: false },
          3000,
        ),
      );
      console.log(exception);
    }
  };
};

export default blogsSlice.reducer;
