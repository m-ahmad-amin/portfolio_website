import Lottie from "lottie-react"
import ContactAnimation from "./../assets/animations/ContactAnimation.json"

export default function ContactPage() {
    return (
        <>
        <div className="h-[25%] w-[100%] md:w-[25%]">
            <Lottie animationData={ContactAnimation} loop={true} autoplay={true} />
            </div>
        </>
    )
}