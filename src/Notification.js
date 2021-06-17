import "./notification.css";

const Notification = ({ message, type }) => {
  if (message) {
    return <p className={type}>{message}</p>;
  } else {
    return null;
  }
};

export default Notification;
