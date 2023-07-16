import React from 'react'

export default function ProjectCard(props) {
    return (
        <>
            <h3 className="project-section__title">{props.title}</h3>
            <section className="project-section__content">
                <div className="project-section__description-section">
                    <h3 className="project-section__description-title">Description</h3>
                    <p className="project-section__description">{props.description}</p>
                </div>
                <div className="project-section__extra-info">
                    <div className="project-section__technologies-section">
                    <h3 className="project-section__technologies-title">Technologies</h3>
                    <p className="project-section__technologies">{props.technologies}</p>
                    </div>
                    <div className="project-section__link-section">
                    <h3 className="project-section__link-title">Links</h3>
                    <a
                        className="project-section__link"
                        href={props.link}
                    >
                        {props.linkType} Link
                    </a>
                    </div>
                </div>
            </section>
        </>
    )
}
