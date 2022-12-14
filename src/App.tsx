import SignUp from "./components/sign-up-form/sign-up-form.component";
import LogIn from "./components/log-in-form/log-in-form.component";
import Home from "./components/home/home.component";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/firebase/private-routes.utils";
const App = () => {
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/log-in" element={<LogIn />}></Route>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/"
          element={loggedIn === "true" ? <Home /> : <LogIn />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;
