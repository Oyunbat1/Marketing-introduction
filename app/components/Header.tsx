"use client"
import { useState, useEffect, useRef } from "react"
import { Roboto, Ubuntu } from "next/font/google";
const roboto = Roboto({
    subsets: ["latin"],
    weight: [
        "100", "300", "400", "500", "700", "900" 
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
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

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
            const wasMobile = isMobile;
            const nowMobile = window.innerWidth <= 768;
            setIsMobile(nowMobile);
            // Close menu when switching from mobile to desktop
            if (wasMobile && !nowMobile) {
                setIsMobileMenuOpen(false);
            }
        };
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            
            // Show nav when scrolling up, hide when scrolling down (after initial scroll)
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

    // Prevent body scroll when mobile menu is open
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
            <div className="w-screen h-[60px] fixed z-[50]">
                <div className="flex w-full justify-around p-4">
                    {isMobile ? <div className="fixed w-full flex h-[60px] justify-around items-center z-[60]">
                        <h1 
                            onClick={(e) => handleSmoothScroll(e, 'hero')}
                            className={`${ubuntu.className} font-medium text-xl cursor-pointer hover:opacity-70 transition-opacity relative z-[61]`}
                        >
                            Ai.marketing
                        </h1>
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`${ubuntu.className} font-medium text-xl cursor-pointer hover:opacity-70 transition-opacity relative z-[61]`}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? "Close" : "Menu"}
                        </button>
                    </div> : <div className=" flex flex-col fixed h-20  w-full justify-around items-center top-4">
                    <div className="flex w-full justify-around gap-180 ">
                        <h1 
                            onClick={(e) => handleSmoothScroll(e, 'hero')}
                            className={`${ubuntu.className} font-medium text-xl cursor-pointer hover:opacity-70 transition-opacity`}
                        >
                            Ai.marketing
                        </h1>
                        <div>
                            <h1 className={`${ubuntu.className} font-medium text-xl`}>Холбоо барих</h1>
                        </div>
                    </div>
                    <div className={`${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"} flex items-center justify-center transition-all duration-300 ease-in-out`}>
                        <nav>
                            <ul className={`${ubuntu.className} font-medium text-xl flex items-center justify-center gap-20`} >
                                <li 
                                    onClick={(e) => handleSmoothScroll(e, 'hero')}
                                    className="cursor-pointer hover:opacity-70 transition-opacity"
                                >
                                    Үндсэн цэс
                                </li>
                                <li 
                                    onClick={(e) => handleSmoothScroll(e, 'about')}
                                    className="cursor-pointer hover:opacity-70 transition-opacity"
                                >
                                    Бидний тухай
                                </li>
                                <li 
                                    onClick={(e) => handleSmoothScroll(e, 'service')}
                                    className="cursor-pointer hover:opacity-70 transition-opacity"
                                >
                                    Үйлчилгээ
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>}
                </div>
            </div>
            
            {/* Mobile Menu Overlay */}
            {isMobile && (
                <div 
                    className={`fixed inset-0 bg-white z-[45] transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen 
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
                            <li 
                                onClick={(e) => handleSmoothScroll(e, 'hero')}
                                className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105"
                            >
                                Үндсэн цэс
                            </li>
                            <li 
                                onClick={(e) => handleSmoothScroll(e, 'about')}
                                className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105"
                            >
                                Бидний тухай
                            </li>
                            <li 
                                onClick={(e) => handleSmoothScroll(e, 'service')}
                                className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105"
                            >
                                Үйлчилгээ
                            </li>
                            <li 
                                className="cursor-pointer hover:opacity-70 transition-opacity py-2 transform hover:scale-105"
                            >
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