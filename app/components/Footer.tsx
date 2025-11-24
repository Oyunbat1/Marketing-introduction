"use client"
import React from 'react';
import { Ubuntu } from "next/font/google";
export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"]
});
export default function Footer() {

    return (
        <>
            <div className='h-screen w-screen bg-[#ccff34] flex flex-col justify-around items-center px-10'>
                <div></div>
                <div className='flex flex-col gap-6'>
                    <div className={`${ubuntu.className} font-medium flex flex-col justify-around gap-2`}>
                        <div className='flex flex-col items-start md:flex-row md:justify-between md:items-center gap-4'>
                            <div>© 2025 , Ai.Marketing, Бүх эрх хуулиар хамгаалагдав.</div>
                            <div className='flex items-center gap-2'>
                                <div>Linked in</div>
                                <div>Legal terms</div>
                            </div>
                        </div>
                        <div className='h-px w-full bg-black'></div>
                    </div>
                    <div><h1 className={`${ubuntu.className} text-6xl md:text-9xl lg:text-[200px] font-medium `}>Ai.Marketing</h1></div>
                </div>
            </div>
        </>
    )
}