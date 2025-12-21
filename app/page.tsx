"use client";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Topics from "@/components/sections/Topics";
import TeamInfo from "@/components/sections/TeamInfo";
import TeamNavigation from "@/components/sections/TeamNavigation";
import Schedule from "@/components/sections/Schedule";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Topics />
          <TeamInfo />
          <TeamNavigation />
          <Schedule />
        </main>
        <Footer />
      </div>
    </>
  );
}
