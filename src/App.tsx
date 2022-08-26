import SignUp from "./components/sign-up-form/sign-up-form.component";
import LogIn from "./components/log-in-form/log-in-form.component";
import Home from "./components/home/home.component";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
      <Route path="/log-in" element={<LogIn />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
};

export default App;
