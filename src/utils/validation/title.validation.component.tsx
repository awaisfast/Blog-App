const CheckEntry = (title: string, titleInput: HTMLElement) => {
  if (title.length > 0) {
    titleInput.classList.add("border-green");
    return true;
  } else {
    titleInput.classList.remove("border-green");
    return false;
  }
};
export default CheckEntry;
