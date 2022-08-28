import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Home = () => {
  const { setCurrentUser }: any = useContext(UserContext);
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <div>HOME</div>
        <button className="bg-red-400" onClick={signOutHandler}>
          LOGOUT
        </button>
      </div>
    </>
  );
};
export default Home;
