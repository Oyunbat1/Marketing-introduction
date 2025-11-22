"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Ubuntu } from "next/font/google";
import MoreButton from "./MoreButton";
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});
export default function HeroSection() {
    const [isTablet, setIsTablet] = useState(false);
    const arr = [1, 2, 3, 4];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            // Close mobile menu if open
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
            
            // Use Lenis smooth scroll if available, otherwise use native smooth scroll
            const lenis = (window as any).lenis;
            if (lenis) {
                // Calculate position accounting for fixed header
                const headerHeight = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight;
                
                lenis.scrollTo(offsetPosition, {
                    duration: 1.5,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                // Fallback to native smooth scroll
                const headerHeight = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };
    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth >= 728);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    }, []);
    return (
        <div id="hero" className="min-h-screen w-full flex flex-col justify-center items-center gap-8 pt-20 pb-8 px-4">
            {isTablet ? <div className="flex  justify-center w-[1200px] min-h-screen items-center gap-4 pl-[100px]">
                <div className="flex flex-col w-full justify-center gap-4  ">
                    <h1 className={`${ubuntu.className} font-medium text-[32px] md:text-[42px] lg:text-[62px] xl:text-[82px]`}>Хиймэл оюун & Digital marketing</h1>
                    <p className={`${ubuntu.className} md:text-[20px] w-[400px]`}>Та өөрийн бизнесээ бидэнтэй хамтарч бүрэн автоматжуулаарай.</p>
                    <div onClick={(e) => handleSmoothScroll(e, 'about')}><MoreButton>Бидний тухай</MoreButton></div>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="flex gap-1">  {arr.map((item) => (
                        <div key={item} className="w-22 h-22 sm:w-28 sm:h-28   bg-[#ccff34]"></div>
                    ))}
                    </div>
                    <div className="flex gap-1">  {arr.map((item) => (
                        <div key={item} className="w-22 h-22  sm:w-28 sm:h-28   bg-[#ccff34]"></div>
                    ))}
                    </div>
                    <div className="flex gap-1">  {arr.map((item) => (
                        <div key={item} className="w-22 h-22  sm:w-28 sm:h-28   bg-[#ccff34]"></div>
                    ))}
                    </div>
                </div>
            </div> : <div className="flex flex-col justify-center items-center gap-4 w-full max-w-full">
                <div className="flex flex-col justify-center items-center gap-4 mt-2 px-4">
                    <h1 className={`text-center text-[28px] ${ubuntu.className} leading-tight`}>Та өөрийн бизнесээ бидэнтэй хамтарч бүрэн автоматжуулаарай. </h1>
                    <Button  onClick={(e) => handleSmoothScroll(e, 'about')} className={`border w-[180px] h-[60px] border-black text-black ${ubuntu.className}`}>Бидний тухай</Button>
                </div>
                <div className="flex flex-col gap-8 mt-4">
                    <div className="flex gap-1 justify-center">  {arr.map((item) => (
                        <div key={item} className="w-16 h-16 sm:w-28 sm:h-28 bg-[#ccff34]"></div>
                    ))}
                    </div>
                    <div className="flex gap-1 justify-center">  {arr.map((item) => (
                        <div key={item} className="w-16 h-16 sm:w-28 sm:h-28 bg-[#ccff34]"></div>
                    ))}
                    </div>
                </div>
            </div>}
        </div >
    )
}