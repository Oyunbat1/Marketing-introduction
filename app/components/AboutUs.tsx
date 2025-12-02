"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Ubuntu } from "next/font/google";
import teamMembers from "@/lib/teamMembers";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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
        <div id="about" ref={ref} className="">
            <div className="w-screen h-[400px] md:h-[800px] lg:h-screen  flex flex-col lg:gap-10 items-center justify-center bg-[#ccff34] ">
                <p className={`m-0 leading-[1.3] flex gap-2 lg:gap-3  w-[320px] text-center md:w-[600px] lg:w-[800px] xl:w-[1200px] flex-wrap   `}>
                    {phase.split(" ").map((word, index) => {
                        return <span key={index} className={`${ubuntu.className} text-[18px] lg:text-[40px] md:text-[40px]  uppercase text-center max-w-[100vw] leading-none  mask relative inline-flex overflow-hidden`}><motion.span variants={descriptionSlideUp} animate={isInView ? "open" : "closed"} custom={index} key={index}>{word}</motion.span></span>
                    })}
                </p>
            </div>
            <div className="h-auto w-screen bg-[#ccff34] pb-10 lg:pb-26 px-8 pt-28 md:pt-0 ">
                <div className="flex flex-col gap-10 md:flex-row md:flex md:justify-around">
                    <h1 className={`${ubuntu.className} font-bold text-xl lg:text-2xl`}>Багийн гишүүд</h1>
                    <div className="grid grid-cols-2 justify-center items-center gap-10 cursor-pointer">
                        {teamMembers.map((member, index) => (
                            <div className=" rounded-md flex flex-col justify-center items-center gap-2 lg:items-start md:gap-6 " key={member.id}>
                                <Link href={`/team/${member.id}`} className="w-full">
                                    <div className="h-60 md:h-100 w-full  rounded-md group overflow-hidden " >
                                        <Image src={member.src} alt={member.name} width={160} height={152} className="h-full w-full object-cover rounded-md transition-all duration-400 group-hover:scale-110 " />

                                    </div></Link>
                                <h1 className={`${ubuntu.className} font-bold cursor-pointer text-xl lg:text-3xl`}>{member.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}