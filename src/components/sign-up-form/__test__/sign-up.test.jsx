import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../sign-up-form.component";

const MockSignUp = () => {
  return (
    <BrowserRouter>
      <SignUp setLoaderIsOpen={() => {}} />
    </BrowserRouter>
  );
};

describe("Sign-Up Input Fields", () => {
  it("name-input", () => {
    render(<MockSignUp />);
    const nameInputElement = screen.getByTestId("name-input");
    fireEvent.change(nameInputElement, {
      target: { value: "Awais Ali" },
    });
    expect(nameInputElement.value).toBe("Awais Ali");
  });
  it("email-input", () => {
    render(<MockSignUp />);
    const nameInputElement = screen.getByTestId("email-input");
    fireEvent.change(nameInputElement, {
      target: { value: "awais@gmail.com" },
    });
    expect(nameInputElement.value).toBe("awais@gmail.com");
  });
  it("pw-input", () => {
    render(<MockSignUp />);
    const nameInputElement = screen.getByTestId("pw-input");
    fireEvent.change(nameInputElement, {
      target: { value: "121212" },
    });
    expect(nameInputElement.value).toBe("121212");
  });
  it("cpw-input", () => {
    render(<MockSignUp />);
    const nameInputElement = screen.getByTestId("cpw-input");
    fireEvent.change(nameInputElement, {
      target: { value: "121212" },
    });
    expect(nameInputElement.value).toBe("121212");
  });
});
