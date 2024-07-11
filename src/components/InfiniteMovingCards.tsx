"use client";
 
import React, { useEffect, useState} from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
type Props = {}

function InfiniteMovingCardsPage({data}: any) {
    const testimonials =[
        {
          "quote": "An exhilarating season of cricket with unexpected twists!",
          "name": "John Doe",
          "title": "IPL Review 2024"
        },
        {
          "quote": "A mix of brilliant performances and shocking failures.",
          "name": "Jane Smith",
          "title": "IPL Insights"
        },
        {
          "quote": "Unprecedented levels of excitement and skill.",
          "name": "Rahul Kumar",
          "title": "Cricket Chronicles"
        },
        {
          "quote": "A thrilling ride from start to finish.",
          "name": "Anita Verma",
          "title": "Sports Review"
        },
        {
          "quote": "The season had its highs and lows.",
          "name": "David Johnson",
          "title": "Cricket Weekly"
        }
      ]
      
  return (
    <div 
    ref={data}
    className="rounded-md flex flex-col antialiased bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
    <InfiniteMovingCards
      items={testimonials}
      direction="right"
      speed="slow"
    />
  </div>
  )
}

export default InfiniteMovingCardsPage