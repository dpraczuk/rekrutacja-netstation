import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navigation } from "./Navigation";

test("renders navigation component", () => {
  render(<Navigation />);
  const navigationListItems = screen.getAllByTestId("navigationListItem");
  expect(navigationListItems).toHaveLength(5);
});
