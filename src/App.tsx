import SignUp from "./components/sign-up-form/sign-up-form.component";
import LogIn from "./components/log-in-form/log-in-form.component";
import Home from "./components/home/home.component";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/firebase/private-routes.utils";
import BlogPost from "./components/blog-post/blog-post.component";
import MyBlogs from "./components/my-blogs/my-blog.component";
import Loader from "./components/modals/loader.modal";
import { useState } from "react";
import Deletion from "./components/modals/confirm-del.modal.component";
const App = () => {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const [loaderIsOpen, setloaderIsOpen] = useState(false);
  return (
    <>
      <Loader loaderIsOpen={loaderIsOpen} setLoaderIsOpen={setloaderIsOpen} />
      <Routes>
        <Route
          path="/sign-up"
          element={<SignUp setLoaderIsOpen={setloaderIsOpen} />}
        ></Route>
        <Route
          path="/log-in"
          element={<LogIn setLoaderIsOpen={setloaderIsOpen} />}
        ></Route>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              loggedIn === "true" ? (
                <Home />
              ) : (
                <LogIn setLoaderIsOpen={setloaderIsOpen} />
              )
            }
          ></Route>
          <Route path="/blog-post" element={<BlogPost />}></Route>
          <Route path="/my-blogs" element={<MyBlogs />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
