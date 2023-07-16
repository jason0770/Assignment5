import React from "react";
import "./About.css";
import Intro from "../Intro/Intro";
import Project from "../Project/Project"

export default function About() {
  return (
    <main className="about-page-main">
      <Intro />
      <Project />
    </main>
  );
}
