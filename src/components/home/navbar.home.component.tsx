import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowAltCircleLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const NavBar = () => {
  const { setCurrentUser, currentUser }: any = useContext(UserContext);
  let userInitital;
  let displayName;

  if (currentUser) {
    userInitital = currentUser.displayName[0].toUpperCase();
    displayName = currentUser.displayName;
  }

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    window.localStorage.setItem("isLoggedIn", "false");
    window.localStorage.setItem("userContext", "");
  };
  return (
    <>
      <div className="nav drop-shadow-navshadow bg-darkgrey h-20 flex flex-row justify-between items-center laptop:flex-col laptop:h-full">
        <div className="nav-buttons h-2/5 w-5/6 m-auto flex justify-between items-center text-white laptop:flex-col laptop:w-2/5 laptop:justify-around laptop:m-0 laptop:mx-0">
          <div className="userName flex justify-center items-center">
            <div className="symbol bg-primary flex justify-center items-center h-10 w-10 rounded-full laptop:h-16 laptop:w-16">
              <h1 className=" font-normal font-lexend text-xl leading-6 not-italic text-white tablet:text-darkgrey laptop:text-white laptop:text-3xl laptop:leading-10">
                {userInitital}
              </h1>
            </div>
            <div className="displayName font-normal text-xl leading-6 font-lexend ml-5 hidden tablet:block laptop:hidden">
              <h1>{displayName}</h1>
            </div>
          </div>
          <div className="search-icon flex flex-row laptop:flex-col">
            <FontAwesomeIcon
              className="text-2xl text-primary"
              icon={faMagnifyingGlass}
            />
            <h1 className="ml-5 hidden font-normal text-base leading-5 text-white font-lexend tablet:block laptop:ml-0">
              search
            </h1>
          </div>

          <div className="create-blog flex flex-row laptop:flex-col">
            <FontAwesomeIcon className="text-2xl text-primary" icon={faPlus} />
            <h1 className="ml-5 hidden font-normal text-base leading-5 text-white font-lexend tablet:block laptop:ml-0">
              create
            </h1>
          </div>
          <button onClick={signOutHandler} className=" laptop:hidden">
            <div className="log-out flex justify-center items-center">
              <div className="symbol bg-primary flex justify-center items-center h-10 w-10 rounded-full laptop:h-16 laptop:w-16">
                <h1 className=" font-normal text-xl leading-6 not-italic text-darkgrey laptop:text-3xl laptop:leading-10">
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                </h1>
              </div>
              <h1 className="ml-5 font-normal text-base leading-5 text-white font-lexend hidden tablet:block">
                LOGOUT
              </h1>
            </div>
          </button>
        </div>
        <button onClick={signOutHandler} className="hidden laptop:block">
          <div className="log-out">
            <div className="symbol bg-primary flex justify-center items-center h-10 w-10 rounded-full laptop:h-16 laptop:w-16">
              <h1 className=" font-normal text-xl leading-6 not-italic text-darkgrey laptop:text-3xl laptop:leading-10">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
              </h1>
            </div>
            <h1 className="text-white hidden laptop:block">LOGOUT</h1>
          </div>
        </button>
      </div>
    </>
  );
};
export default NavBar;
