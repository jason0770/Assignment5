import { render, screen } from "@testing-library/react";
import Project from "./Project";

test("Project UI Test1: Rendering Test", () => {
  render(<Project />);

  //Source: https://chat.openai.com/share/7def1ba4-e6f4-4e1a-b52f-b8f8667f16e0
  const headings = screen.getAllByRole("heading", { level: 2 });
  expect(headings.length).toBe(3);

  const heading1 = screen.getByText("Project 1", { exact: false });
  expect(heading1).toBeInTheDocument();

  const heading2 = screen.getByText("Project 2", { exact: false });
  expect(heading2).toBeInTheDocument();

  const heading3 = screen.getByText("Project 3", { exact: false });
  expect(heading3).toBeInTheDocument();

  const descriptions = screen.getAllByText("Description");
  expect(descriptions.length).toBe(3);

  const technologies = screen.getAllByText("Technologies");
  expect(technologies.length).toBe(3);

  const links = screen.getAllByText("Links");
  expect(links.length).toBe(3);
});

test("Project UI Test2: Link Test", () => {
  render(
    // Source: https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the
    <Project />
  );

  const links = screen.getAllByText("Links");
  expect(links.length).toBe(3);

  const link1 = screen.getByText("Demo Link").closest("a");
  expect(link1).toHaveAttribute("href", "https://youtu.be/phHhf-6hvXk");

  const link2 = screen.getByText("Code Link").closest("a");
  expect(link2).toHaveAttribute(
    "href",
    "https://github.com/jason0770/simple-game/tree/main"
  );

  const link3 = screen.getByText("- Link").closest("a");
  expect(link3).toHaveAttribute("href", "#");
});
