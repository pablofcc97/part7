import { useEffect, useRef } from "react";
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import Blog from "./components/Blog";
import BlogItem from "./components/BlogItem";
import Notification from "./components/notification";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/blogForm";
import Togglable from "./components/togglable";
import Users from "./components/Users";
import User from "./components/User";

import { useSelector, useDispatch } from "react-redux";

import { initializeBlogs, addBlog } from "./reducers/blogsReducer";
import { verifyLogin, logout } from "./reducers/loginReducer";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(verifyLogin());
  }, []);

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(addBlog(blogObject));
  };

  const endSession = () => {
    dispatch(logout());
  };

  const navStyles = {
    backgroundColor: "#D3D3D3",
    display: "flex",
    gap: "15px",
    padding: "10px",
    marginBottom: "25px",
  };

  return (
    <Container>
       <Router>
        <h2>blogs</h2>
        <Notification
          message={notification.message}
          success={notification.success}
        />
        {user === null ? (
          <LoginForm />
        ) : (
          <>
            <AppBar style={navStyles} position="static">
              <Toolbar>
                <Button>
                  <Link to="/">blogs</Link>
                </Button>
                <Button>
                  <Link to="/users">users</Link>
                </Button>
                <span>{`${user.name} logged In`}</span>
                <Button className="button--logout" onClick={() => endSession()}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/users" element={<Users />}></Route>
              <Route
                path="/"
                element={
                  <div>
                    <Togglable buttonLabel="New blog" ref={blogFormRef}>
                      <BlogForm createBlog={createBlog}></BlogForm>
                    </Togglable>
                    {[...blogs]
                      .sort((a, b) => b.likes - a.likes)
                      .map((blog) => (
                        <BlogItem key={blog.id} blog={blog}></BlogItem>
                      ))}
                  </div>
                }
              ></Route>
              <Route path="/users/:id" element={<User />}></Route>
              <Route path="/blogs/:id" element={<Blog />}></Route>
            </Routes>
          </>
        )}
      </Router>
    </Container>
  );
};

export default App;
