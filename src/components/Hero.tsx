"use client";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { ImagesSlider } from "./ui/images-slider";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion"
import InfiniteMovingCardsPage from "./InfiniteMovingCards"; 
type Props = {};

function Hero({}: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref)
  const images = ["/bg.png", "/bg4.png", "/bg2.png", "/bg1.png"];
  return (
    <div className="pb-20">
      <ImagesSlider className="h-[40rem] " images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 py-4">
            Elevate Your
            <br />
            IPL Experience
          </motion.p>
          <motion.p className="text-gray-300 text-center md:text-lg">
            Dive deep into the world of the Indian Premier League with our
            comprehensive dashboard.
          </motion.p>
          <Link
            href="/dashboard"
            className={cn(
              "my-2 bg-white text-slate-900 hover:bg-slate-900 hover:text-white",
              buttonVariants()
            )}
          >
            <span>Dashboard →</span>
          </Link>
        </motion.div>
      </ImagesSlider>
      <section className="w-full py-12 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore More</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Dive deep into the world of IPL with our comprehensive analytics platform. Stay ahead of the game with real-time data, insightful visualizations, and in-depth player and match analysis.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <motion.div 
                            initial={{
                                x:"-100%",
                                opacity:0
                
                              }}
                              animate={isInView?{
                                x:0,
                                opacity:100
                              }:{}}
                              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Player Performance Analysis</h3>
                      <p className="text-muted-foreground">
                      Detailed statistics and performance metrics for every player.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Head-to-Head Comparisons</h3>
                      <p className="text-muted-foreground">
                      Compare player statistics across different matches and seasons.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Team Performance Tracking</h3>
                      <p className="text-muted-foreground">
                      Follow your favorite teams and analyze their performance trends to stay ahead of the curve.
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              <motion.img
              
              initial={{
                x:"100%",
                opacity:0

              }}
              animate={isInView?{
                x:0,
                opacity:100
              }:{}}
              transition={{ duration: 0.5 }}
             
                src="/bg.png"
                width="600"
                height="400"
                alt="Course Curriculum"
                className="mx-auto aspect-video  overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      <InfiniteMovingCardsPage data={ref}  />
    </div>
  );
}

export default Hero;
