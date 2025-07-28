import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
  return (
    <>
    <div className="flex justify-evenly p-3 md:gap-[20%]">
      <div className="px-8 md:px-0 font-poppins flex justify-center gap-[10%] w-[100%] md:w-[30%]">
        <button
        className={currentPath === "/" ? "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-[#00f0ff] text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-[100%] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]" : "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-white text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-0 after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]"}
         onClick={() => {
            navigate("/")
        }}>Home</button>

        <button
        className={currentPath === "/skills" ? "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-[#00f0ff] text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-[100%] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]" : "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-white text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-0 after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]"}
         onClick={() => {
            navigate("/skills")
        }}>Skills</button>

        <button
        className={currentPath === "/projects" ? "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-[#00f0ff] text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-[100%] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]" : "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-white text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-0 after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]"}
         onClick={() => {
            navigate("/projects")
        }}>Projects</button>

        <button
        className={currentPath === "/contact" ? "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-[#00f0ff] text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-[100%] after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]" : "relative after:transition-[width] after:duration-[400ms] after:ease-in-out text-white text-md sm:text-lg font-extrabold after:content-[''] after:bg-[#00f0ff] after:w-0 after:absolute after:left-0 after:bottom-[-3px] after:h-[2px]"}
         onClick={() => {
            navigate("/contact")
        }}>Contact</button>
      </div>
      <div>
        <h1 className="text-white text-2xl font-black font-poppins hidden md:block">Portfolio</h1>
      </div>
      </div>
    </>
  );
}
