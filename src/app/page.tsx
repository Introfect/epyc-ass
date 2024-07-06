import { ContainerScroll } from "@/components/container-scroll-animation";
import Dashboard from "@/components/Dashboard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sword } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col">
    {/* <Navbar /> */}
    <section className="h-screen w-full  rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
      <div className="absolute inset-0  h-full w-full items-center px-5 py-24 "></div>
      <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
        <ContainerScroll
          titleComponent={
            <div className="flex items-center flex-col">
              <Link
              href="/dashboard"
                className="p-4 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-xl bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
              >
                <span className="bg-clip-text text-white hover:text-black bg-gradient-to-r from-black to-purple-700  md:text-center font-sans group-hover:bg-gradient-to-r ">
                  Dashboard
                </span>
              </Link>
              <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-black to-purple-700 font-sans font-bold">
                View IPL analytics with EPYC
              </h1>
            </div>
          }
        />
      </div>
    </section>
    </main>
  );
}
