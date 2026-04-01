"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-white via-white to-red-50/20 pt-24 flex items-center"
    >
      <div className="container-width py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4 inline-block animate-fade-in">
            <span className="text-sm font-medium text-red-900 bg-red-50 px-4 py-2 rounded-full">
              Welcome to my portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Septiya Yutantri
          </h1>
          <p className="text-xl md:text-2xl text-red-900 font-semibold mb-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            IT Service Management Officer | System Implementator
          </p>
          <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            Surabaya, Indonesia • Fast learner passionate about IT Service Management, System
            Implementation, and Business Process Analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/cv-septiya.pdf";
                link.download = "CV-Septiya-Yutantri.pdf";
                link.click();
              }}
            >
              Download CV
            </Button>
            <Button variant="outline" onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}>
              Get in Touch
            </Button>
          </div>
          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6 text-sm text-zinc-600 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <div>
              <p className="font-semibold text-zinc-900">Email</p>
              <a href="mailto:septiya.y00@gmail.com" className="hover:text-red-900 hover:underline">
                septiya.y00@gmail.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-zinc-900">Phone</p>
              <a href="tel:+62887782809008" className="hover:text-red-900 hover:underline">
                +62 877-8280-9008
              </a>
            </div>
            <div>
              <p className="font-semibold text-zinc-900">Location</p>
              <p>Surabaya, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
