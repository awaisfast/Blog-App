import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
const PrivateRoutes = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const user = window.localStorage.getItem("userContext");
  setCurrentUser(user ? JSON.parse(user) : null);
  return isLoggedIn === "true" ? <Outlet /> : <Navigate to={"log-in"} />;
};
export default PrivateRoutes;
