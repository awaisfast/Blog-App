import React, { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "../sign-up-form/sign-up-form.component.css";

import ImageBackground from "../login-signup/image.component";
import WelcomeContent from "../login-signup/welcome.component";
import Footer from "../login-signup/footer.component";

import Alert from "../alert/alert.component";
import { UserCredential } from "firebase/auth";
import CheckEmail from "../../utils/validation/email.validation.component";
import CheckPassword from "../../utils/validation/password.validation.component";
import CheckName from "../../utils/validation/name.validation.component";
import CheckConfirmPassword from "../../utils/validation/confirm-password.validation.component";
import CheckAllEnteries from "../../utils/validation/all-enteries.validation.component";

const SignUp = ({
  setLoaderIsOpen,
}: {
  setLoaderIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  type defaultForms = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const defaultFormFields: defaultForms = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  type Error = {
    code: string;
    message: string;
    name: string;
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;
  let isValid: boolean = false; //if all enteries are valid

  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const submitButton = document.querySelector(
      ".submit-button"
    )! as HTMLButtonElement;
    submitButton.disabled = true;
    submitButton.classList.add("opacity-30");
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        const cpwAlert = document.querySelector(".cpw-alert")! as HTMLElement;
        cpwAlert.classList.remove("hidden");
        return;
      }
      try {
        setLoaderIsOpen(true);
        const res: UserCredential | undefined =
          await createAuthUserWithEmailAndPassword(email, password, name);
        setLoaderIsOpen(false);

        if (res) {
          const { user } = res;
          const username = email.split("@")[0];
          setLoaderIsOpen(true);
          await createUserDocumentFromAuth(user, { name, username });
          setLoaderIsOpen(false);
          user ? navigate("/log-in") : navigate("/");
        }
      } catch (error: unknown) {
        setLoaderIsOpen(false);
        if ((error as Error).code === "auth/email-already-in-use") {
          const usedEmailAlert = document.querySelector(
            ".used-email"
          )! as HTMLElement;
          usedEmailAlert.classList.remove("hidden");
        }
      }
    }
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const usedEmailAlert = document.querySelector(
      ".used-email"
    )! as HTMLElement;
    usedEmailAlert.classList.add("hidden");
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });

    //to check on which input green borden needs to be implemented
    if (name === "name") {
      nameBorder(value);
    } else if (name === "password") {
      passwordBorder(value);
    } else if (name === "confirmPassword") {
      cnPasswordBorder(value, password);
    } else {
      emailBorder(value);
    }
    checkEnteries(); //checking if all enteries are valid
  };

  const checkEnteries = () => {
    if (name && email && password && confirmPassword) {
      const submitButton = document.querySelector(
        ".submit-button"
      )! as HTMLButtonElement;
      CheckAllEnteries(isValid, submitButton);
    }
  };
  const nameBorder = (name: string) => {
    const nameInput = document.querySelector(".name-input")! as HTMLElement;
    const nameAlert = document.querySelector(".name-alert")! as HTMLElement;
    isValid = CheckName(name, nameInput, nameAlert);
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
  const cnPasswordBorder = (cnPassword: string, password: string) => {
    const cpwInput = document.querySelector(".cpw-input")! as HTMLElement;
    const cpwAlert = document.querySelector(".cpw-alert")! as HTMLElement;
    isValid = CheckConfirmPassword(password, cnPassword, cpwInput, cpwAlert);
  };

  return (
    <>
      <div className="signUp-Page h-full flex">
        <ImageBackground props={"Sign Up"} />
        <div className="signUp-Content w-full flex flex-col laptop:w-3/5">
          <div className="w-10/12 m-auto laptop:w-9/12">
            <WelcomeContent content={"sign you up"} />
            <div className="inputs mt-8">
              <form
                className="form-field flex flex-col"
                onSubmit={handleSubmit}
              >
                <input
                  className="name-input"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={handleChange}
                  required
                />

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

                <input
                  className="cpw-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  className="submit-button font-lexend max-w-screen-sm mt-5 pt-5 pb-3 w-1/1 bg-darkgrey text-white opacity-30 font-semibold text-xl not-italic tablet:w-2/6 tablet:py-4"
                  type="submit"
                  disabled={true}
                >
                  SUBMIT
                </button>
              </form>
            </div>
            <div className="alerts mt-2 mb-12">
              <div className="name-alert hidden">
                <Alert props="Enter full name." />
              </div>
              <div className="email-alert hidden">
                <Alert props="Enter valid Email Address." />
              </div>
              <div className="pass-alert hidden">
                <Alert props="Password format incorrect." />
              </div>
              <div className="cpw-alert hidden">
                <Alert props="Passwords do not match." />
              </div>
              <div className="used-email hidden">
                <Alert props="Email already exists." />
              </div>
            </div>
            <div className="mt-5 font-lexend">
              <Footer
                msg={"Already have an account?"}
                to={"/log-in"}
                link={"Log-in"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
