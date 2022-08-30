const CheckPassword = (
  password: string,
  pwInput: HTMLElement,
  passAlert: HTMLElement
) => {
  if (password.length > 5) {
    pwInput.classList.add("border-green");
    passAlert.classList.add("hidden");
    return true;
  } else {
    pwInput.classList.remove("border-green");
    passAlert.classList.remove("hidden");
    return false;
  }
};
export default CheckPassword;
