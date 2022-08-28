import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  db,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
import Alert from "../alert/alert.component";
import Footer from "../login-signup/footer.component";
import ImageBackground from "../login-signup/image.component";
import WelcomeContent from "../login-signup/welcome.component";
const LogIn = () => {
  type defaultForms = {
    email: string;
    password: string;
  };

  const defaultFormFields: defaultForms = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);
  let isValid: boolean = false; //if all enteries are valid
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const { user }: any = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      setFormFields(defaultFormFields);
      user ? navigate("/") : navigate("/log-in");
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          const incorrect = document.querySelector(
            ".incorrect"
          )! as HTMLElement;

          incorrect.classList.remove("hidden");
          break;
        case "auth/user-not-found":
          const notFound = document.querySelector(
            ".user-notFound"
          )! as HTMLElement;

          notFound.classList.remove("hidden");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    const incorrect = document.querySelector(".incorrect-pw")! as HTMLElement;
    const notFound = document.querySelector(".user-notFound")! as HTMLElement;

    incorrect.classList.add("hidden");
    notFound.classList.add("hidden");

    setFormFields({ ...formFields, [name]: value });
    if (name === "email") {
      emailBorder(value);
    } else if (name === "password") {
      passwordBorder(value);
    }
    checkEnteries(); //checking if all enteries are valid
  };
  const checkEnteries = () => {
    if (email && password) {
      const submitButton = document.querySelector(
        ".submit-button"
      )! as HTMLElement;
      if (isValid) {
        submitButton.classList.remove("opacity-30");
      } else {
        submitButton.classList.add("opacity-30");
      }
    }
  };
  const emailBorder = (email: string) => {
    const emailInput = document.querySelector(".email-input")! as HTMLElement;
    const emailAlert = document.querySelector(".email-alert")! as HTMLElement;

    if (email.includes("@") && email.includes(".com")) {
      emailInput.classList.add("border-green");
      emailAlert.classList.add("hidden");
      isValid = true;
    } else {
      emailInput.classList.remove("border-green");
      emailAlert.classList.remove("hidden");
      isValid = false;
    }
  };
  const passwordBorder = (password: string) => {
    const pwInput = document.querySelector(".pw-input")! as HTMLElement;
    const passAlert = document.querySelector(".pass-alert")! as HTMLElement;

    if (password.length > 5) {
      pwInput.classList.add("border-green");
      passAlert.classList.add("hidden");
      isValid = true;
    } else {
      pwInput.classList.remove("border-green");
      passAlert.classList.remove("hidden");
      isValid = false;
    }
  };
  return (
    <>
      <div className="signUp-page h-full flex">
        <ImageBackground props={"Login"} />
        <div className="signUp-content w-full flex flex-col laptop:w-3/5">
          <div className="w-9/12 m-auto">
            <WelcomeContent content={"log you in"} />
            <div className="user-notFound mt-5 hidden">
              <Alert props="The use not found !" color="yellow" />
            </div>
            <div className="incorrect-pw mt-5 hidden">
              <Alert props="Incorrect Password !" color="red" />
            </div>
            <div className="email-alert mt-5 hidden">
              <Alert props="Enter valid Email Address" color="red" />
            </div>
            <div className="pass-alert mt-5 hidden">
              <Alert
                props="Password must be atleast 6 characters long"
                color="red"
              />
            </div>
            <div className="inputs mt-5">
              <form
                className="form-field flex flex-col"
                onSubmit={handleSubmit}
              >
                <input
                  className="email-input"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleChange}
                  required
                />

                <input
                  className="pw-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />

                <button
                  className="submit-button mt-5 pt-5 pb-5 w-1/1 bg-[#272727] text-white opacity-30 font-semibold text-xl not-italic tablet:w-2/6"
                  type="submit"
                >
                  LOGIN
                </button>
              </form>
            </div>
            <div className="mt-10">
              <Footer
                content={["Don't have an account ?", "/sign-up", "Sign-up"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogIn;
