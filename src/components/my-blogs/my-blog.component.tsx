import TaskBar from "../home/taskbar.home.component";
import MyBlogsContent from "./my-blogs-content.component";
const MyBlogs = () => {
  return (
    <>
      <div className="home-page h-full flex flex-col justify-between laptop:flex-row-reverse">
        <div className="home-content overflow-y-auto laptop:w-11/12">
          <MyBlogsContent />
        </div>
        <div className="nav-bar laptop:w-1/12 laptop:h-full">
          <TaskBar />
        </div>
      </div>
    </>
  );
};
export default MyBlogs;
