import NavBar from "../home/navbar.home.component";
import MyBlogsContent from "./my-blogs-content.component";
const MyBlogs = () => {
  return (
    <>
      <div className="home-page h-full flex flex-col-reverse laptop:flex-row">
        <div className="nav-bar laptop:w-1/12 laptop:h-full">
          <NavBar />
        </div>
        <div className="home-content overflow-y-auto laptop:w-11/12">
          <MyBlogsContent />
        </div>
      </div>
    </>
  );
};
export default MyBlogs;
