import { SiFacebook, SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import Lottie from "lottie-react";
import homePageAnimation from "./../assets/animations/homePageAnimation.json";

export default function HomePage() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-evenly md:justify-center items-center w-[100%] pt-[2%] flex-wrap h-[50dvh]">
                <div className="text-white font-poppins flex flex-col gap-2 pl-2">
                    <h1 className="text-sm font-extrabold">Hello, My name is</h1>
                    <h1 className="text-3xl md:text-5xl font-black">M. Ahmad Amin</h1>
                    <h1 className="text-sm md:text-[15px] font-extrabold">CS and Full Stack Engineer | Exploring Data Science to solve real world problems.</h1>
                    <div className="flex gap-2 text-white text-3xl">
                        <a>
                            <SiLinkedin className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-110" />
                        </a>

                        <a className="hover:cursor-pointer hover:scale-[1.1]">
                            <SiGithub className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-110" />
                        </a>

                        <a className="hover:cursor-pointer hover:scale-[1.1]">
                            <SiInstagram className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-110" />
                        </a>

                        <a className="hover:cursor-pointer hover:scale-[1.1]">
                            <SiFacebook className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-110" />
                        </a>
                    </div>
                </div>

                <div className="h-[25%] w-[100%] md:w-[50%] self-start">
                    <Lottie animationData={homePageAnimation} loop={true} autoplay={true} />
                </div>
            </div>
        </>
    )
}