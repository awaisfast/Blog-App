import { useState } from "react";
import Loader from "../modals/loader.modal";
import BlogsContent from "./blogs.home.component";
import TaskBar from "./taskbar.home.component";

const Home = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [loaderIsOpen, setLoaderIsOpen] = useState(false);

  return (
    <>
      <Loader loaderIsOpen={loaderIsOpen} setLoaderIsOpen={setLoaderIsOpen} />
      <div className="home-page h-full flex flex-col-reverse justify-between laptop:flex-row">
        <div className="nav-bar laptop:w-1/12 laptop:h-full">
          <TaskBar
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
            setLoaderIsOpen={setLoaderIsOpen}
          />
        </div>
        <div className="home-content overflow-y-auto laptop:w-11/12">
          <BlogsContent
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
            setLoaderIsOpen={setLoaderIsOpen}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
