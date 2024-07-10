import { ContainerScroll } from "@/components/container-scroll-animation";
import Dashboard from "@/components/Dashboard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sword } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <div className="flex flex-col min-h-[100dvh]">
    <section className="w-full pt-12 md:pt-24 lg:pt-32">
      <div className="container space-y-10 xl:space-y-16">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Elevate Your IPL Experience
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Dive deep into the world of the Indian Premier League with our comprehensive dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Explore the Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
        <img
          src="/team.png"
          width="1200"
          height="500"
          alt="IPL Hero"
          className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover object-center"
        />
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 shadow-lg rounded-lg p-6">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Live Scores</div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Real-Time Updates</h2>
              <p className="text-muted-foreground md:text-lg/relaxed">
                Stay on top of the latest scores and match updates with our live dashboard.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 shadow-lg rounded-lg p-6">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Player Stats</div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Comprehensive Analytics</h2>
              <p className="text-muted-foreground md:text-lg/relaxed">
                Dive deep into player performances and team statistics with our advanced analytics.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 shadow-lg rounded-lg p-6">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Predictions</div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Intelligent Forecasting</h2>
              <p className="text-muted-foreground md:text-lg/relaxed">
                Get insights and predictions to stay ahead of the game with our AI-powered forecasting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
