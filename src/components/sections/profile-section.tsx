export function ProfileSection() {
  const strengths = [
    { icon: "⚡", label: "Fast Learner", desc: "Quickly adapt to new technologies" },
    { icon: "🤝", label: "Team Collaboration", desc: "Strong interpersonal skills" },
    { icon: "🧩", label: "Problem Solving", desc: "Analytical and creative approach" },
    { icon: "📊", label: "Detail Oriented", desc: "Focus on meticulous execution" },
  ];

  return (
    <section id="profile" className="py-24 bg-white">
      <div className="container-width">
        <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 animate-fade-in">Profile</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-zinc-900">About Me</h3>
            <p className="text-zinc-600 mb-4 leading-relaxed">
              I'm an IT professional with strong background in Service Management and System
              Implementation. Passionate about optimizing business processes and delivering
              quality solutions.
            </p>
            <p className="text-zinc-600 mb-4 leading-relaxed">
              My expertise spans across IT Service Management, CRM systems, and Business Process
              Analysis. I thrive in collaborative environments and am always eager to learn new
              technologies.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-red-900 font-semibold">Interest:</span>
                <span className="text-zinc-600">IT Project Management, HR, Data Analysis</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-zinc-900">Key Strengths</h3>
            <div className="grid gap-4">
              {strengths.map((item, idx) => (
                <div
                  key={item.label}
                  className="p-4 rounded-lg bg-red-50 border border-red-100 animate-fade-in-up hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-red-900">{item.label}</p>
                      <p className="text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
