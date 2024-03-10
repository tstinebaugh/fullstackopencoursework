import { useSelector } from "react-redux";
import React from "react";

const Notification = () => {
  const msg = useSelector((state) => state.notify);

  const infoStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: "inline-block",
  };

  const errStyle = {
    border: "solid",
    padding: 10,
    display: "inline-block",
    borderWidth: 10,
    borderColor: "red",
  };

  return (
    (msg.content != "" && msg.type === "ERROR" && (
      <div className="error" style={errStyle}>
        {msg.content}
      </div>
    )) ||
    (msg.type === "INFO" && <div style={infoStyle}>{msg.content}</div>)
  );
};

export default Notification;
