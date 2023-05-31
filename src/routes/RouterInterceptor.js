import { selectAuth } from "@/store/slice/authSlice";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";

function RouterInterceptor({ inner }) {
  const { uid } = useSelector(selectAuth);
  const location = useLocation();
  if (!!!uid) {
    message.error("請登入後再嘗試");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{inner}</>;
}

export default RouterInterceptor;
