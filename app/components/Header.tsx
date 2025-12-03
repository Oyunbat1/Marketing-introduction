"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Roboto, Ubuntu } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    style: ["normal", "italic"]
});

export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});

// --- ANIMATION VARIANTS ---

// Controls the speed of the wave across letters
const titleHoverContainerVariants = {
    hover: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0,
        }
    }
};

// Controls the individual letter movement
const letterHoverVariants = {
    initial: { y: 0 },
    hover: {
        y: -3, // Subtle movement for small header text
        skewX: -10,
        color: "#6b7280", // Turns gray on hover
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 15
        }
    }
};

function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const router = useRouter();

    const handleContact = () => {
        router.push('/contact');
    }

    const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);

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
            const wasMobile = isMobile;
            const nowMobile = window.innerWidth <= 768;
            setIsMobile(nowMobile);
            if (wasMobile && !nowMobile) setIsMobileMenuOpen(false);
        };
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            if (currentScrollY > 100) {
                setShowNav(currentScrollY < lastScrollY.current);
            } else {
                setShowNav(true);
            }
            lastScrollY.current = currentScrollY;
        }
        handleScroll();
        handleResize();
        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobileMenuOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen, isMobile]);

    return (
        <>
            <div className="w-screen h-[60px] fixed z-50">
                <div className="flex w-full justify-around p-4">
                    {isMobile ? (
                        <div className="fixed w-full flex h-[60px] justify-around items-center z-60">
                            {/* Mobile Logo (Simple, no hover) */}
                            <h1
                                onClick={(e) => handleSmoothScroll(e, 'hero')}
                                className={`${ubuntu.className} font-medium text-xl cursor-pointer hover:opacity-70 transition-opacity relative z-61`}
                            >
                                Ai.marketing
                            </h1>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`${ubuntu.className} font-medium text-xl cursor-pointer hover:opacity-70 transition-opacity relative z-61`}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMobileMenuOpen ? "Close" : "Menu"}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col fixed h-20 w-full justify-around items-center top-4">
                            <div className="flex w-full justify-around gap-180">

                                {/* DESKTOP LOGO WITH ANIMATION */}
                                <motion.div
                                    initial={{ opacity: 0, translateX: -20 }}
                                    animate={{ opacity: 1, translateX: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    onClick={(e) => handleSmoothScroll(e, 'hero')}
                                    className="cursor-pointer"
                                >
                                    <motion.h1
                                        initial="initial"
                                        whileHover="hover"
                                        variants={titleHoverContainerVariants}
                                        className={`${ubuntu.className} font-medium text-xl flex overflow-hidden`}
                                    >
                                        {"Ai.marketing".split("").map((letter, i) => (
                                            <motion.span
                                                key={i}
                                                variants={letterHoverVariants}
                                                className="inline-block"
                                            >
                                                {letter}
                                            </motion.span>
                                        ))}
                                    </motion.h1>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, translateX: 20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                                    <h1 onClick={handleContact} className={`${ubuntu.className} font-medium text-xl border-b cursor-pointer`}>Холбоо барих</h1>
                                </motion.div>
                            </div>

                            <motion.div initial={{ translateY: -20 }} animate={{ translateY: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={`${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"} flex items-center justify-center transition-all duration-300 ease-in-out`}>
                                <nav>
                                    <ul className={`${ubuntu.className} font-medium text-xl flex items-center justify-center gap-20`} >
                                        <li onClick={(e) => handleSmoothScroll(e, 'hero')} className="cursor-pointer relative group">
                                            <span className="relative z-10">Үндсэн цэс</span>
                                            <span className="absolute bottom-0 left-0 w-0 h-[0.3px] bg-black group-hover:w-full transition-all duration-300 ease-in-out"></span>
                                        </li>
                                        <li onClick={(e) => handleSmoothScroll(e, 'about')} className="cursor-pointer relative group">
                                            <span className="relative z-10">Бидний тухай</span>
                                            <span className="absolute bottom-0 left-0 w-0 h-[0.3px] bg-black group-hover:w-full transition-all duration-300 ease-in-out"></span>
                                        </li>
                                        <li onClick={(e) => handleSmoothScroll(e, 'service')} className="cursor-pointer relative group">
                                            <span className="relative z-10">Үйлчилгээ</span>
                                            <span className="absolute bottom-0 left-0 w-0 h-[0.3px] bg-black group-hover:w-full transition-all duration-300 ease-in-out"></span>
                                        </li>
                                    </ul>
                                </nav>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            {isMobile && (
                <div
                    className={`fixed inset-0 bg-white z-45 transition-all duration-300 ease-in-out ${isMobileMenuOpen
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <nav
                        className="h-full flex flex-col items-center justify-center gap-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className={`${ubuntu.className} font-medium text-2xl flex flex-col items-center justify-center gap-12`}>
                            <li onClick={(e) => handleSmoothScroll(e, 'hero')} className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105">
                                Үндсэн цэс
                            </li>
                            <li onClick={(e) => handleSmoothScroll(e, 'about')} className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105">
                                Бидний тухай
                            </li>
                            <li onClick={(e) => handleSmoothScroll(e, 'service')} className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105">
                                Үйлчилгээ
                            </li>
                            <li onClick={handleContact} className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105">
                                Холбоо барих
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    )
}

export default Header