export function Roadmap() {
  const roadmapItems = [
    {
      quarter: "Q1 2024",
      title: "Foundation",
      items: ["Core component library launch", "Basic customization tools", "Documentation portal", "Community forum"],
    },
    {
      quarter: "Q2 2024",
      title: "Expansion",
      items: [
        "Advanced theming system",
        "Component variants library",
        "Template marketplace",
        "Collaboration features",
      ],
    },
    {
      quarter: "Q3 2024",
      title: "Integration",
      items: ["Design tool plugins", "Framework-specific adapters", "API integration helpers", "Custom code injection"],
    },
    {
      quarter: "Q4 2024",
      title: "Enterprise",
      items: ["Team workspaces", "Design system management", "Advanced analytics", "White-labeling options"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Product Roadmap</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Our vision for the future and what we're building to make your UI development experience even better.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700 hidden md:block"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary hidden md:block"></div>

                  {/* Content */}
                  <div className="md:w-1/2 p-4">
                    <div
                      className={`bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                    >
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                        {item.quarter}
                      </div>
                      <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                      <ul className="space-y-2">
                        {item.items.map((listItem, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                            <span className="text-zinc-600 dark:text-zinc-300">{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="md:w-1/2 hidden md:block"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
