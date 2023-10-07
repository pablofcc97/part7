/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { eraseBlog, voteBlog, addComment } from "../reducers/blogsReducer";
import { useParams } from "react-router-dom";
import useField from "../hooks/field";

const Blog = () => {
  const dispatch = useDispatch();
  //const user = useSelector(state => state.login)
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const comment = useField("text");

  const deleteBlog = async (blog) => {
    if (window.confirm(`Sure to remove blog ${blog.name} by ${blog.author}?`)) {
      dispatch(eraseBlog(blog));
    }
  };
  const LikeBlog = async (blogToUpdate) => {
    dispatch(voteBlog(blogToUpdate));
  };

  const sendComment = async (event) => {
    event.preventDefault();
    dispatch(
      addComment(
        { ...blog, comments: blog.comments.concat(comment.value) },
        blog.id,
      ),
    );
    comment.reset();
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <h2 className="blog__title">
        {blog.title} by {blog.author}
      </h2>
      <a className="blog__url" href={blog.url}>
        {blog.url}
      </a>
      <div>
        <span className="blog__likes">{blog.likes}</span>{" "}
        <button className="button--like" onClick={() => LikeBlog(blog)}>
          Like
        </button>
      </div>
      <p className="blog__user">Added by {blog.user.username}</p>
      <button className="button--remove" onClick={() => deleteBlog(blog)}>
        Remove
      </button>
      <h3>Comments</h3>
      <form onSubmit={sendComment}>
        <input {...(({ reset, ...object }) => object)(comment)} />
        <button>Add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
