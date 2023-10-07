import { useState } from "react";

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog} className="form--createBlog">
      <div>
        tittle
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          className="blogInput--title"
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          className="blogInput--author"
        />
      </div>
      <div>
        Url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          className="blogInput--url"
        />
      </div>
      <button type="submit" className="blogInput--submit">
        Create
      </button>
    </form>
  );
};

export default AddBlogForm;
