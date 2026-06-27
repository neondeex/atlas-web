"use client";

import { useState } from "react";
import { Code, Image as ImageIcon, Briefcase, Zap } from "lucide-react";

const useCases = [
  {
    id: "developers",
    title: "For Developers",
    icon: <Code className="w-6 h-6" />,
    description: "Navigate massive node_modules instantly. Open folders in VS Code or Terminal with a single keystroke. Integrated git status on folders.",
  },
  {
    id: "designers",
    title: "For Designers",
    icon: <ImageIcon className="w-6 h-6" />,
    description: "Lightning-fast previews for PSDs, SVGs, and huge asset folders without opening heavy software. Visual gallery modes built-in.",
  },
  {
    id: "power-users",
    title: "For Power Users",
    icon: <Zap className="w-6 h-6" />,
    description: "Ditch the mouse. Complete keyboard navigability with Miller columns, tabs, and split panes to move files across drives seamlessly.",
  },
  {
    id: "professionals",
    title: "For Professionals",
    icon: <Briefcase className="w-6 h-6" />,
    description: "Manage multiple cloud drives (Google Drive, Dropbox, OneDrive) as if they were local folders. Tag and organize documents easily.",
  }
];

export function UseCases() {
  const [activeTab, setActiveTab] = useState(useCases[0].id);

  return (
    <section className="py-24 px-6 md:px-12 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Built for your workflow.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Atlas adapts to how you work, providing specialized tools for different professions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((useCase) => (
            <div 
              key={useCase.id}
              onMouseEnter={() => setActiveTab(useCase.id)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeTab === useCase.id 
                  ? "bg-secondary/40 border-white/20 shadow-lg shadow-white/5" 
                  : "bg-background border-white/5 hover:bg-secondary/20"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                activeTab === useCase.id ? "bg-white text-black" : "bg-white/10 text-white"
              }`}>
                {useCase.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
