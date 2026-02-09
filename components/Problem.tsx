import React, { useEffect, useRef } from 'react';
import { Content } from '../types';

declare var gsap: any;
declare var ScrollTrigger: any;

interface ProblemProps {
  content: Content['problem'];
}

const Problem: React.FC<ProblemProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Animate the title
      tl.fromTo(".problem-title", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Animate the description copy
      tl.fromTo(".problem-copy", 
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      // Staggered reveal for challenge items
      tl.fromTo(".challenge-item", 
        { 
          opacity: 0, 
          y: 20,
          clipPath: "inset(100% 0% 0% 0%)" 
        },
        { 
          opacity: 1, 
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power2.out" 
        },
        "-=0.4"
      );

      // Animate the footer box
      tl.fromTo(".problem-footer", 
        { opacity: 0, scaleY: 0, transformOrigin: "top" },
        { opacity: 1, scaleY: 1, duration: 0.8, ease: "expo.out" },
        "-=0.4"
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 border-t border-theme transition-colors duration-500 overflow-hidden">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <h2 className="problem-title text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter text-main">
            {content.title}
          </h2>
        </div>
        
        <div className="md:col-span-7">
          <p className="problem-copy text-lg text-muted mb-8 max-w-2xl font-medium">
            {content.copy}
          </p>
          
          <ul className="space-y-6 mb-12" role="list">
            {content.challenges.map((challenge, idx) => (
              <li key={idx} className="challenge-item flex gap-4 items-start group">
                <span className="w-8 h-8 rounded-xl bg-accent text-accent-contrast text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-accent/10 transition-transform group-hover:scale-110">
                  0{idx + 1}
                </span>
                <span className="text-xl md:text-2xl font-bold tracking-tight text-main group-hover:text-accent transition-colors duration-300">
                  {challenge}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="problem-footer p-8 bg-theme border-l-4 border-accent card-theme rounded-r-3xl italic text-main font-medium shadow-sm">
            <div className="flex items-center gap-4 mb-2 opacity-30">
               <div className="w-1.5 h-1.5 rounded-full bg-main"></div>
               <span className="text-[10px] font-black uppercase tracking-widest">Diagnostic Report</span>
            </div>
            {content.footer}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;