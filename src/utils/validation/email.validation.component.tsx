const CheckEmail = (
  email: string,
  emailInput: HTMLElement,
  emailAlert: HTMLElement
) => {
  if (email.includes("@") && email.includes(".com")) {
    emailInput.classList.add("border-green");
    emailAlert.classList.add("hidden");
    // emailAlert.classList.add("invisible");

    return true;
  } else {
    emailInput.classList.remove("border-green");
    emailAlert.classList.remove("hidden");
    // emailAlert.classList.remove("invisible");
    return false;
  }
};
export default CheckEmail;
