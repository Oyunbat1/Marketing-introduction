"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Ubuntu } from "next/font/google";
import { motion, AnimatePresence, useScroll, useTransform, easeOut } from "framer-motion";

export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});

// 1. Shared Animation Variants (Same as Contact Page)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeOut },
    },
};

// 2. Tab Content Transition Variants
const tabContentVariants = {
    enter: { opacity: 0, y: 10, filter: "blur(4px)" },
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -10, filter: "blur(4px)" },
};

export default function Testimonials() {
    const [isActive, setIsActive] = useState(0);
    const containerRef = useRef(null);

    const skills = ["Development", "PaidAds", "Automation"];

    const testimonialData = [
        {
            name: "Оюунбат Батнасан",
            position: "Developer & Content Creator",
            image: "/oyunbat1.png", // Ensure these images exist in your public folder
            testimonial:
                "`Миний хувьд контент бүтээлтийг хийхэд зайлшгүй шаардлагатай тохиргоо, маркетингийн стратеги, short content бэлдэх болон вэб хөгжүүлэлт дээр ажиллаж байна.`",
        },
        {
            name: "Ариунбат Долгор",
            position: "Ads manager & Ai creator",
            image: "/ariunbat1.png",
            testimonial:
                "`Миний хувьд бизнес эрхэлдэг хүн болгон зайлшгүй хийх ёстой paid ads буюу төлбөртэй зар сурталчилгаа болон ai тусламжтай контент бүтээх тал дээр ажиллаж байна.`",
        },
        {
            name: "Жанбота Төреке",
            position: "Automation & Ai agent",
            image: "/bota1.png",
            testimonial:
                "`Миний хувьд бизнесээ дараагийн түвшинд гаргахыг хүссэн хүн бүрийн зайлшгүй хийх ёстой автоматжуулалт болон ai тусламжтай контент бүтээх тал дээр ажиллаж байна.`",
        },
    ];

    const activeItem = testimonialData[isActive];

    // Scroll animation for bottom decorative element
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const height = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (
        <div
            ref={containerRef}
            className={`min-h-screen w-full px-4 md:px-14 pt-14 pb-8 relative overflow-hidden bg-[#CBCBCB] text-black ${ubuntu.className}`}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mx-2 min-h-[600px] mt-10 flex flex-col items-center justify-between gap-10"
            >
                {/* Main Content Area */}
                <div className="w-full flex flex-col justify-center gap-4 flex-grow items-center">
                    <div className="flex w-full gap-10 max-w-7xl mx-auto">
                        {/* Text & Profile Section */}
                        <div className="flex flex-col gap-10 md:pl-20 lg:pl-40 xl:pl-60 w-full">

                            {/* Animated Quote */}
                            <div className="min-h-[200px] md:min-h-[150px] flex items-end">
                                <AnimatePresence mode="wait">
                                    <motion.h1
                                        key={isActive}
                                        variants={tabContentVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="text-2xl font-medium md:text-3xl lg:text-4xl xl:text-5xl leading-tight"
                                    >
                                        {activeItem.testimonial}
                                    </motion.h1>
                                </AnimatePresence>
                            </div>

                            {/* Animated Profile Details */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isActive}
                                    variants={tabContentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                    className="flex gap-6 items-center mt-4"
                                >
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                                        <Image
                                            src={activeItem.image}
                                            alt={activeItem.name}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                        {/* Fallback avatar if image fails to load (optional) */}
                                        <div className="absolute inset-0 bg-gray-200 -z-10" />
                                    </div>

                                    <div className="flex flex-col">
                                        <h2 className="font-bold text-lg md:text-xl">
                                            {activeItem.name}
                                        </h2>
                                        <h3 className="text-gray-500 text-sm md:text-base">
                                            {activeItem.position}
                                        </h3>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs (Skills) */}
                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 md:gap-8 p-4 z-20">
                    {skills.map((item, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setIsActive(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                relative px-6 py-4 w-[140px] md:w-[200px] border flex items-center justify-center 
                cursor-pointer transition-all duration-300 rounded-sm
                ${isActive === index
                                    ? "bg-[#ccff34] border-black border-t-4 font-medium"
                                    : "bg-transparent border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-50"
                                }
              `}
                        >
                            {item}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>

            {/* Decorative Bottom Curve Animation */}
            <motion.div
                style={{ height }}
                className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none"
            >
                <div className="h-[200px] w-full rounded-t-[50%] bg-gradient-to-t from-gray-100 to-transparent opacity-50 shadow-[0px_-20px_40px_rgba(0,0,0,0.05)]"></div>
            </motion.div>
        </div>
    );
}