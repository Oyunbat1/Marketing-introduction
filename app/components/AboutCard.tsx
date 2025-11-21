"use client"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"

export default function Card({ name, src, i, job }: { name: string; src: string; i: number, job: string }) {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"]
    })
    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    return (
        <div ref={container}
            key={i} className="h-[300px] lg:h-auto sticky top-30 mb-[100px] lg:mb-[80px] flex items-center justify-center ">
            <motion.div className="relative w-[320px] h-80 rounded-2xl overflow-hidden  flex justify-center items-center  bg-[#ccff34] ">
                <motion.div style={{ scale: imageScale }}>
                    <Image alt="img" width={300}
                        src={`${src}`}
                        height={300}
                        className=" h-[316px] w-[316px]  z-10 rounded-2xl overflow-hidden object-cover "></Image>
                </motion.div>
                <div className="absolute flex flex-col bottom-4 bg-white/70 w-[300px] text-center rounded-md">
                    <p>{name}</p>
                    <p>{job}</p>
                </div>
            </motion.div>
        </div>
    )
}