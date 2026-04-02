import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const experiences = [
  {
    role: "IT Service Management Officer",
    company: "Expressa Group",
    period: "September 2025 – Present",
    highlights: [
      "Incident & request management (SLA monitoring)",
      "Implementation & deployment of systems",
      "Troubleshooting & root cause analysis",
      "Stakeholder coordination",
      "System monitoring & continuous improvement",
    ],
  },
  {
    role: "Staff Tata Kelola BPA",
    company: "Diskominfo Nganjuk",
    period: "Feb 2023 – Jun 2023",
    highlights: [
      "Website monitoring and management",
      "Ticket handling and support",
      "SPBE analysis and documentation",
      "Administrative support coordination",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-red-50/30">
      <div className="container-width">
        <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 animate-fade-in">Work Experience</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-red-900/20 md:w-1 md:transform md:-translate-x-1/2" />

            {experiences.map((exp, idx) => (
              <div key={idx} className="relative mb-12 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className={cn("md:w-1/2", idx % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12")}>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-red-900 rounded-full -translate-x-1.5 md:transform md:-translate-x-2 top-6" />
                  <Card className="p-6 hover:shadow-lg hover:scale-105 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-zinc-900">{exp.role}</h3>
                        <p className="text-red-900 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 mb-4">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-600">
                          <span className="text-red-900 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
