"use client";

const FEATURES = [
  {
    icon: "link",
    title: "Unified Endpoint",
    desc: "Access all providers via a single standard API URL.",
    colors: {
      border: "hover:border-blue-500/50",
      bg: "hover:bg-blue-500/5",
      iconBg: "bg-blue-500/10",
      iconText: "text-blue-500",
      titleHover: "group-hover:text-blue-400",
    },
  },
  {
    icon: "bolt",
    title: "Easy Setup",
    desc: "Get up and running in minutes with npx command.",
    colors: {
      border: "hover:border-orange-500/50",
      bg: "hover:bg-orange-500/5",
      iconBg: "bg-orange-500/10",
      iconText: "text-orange-500",
      titleHover: "group-hover:text-orange-400",
    },
  },
  {
    icon: "shield_with_heart",
    title: "Model Fallback",
    desc: "Automatically switch providers on failure or high latency.",
    colors: {
      border: "hover:border-rose-500/50",
      bg: "hover:bg-rose-500/5",
      iconBg: "bg-rose-500/10",
      iconText: "text-rose-500",
      titleHover: "group-hover:text-rose-400",
    },
  },
  {
    icon: "monitoring",
    title: "Usage Tracking",
    desc: "Detailed analytics and cost monitoring across all models.",
    colors: {
      border: "hover:border-purple-500/50",
      bg: "hover:bg-purple-500/5",
      iconBg: "bg-purple-500/10",
      iconText: "text-purple-500",
      titleHover: "group-hover:text-purple-400",
    },
  },
  {
    icon: "key",
    title: "OAuth & API Keys",
    desc: "Securely manage credentials in one vault.",
    colors: {
      border: "hover:border-amber-500/50",
      bg: "hover:bg-amber-500/5",
      iconBg: "bg-amber-500/10",
      iconText: "text-amber-500",
      titleHover: "group-hover:text-amber-400",
    },
  },
  {
    icon: "cloud_sync",
    title: "Cloud Sync",
    desc: "Sync your configurations across devices instantly.",
    colors: {
      border: "hover:border-sky-500/50",
      bg: "hover:bg-sky-500/5",
      iconBg: "bg-sky-500/10",
      iconText: "text-sky-500",
      titleHover: "group-hover:text-sky-400",
    },
  },
  {
    icon: "terminal",
    title: "CLI Support",
    desc: "Works with Claude Code, Codex, Cline, Cursor, and more.",
    colors: {
      border: "hover:border-emerald-500/50",
      bg: "hover:bg-emerald-500/5",
      iconBg: "bg-emerald-500/10",
      iconText: "text-emerald-500",
      titleHover: "group-hover:text-emerald-400",
    },
  },
  {
    icon: "dashboard",
    title: "Dashboard",
    desc: "Visual dashboard for real-time traffic analysis.",
    colors: {
      border: "hover:border-fuchsia-500/50",
      bg: "hover:bg-fuchsia-500/5",
      iconBg: "bg-fuchsia-500/10",
      iconText: "text-fuchsia-500",
      titleHover: "group-hover:text-fuchsia-400",
    },
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-xl text-lg">
            Everything you need to manage your AI infrastructure in one place, built for scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`p-6 rounded-xl bg-[#23180f] border border-[#3a2f27] ${feature.colors.border} ${feature.colors.bg} transition-all duration-300 group`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${feature.colors.iconBg} flex items-center justify-center mb-4 ${feature.colors.iconText} group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <h3
                className={`text-lg font-bold mb-2 ${feature.colors.titleHover} transition-colors`}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
