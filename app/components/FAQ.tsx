"use client";
import React, { useState } from "react";
import { Ubuntu } from "next/font/google";
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});
export default function FAQ() {
    return (
        <div className="min-h-screen w-screen text-white bg-black flex flex-col items-center justify-center py-20 pb-32 px-4">
            <div className="flex flex-col items-center gap-4 md:gap-10 w-full max-w-[1000px] mb-12 md:mb-16">
                <h1 className={`${ubuntu.className} text-[28px] md:text-[36px] text-center`}>Digital Marketing яагаад чухал вэ?</h1>
                <p className={`${ubuntu.className} font-extralight text-gray-300 text-center text-sm md:text-base px-4`}>Digital marketing нь бизнесүүдэд хурдан, хямд өртгөөр, зорилтот хэрэглэгчиддээ шууд хүрэх боломжийг олгодог. Классик маркетингаас ялгаатай нь хэмжилттэй, автоматжуулалт өндөртэй, илүү ухаалаг.</p>
            </div>
            <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-[1000px]">
                <h1 className={`${ubuntu.className} text-[28px] md:text-[36px] text-center`}>Digital Marketing-ийн чухал болох гол шалтгаанууд</h1>
                <ul className="text-center flex flex-col gap-2 md:gap-3 px-4">
                    <li className={`${ubuntu.className} font-extralight text-gray-300 text-sm md:text-base`}>- Автоматжуулалт → цаг ба зардал хэмнэнэ (Chatbot)</li>
                    <li className={`${ubuntu.className} font-extralight text-gray-300 text-sm md:text-base`}>- Брэндийн итгэлцэл, танигдсан байдал (Instagram / Facebook Page Setup)</li>
                    <li className={`${ubuntu.className} font-extralight text-gray-300 text-sm md:text-base`}>- Борлуулалтыг өсгөх түлхүүр (Content Creation)</li>
                    <li className={`${ubuntu.className} font-extralight text-gray-300 text-sm md:text-base`}>- Хурдацтай өсөлт, өндөр анхаарал таталт (AI UGC Content)</li>
                    <li className={`${ubuntu.className} font-extralight text-gray-300 text-sm md:text-base`}>- Шууд Target-тай хүрэх, зарлага үр дүнтэй (Paid Ads)</li>
                </ul>
            </div>
        </div>
    )
}