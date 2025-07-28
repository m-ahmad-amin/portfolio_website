import { FaCss3, FaJava } from "react-icons/fa";
import { SiCss3, SiExpress, SiHtml5, SiJavascript, SiMongodb, SiMongoose, SiMysql, SiNodedotjs, SiReact, SiTypescript } from "react-icons/si";

export default function SkillsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] py-5">
      {/* <div className="w-[90%]">
        {/* Skills Heading /*}
        <h1 className="text-white text-xl font-bold font-poppins">Skills</h1>
      </div> */}

      {/* Main Container */}
      <div className="w-[90%] flex flex-wrap gap-[2%] justify-center items-center">
        {/* Programming Languages */}
        <div className="w-[100%] md:w-[40%] border border-white rounded-lg mt-3 p-2 flex flex-col gap-4">
          {/* Heading */}
          <h2 className="text-white text-lg font-semibold font-poppins">
            Programming Languages
          </h2>

          <div className="flex justify-center items-center gap-3">
            {/* Java */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <img
                src="https://www.vectorlogo.zone/logos/java/java-icon.svg"
                alt="Java Logo"
                className="h-[3.75rem] w-[3.75rem]"
                >
                </img>
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">Java</h3>
            </div>

            {/* JavaScript */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#F7DF1E] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiJavascript />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">
                JavaScript
              </h3>
            </div>
          </div>
        </div>

        {/* Frontend Development */}
        <div className="w-[100%] md:w-[40%] border border-white rounded-lg mt-3 p-2 flex flex-col gap-4">
          {/* Heading */}
          <h2 className="text-white text-lg font-semibold font-poppins">
            Frontend Development
          </h2>

          <div className="flex justify-center items-center gap-3">
            {/* HTML */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#E34F26] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiHtml5 />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">HTML</h3>
            </div>

            {/* CSS */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#663399] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <img
                src="https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg"
                alt="CSS Logo"
                className="h-[3.75rem] w-[3.75rem]"
                >
                </img>
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">CSS</h3>
            </div>

            {/* JavaScript */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#F7DF1E] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiJavascript />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">
                JavaScript
              </h3>
            </div>

            {/* React.js */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#61DAFB] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiReact />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">
                React.js
              </h3>
            </div>
          </div>
        </div>

        {/* Backend Development */}
        <div className="w-[100%] md:w-[40%] border border-white rounded-lg mt-3 p-2 flex flex-col gap-4">
          {/* Heading */}
          <h2 className="text-white text-lg font-semibold font-poppins">
            Backend Development
          </h2>

          <div className="flex justify-center items-center gap-3">
            {/* Node.js */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#339933] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiNodedotjs />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">Node.js</h3>
            </div>

            {/* Express.js */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#fff] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiExpress />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">
                Express.js
              </h3>
            </div>

            {/* TypeScript */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#3178C6] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiTypescript />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">
                TypeScript
              </h3>
            </div>
          </div>
        </div>

        {/* App Development */}
        <div className="w-[100%] md:w-[40%] border border-white rounded-lg mt-3 p-2 flex flex-col gap-4">
          {/* Heading */}
          <h2 className="text-white text-lg font-semibold font-poppins">
            App Development
          </h2>

          <div className="flex justify-center items-center gap-3">
            {/* React Native */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#61DAFB] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiReact />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">React Native</h3>
            </div>
          </div>
        </div>

        {/* Databases */}
        <div className="w-[100%] md:w-[40%] border border-white rounded-lg mt-3 p-2 flex flex-col gap-4">
          {/* Heading */}
          <h2 className="text-white text-lg font-semibold font-poppins">
            Databases
          </h2>

          <div className="flex justify-center items-center gap-3">
            {/* MySQL */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#4479A1] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiMysql />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">MySQL</h3>
            </div>

            {/* MongoDB */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#47A248] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiMongodb />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">MongoDB</h3>
            </div>

            {/* Mongoose */}
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#F04D35] text-6xl flex flex-col justify-center items-center border p-2 rounded-xl transition-all duration-300 ease-in-out bg-[#222] hover:cursor-pointer hover:scale-110">
                <SiMongoose />
              </div>
              <h3 className="font-semibold text-white/80 font-poppins">Mongoose</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
