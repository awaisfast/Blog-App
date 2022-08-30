import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
const PrivateRoutes = () => {
  const { currentUser }: any = useContext(UserContext);
  return currentUser ? <Outlet /> : <Navigate to={"log-in"} />;
};
export default PrivateRoutes;
