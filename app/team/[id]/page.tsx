"use client";

import React from "react";
import teamMembers from "@/lib/teamMembers";
import { useParams, useRouter } from "next/navigation";
import { Ubuntu } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, Instagram, Facebook, Linkedin } from "lucide-react";
import { easeOut } from "framer-motion";

export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
});

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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


export default function TeamMemberPage() {
    const { id } = useParams();
    const router = useRouter();

    // Find member based on ID
    const member = teamMembers.find((m) => m.id.toString() === id);

    if (!member) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Гишүүн олдсонгүй.</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen w-full bg-black text-white ${ubuntu.className}`}>

            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 w-full p-6 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm md:text-base"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Буцах</span>
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Image (Sticky on Desktop) */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="lg:sticky lg:top-32"
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900 shadow-2xl shadow-neutral-900/50">
                                <Image
                                    src={member.src}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7 flex flex-col gap-10 lg:pt-8"
                    >
                        {/* Header Info */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                {member.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-neutral-400 font-light">
                                {member.job}
                            </p>
                        </motion.div>

                        <div className="w-full h-[1px] bg-neutral-800" />

                        {/* Biography */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-500">
                                Тухай
                            </h2>
                            <p className="text-base md:text-lg leading-relaxed text-neutral-200 font-light">
                                Манай багийн гишүүн <span className="text-white font-medium">{member.name}</span> нь {member.job} мэргэжлээр ажилладаг. Тэрээр хиймэл оюун ухаан болон маркетингийн чиглэлээр мэргэшсэн бөгөөд олон төсөл дээр амжилттай ажиллаж ирсэн туршлагатай.
                                <br /><br />
                                {member.name} нь манай багийн гол хөдөлгөгч хүч бөгөөд түүний мэдлэг, ур чадвар нь бидний амжилтын үндэс суурь болж өгдөг. Тэрээр шинэ санаачлага, бүтээлч шийдлүүдийг бий болгоход үргэлж бэлэн байдаг.
                            </p>
                        </motion.div>

                        {/* Grid for Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Experience */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-500">
                                    Туршлага
                                </h2>
                                <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/30">
                                    <p className="text-neutral-200">{member.experience}</p>
                                </div>
                            </motion.div>

                            {/* Skills */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-500">
                                    Ур чадвар
                                </h2>
                                <div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/30">
                                    <p className="text-neutral-200">{member.skill}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Socials */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4 mt-4">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-neutral-500">
                                Холбогдох
                            </h2>
                            <div className="flex gap-4">
                                <SocialLink href="#" icon={<Instagram size={20} />} label="Instagram" />
                                <SocialLink href="#" icon={<Facebook size={20} />} label="Facebook" />
                                <SocialLink href="#" icon={<Linkedin size={20} />} label="LinkedIn" />
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </main>
        </div>
    );
}

// Helper Component for Social Links
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            className="flex items-center gap-2 px-4 py-3 rounded-full border border-neutral-800 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </a>
    );
}