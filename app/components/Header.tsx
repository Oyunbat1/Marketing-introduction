"use client"
import { useState, useEffect } from "react"
import { Roboto, Ubuntu } from "next/font/google";
const roboto = Roboto({
    subsets: ["latin"],
    weight: [
        "100", "300", "400", "500", "700", "900" // add the weights you need
    ],
    style: ["normal", "italic"]
});
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});
function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        handleScroll();
        handleResize();
        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)

        }
    }, []);

    return (
        <div className="w-screen h-[60px] fixed z-40">
            <div className="flex w-full justify-around p-4">
                {isMobile ? <div className="fixed w-full flex h-[60px] justify-around items-center">
                    <h1 className={`${ubuntu.className} font-medium text-xl`}>Ai.marketing</h1>
                    <div className={`${ubuntu.className} font-medium text-xl`}>Menu</div>
                </div> : <div className=" flex flex-col fixed h-20  w-full justify-around items-center top-4">
                    <div className="flex w-full justify-around gap-180 ">
                        <h1 className={`${ubuntu.className} font-medium text-xl`}>Ai.marketing</h1>
                        <div>
                            <h1 className={`${ubuntu.className} font-medium text-xl`}>Холбоо барих</h1>
                        </div>
                    </div>
                    <div className={`${isScrolled ? "opacity-0 transition-all duration-200 " : "flex items-center justify-center transition-all duration-200 "}`}>
                        <nav>
                            <ul className={`${ubuntu.className} font-medium text-xl flex items-center justify-center gap-20`} >
                                <li>Үндсэн цэс </li>
                                <li>Бидний тухай </li>
                                <li>Үйлчилгээ</li>
                            </ul>
                        </nav>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Header