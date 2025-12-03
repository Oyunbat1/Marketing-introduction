"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useScroll, motion, MotionValue, useTransform } from "framer-motion";
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
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }

            const lenis = (window as any).lenis;
            if (lenis) {
                const headerHeight = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight;

                lenis.scrollTo(offsetPosition, {
                    duration: 1.5,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
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

    const boxVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: { delay: i * 0.05, duration: 0.4 }
        }),
        hover: {
            scale: 1.05,
            borderRadius: "24px",
            backgroundColor: "#b8e62e",
            transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
        },
        tap: { scale: 0.9 }
    };

    return (
        <div id="hero" className="min-h-screen w-full flex flex-col justify-center items-center gap-8 pt-20 pb-8 px-4">
            {isTablet ? (
                // --- DESKTOP/TABLET VIEW ---
                <div className="flex justify-center w-[1200px] min-h-screen items-center gap-4 pl-2.5">
                    <motion.div className="flex flex-col w-full justify-center gap-4">
                        <motion.h1 initial={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 1, duration: 0.5, ease: "easeInOut" }} className={`font-medium text-[32px] md:text-[42px] lg:text-[62px] xl:text-[82px] ${ubuntu.className}`}>Хиймэл оюун & Digital marketing</motion.h1>
                        <motion.p initial={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 1.5, duration: 0.5, ease: "easeInOut" }} className={`${ubuntu.className} md:text-[20px] w-[400px]`}>Та өөрийн бизнесээ бидэнтэй хамтарч бүрэн автоматжуулаарай.</motion.p>
                        <div onClick={(e) => handleSmoothScroll(e, 'about')}><MoreButton>Бидний тухай</MoreButton></div>
                    </motion.div>
                    <div className="flex flex-col gap-10">
                        <div className="flex gap-1">
                            {arr.map((item, i) => (
                                <motion.div key={item} custom={i} variants={boxVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" className="w-22 h-22 sm:w-28 sm:h-28 bg-[#ccff34] cursor-pointer" />
                            ))}
                        </div>
                        <div className="flex gap-1">
                            {arr.map((item, i) => (
                                <motion.div key={item} custom={i + 4} variants={boxVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" className="w-22 h-22 sm:w-28 sm:h-28 bg-[#ccff34] cursor-pointer" />
                            ))}
                        </div>
                        <div className="flex gap-1">
                            {arr.map((item, i) => (
                                <motion.div key={item} custom={i + 8} variants={boxVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" className="w-22 h-22 sm:w-28 sm:h-28 bg-[#ccff34] cursor-pointer" />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // --- MOBILE VIEW ---
                <div className="flex flex-col justify-center items-center gap-4 w-full max-w-full">

                    {/* ANIMATED MOBILE TEXT & BUTTON START */}
                    <div className="flex flex-col justify-center items-center gap-4 mt-2 px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                            className={`text-center text-[28px] ${ubuntu.className} leading-tight`}
                        >
                            Та өөрийн бизнесээ бидэнтэй хамтарч бүрэн автоматжуулаарай.
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={(e) => handleSmoothScroll(e, 'about')}
                                className={`border w-[180px] h-[60px] border-black text-black ${ubuntu.className}`}
                            >
                                Бидний тухай
                            </Button>
                        </motion.div>
                    </div>
                    {/* ANIMATED MOBILE TEXT & BUTTON END */}

                    <div className="flex flex-col gap-8 mt-4">
                        <div className="flex gap-1 justify-center">
                            {arr.map((item, i) => (
                                <motion.div key={item} custom={i} variants={boxVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" className="w-16 h-16 sm:w-28 sm:h-28 bg-[#ccff34] cursor-pointer" />
                            ))}
                        </div>
                        <div className="flex gap-1 justify-center">
                            {arr.map((item, i) => (
                                <motion.div key={item} custom={i + 4} variants={boxVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" className="w-16 h-16 sm:w-28 sm:h-28 bg-[#ccff34] cursor-pointer" />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}