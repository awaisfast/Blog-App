import NavBar from "./navbar.home.component";
const Home = () => {
  return (
    <>
      <div className="home-page h-full flex flex-col-reverse laptop:flex-row">
        <div className="nav-bar laptop:w-1/12 laptop:h-full">
          <NavBar />
        </div>
      </div>
    </>
  );
};
export default Home;
