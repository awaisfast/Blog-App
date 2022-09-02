import BlogsContent from "./blogs.home.component";
import TaskBar from "./taskbar.home.component";
const Home = () => {
  return (
    <>
      <div className="home-page h-full flex flex-col justify-between laptop:flex-row-reverse">
        <div className="home-content overflow-y-auto laptop:w-11/12">
          <BlogsContent />
        </div>
        <div className="nav-bar laptop:w-1/12 laptop:h-full">
          <TaskBar />
        </div>
      </div>
    </>
  );
};
export default Home;
