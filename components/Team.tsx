
import React from 'react';
import { ASSETS } from '../constants';

const Team: React.FC = () => {
  const members = [
    { name: "Luhur Santoso", role: "Lead Strategist", img: ASSETS.TEAM.LUHUR },
    { name: "Michael Wilson", role: "Full Stack Developer", img: ASSETS.TEAM.MICHAEL },
  ];

  return (
    <section className="py-24 border-t border-gray-100">
      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-12">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            Slashtech® Team
          </div>
          <h2 className="text-8xl font-black tracking-tighter leading-[0.8] mb-12">
            The faces <span className="text-gray-200 italic">behind</span> the projects.
          </h2>
          <div className="flex gap-4">
             <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-xl font-light text-gray-300">+</div>
             <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-xl font-light text-gray-300">+</div>
          </div>
          
          <div className="mt-24 max-w-sm">
             <p className="text-lg font-medium text-gray-500 mb-8">
               We believe great work comes from collaboration. We work closely with each other to ensure every project meets your goals.
             </p>
             <button className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-4 group">
               Apply now <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
             </button>
          </div>
        </div>

        <div className="flex gap-4 items-end justify-end">
          {members.map((m, i) => (
            <div key={i} className="relative w-64 h-[400px] rounded-[2rem] overflow-hidden group">
              <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                <p className="text-[8px] font-black text-white/50 uppercase tracking-widest mb-1">{m.role}</p>
                <h4 className="text-xl font-bold text-white tracking-tight">{m.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
