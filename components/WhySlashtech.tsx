import React, { useEffect, useRef } from 'react';
import { Content } from '../types';

declare var gsap: any;
declare var ScrollTrigger: any;

interface WhySlashtechProps {
  content: Content['whyChoose'];
  industry: Content['industry'];
}

const WhySlashtech: React.FC<WhySlashtechProps> = ({ content, industry }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Refined Reason Items Animation: Subtle fade and scale
      tl.fromTo(".reason-item", 
        { 
          opacity: 0, 
          scale: 0.92, 
          y: 15,
          filter: "blur(4px)"
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          filter: "blur(0px)",
          duration: 1, 
          stagger: 0.12, 
          ease: "expo.out" 
        }
      );

      // Sector Cards Animation: Coordinated with reasons
      tl.fromTo(".sector-card", 
        { 
          opacity: 0, 
          y: 40,
          rotateX: -10,
          transformOrigin: "top"
        },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power4.out"
        },
        "-=0.8" // Overlap with reasons animation
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 grid md:grid-cols-2 gap-24 overflow-hidden perspective-1000">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-8">
          <div className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></div>
          Competitive Edge
        </div>
        <h3 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-main leading-none">
          {content.title}
        </h3>
        
        <div className="space-y-10">
          {content.reasons.map((reason, idx) => (
            <div key={idx} className="reason-item flex gap-8 items-start group">
              <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 group-hover:scale-150 transition-transform duration-500 shadow-[0_0_8px_var(--accent)]"></div>
              <p className="text-xl md:text-2xl font-medium text-muted group-hover:text-main leading-tight transition-colors duration-300">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-8">
          <div className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></div>
          Market Focus
        </div>
        <h3 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-main leading-none">
          {industry.title}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industry.sectors.map((sector, idx) => (
            <div key={idx} className="sector-card group p-10 border border-theme rounded-[2.5rem] bg-theme hover:bg-black hover:border-black transition-all duration-700 flex flex-col justify-between h-56 cursor-default shadow-sm hover:shadow-2xl">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors">
                  FOCUS_0{idx + 1}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-accent group-hover:animate-ping"></div>
              </div>
              <div>
                <p className="text-2xl font-black leading-tight text-main group-hover:text-white transition-colors duration-500">
                  {sector}
                </p>
                <div className="w-0 group-hover:w-full h-[1px] bg-white/20 mt-4 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySlashtech;