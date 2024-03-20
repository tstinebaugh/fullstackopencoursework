import React from "react";
import PropTypes from "prop-types";

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <span>
      <h2>{user.name}</h2>
      <h3>Added Blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={user.name + blog.id}>{blog.title}</li>
        ))}
      </ul>
    </span>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

export default User;
