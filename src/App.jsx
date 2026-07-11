import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NavBar from "./components/NavBar.jsx";

export default function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}