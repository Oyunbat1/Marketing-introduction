"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Ubuntu } from "next/font/google";

export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});
export default function HeroSection() {
    const [isTablet, setIsTablet] = useState(false);
    const arr = [1, 2, 3, 4]
    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth >= 728);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    }, []);
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center gap-8 ">
            {isTablet ? <div className="flex  justify-center w-[1200px] h-screen items-center gap-4 pl-[100px]">
                <div className="flex flex-col w-full justify-center gap-4  ">
                    <h1 className={`${ubuntu.className} font-medium text-[32px] md:text-[42px] lg:text-[62px] xl:text-[82px]`}>Хиймэл оюун & Digital marketing</h1>
                    <p className={`${ubuntu.className} md:text-[20px] w-[400px]`}>Та өөрийн бизнесээ бидэнтэй хамтарч бүрэн автоматжуулаарай.</p>
                    <Button className={`${ubuntu.className} border w-[180px] h-[60px] border-black text-black`}>Бидний тухай</Button>
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
            </div> : <div className="flex flex-col justify-center items-center gap-4 ">
                <div className="flex flex-col justify-center items-center gap-4 mt-2 px-1">
                    <h1 className={`text-center text-[28px] ${ubuntu.className}`}>Та өөрийн бизнесээ бидэнтэй хамтарч бүрэн автоматжуулаарай. </h1>
                    <Button className={`border w-[180px] h-[60px] border-black text-black ${ubuntu.className}`}>Бидний тухай</Button>
                </div>
                <div className="flex flex-col gap-12 mt-30">
                    <div className="flex gap-1">  {arr.map((item) => (
                        <div key={item} className="w-22 h-22 sm:w-28 sm:h-28    bg-[#ccff34]"></div>
                    ))}
                    </div>
                    <div className="flex gap-1">  {arr.map((item) => (
                        <div key={item} className="w-22 h-22  sm:w-28 sm:h-28   bg-[#ccff34]"></div>
                    ))}
                    </div>
                </div>
            </div>}
        </div >
    )
}