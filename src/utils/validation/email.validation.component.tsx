const CheckEmail = (
  email: string,
  emailInput: HTMLElement,
  emailAlert: HTMLElement
) => {
  if (email.includes("@") && email.includes(".com")) {
    emailInput.classList.add("border-green");
    emailAlert.classList.add("hidden");
    return true;
  } else {
    emailInput.classList.remove("border-green");
    emailAlert.classList.remove("hidden");
    return false;
  }
};
export default CheckEmail;
