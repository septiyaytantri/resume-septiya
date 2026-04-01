"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Integrate with email service (Nodemailer, SendGrid, etc)
    console.log("Form data:", form);
    alert("Thank you for reaching out! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container-width">
        <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 animate-fade-in">Get in Touch</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-semibold mb-6 text-zinc-900">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-zinc-900 mb-2">Email</p>
                <a
                  href="mailto:septiya.y00@gmail.com"
                  className="text-red-900 hover:underline"
                >
                  septiya.y00@gmail.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 mb-2">Phone</p>
                <a href="tel:+62887782809008" className="text-red-900 hover:underline">
                  +62 877-8280-9008
                </a>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 mb-2">Location</p>
                <p className="text-zinc-600">Surabaya, Indonesia</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 mb-2">Social Links</p>
                <div className="flex gap-3">
                  <a
                    href="https://linkedin.com/in/septiya-yutantri"
                    className="text-red-900 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/septiyaytantri"
                    className="text-red-900 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-900 mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-900 mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-md border border-zinc-200 p-3 text-sm outline-none ring-red-900/20 focus:ring-2"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
