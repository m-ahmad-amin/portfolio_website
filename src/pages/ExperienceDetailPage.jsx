import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import ExperienceDetail from "../components/experience/ExperienceDetail";
import { getExperienceById } from "../utils/experienceUtils";

export default function ExperienceDetailPage() {
  const { experienceId } = useParams();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const experience = getExperienceById(experienceId);

  useEffect(() => {
    setMounted(false);
    const timeOut = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timeOut);
  }, [location.pathname]);

  if (!experience) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div
      className={`transition-all duration-700 ease-out transform ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <ExperienceDetail experience={experience} />
    </div>
  );
}
