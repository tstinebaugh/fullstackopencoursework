import { useSelector } from "react-redux";
import React from "react";
import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const msg = useSelector((state) => state.notify);

  return (
    (msg.content != "" && msg.type === "ERROR" && (
      <Alert key="alertErrorMsg" variant="danger">
        {msg.content}
      </Alert>
    )) ||
    (msg.type === "INFO" && (
      <Alert key="alertInfoMsg" variant="info">
        {msg.content}
      </Alert>
    ))
  );
};

export default Notification;
