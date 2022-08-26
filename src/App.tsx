import SignUp from "./components/sign-up-form/sign-up-form.component";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
    </Routes>
  );
};

export default App;
