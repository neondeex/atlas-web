import React from 'react';
import { 
  Code, 
  Terminal, 
  Database, 
  MessageSquare,
  Activity,
  PenTool,
  Cpu
} from 'lucide-react';

const categories = [
  { id: 'active', label: 'Active', active: true },
  { id: 'dev-tools', label: 'Developer Tools', active: false },
  { id: 'communication', label: 'Communication', active: false },
  { id: 'design', label: 'Design', active: false },
  { id: 'system', label: 'System', active: false },
];

const extensions = [
  {
    id: 1,
    title: 'GitHub',
    description: 'Manage your pull requests, issues, and repositories right from Raycast.',
    icon: Code,
    color: 'text-white',
    bgColor: 'bg-zinc-800'
  },
  {
    id: 2,
    title: 'Vercel',
    description: 'Deploy, scale, and secure your applications seamlessly.',
    icon: Terminal,
    color: 'text-white',
    bgColor: 'bg-black'
  },
  {
    id: 3,
    title: 'Linear',
    description: 'Streamline your software projects, sprints, and bug tracking.',
    icon: Activity,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10'
  },
  {
    id: 4,
    title: 'Figma',
    description: 'Search your files, projects, and teams without leaving the keyboard.',
    icon: PenTool,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10'
  }
];

export const ExtensionHighlights = () => {
  return (
    <section className="w-full py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8">
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
            Productivity
          </h2>
          
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  cat.active 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extensions.map((ext) => (
            <div 
              key={ext.id}
              className="group relative flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:bg-zinc-900/80 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-inner ${ext.bgColor} border border-white/5`}>
                <ext.icon className={`w-6 h-6 ${ext.color}`} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                {ext.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                {ext.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtensionHighlights;
