"use client";

import React, { useRef } from "react";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, easeOut } from "framer-motion";

import teamMembers from "@/lib/teamMembers";

export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});

// Animation Variants
const slideUp = {
    initial: { y: "100%" },
    open: (i: number) => ({
        y: "0%",
        transition: { duration: 0.5, delay: 0.01 * i, ease: easeOut },
    }),
    closed: { y: "100%" },
};

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutSection() {
    const phrase = "Сүүлийн үеийн техник технологи, хиймэл оюун ухаан, маркетингийн зөв стратегийн тусламжтай манай баг таны бизнесийг бүрэн автоматжуулахад бэлэн байна. Бид өөрсдийн чаддаг зүйлүүдээ бодит болгон таны асуудлыг шийдхээр нэгдсэн билээ.";

    const descriptionRef = useRef(null);
    const isInView = useInView(descriptionRef, { margin: "-10%" });

    return (
        <section id="about" className={`${ubuntu.className} w-full bg-black text-white overflow-hidden`}>

            {/* 1. Manifesto / Description Section */}
            <div className="w-full min-h-[70vh] flex flex-col items-center justify-center py-20 px-6">
                <div
                    ref={descriptionRef}
                    className="max-w-[1200px] flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1"
                >
                    {phrase.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className="relative overflow-hidden inline-flex"
                        >
                            <motion.span
                                variants={slideUp}
                                custom={index}
                                initial="initial"
                                animate={isInView ? "open" : "closed"}
                                className="text-[20px] md:text-[32px] lg:text-[42px] font-medium leading-[1.2] tracking-tight text-center"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </div>
            </div>

            {/* 2. Team Section */}
            <div className="w-full px-6 pb-32">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">

                    {/* Section Title */}
                    <div className="md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-3xl font-bold sticky top-24 text-neutral-200"
                        >
                            Багийн гишүүд
                        </motion.h2>
                    </div>

                    {/* Members Grid */}
                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeIn}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col gap-4"
                            >
                                <Link href={`/team/${member.id}`} className="block w-full overflow-hidden rounded-lg">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-900">
                                        <Image
                                            src={member.src}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale md:grayscale"
                                        // Note: 'grayscale md:grayscale' makes it B&W by default, color on hover. 
                                        // Remove classes if you want full color always.
                                        />
                                    </div>
                                </Link>

                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#ccff34] transition-colors">
                                        {member.name}
                                    </h3>

                                    {member.job && (
                                        <span className="text-sm text-gray-500">{member.job}</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}