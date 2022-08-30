const CheckName = (
  name: string,
  nameInput: HTMLElement,
  nameAlert: HTMLElement
) => {
  if (name.length > 0) {
    nameInput.classList.add("border-green");
    nameAlert.classList.add("hidden");
    return true;
  } else {
    nameInput.classList.remove("border-green");
    nameAlert.classList.remove("hidden");
    return false;
  }
};
export default CheckName;
