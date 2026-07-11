import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import ProjectDetail from "../components/projects/ProjectDetail";
import { getProjectById } from "../utils/projectUtils";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const project = getProjectById(projectId);

  useEffect(() => {
    setMounted(false);
    const timeOut = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timeOut);
  }, [location.pathname]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div
      className={`transition-all duration-700 ease-out transform ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <ProjectDetail project={project} />
    </div>
  );
}
