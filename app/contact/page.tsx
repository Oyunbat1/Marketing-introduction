"use client";

import { useState, useEffect } from "react";
import MoreButton from "../components/MoreButton";
import { CREATE_MESSAGE } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { ubuntu } from "../components/Footer";
import { useRouter } from "next/navigation";
import { ChevronsLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Lenis from "lenis";


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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as any },
    },
};

export default function ContactPage() {
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    useEffect(() => {
        const lenis = new Lenis();

        (window as any).lenis = lenis;
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            lenis.destroy();
            delete (window as any).lenis;
        };
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        role: "",
        service: "",
        message: "",
    });

    const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createMessage({
                variables: formData,
            });

            if (result.data) {
                setFormData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    companyName: "",
                    role: "",
                    service: "",
                    message: "",
                });
                toast.success("Амжилттай илгээгдлээ🎉", {
                    duration: 3000,
                    description:
                        "Бидэнтэй холбогдсонд баярлалаа. Бид таны хүсэлтийг хараад тантай эргээд холбогдох болно.",
                });
            }
        } catch (err) {
            console.error("Error sending message:", err);
            toast.error("Өө алдаа гарлаа", {
                duration: 4000,
                description:
                    "Дахин оролдоно уу эсвэл бидэнтэй имэйлээр холбогдоно уу.",
            });
        }
    };

    return (
        <div className="p-[80px_40px] h-auto w-full text-black flex flex-col justify-around items-center gap-16 md:flex md:flex-row md:justify-around md:items-start min-h-screen">

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className={`${ubuntu.className} mt-10 text-2xl md:mt-30 md:text-4xl lg:text-6xl lg:mt-50 lg:w-[700px] md:sticky top-32`}
            >
                <motion.h1 variants={itemVariants}>
                    Хэрвээ та бидэнтэй холбогдохыг хүсвэл энэхүү формыг үнэн зөв бөглөж
                    илгээнэ үү.
                </motion.h1>
            </motion.div>

            {/* RIGHT SIDE: Form */}
            <motion.form
                initial="hidden"
                animate="visible"
                variants={containerVariants} // Triggers the stagger effect for children
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-auto max-w-xl"
            >
                {/* Back Button */}
                <motion.div variants={itemVariants}>
                    {isMobile ? (
                        <h1
                            onClick={handleBack}
                            className={`z-50 text-black cursor-pointer md:mb-10 hover:bg-gray-300 transition-all duration-300 fixed bottom-10 left-1/2 -translate-x-1/2 rounded-2xl bg-white shadow-xl border border-gray-100 p-[14px_30px] flex gap-2 items-center justify-center ${ubuntu.className}`}
                        >
                            <ChevronsLeft /> Буцах
                        </h1>
                    ) : (
                        <h1
                            onClick={handleBack}
                            className={`z-50 text-black text-2xl flex fixed left-20 gap-2 border-b w-fit cursor-pointer hover:opacity-60 transition-opacity ${ubuntu.className}`}
                        >
                            <ChevronsLeft /> Буцах
                        </h1>
                    )}
                </motion.div>

                {/* 01. Name */}
                <motion.div variants={itemVariants} className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">01</p>
                        <label htmlFor="name" className="text-[20px]">
                            Таны нэр хэн бэ?
                        </label>
                    </div>
                    <input
                        type="text"
                        placeholder=" *** "
                        className="ml-6 text-[18px] border-none outline-none bg-transparent placeholder:text-[#ccff34]"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                </motion.div>

                {/* 02. Email */}
                <motion.div variants={itemVariants} className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">02</p>
                        <label htmlFor="email" className="text-[20px] ">
                            Таны е-майл хаяг?
                        </label>
                    </div>
                    <input
                        type="email"
                        placeholder="@company.com *"
                        className="ml-6 text-[18px] border-none outline-none bg-transparent placeholder:text-[#ccff34]"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                </motion.div>

                {/* 03. Phone Number */}
                <motion.div variants={itemVariants} className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">03</p>
                        <label htmlFor="phoneNumber" className="text-[20px]">
                            Таны утасны дугаар?
                        </label>
                    </div>
                    <input
                        type="tel"
                        placeholder="+976 8888 8888"
                        className="ml-6 text-[18px] border-none outline-none bg-transparent placeholder:text-[#ccff34]"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                </motion.div>

                {/* 04. Company Name */}
                <motion.div variants={itemVariants} className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">04</p>
                        <label htmlFor="companyName" className="text-[20px] ">
                            Танай компанийн нэр эсвэл вебсайт?
                        </label>
                    </div>
                    <input
                        type="text"
                        placeholder="Tech Solutions LLC / www.example.com *"
                        className="ml-6 text-[18px] border-none outline-none bg-transparent placeholder:text-[#ccff34]"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                    />
                </motion.div>

                {/* 05. Role */}
                <motion.div variants={itemVariants} className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">05</p>
                        <label htmlFor="role" className="text-[20px]">
                            Та ямар ажил эрхэлдэг вэ?
                        </label>
                    </div>
                    <input
                        type="text"
                        placeholder="CEO, Marketing Manager... *"
                        className="ml-6 text-[18px] border-none outline-none bg-transparent placeholder:text-[#ccff34]"
                        required
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                    />
                </motion.div>

                {/* 06. Service */}
                <motion.div variants={itemVariants} className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">06</p>
                        <label htmlFor="service" className="text-[20px]">
                            Таньд тулгамдсан асуудлын талаар?
                        </label>
                    </div>
                    <input
                        type="text"
                        placeholder="Automation, Content Generation, Data Analysis...*"
                        className="ml-6 text-[18px] border-none outline-none bg-transparent placeholder:text-[#ccff34]"
                        required
                        value={formData.service}
                        onChange={(e) => handleInputChange("service", e.target.value)}
                    />
                </motion.div>

                {/* 07. Message */}
                <motion.div variants={itemVariants} className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">07</p>
                        <label htmlFor="message" className="text-[20px]">
                            Та ямар үйлчилгээ авах хүсэлтэй байгаа вэ?
                        </label>
                    </div>
                    <textarea
                        placeholder="We are looking to automate our customer support..."
                        className="ml-6 text-[18px] min-h-[100px] resize-none border-none outline-none bg-transparent placeholder:text-[#ccff34]"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                </motion.div>

                <motion.div variants={itemVariants} className="m-[20px_50px] relative">
                    <button
                        type="submit"
                        disabled={loading}
                        className="disabled:opacity-50"
                    >
                        <MoreButton backgroundColor={"#ccff34"}>
                            <p
                                className={`m-0 text-[18px] text-black md:text-base font-light z-50 ${ubuntu.className} font-medium relative`}
                            >
                                {loading ? "Илгээж байна..." : "Илгээх"}
                            </p>
                        </MoreButton>
                    </button>
                </motion.div>

                {error && <motion.p variants={itemVariants} className="text-red-500">{error.message}</motion.p>}
            </motion.form>
        </div>
    );
}