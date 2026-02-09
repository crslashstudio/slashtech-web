
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
      // Animate the Reason Items
      gsap.fromTo(".reason-item", 
        { 
          opacity: 0, 
          scale: 0.95, 
          x: -20 
        },
        { 
          opacity: 1, 
          scale: 1, 
          x: 0,
          duration: 0.8, 
          stagger: 0.15, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate the Sector Cards
      gsap.fromTo(".sector-card", 
        { 
          opacity: 0, 
          scale: 0.9, 
          y: 30 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 1, 
          stagger: 0.1, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 grid md:grid-cols-2 gap-24 overflow-hidden">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Competitive Edge</h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-12 tracking-tighter">{content.title}</h3>
        
        <div className="space-y-8">
          {content.reasons.map((reason, idx) => (
            <div key={idx} className="reason-item flex gap-6 items-center">
              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0"></div>
              <p className="text-lg md:text-xl font-medium text-main leading-tight">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Market Focus</h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-12 tracking-tighter">{industry.title}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industry.sectors.map((sector, idx) => (
            <div key={idx} className="sector-card group p-8 border border-theme rounded-[2rem] bg-card-theme hover:bg-accent hover:border-accent transition-all duration-500 flex flex-col justify-between h-48 cursor-default">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em] group-hover:text-accent-contrast/50">FOCUS_0{idx + 1}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-accent-contrast"></div>
              </div>
              <p className="text-xl font-black leading-tight text-main group-hover:text-accent-contrast transition-colors">{sector}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySlashtech;
