import { render, screen } from "@testing-library/react";
import Button from "../components/Button/Button";

test("renders button", () => {
  render(<Button text="Button" />);
  const button = screen.getByText(/Button/i);
  expect(button).toBeInTheDocument();
});

test("renders correct text", () => {
  render(<Button text="Button" />);
  const button = screen.getByText(/Button/i);
  const incorrectButtonTest = () => screen.getByText(/IncorrectText/i);
  expect(incorrectButtonTest).toThrow();
  expect(button).toBeInTheDocument();
});
