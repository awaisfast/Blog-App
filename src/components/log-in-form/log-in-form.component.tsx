import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
import Alert from "../alert/alert.component";
import Footer from "../login-signup/footer.component";
import ImageBackground from "../login-signup/image.component";
import WelcomeContent from "../login-signup/welcome.component";
import CheckEmail from "../../utils/validation/email.validation.component";
import CheckPassword from "../../utils/validation/password.validation.component";
import CheckAllEnteries from "../../utils/validation/all-enteries.validation.component";
import { User, UserCredential } from "firebase/auth";
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
    const submitButton = document.querySelector(
      ".submit-button"
    )! as HTMLButtonElement;
    submitButton.disabled = true;
    submitButton.classList.add("opacity-30");
    try {
      const res: UserCredential | undefined =
        await signInAuthUserWithEmailAndPassword(email, password);
      const { user }: any = res;
      setCurrentUser(user);
      setFormFields(defaultFormFields);
      window.localStorage.setItem("isLoggedIn", "true");
      window.localStorage.setItem("userContext", JSON.stringify(user));
      user ? navigate("/") : navigate("/log-in");
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          const incorrect = document.querySelector(
            ".incorrect-pw"
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
      )! as HTMLButtonElement;
      CheckAllEnteries(isValid, submitButton);
    }
  };
  const emailBorder = (email: string) => {
    const emailInput = document.querySelector(".email-input")! as HTMLElement;
    const emailAlert = document.querySelector(".email-alert")! as HTMLElement;
    isValid = CheckEmail(email, emailInput, emailAlert);
  };
  const passwordBorder = (password: string) => {
    const passInput = document.querySelector(".pw-input")! as HTMLElement;
    const passAlert = document.querySelector(".pass-alert")! as HTMLElement;
    isValid = CheckPassword(password, passInput, passAlert);
  };
  return (
    <>
      <div className="signUp-page h-full flex">
        <ImageBackground props={"Login"} />
        <div className="signUp-content w-full flex flex-col laptop:w-3/5">
          <div className="w-9/12 m-auto">
            <WelcomeContent content={"log you in"} />

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
                  className="submit-button mt-5 pt-5 pb-5 w-1/1 bg-darkgrey text-white opacity-30 font-semibold text-xl not-italic tablet:w-2/6"
                  type="submit"
                  disabled={true}
                >
                  LOGIN
                </button>
              </form>
            </div>
            <div className="mt-10">
              <Footer
                msg={"Don't have an account?"}
                to={"/sign-up"}
                link={"Sign-up"}
              />
            </div>
            <div className="alerts mt-3">
              <div className="user-notFound hidden">
                <Alert props="Email or password are incorrect." />
              </div>
              <div className="incorrect-pw hidden">
                <Alert props="Email or password are incorrect." />
              </div>
              <div className="email-alert hidden">
                <Alert props="Enter valid Email Address." />
              </div>
              <div className="pass-alert hidden">
                <Alert props="Password must be atleast 6 characters long." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogIn;
