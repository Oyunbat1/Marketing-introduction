"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Ubuntu } from "next/font/google";
import Card from "./AboutCard";
import teamMembers from "@/lib/teamMembers";
import { useScroll, motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});
export default function AboutSection() {
    const [isTablet, setIsTablet] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth >= 728);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    }, []);
    return (
        <div id="about" className="w-screen  flex flex-col lg:gap-10 items-center justify-center  ">
            <div className="flex flex-col justify-center items-center gap-6 lg:gap-10 h-100 md:h-50">
                <h1 className={`${ubuntu.className}  text-4xl lg:text-6xl `}>Бидний тухай</h1>
                <p className={`${ubuntu.className} font-light text-xl w-[300px] md:w-[500px] lg:w-[900px]  text-center`}>
                    Сүүлийн үеийн техник технологи ,хиймэл оюун ухаан , маркетингийн зөв стратегийн тусламжтай манай баг  таны бизнесийг бүрэн автоматжуулахад бэлэн байна. Бид өөрсдийн чаддаг зүйлүүдээ бодит болгон таны асуудлыг шийдхээр нэгдсэн билээ.</p>
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