import React, { useEffect, useRef, useState } from 'react';
import { Content } from '../types';

declare var gsap: any;
declare var ScrollTrigger: any;

interface ImpactProps {
  content: Content['impact'];
}

const Counter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  
  // Parse value string to number and suffix
  // Handles formats like "1m+", "6+", "31%", "12k+"
  const numericMatch = value.match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = value.replace(targetNumber.toString(), '');

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && counterRef.current) {
      const obj = { n: 0 };
      
      gsap.to(obj, {
        n: targetNumber,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(obj.n));
        }
      });
    }
  }, [targetNumber]);

  return (
    <div ref={counterRef} className="flex flex-col gap-2">
      <div className="text-5xl md:text-8xl font-black tracking-tighter text-main mb-2 tabular-nums">
        {displayValue}{suffix}
      </div>
      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted max-w-[120px]">
        {label}
      </p>
    </div>
  );
};

const Impact: React.FC<ImpactProps> = ({ content }) => {
  const stats = [
    { label: "Operational Visibility", value: "1m+" },
    { label: "Successful projects", value: "6+" },
    { label: "Data transparency", value: "31%" },
    { label: "Faster Decisions", value: "12k+" }
  ];

  return (
    <section className="py-32 transition-colors duration-500">
      {/* Centered Approach Statement */}
      <div className="max-w-5xl mx-auto text-center mb-32 px-6">
         <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-12">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            Slashtech® Core
         </div>
         <h2 className="text-4xl md:text-6xl font-medium leading-tight text-muted">
           Our approach is simple: <span className="text-main font-bold italic underline decoration-theme decoration-8 underline-offset-12">we focus on functionality, speed, and clarity,</span> ensuring that every project.
         </h2>
      </div>

      {/* Metrics Grid with Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-theme pt-20">
        {stats.map((stat, idx) => (
          <Counter key={idx} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
};

export default Impact;