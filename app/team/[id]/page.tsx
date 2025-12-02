"use client"
import teamMembers from "@/lib/teamMembers"
import { useParams } from "next/navigation";
import { Ubuntu } from "next/font/google";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronsLeft } from "lucide-react";
import { useState, useEffect } from "react";
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});

export default function TeamMembersSection({ params }: { params: { id: string } }) {
    const [isMobile, setIsMobile] = useState(false);
    const { id } = useParams();
    const member = teamMembers.find((member) => member.id.toString() === id);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener("resize", handleResize);
        const lenis = new Lenis();
        (window as any).lenis = lenis;
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize), lenis.destroy(); delete (window as any).lenis;
        }
    }, [])
    const router = useRouter();
    const handlekBack = () => {
        router.back();
    }
    if (!member) {
        return <div className="p-8">Одоогоор гишүүн байхгүй байна.</div>;
    }
    return (
        <div className={`min-h-screen w-screen bg-black text-white ${ubuntu.className} p-10`}>
            {isMobile ? (
                <div className="flex flex-col gap-10">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }}>
                        <Image src={member.src} alt={member.name} width={400} height={400} className="w-full h-[400px] object-cover rounded-md mb-6" />
                        <h1 className="text-5xl">{member.name}</h1>
                        <p className="text-lg leading-10">{member.job}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }} className="mt-4">
                        <p className="text-base leading-8">Манай багийн гишүүн {member.name} нь {member.job} мэргэжлээр ажилладаг. Тэрээр хиймэл оюун ухаан болон маркетингийн чиглэлээр мэргэшсэн бөгөөд олон төсөл дээр амжилттай ажиллаж ирсэн туршлагатай. {member.name} нь манай багийн гол хөдөлгөгч хүч бөгөөд түүний мэдлэг, ур чадвар нь бидний амжилтын үндэс суурь болж өгдөг. Тэрээр шинэ санаачлага, бүтээлч шийдлүүдийг бий болгоход үргэлж бэлэн байдаг бөгөөд манай үйлчлүүлэгчдийн бизнесийг дэмжихэд чухал үүрэг гүйцэтгэдэг.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
                        <h1 className="text-2xl">Туршлага</h1>
                        <p className="text-base leading-8">${member.experience}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
                        <h1 className="text-2xl">Ур чадвар</h1>
                        <p className="text-base leading-8">{member.skill}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
                        <h1 className="text-2xl">Socials</h1>
                        <div className="flex w-full gap-2">  <a href="" className="underline">Instagram</a>
                            <a href="" className="underline">Facebook</a></div>
                    </motion.div>
                    <h1 onClick={handlekBack} className="text-black cursor-pointer hover:bg-gray-300 transition-all duration-300 fixed bottom-30 left-1/2 -translate-x-1/2 rounded-2xl bg-white p-[14px_30px] flex gap-2 items-center justify-center"><ChevronsLeft /> Буцах</h1>
                </div>
            ) : (<div className="flex flex-col gap-20">
                <h1 onClick={handlekBack} className="text-white text-2xl flex  gap-2 border-b w-fit cursor-pointer"><ChevronsLeft /> Буцах</h1>
                <div className="flex gap-10 w-full justify-around">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }} className="lg:w-[400px]">
                        <Image src={member.src} alt={member.name} width={400} height={400} className="w-full h-[440px] object-cover rounded-md mb-6" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }} className="lg:w-[600px] flex flex-col gap-10">
                        <div className="mt-4 flex flex-col gap-2">
                            <h1 className="text-8xl">{member.name}</h1>
                            <p className="text-2xl leading-10">{member.job}</p>
                        </div>
                        <div className="flex">
                            <p className="text-base leading-8">Манай багийн гишүүн {member.name} нь {member.job} мэргэжлээр ажилладаг. Тэрээр хиймэл оюун ухаан болон маркетингийн чиглэлээр мэргэшсэн бөгөөд олон төсөл дээр амжилттай ажиллаж ирсэн туршлагатай. {member.name} нь манай багийн гол хөдөлгөгч хүч бөгөөд түүний мэдлэг, ур чадвар нь бидний амжилтын үндэс суурь болж өгдөг. Тэрээр шинэ санаачлага, бүтээлч шийдлүүдийг бий болгоход үргэлж бэлэн байдаг бөгөөд манай үйлчлүүлэгчдийн бизнесийг дэмжихэд чухал үүрэг гүйцэтгэдэг.</p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-2xl">Туршлага</h1>
                            <p className="text-base leading-8">${member.experience}</p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-2xl">Ур чадвар</h1>
                            <p className="text-base leading-8">{member.skill}</p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-2xl">Socials</h1>
                            <div className="flex w-full gap-2">  <a href="" className="underline">Instagram</a>
                                <a href="" className="underline">Facebook</a></div>
                        </div>
                    </motion.div>
                </div>
            </div>)}
        </div>
    )
}