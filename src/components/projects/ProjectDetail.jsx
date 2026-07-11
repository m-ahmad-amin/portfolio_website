import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProjectPreviewGallery from "./ProjectPreviewGallery";

function parseFeature(feature) {
  const separatorIndex = feature.indexOf(":");

  if (separatorIndex === -1) {
    return { title: feature, description: "" };
  }

  return {
    title: feature.slice(0, separatorIndex).trim(),
    description: feature.slice(separatorIndex + 1).trim(),
  };
}

export default function ProjectDetail({ project }) {
  return (
    <div className="w-full flex justify-center py-6 md:py-8">
      <div className="flex w-[92%] max-w-6xl flex-col gap-6">
        <Link
          to="/projects"
          className="inline-flex w-fit items-center gap-2 text-sm font-poppins text-white/70 transition hover:text-[#00f0ff]"
        >
          <FaArrowLeft size={12} /> Back to Projects
        </Link>

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#161b22]">
          <div className="relative h-40 md:h-56 overflow-hidden">
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/60 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <p className="text-[#00f0ff] text-xs font-poppins font-semibold uppercase tracking-[0.2em] mb-2">
                Project
              </p>
              <h1 className="text-white text-2xl md:text-4xl font-poppins font-black">
                {project.title}
              </h1>
              <p className="text-white/75 text-sm md:text-base font-poppins mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 p-5 md:p-8">
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#00f0ff] px-5 py-2.5 text-sm font-poppins font-semibold text-[#0D1117] transition hover:bg-[#00f0ff]/90"
                >
                  <FaExternalLinkAlt size={14} /> View Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-poppins font-semibold text-white transition hover:border-[#00f0ff] hover:text-[#00f0ff]"
                >
                  <FaGithub size={14} /> Source Code
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="flex flex-col gap-8">
                <section>
                  <h2 className="text-white text-lg font-poppins font-bold mb-3">
                    About This Project
                  </h2>
                  <p className="text-white/80 text-sm md:text-base font-poppins leading-relaxed">
                    {project.description}
                  </p>
                </section>

                {project.previewImages?.length > 0 && (
                  <section>
                    <h2 className="text-white text-lg font-poppins font-bold mb-4">
                      Project Gallery
                    </h2>
                    <ProjectPreviewGallery
                      images={project.previewImages}
                      projectTitle={project.title}
                    />
                  </section>
                )}
              </div>

              <aside className="flex flex-col gap-6">
                <section className="rounded-xl border border-white/10 bg-[#0D1117] p-5">
                  <h3 className="text-white text-sm font-poppins font-bold uppercase tracking-wide mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-poppins text-white/90 bg-[#222] border border-white/15 rounded-full px-3 py-1.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {project.features?.length > 0 && (
                  <section className="rounded-xl border border-white/10 bg-[#0D1117] p-5">
                    <h3 className="text-white text-sm font-poppins font-bold uppercase tracking-wide mb-4">
                      Key Features
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {project.features.map((feature) => {
                        const { title, description } = parseFeature(feature);

                        return (
                          <li key={feature} className="flex gap-3">
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f0ff]/15 text-[#00f0ff] text-xs font-bold">
                              ✓
                            </span>
                            <div>
                              <p className="text-white text-sm font-poppins font-semibold">
                                {title}
                              </p>
                              {description && (
                                <p className="text-white/60 text-xs font-poppins mt-1 leading-relaxed">
                                  {description}
                                </p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
