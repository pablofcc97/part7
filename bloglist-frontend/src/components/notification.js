import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
//import {setNotification} from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification.message === "") {
    return null;
  }
  if (notification.success === true) {
    return <Alert  severity="success">{notification.message}</Alert>;
  }
  return <Alert  severity="error">{notification.message}</Alert>;
};

export default Notification;
