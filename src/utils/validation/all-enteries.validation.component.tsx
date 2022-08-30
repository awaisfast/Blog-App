const CheckAllEnteries = (
  isValid: boolean,
  submitButton: HTMLButtonElement
) => {
  if (isValid) {
    submitButton.classList.remove("opacity-30");
    submitButton.disabled = false;
  } else {
    submitButton.classList.add("opacity-30");
    submitButton.disabled = true;
  }
};
export default CheckAllEnteries;
