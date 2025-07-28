import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import HomePageD from "./../assets/images/HomePageD.png"
import HomePageM from "./../assets/images/HomePageM.png"
import LoginPageM from "./../assets/images/LoginPageM.png"
import ProfilePageD from "./../assets/images/ProfilePageD.png"
import UploadPostM from "./../assets/images/UploadPostM.png"
import UploadPostD from "./../assets/images/UploadPostD.png"

export default function ProjectsPage() {
  return (
    <>
      <div className="w-[100%] flex justify-center py-2">
        <div className="flex flex-col gap-4 w-[95%] rounded-lg p-2">
          <h1 className="text-white text-2xl font-poppins font-black underline underline-offset-8">
            Linracy - Social Media Platform
          </h1>
          <div className="self-center">
            <div className="flex gap-10">
            <a
              href="https://linracy.netlify.app/"
              target="_blank"
              className="flex items-center gap-2 text-[#cbd5e1] transition-all duration-300 ease-in-out hover:underline"
            >
              <FaExternalLinkAlt /> Live Site
            </a>
            <a
              href="https://github.com/m-ahmad-amin/linracy"
              target="_blank"
              className="flex items-center gap-2 text-[#cbd5e1] transition-all duration-300 ease-in-out hover:underline"
            >
              <FaGithub /> GitHub Repo
            </a>
            </div>

            <br></br>

            <h2 className="text-white text-xl font-poppins font-bold">
              Tech Stack
            </h2>
            <h3 className="text-white text-sm font-poppins">
              React.js • Node.js • Express.js • MongoDB • MERN Stack • JavaScript
            </h3>


            <br></br>


            <h2 className="text-white text-xl font-poppins font-bold">
              Description
            </h2>
            <h3 className="text-white text-sm font-poppins">
              Linracy is a Full Stack social media website designed with a focus
              on clean UI and seamless user experience. It allows users to sign
              up, create and manage their profiles, and explore other users,
              along with uploading and browsing photos — all within a responsive
              and sleek interface. The project demonstrates core concepts of
              full-stack development using the MERN stack.
            </h3>

            <br></br>

            <h2 className="text-white text-xl font-poppins font-bold">
              Preview
            </h2>
            <div className="flex flex-wrap gap-[2%]">
                <img
                src={UploadPostD}
                className="w-[49%]"
                >
                </img>
                <img
                src={HomePageD}
                className="w-[49%]"
                >
                </img>
                <img
                src={ProfilePageD}
                className="w-[49%]"
                >
                </img>
                <img
                src={UploadPostM}
                className="w-[15%]"
                >
                </img>
                <img
                src={HomePageM}
                className="w-[15%]"
                >
                </img>
                <img
                src={LoginPageM}
                className="w-[15%]"
                >
                </img>
            </div>


            <br></br>


            <h2 className="text-white text-xl font-poppins font-bold">
              Key Features
            </h2>
            <ul className="text-white text-sm font-poppins list-disc ml-4">
              <li>User Authentication: Secure registration and login system</li>
              <li>Photo Uploads: Users can upload and display images</li>
              <li>
                Profile Management: Personalized profile pages with dynamic data
              </li>
              <li>Explore Users: Discover and view other user profiles</li>
              <li>
                Responsive UI: Responsive across mobile, tablet, and desktop
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
