const CheckConfirmPassword = (
  password: string,
  cnPassword: string,
  cpwInput: HTMLElement,
  cpwAlert: HTMLElement
) => {
  if (cnPassword === password) {
    cpwInput.classList.add("border-green");
    cpwAlert.classList.add("hidden");
    return true;
  } else {
    cpwInput.classList.remove("border-green");
    cpwAlert.classList.remove("hidden");
    return false;
  }
};
export default CheckConfirmPassword;
