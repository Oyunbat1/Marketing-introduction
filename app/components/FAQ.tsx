"use client";

import React from "react";
import { Ubuntu } from "next/font/google";
import { motion, easeOut } from "framer-motion";

// Font Configuration
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
    variable: "--font-ubuntu",
});

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeOut },
    },
};

// Data Structure (Easier to manage)
const features = [
    {
        label: "Автоматжуулалт",
        desc: "Цаг ба зардал хэмнэнэ (Chatbot)",
    },
    {
        label: "Брэндийн итгэлцэл",
        desc: "Танигдсан байдал (Instagram / Facebook Page Setup)",
    },
    {
        label: "Борлуулалт",
        desc: "Өсгөх түлхүүр (Content Creation)",
    },
    {
        label: "Хурдацтай өсөлт",
        desc: "Өндөр анхаарал таталт (AI UGC Content)",
    },
    {
        label: "Шууд Target",
        desc: "Зарлага үр дүнтэй (Paid Ads)",
    },
];

export default function FAQ() {
    return (
        <div
            className={`${ubuntu.className} min-h-screen w-full bg-black text-white flex flex-col items-center justify-center py-24 px-6 overflow-hidden`}
        >
            {/* Main Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-5xl flex flex-col gap-16"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-6">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-linear-to-b from-white to-neutral-400 bg-clip-text text-transparent">
                        Digital Marketing яагаад чухал вэ?
                    </h1>
                    <p className="font-light text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
                        Digital marketing нь бизнесүүдэд хурдан, хямд өртгөөр, зорилтот
                        хэрэглэгчиддээ шууд хүрэх боломжийг олгодог. Классик маркетингаас
                        ялгаатай нь хэмжилттэй, автоматжуулалт өндөртэй, илүү ухаалаг.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="w-full h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent"
                />

                <div className="flex flex-col gap-10">
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-3xl font-medium text-center"
                    >
                        Гол шалтгаанууд
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {features.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
                                className="group p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm transition-colors hover:border-[#ccff34] flex flex-col justify-center gap-2 cursor-default"
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[#ccff34] transition-colors" />
                                    <h3 className="text-lg font-medium text-white group-hover:text-blue-100 transition-colors">
                                        {item.label}
                                    </h3>
                                </div>
                                <p className="text-sm md:text-base text-gray-400 font-light pl-4.5">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}