"use client"
import React, { useEffect, useState } from "react";
import { Ubuntu } from "next/font/google";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});

export default function Service() {
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleDropdown = (index: any) => {
        setActiveIndex(prev => prev === index ? null : index);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const items = [
        {
            title: "Сошиал хаяг хөгжүүлэлт",
            content: "Хөгжүүлэлт хийж эхлэхэд ганц тууштай байх хангалтгүй байдаг ба таньд зөв систем , зөв тохиргоо , зөв стратеги хэрэгтэй. Бид танд үүнд туслах болно."
        },
        {
            title: "PaidAds && Boost",
            content: "Ганц органикаар контент хийхээс гадна paidads boost-ыг  зорилтот хэрэглэгчдэд үр дүнтэй хүргэх нь маш чухал байдаг. Бид танд хамгийн хямд зардлаар үр дүнтэй хүргэх болно."
        },
        {
            title: "Automation && Ai agent",
            content: "AI чатбот, автоматжуулалтыг та өөрийн бизнесийн үйл явцад нэвтрүүлснээр цаг хугацаа, зардлыг хэмнэх боломжтой. Бид танд хамгийн тохиромжтой шийдлийг санал болгож, хэрэгжүүлэхэд туслах болно."
        }
    ];

    return (
        <div id="service" className="min-h-screen w-screen flex flex-col gap-10 py-8 pb-16">
            <div className="flex flex-col items-start gap-4 px-4 md:px-12 mt-12 md:flex-row md:justify-around md:items-center border-b border-black pb-8">
                <h1 className={`${ubuntu.className} text-3xl md:text-5xl lg:text-7xl md:w-[860px] font-bold leading-tight`}>Бид ямар үйлчилгээг санал болгож чадах вэ?</h1>
                <p className={`${ubuntu.className} font-medium ml-2`}>Ai.marketing*</p>
            </div>

            <div className="px-4 md:px-12 lg:px-38 mt-4 flex-1">
                <ul className="flex flex-col p-2 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="py-6 md:py-8 border-b border-black">
                            <li
                                onClick={() => toggleDropdown(index)}
                                className={`${ubuntu.className} text-xl md:text-2xl lg:text-3xl flex items-center justify-between cursor-pointer gap-2`}
                            >
                                <span className="flex-1">{item.title}</span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <ChevronDown className="flex-shrink-0" />
                                </motion.div>
                            </li>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ 
                                            duration: 0.4, 
                                            ease: [0.4, 0, 0.2, 1] // ease-in-out cubic bezier
                                        }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <p className="mt-4 text-base md:text-lg leading-relaxed pb-4">{item.content}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}
