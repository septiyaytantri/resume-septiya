import { Card } from "@/components/ui/card";

const knowledgeAreas = [
  { icon: "🔧", title: "IT Service Management", desc: "ITSM best practices and SLA management" },
  { icon: "🚀", title: "System Implementation", desc: "Software deployment and deployment lifecycle" },
  { icon: "📱", title: "CRM Systems", desc: "Customer Relationship Management expertise" },
  { icon: "📊", title: "Business Process Analysis", desc: "Process optimization and improvement" },
  { icon: "🌐", title: "Digital Transformation", desc: "Technology modernization strategies" },
  { icon: "📋", title: "SPBE", desc: "Sistem Pemerintah Berbasis Elektronik" },
];

export function KnowledgeSection() {
  return (
    <section id="knowledge" className="py-24 bg-white">
      <div className="container-width">
        <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900">Knowledge & Expertise</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {knowledgeAreas.map((item, idx) => (
            <Card
              key={idx}
              className="p-6 text-center hover:shadow-lg hover:scale-105 transition-all animate-scale-in"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-zinc-900 mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-600">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
