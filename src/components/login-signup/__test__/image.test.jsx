import { render, screen } from "@testing-library/react";
import ImageBackground from "../image.component";

describe("render SignUp/LogIn", () => {
  it("render sign up", () => {
    render(<ImageBackground props={"Sign Up"} />);
    const headlingElement = screen.getByText(/Sign Up/);
    expect(headlingElement).toBeInTheDocument;
  });
  it("render log in", () => {
    render(<ImageBackground props={"Log In"} />);
    const headlingElement = screen.getByRole("heading");
    expect(headlingElement).toBeInTheDocument;
  });
});
