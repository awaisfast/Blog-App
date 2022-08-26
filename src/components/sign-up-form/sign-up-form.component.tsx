import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import "./sign-up-form.component.css";
import ImageBackground from "../login-signup/image.component";
import WelcomeContent from "../login-signup/welcome.component";
import Footer from "../login-signup/footer.component";

import Alert from "../alert/alert.component";

const SignUp = () => {
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

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;
  let isValid: boolean = false; //if all enteries are valid
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        const cpwAlert = document.querySelector(".cpwAlert")! as HTMLElement;
        cpwAlert.classList.remove("hidden");
        return;
      }
      try {
        const response = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        response ? navigate("/Log-in") : navigate("/");
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          const usedEmailAlert = document.querySelector(
            ".usedEmail"
          )! as HTMLElement;

          usedEmailAlert.classList.remove("hidden");
        }
      }
    }
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
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
        ".submitButton"
      )! as HTMLElement;
      if (isValid) {
        submitButton.classList.remove("opacity-30");
      } else {
        submitButton.classList.add("opacity-30");
      }
    }
  };
  const nameBorder = (name: string) => {
    const nameInput = document.querySelector(".name-input")! as HTMLElement;
    const nameAlert = document.querySelector(".nameAlert")! as HTMLElement;
    if (name.length > 0) {
      nameInput.classList.add("border-green");
      nameAlert.classList.add("hidden");
      isValid = true;
    } else {
      nameInput.classList.remove("border-green");
      nameAlert.classList.remove("hidden");
      isValid = false;
    }
  };
  const emailBorder = (email: string) => {
    const emailInput = document.querySelector(".email-input")! as HTMLElement;
    const emailAlert = document.querySelector(".emailAlert")! as HTMLElement;

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
    const passAlert = document.querySelector(".passAlert")! as HTMLElement;
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
  const cnPasswordBorder = (cnPassword: string, password: string) => {
    const cpwInput = document.querySelector(".cpw-input")! as HTMLElement;
    const cpwAlert = document.querySelector(".cpwAlert")! as HTMLElement;
    if (cnPassword === password) {
      cpwInput.classList.add("border-green");
      cpwAlert.classList.add("hidden");
      isValid = true;
    } else {
      cpwInput.classList.remove("border-green");
      cpwAlert.classList.remove("hidden");
      isValid = false;
    }
  };

  return (
    <>
      <div className="signUp-Page h-full flex">
        <ImageBackground props={"Sign Up"} />
        <div className="signUp-Content w-full flex flex-col laptop:w-3/5">
          <div className="w-9/12 m-auto">
            <WelcomeContent content={"sign you up"} />
            <div className="nameAlert mt-5 hidden">
              <Alert props="Enter full name" color="yellow" />
            </div>
            <div className="emailAlert mt-5 hidden">
              <Alert props="Enter valid Email Address" color="red" />
            </div>
            <div className="passAlert mt-5 hidden">
              <Alert props="Password must be 6 characters long" color="red" />
            </div>
            <div className="cpwAlert mt-5 hidden">
              <Alert props="Passwords donot match" color="red" />
            </div>
            <div className="usedEmail mt-5 hidden">
              <Alert props="Email already in use" color="yellow" />
            </div>
            <div className="inputs mt-5">
              <form className="formField flex flex-col" onSubmit={handleSubmit}>
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
                  className="submitButton mt-5 pt-5 pb-5 w-1/1 bg-[#272727] text-white opacity-30 font-semibold text-xl not-italic tablet:w-2/6"
                  type="submit"
                >
                  SUBMIT
                </button>
              </form>
            </div>
            <div className="mt-10">
              <Footer
                content={["Already have an account ?", "/Log-in", "log-in"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
