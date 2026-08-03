import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function ExperienceCard({ experience }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#161b22] transition-colors duration-300 hover:border-[#00f0ff]/40">
      <div className="relative aspect-video overflow-hidden bg-[#222]">
        <img
          src={experience.coverImage}
          alt={`${experience.title} preview`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {experience.tag && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#0D1117]/85 px-3 py-1 text-[11px] font-poppins font-semibold text-[#00f0ff] border border-[#00f0ff]/40 backdrop-blur-sm">
            {experience.tag}
          </span>
        )}

        <div className="absolute inset-0 hidden md:flex items-center justify-center gap-3 bg-black/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          {experience.liveUrl && (
            <a
              href={experience.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#00f0ff] px-4 py-2 text-xs font-poppins font-semibold text-[#0D1117] transition hover:bg-[#00f0ff]/90"
            >
              <FaExternalLinkAlt size={11} /> Live Site
            </a>
          )}

          {experience.githubUrl && (
            <a
              href={experience.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-poppins font-semibold text-white transition hover:border-[#00f0ff] hover:text-[#00f0ff]"
            >
              <FaGithub size={11} /> GitHub
            </a>
          )}

          <Link
            to={`/experience/${experience.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-poppins font-semibold text-white transition hover:border-[#00f0ff] hover:text-[#00f0ff]"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2 md:hidden">
          {experience.liveUrl && (
            <a
              href={experience.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#00f0ff] px-3 py-1.5 text-[11px] font-poppins font-semibold text-[#0D1117]"
            >
              <FaExternalLinkAlt size={10} /> Live
            </a>
          )}
          {experience.githubUrl && (
            <a
              href={experience.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-[11px] font-poppins font-semibold text-white"
            >
              <FaGithub size={10} /> GitHub
            </a>
          )}
          <Link
            to={`/experience/${experience.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-[11px] font-poppins font-semibold text-white"
          >
            Details
          </Link>
        </div>

        <div>
          <h2 className="text-white text-lg font-poppins font-bold group-hover:text-[#00f0ff] transition-colors">
            {experience.title}
          </h2>
          {experience.company && (
            <p className="text-[#00f0ff]/80 text-sm font-poppins font-medium">
              {experience.company}
            </p>
          )}
          <p className="text-white/60 text-sm font-poppins">{experience.subtitle}</p>
          {experience.date && (
            <p className="text-white/45 text-xs font-poppins mt-1">{experience.date}</p>
          )}
        </div>

        <p className="text-white/75 text-sm font-poppins leading-relaxed line-clamp-3 flex-1">
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {experience.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-[#0D1117] px-2.5 py-1 text-[11px] font-poppins text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
