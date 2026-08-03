import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProjectPreviewGallery from "../projects/ProjectPreviewGallery";

export default function ExperienceDetail({ experience }) {
  return (
    <div className="w-full flex justify-center py-6 md:py-8">
      <div className="flex w-[92%] max-w-6xl flex-col gap-6">
        <Link
          to="/projects"
          className="inline-flex w-fit items-center gap-2 text-sm font-poppins text-white/70 transition hover:text-[#00f0ff]"
        >
          <FaArrowLeft size={12} /> Back to Experience & Projects
        </Link>

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#161b22]">
          <div className="relative h-40 md:h-56 overflow-hidden">
            <img
              src={experience.coverImage}
              alt={`${experience.title} cover`}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/60 to-transparent" />

            {experience.tag && (
              <span className="absolute left-5 top-5 md:left-8 md:top-8 rounded-full bg-[#0D1117]/85 px-3 py-1 text-[11px] font-poppins font-semibold text-[#00f0ff] border border-[#00f0ff]/40 backdrop-blur-sm">
                {experience.tag}
              </span>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              {/* <p className="text-[#00f0ff] text-xs font-poppins font-semibold uppercase tracking-[0.2em] mb-2">
                Experience
              </p> */}
              <h1 className="text-white text-2xl md:text-4xl font-poppins font-black">
                {experience.title}
              </h1>
              {experience.company && (
                <p className="text-[#00f0ff]/90 text-sm md:text-base font-poppins font-semibold mt-1">
                  {experience.company}
                </p>
              )}
              <p className="text-white/75 text-sm md:text-base font-poppins mt-1">
                {experience.subtitle}
              </p>
              {experience.date && (
                <p className="text-white/50 text-xs md:text-sm font-poppins mt-2">
                  {experience.date}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 p-5 md:p-8">
            {(experience.liveUrl || experience.githubUrl) && (
              <div className="flex flex-wrap gap-3">
                {experience.liveUrl && (
                  <a
                    href={experience.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#00f0ff] px-5 py-2.5 text-sm font-poppins font-semibold text-[#0D1117] transition hover:bg-[#00f0ff]/90"
                  >
                    <FaExternalLinkAlt size={14} /> View Live Site
                  </a>
                )}
                {experience.githubUrl && (
                  <a
                    href={experience.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-poppins font-semibold text-white transition hover:border-[#00f0ff] hover:text-[#00f0ff]"
                  >
                    <FaGithub size={14} /> Source Code
                  </a>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="flex flex-col gap-8">
                <section>
                  <h2 className="text-white text-lg font-poppins font-bold mb-3">
                    About This Role
                  </h2>
                  <p className="text-white/80 text-sm md:text-base font-poppins leading-relaxed">
                    {experience.description}
                  </p>
                </section>

                {experience.previewImages?.length > 0 && (
                  <section>
                    <h2 className="text-white text-lg font-poppins font-bold mb-4">
                      Gallery
                    </h2>
                    <ProjectPreviewGallery
                      images={experience.previewImages}
                      projectTitle={experience.title}
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
                    {experience.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-poppins text-white/90 bg-[#222] border border-white/15 rounded-full px-3 py-1.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {experience.bullets?.length > 0 && (
                  <section className="rounded-xl border border-white/10 bg-[#0D1117] p-5">
                    <h3 className="text-white text-sm font-poppins font-bold uppercase tracking-wide mb-4">
                      What I Did
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f0ff]/15 text-[#00f0ff] text-xs font-bold">
                            ✓
                          </span>
                          <p className="text-white text-sm font-poppins leading-relaxed">
                            {bullet}
                          </p>
                        </li>
                      ))}
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
