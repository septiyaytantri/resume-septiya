import { Card } from "@/components/ui/card";

const education = [
  {
    school: "Universitas Trunojoyo Madura",
    degree: "Sistem Informasi",
    period: "2020 – 2024",
    gpa: "3.7",
    type: "University",
  },
  {
    school: "SMA Negeri 1 Gondang",
    degree: "IPA",
    period: "2017 – 2020",
    gpa: "85",
    type: "High School",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="container-width">
        <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 animate-fade-in">Education</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu, idx) => (
            <Card 
              key={idx} 
              className="p-6 hover:shadow-lg hover:scale-105 transition-all animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">{edu.school}</h3>
                  <p className="text-red-900 font-medium">{edu.degree}</p>
                </div>
                <span className="inline-block bg-red-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {edu.gpa}
                </span>
              </div>
              <p className="text-sm text-zinc-500">{edu.period}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
