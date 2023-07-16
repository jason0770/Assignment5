import React from "react";
import "./Project.css";
import ProjectCard from "./ProjectCard";
export default function Project() {
  return (
      <section className="project-section">
        <ProjectCard
          title={"Project 1: Photomanager"}
          description={`An app written with object orient programming - Swift - and it is
            for users who enjoy taking photos. With the app, they can store
            thousands of photos organized by two-layered folders. They can
            easily find the image by searching the image’s hashtags. Users can
            see all the image’s property. They can back up their photos by
            uploading their photo to a server and downloading the image.`}
          technologies={"Swift"}
          link={"https://youtu.be/phHhf-6hvXk"}
          linkType={"Demo"}
        />

        <ProjectCard
          title={"Project 2: A Random Counting Grid Game"}
          description={`In this game, the numbers will be randomly distributed on a grid.
            It enables users to click numbers in order on the grid. The game
            will allocate the time the user has to finish clicking all the
            numbers on the grid.`}
          technologies={"HTML, CSS, JavaScript, Sass"}
          link={"https://github.com/jason0770/simple-game/tree/main"}
          linkType={"Code"}
        />

        <ProjectCard
          title={"Project 3: Group Project- Conversation and Schedule-sharing App"}
          description={`The app can provide scheduling features which allows users to
            check the schedule of themselves, their colleagues, their group
            members, and their friends and family through a database! It also
            enables the user to check the chat channels and specific chat
            history, uploaded images, files, and videos.`}
          technologies={"Java, Oracle SQL Database"}
          link={"#"}
          linkType={"-"}
        />
      </section>
  );
}
