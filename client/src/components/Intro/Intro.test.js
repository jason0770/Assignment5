import { render, screen } from "@testing-library/react";
import Intro from "./Intro";

test("Intro UI Test1: Check visible texts", () => {
  render(<Intro />);

  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const introTitle = screen.getByRole("heading", { name: /Intro/i });
  expect(introTitle).toBeInTheDocument();

  //Source: https://chat.openai.com/share/891f42fb-85ab-4857-a80c-b2fb7ff45314
  const introParagraph = screen.getByText(
    /\bJason\b.*\bComputer Science\b|\bComputer Science\b.*\bJason\b/i
  );
  expect(introParagraph).toBeInTheDocument();
});
