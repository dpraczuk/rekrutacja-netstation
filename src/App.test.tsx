import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders navigation component", () => {
  render(<App />);
  const navigationComponent = screen.getByTestId("navigation");
  expect(navigationComponent).toBeInTheDocument();
});
