import { useState } from "react";
import BlogsContent from "./blogs.home.component";
import TaskBar from "./taskbar.home.component";
const Home = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  return (
    <>
      <div className="home-page h-full flex flex-col-reverse justify-between laptop:flex-row">
        <div className="nav-bar laptop:w-1/12 laptop:h-full">
          <TaskBar
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
          />
        </div>
        <div className="home-content overflow-y-auto laptop:w-11/12">
          <BlogsContent
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
