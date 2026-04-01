import { Card } from "@/components/ui/card";

const organizations = [
  {
    role: "Kepala Divisi Pendidikan",
    org: "UKMFT-ITC",
    year: "2022",
    isLeadership: true,
  },
  {
    role: "Anggota Divisi Pendidikan",
    org: "UKMFT-ITC",
    year: "2021",
    isLeadership: false,
  },
  {
    role: "Anggota Humas",
    org: "HIMASI",
    year: "2021",
    isLeadership: false,
  },
];

export function OrganizationalSection() {
  return (
    <section id="organizational" className="py-24 bg-red-50/30">
      <div className="container-width">
        <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 animate-fade-in">Organizational Experience</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {organizations.map((item, idx) => (
            <Card 
              key={idx} 
              className={`p-6 transition-all hover:shadow-md hover:scale-105 animate-scale-in ${item.isLeadership ? "border-red-900 bg-red-50" : ""}`}
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-zinc-900">{item.role}</h3>
                  <p className={item.isLeadership ? "text-red-900 font-medium" : "text-zinc-600"}>{item.org}</p>
                </div>
                {item.isLeadership && <span className="text-lg">👑</span>}
              </div>
              <p className="text-sm text-zinc-500">{item.year}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
