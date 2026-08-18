"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"
import CommandPalette from "@/components/command-palette"

const SECTIONS = ["hero", "about", "skills", "projects", "contact"]

export default function Home() {
  const [currentSection, setCurrentSection] = useState("hero")

  // ScrollSpy: Automatically highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const sectionId of SECTIONS) {
        const element = document.getElementById(sectionId)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSelectSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setCurrentSection(sectionId)
    }
  }

  const handleOpenChat = () => {
    // Find the floating chat button and click it if not already open
    const chatBtn = document.querySelector('button[aria-label="Toggle AI Assistant"]') as HTMLButtonElement | null
    if (chatBtn) {
      chatBtn.click()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-orange-100 overflow-x-hidden selection:bg-orange-500 selection:text-slate-950">
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <CommandPalette onSelectSection={handleSelectSection} onOpenChat={handleOpenChat} />
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
