"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Ubuntu } from "next/font/google";
import Card from "./AboutCard";
import teamMembers from "@/lib/teamMembers";
import { useScroll, motion, MotionValue, useTransform, useInView } from "framer-motion";
import { descriptionSlideUp } from "../js/anim"
import Image from "next/image";
import { useRef } from "react";
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});
export default function AboutSection() {
    const [isTablet, setIsTablet] = useState(false);

    const phase = " Сүүлийн үеийн техник технологи ,хиймэл оюун ухаан , маркетингийн зөв стратегийн тусламжтай манай баг  таны бизнесийг бүрэн автоматжуулахад бэлэн байна. Бид өөрсдийн чаддаг зүйлүүдээ бодит болгон таны асуудлыг шийдхээр нэгдсэн билээ."
    const ref = useRef(null);
    const isInView = useInView(ref)
    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth >= 728);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    }, []);
    return (
        <div id="about" ref={ref} className="w-screen  flex flex-col lg:gap-10 items-center justify-center  ">
            <div className="flex flex-col justify-center items-center gap-6 lg:gap-10 h-100 md:h-50">
                <h1 className={`${ubuntu.className}  text-4xl lg:text-6xl `}>Бидний тухай</h1>
                <p className={`m-0 leading-[1.3] flex gap-2 lg:gap-3  w-[360px] md:w-[600px] lg:w-[800px] xl:w-[1200px] flex-wrap  justify-center `}>
                    {phase.split(" ").map((word, index) => {
                        return <span key={index} className={`${ubuntu.className} text-[18px] lg:text-[20px] md:text-[40px]  uppercase text-center max-w-[100vw] leading-none  mask relative inline-flex overflow-hidden`}><motion.span variants={descriptionSlideUp} animate={isInView ? "open" : "closed"} custom={index} key={index}>{word}</motion.span></span>
                    })}
                </p>
            </div>
            {isTablet ? <div className="flex gap-4 items-center justify-center">
                {teamMembers.map((member, index) => {
                    return <Card key={index} {...member} i={index}></Card>
                })}
            </div> : <div className="flex flex-col items-center justify-center ">
                {teamMembers.map((member, index) => {
                    return <Card key={index} {...member} i={index}></Card>
                })}
            </div>}

        </div>
    )
}