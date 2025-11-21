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
        <div className="h-screen w-screen relative text-white bg-black flex flex-col items-center justify-center  ">
            <div className=" flex flex-col items-center gap-2 md:gap-10 w-[300px] md:w-[1000px] absolute top-20 lg:top-50 ">
                <h1 className={`${ubuntu.className} text-[28px] md:text-[36px] md:w-[800px] text-center`}>Digital Marketing яагаад чухал вэ?</h1>
                <p className={`${ubuntu.className} font-extralight text-gray-300 md:w-[1000px] text-center`}>Digital marketing нь бизнесүүдэд хурдан, хямд өртгөөр, зорилтот хэрэглэгчиддээ шууд хүрэх боломжийг олгодог. Классик маркетингаас ялгаатай нь хэмжилттэй, автоматжуулалт өндөртэй, илүү ухаалаг.</p>
            </div>
            <div className=" flex flex-col items-center  gap-2 w-[300px] md:w-[1000px] absolute top-90 md:top-120 ">
                <h1 className={`${ubuntu.className} text-[28px]  md:text-[36px] md:w-[1000px] text-center `}>Digital Marketing-ийн чухал болох гол шалтгаанууд</h1>
                <ul className="text-center">
                    <ol className={`${ubuntu.className} font-extralight text-gray-300 `}>- Автоматжуулалт → цаг ба зардал хэмнэнэ (Chatbot)</ol>
                    <ol className={`${ubuntu.className} font-extralight text-gray-300`}>- Брэндийн итгэлцэл, танигдсан байдал (Instagram / Facebook Page Setup)</ol>
                    <ol className={`${ubuntu.className} font-extralight text-gray-300`}>- Борлуулалтыг өсгөх түлхүүр (Content Creation)</ol>
                    <ol className={`${ubuntu.className} font-extralight text-gray-300`}>- Хурдацтай өсөлт, өндөр анхаарал таталт (AI UGC Content)</ol>
                    <ol className={`${ubuntu.className} font-extralight text-gray-300`}>- Шууд Target-тай хүрэх, зарлага үр дүнтэй (Paid Ads)</ol>
                </ul>
            </div>
        </div>
    )
}