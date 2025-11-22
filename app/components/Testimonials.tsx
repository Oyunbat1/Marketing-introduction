"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ubuntu } from "./Header";
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
    const [isActive, setIsActive] = useState(0);
    const skills = ["Development", "PaidAds", "Automation"]
    const testimonialData = [
        {
            name: "Оюунбат Батнасан",
            position: "Developer & Content Creator",
            image: "/oyunbat1.png",
            testimonial:
                "`Миний хувьд  контент бүтээлт үнийг хийхэд зайлшгүй шаардлагатай тохиргоо , маркетингийн страгеги , short content бэлдэх болон вэб хөгжүүлэлт дээр ажиллаж байна.`",
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

    return (
        <div className="min-h-screen w-screen px-4 md:px-14 pt-14 pb-8">
            <div className="mx-2 min-h-[500px] mt-10 flex flex-col items-center justify-around gap-10">
                <div className="w-full flex flex-col justify-around gap-4 h-full items-center ">
                    <div className="flex w-full gap-10 ">

                        <div className="flex flex-col gap-10 md:ml-10 lg:ml-80 xl:ml-96">
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={isActive}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        ease: [0.4, 0, 0.2, 1] // ease-in-out
                                    }}
                                    className={`${ubuntu.className} text-2xl font-medium md:text-3xl lg:text-4xl xl:text-6xl`}
                                >
                                    {activeItem.testimonial}
                                </motion.h1>
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isActive}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        ease: [0.4, 0, 0.2, 1],
                                        delay: 0.1
                                    }}
                                    className="flex gap-6 items-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ 
                                            duration: 0.3, 
                                            ease: [0.4, 0, 0.2, 1],
                                            delay: 0.2
                                        }}
                                    >
                                        <Image
                                            src={activeItem.image}
                                            alt={activeItem.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                    </motion.div>

                                    <div className="flex flex-col">
                                        <h2 className={`${ubuntu.className} font-bold`}>{activeItem.name}</h2>
                                        <h3 className={`${ubuntu.className} text-gray-600`}>{activeItem.position}</h3>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
                <div className="flex justify-around p-4">
                    {skills.map((item, index) => (
                        <motion.div
                            key={index}
                            onClick={() => setIsActive(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className={`p-2 border flex items-center justify-center w-[120px] lg:w-[220px] py-4 lg:py-6 border-gray-400 cursor-pointer transition-colors duration-300 ${
                                isActive === index ? "bg-[#ccff34] border-t-3 border-t-black" : "hover:bg-gray-100"
                            }`}
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
