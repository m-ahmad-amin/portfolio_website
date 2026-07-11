import ProjectCard from "./ProjectCard";

export default function ProjectsGallery({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
