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

    const handleBack = () => {
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
        phoneNumber: '',
        companyName: '',
        role: '',
        service: '',
        message: ''
    });

    const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE);

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
                    phoneNumber: '',
                    companyName: '',
                    role: '',
                    service: '',
                    message: ''
                });
                toast.success("Амжилттай илгээгдлээ🎉", {
                    duration: 3000,
                    description: "Бидэнтэй холбогдсонд баярлалаа. Бид таны хүсэлтийг хараад тантай эргээд холбогдох болно."
                });
            }
        } catch (err) {
            console.error('Error sending message:', err);
            toast.error("Өө алдаа гарлаа", {
                duration: 4000,
                description: "Дахин оролдоно уу эсвэл бидэнтэй имэйлээр холбогдоно уу."
            });
        }
    };

    return (
        <div className="p-[80px_40px] h-auto  w-full text-black flex flex-col justify-around items-center gap-16 md:flex md:flex-row md:justify-around md:items-start">
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={`${ubuntu.className}   mt-10 text-2xl md:mt-30 md:text-4xl lg:text-6xl lg:mt-50 lg:w-[700px]`}>
                <h1>Хэрвээ та бидэнтэй холбогдохыг хүсвэл энэхүү формыг үнэн зөв бөглөж илгээнэ үү.</h1>
            </motion.div>

            <motion.form initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} onSubmit={handleSubmit} className="flex flex-col gap-6 w-auto">
                {isMobile ? (<h1 onClick={handleBack} className={`text-black cursor-pointer md:mb-10 hover:bg-gray-300 transition-all duration-300 fixed bottom-30 left-1/2 -translate-x-1/2 rounded-2xl bg-white p-[14px_30px] flex gap-2 items-center justify-center ${ubuntu.className}`}><ChevronsLeft /> Back</h1>) : (<h1 onClick={handleBack} className={`text-black text-2xl flex fixed left-20 gap-2 border-b w-fit cursor-pointer ${ubuntu.className}`}><ChevronsLeft /> Back</h1>)}

                {/* 01. Name */}
                <div className={`flex flex-col gap-4  border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">01</p>
                        <label htmlFor="name" className="text-[20px]">Таны нэр хэн бэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="John Doe *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                </div>

                {/* 02. Email */}
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">02</p>
                        <label htmlFor="email" className="text-[20px] ">Таны е-майл хаяг?</label>
                    </div>
                    <input
                        type="email"
                        placeholder="john@company.com *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>

                {/* 03. Phone Number (NEW SECTION) */}
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">03</p>
                        <label htmlFor="phoneNumber" className="text-[20px]">Таны утасны дугаар?</label>
                    </div>
                    <input
                        type="tel"
                        placeholder="+976 8888 8888"
                        className="ml-6 text-[18px] border-none outline-none"
                        // Phone is usually optional, remove 'required' if not strictly needed
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                </div>

                {/* 04. Company Name (Renumbered) */}
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">04</p>
                        <label htmlFor="companyName" className="text-[20px] ">Танай компанийн нэр эсвэл вебсайт?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Tech Solutions LLC / www.example.com *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                </div>

                {/* 05. Role (Renumbered) */}
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">05</p>
                        <label htmlFor="role" className="text-[20px]">Та ямар ажил эрхэлдэг вэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="CEO, Marketing Manager... *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                </div>

                {/* 06. Service (Renumbered) */}
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">06</p>
                        <label htmlFor="service" className="text-[20px]">Таньд тулгамдсан асуудлын талаар?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Automation, Content Generation, Data Analysis...*"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                    />
                </div>

                {/* 07. Message (Renumbered) */}
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${ubuntu.className}`}>
                    <div className="flex items-center gap-2 pt-5">
                        <p className="text-gray-400 text-[12px]">07</p>
                        <label htmlFor="message" className="text-[20px]">Та ямар үйлчилгээ авах хүсэлтэй байгаа вэ?</label>
                    </div>
                    <textarea
                        placeholder="We are looking to automate our customer support..."
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
                                {loading ? 'Sending...' : 'Send Request'}
                            </p>
                        </MoreButton>
                    </button>
                </div>

                {error && <p className="text-red-500">{error.message}</p>}

            </motion.form>
        </div>
    )
}