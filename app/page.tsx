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
        <section id="hero">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  )
}
