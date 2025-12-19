"use client";

import { useState } from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Topics from "@/components/sections/Topics";
import MessageSection from "@/components/sections/MessageSection";
import TeamNavigation from "@/components/sections/TeamNavigation";
import Schedule from "@/components/sections/Schedule";
import Footer from "@/components/sections/Footer";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <PageLoader onComplete={() => setIsLoading(false)} />

      <div className={`min-h-screen transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Header />
        <main>
          <Hero />
          <Topics />
          <MessageSection />
          <TeamNavigation />
          <Schedule />
        </main>
        <Footer />
      </div>
    </>
  );
}
