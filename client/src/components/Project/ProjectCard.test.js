import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

test("ProjectCard UI Test1: Props Test", () => {
  render(
    <ProjectCard
      title={"Project 4: Photomanager"}
      description={`Some text`}
      technologies={"Technology 4"}
      link={"URL"}
      linkType={"Demo"}
    />
  );

  //Source: https://chat.openai.com/share/7def1ba4-e6f4-4e1a-b52f-b8f8667f16e0
  const headings = screen.getAllByRole("heading", { level: 2 });
  expect(headings.length).toBe(1);

  const heading1 = screen.getByText("Project 4", { exact: false });
  expect(heading1).toBeInTheDocument();

  const descriptions = screen.getAllByText("Description");
  expect(descriptions.length).toBe(1);

  const technologies = screen.getAllByText("Technologies");
  expect(technologies.length).toBe(1);

  const links = screen.getAllByText("Links");
  expect(links.length).toBe(1);
});
