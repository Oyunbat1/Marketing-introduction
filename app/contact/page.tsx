"use client"
import { useState, useEffect } from "react"
import MoreButton from "../components/MoreButton";
import { CREATE_MESSAGE } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { ubuntu } from "../components/Footer";
import { useRouter } from "next/navigation";
import { ChevronsLeft } from "lucide-react";
import { easeInOut, motion } from "framer-motion"
import { toast } from "sonner";
export default function ContactPage() {
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    const handlekBack = () => {
        router.back();
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        social: '',
        company: '',
        service: '',
        message: ''
    });
    const [createMessage, { loading, error, data }] = useMutation(CREATE_MESSAGE);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createMessage({
                variables: formData
            });

            if (result.data) {
                setFormData({
                    name: '',
                    email: '',
                    social: '',
                    company: '',
                    service: '',
                    message: ''
                });
                toast.success("Message sent successfully! 🎉", {
                    duration: 3000,
                    description: "Thank you for contacting me. I'll get back to you soon!"
                });
            }
        } catch (err) {
            console.error('Error sending message:', err);
            toast.error("Failed to send message", {
                duration: 4000,
                description: "Please try again or contact me directly via email."
            });
        }
    };
    return (
        <div className="p-[80px_40px] h-auto  w-full text-black flex flex-col justify-around items-center gap-16 md:flex md:flex-row md:justify-around md:items-start">
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={`${ubuntu.className}   mt-10 text-2xl md:mt-30 md:text-4xl lg:text-6xl lg:mt-50 lg:w-[700px]`}>
                <h1>Хэрвээ та бидэнтэй холбогдохыг хүсвэл  энэхүү формыг үнэн зөв бөглөж илгээнэ үү.</h1>
            </motion.div>

            <motion.form initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} onSubmit={handleSubmit} className="flex flex-col gap-6 w-auto">
                {isMobile ? (<h1 onClick={handlekBack} className={`text-black cursor-pointer md:mb-10 hover:bg-gray-300 transition-all duration-300 fixed bottom-30 left-1/2 -translate-x-1/2 rounded-2xl bg-white p-[14px_30px] flex gap-2 items-center justify-center ${ubuntu.className}`}><ChevronsLeft /> Буцах</h1>) : (<h1 onClick={handlekBack} className={`text-black text-2xl flex fixed left-20 gap-2 border-b w-fit cursor-pointer ${ubuntu.className}`}><ChevronsLeft /> Буцах</h1>)}
                <div className={`flex flex-col gap-4  border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">01</p>
                        <label htmlFor="name" className="text-[20px]">Таны нэр хэн бэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Oyunbat Bat *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                </div>

                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">02</p>
                        <label htmlFor="email" className="text-[20px] ">Таны е-майл хаяг юу вэ?</label>
                    </div>
                    <input
                        type="email"
                        placeholder="oyunbat9958@gmail.com *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">03</p>
                        <label htmlFor="email" className="text-[20px] ">Та аль нэг сошиал хаягаа зөв оруулна уу?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="oyunbatdev *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.social}
                        onChange={(e) => handleInputChange('social', e.target.value)}
                    />
                </div>


                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">04</p>
                        <label htmlFor="company" className="text-[20px]">Та ямар мэргэжилтэй вэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="software engineer *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                </div>

                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">05</p>
                        <label htmlFor="service" className="text-[20px]">Ямар байдлаар хамтарч ажиллахыг хүсэж байна вэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Web development , Designing...*"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                    />
                </div>

                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">06</p>
                        <label htmlFor="message" className="text-[20px]">Надад хэлэх зүйл байвал энэ хэсэгт бичиж үлдээгээрэй?</label>
                    </div>
                    <textarea
                        placeholder="Сайнуу Оюунбатаа, вебсайт хийдэг сайт мэдэх үү?...*"
                        className="ml-6 text-[18px] min-h-[100px] resize-none  border-none outline-none"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                </div>

                <div className="m-[20px_50px] relative">
                    <button
                        type="submit"
                        disabled={loading}
                        className="disabled:opacity-50"
                    >
                        <MoreButton backgroundColor={"#ccff34"}>
                            <p className={`m-0 text-[18px] text-black md:text-base font-light z-50 ${ubuntu.className} font-medium relative`}>
                                {loading ? 'Илгээж байна...' : 'Илгээх!'}
                            </p>
                        </MoreButton>
                    </button>
                </div>

                {error && <p className="text-red-500">{error.message}</p>}

            </motion.form>
        </div>
    )
}