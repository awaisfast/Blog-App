import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogIn from "../log-in-form.component";

const MockLogIn = () => {
  return (
    <BrowserRouter>
      <LogIn setLoaderIsOpen={() => {}} />
    </BrowserRouter>
  );
};

describe("Log-In Input Fields", () => {
  it("email-input", () => {
    render(<MockLogIn />);
    const nameInputElement = screen.getByTestId("email-input");
    fireEvent.change(nameInputElement, {
      target: { value: "awais@gmail.com" },
    });
    expect(nameInputElement.value).toBe("awais@gmail.com");
  });
  it("pw-input", () => {
    render(<MockLogIn />);
    const nameInputElement = screen.getByTestId("pw-input");
    fireEvent.change(nameInputElement, {
      target: { value: "121212" },
    });
    expect(nameInputElement.value).toBe("121212");
  });
});
