"use client";

import React from 'react';
import { Ubuntu } from "next/font/google";
import { motion } from "framer-motion";
import { Linkedin, FileText } from "lucide-react";
import { easeInOut, circOut } from "framer-motion";

export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});

// --- EXISTING VARIANTS ---
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
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: easeInOut },
    },
};

const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 1.2, ease: circOut, delay: 0.2 }
    }
};

// --- NEW HOVER VARIANTS ---
// This controls the timing of the wave
const titleHoverContainerVariants = {
    hover: {
        transition: {
            staggerChildren: 0.03, // The speed of the wave across letters
            delayChildren: 0,
        }
    }
};

// This controls the individual letter movement
const letterHoverVariants = {
    initial: { y: 0 },
    hover: {
        y: -15, // Moves up slightly
        skewX: -10, // Slight italic skew for speed
        color: "#4b5563", // Optional: Changes to dark grey (Tailwind gray-600)
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 15
        }
    }
};

export default function Footer() {
    const titleText = "Ai.Marketing"; // The text to split

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className='h-screen w-full bg-[#ccff34] flex flex-col justify-between items-center px-6 md:px-14 py-10 md:py-14 text-black overflow-hidden'
        >
            {/* Top Spacer */}
            <div className="flex-grow"></div>

            {/* Main Content */}
            <div className='w-full flex flex-col gap-6 md:gap-10'>

                {/* Meta Info Row */}
                <div className={`${ubuntu.className} font-medium flex flex-col gap-6`}>
                    <motion.div
                        variants={itemVariants}
                        className='flex flex-col-reverse md:flex-row md:justify-between md:items-end gap-6 text-sm md:text-lg'
                    >
                        {/* Copyright */}
                        <div className="opacity-80">
                            © 2025, Ai.Marketing, Бүх эрх хуулиар хамгаалагдав.
                        </div>

                        {/* Links */}
                        <div className='flex items-center gap-8'>
                            <a href="#" className="flex items-center gap-2 hover:opacity-60 transition-opacity duration-300 group">
                                <span>LinkedIn</span>
                                <Linkedin size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a href="#" className="flex items-center gap-2 hover:opacity-60 transition-opacity duration-300 group">
                                <span>Legal terms</span>
                                <FileText size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Animated Divider */}
                    <motion.div
                        variants={lineVariants}
                        className='h-[2px] w-full bg-black'
                    />
                </div>

                {/* Big Title with Smooth Staggered Hover */}
                <motion.div
                    variants={itemVariants}
                    className="relative mb-20 cursor-pointer" // Added cursor-pointer
                >
                    <motion.h1
                        initial="initial"
                        whileHover="hover"
                        variants={titleHoverContainerVariants}
                        className={`${ubuntu.className} text-[14vw] md:text-[13vw] leading-[0.8] font-bold tracking-tighter text-center md:text-left -ml-[0.5vw] overflow-hidden`}
                    >
                        {titleText.split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                variants={letterHoverVariants}
                                className="inline-block" // Required for transform animations to work on text
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.h1>
                </motion.div>
            </div>
        </motion.div>
    )
}