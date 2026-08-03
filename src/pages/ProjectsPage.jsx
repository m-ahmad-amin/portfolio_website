import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExperienceGallery from "../components/experience/ExperienceGallery";
import ProjectsGallery from "../components/projects/ProjectsGallery";
import { experiences } from "../utils/experienceUtils";
import { projects } from "../utils/projectUtils";

export default function ProjectsPage() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const timeOut = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timeOut);
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-700 ease-out transform ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="w-full flex justify-center py-6 md:py-8">
        <div className="flex w-[92%] max-w-5xl flex-col gap-12">
          <section className="flex flex-col gap-5">
            <div>
              <p className="text-[#00f0ff] text-xs font-poppins font-semibold uppercase tracking-[0.2em] mb-2">
                Career
              </p>
              <h1 className="text-white text-2xl md:text-3xl font-poppins font-black">
                Experience
              </h1>
              <p className="text-white/60 text-sm font-poppins mt-1">
                Roles, research, and work I have been part of.
              </p>
            </div>
            <ExperienceGallery experiences={experiences} />
          </section>

          <section className="flex flex-col gap-5">
            <div>
              <p className="text-[#00f0ff] text-xs font-poppins font-semibold uppercase tracking-[0.2em] mb-2">
                Build
              </p>
              <h1 className="text-white text-2xl md:text-3xl font-poppins font-black">
                Projects
              </h1>
              <p className="text-white/60 text-sm font-poppins mt-1">
                Products and experiments I have designed and shipped.
              </p>
            </div>
            <ProjectsGallery projects={projects} />
          </section>
        </div>
      </div>
    </div>
  );
}
