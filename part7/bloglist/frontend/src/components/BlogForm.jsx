import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { infoNotification } from "../reducers/notifyReducer";
import { createNew } from "../reducers/blogReducer";

const BlogForm = (refs) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const handleNewBlog = async (event) => {
    event.preventDefault();

    refs.refs.current.toggleVisibility();

    const blogObject = { title, author, url };
    dispatch(createNew(blogObject));
    dispatch(
      infoNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        5
      )
    );
    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="blog-title"
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="blog-author"
          />
        </div>
        <div>
          URL:{" "}
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setURL(target.value)}
            id="blog-url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
