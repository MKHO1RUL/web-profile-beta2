"use client"

import { useState } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

export default function Home() {
  const [currentSection, setCurrentSection] = useState("hero")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-orange-100 overflow-x-hidden">
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <Chatbot />

      <main className="relative">
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>

        <section id="about" className="min-h-screen pb-10">
          <AboutSection />
        </section>

        <section id="skills" className="min-h-screen pb-10">
          <SkillsSection />
        </section>

        <section id="projects" className="min-h-screen pb-10">
          <ProjectsSection />
        </section>

        <section id="contact" className="min-h-screen pb-10">
          <ContactSection />
        </section>
      </main>
    </div>
  )
}
