"use client";

import { Card } from "@/components/ui/card";

const skillsData = {
  Technical: [
    "SLA Monitoring",
    "Troubleshooting",
    "Root Cause Analysis",
    "SQL",
    "Documentation",
    "System Monitoring",
  ],
  Professional: [
    "Communication",
    "Problem Solving",
    "Leadership",
    "Time Management",
    "Adaptability",
    "Stakeholder Management",
  ],
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-red-50/30">
      <div className="container-width">
        <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 animate-fade-in">Skills</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {Object.entries(skillsData).map(([category, skills], catIdx) => (
            <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${catIdx * 100}ms` }}>
              <h3 className="text-2xl font-semibold mb-6 text-zinc-900">{category} Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span
                    key={skill}
                    className="bg-red-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-800 hover:scale-110 transition-all animate-scale-in"
                    style={{ animationDelay: `${(catIdx * 100) + (idx * 50)}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
