import React, { useEffect, useRef, useState } from 'react';
import { Content } from '../types';
import { generateServiceImage } from '../services/gemini';

declare var gsap: any;

interface ServicesProps {
  content: Content['solutions'];
}

const ServiceCard: React.FC<{ item: string; idx: number; icon: React.ReactNode }> = ({ item, idx, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string>(`https://images.unsplash.com/photo-${[
    '1460925895917-afdab827c52f', 
    '1551288049-bebda4e38f71', 
    '1504868584819-f8e905263543', 
    '1518186239751-03e779722530', 
    '1551434678-e076c223a692', 
    '1451187580459-43490279c0fa'
  ][idx % 6]}?auto=format&fit=crop&q=80&w=600&h=400`);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    
    // Smooth lift and shadow increase
    gsap.to(cardRef.current, {
      y: -12,
      duration: 0.5,
      ease: "power2.out",
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)"
    });

    // Subtle icon pop
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.15,
        rotate: 8,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!iconRef.current || !cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    
    gsap.to(iconRef.current, {
      x,
      y,
      rotateX: -y * 0.5,
      rotateY: x * 0.5,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    // Reset card position and shadow
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.6,
      ease: "power2.inOut",
      boxShadow: "none"
    });

    // Reset icon to center
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)"
      });
    }
  };

  const generateAIArt = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGenerating(true);
    const newImage = await generateServiceImage(item);
    if (newImage) {
      setImage(newImage);
    }
    setIsGenerating(false);
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card group relative bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[380px] md:min-h-[420px] perspective-1000"
    >
      <div className="mb-8 md:mb-12 relative">
        <div 
          ref={iconRef}
          className="w-14 h-14 md:w-16 md:h-16 bg-accent-contrast/10 rounded-2xl flex items-center justify-center transition-colors duration-500 group-hover:bg-accent-contrast shadow-2xl"
        >
          <svg 
            className="w-7 h-7 md:w-8 md:h-8 text-accent-contrast transition-colors duration-500 group-hover:text-accent" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </div>
        <span className="absolute -top-2 -right-2 text-[10px] font-mono font-bold opacity-20 select-none">0{idx + 1}</span>
      </div>

      <div className="space-y-4 md:space-y-6 flex-grow">
        <h3 className="text-2xl md:text-4xl font-bold leading-[1.1] tracking-tight group-hover:text-accent-contrast transition-colors duration-300">
          {item}
        </h3>
        <p className="text-xs md:text-sm opacity-50 leading-relaxed font-medium group-hover:opacity-100 transition-opacity duration-500">
          Strategic system architecture focused on high-performance reliability and long-term scalability.
        </p>
      </div>

      <div className="mt-8 md:mt-10 relative overflow-hidden rounded-2xl aspect-[16/9] border border-white/5 transition-all duration-700 group-hover:border-white/20 shadow-inner group/img">
        <img 
          src={image} 
          className={`w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-[0.8] transition-all duration-[1.2s] group-hover:scale-[1.08] ${isGenerating ? 'animate-pulse opacity-50' : ''}`} 
          alt={item} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-60"></div>
        
        {/* AI Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
          <button 
            onClick={generateAIArt}
            disabled={isGenerating}
            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            {isGenerating ? 'Generating...' : 'Regenerate Visual'}
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ content }) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && containerRef.current) {
      gsap.fromTo(".service-card", 
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1, 
          stagger: 0.1, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  const getIcon = (idx: number) => {
    const icons = [
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    ];
    return icons[idx % icons.length];
  };

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-accent text-accent-contrast -mx-6 sm:-mx-10 lg:-mx-12 px-6 md:px-20 rounded-[2.5rem] md:rounded-[4rem] my-10 md:my-20 transition-all duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-24 gap-8">
        <div>
          <div className="flex items-center gap-4 text-[10px] font-bold opacity-60 uppercase tracking-[0.4em] mb-6 md:mb-12">
            <div className="w-2 h-2 rounded-full bg-accent-contrast"></div>
            Core Expertise
          </div>
          <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter">
            Services.<sup>(0{content.items.length})</sup>
          </h2>
        </div>
        
        <div className="max-w-xs pt-4 md:pt-20">
          <p className="text-sm md:text-base opacity-70 leading-relaxed font-medium italic">
            Integrating complex data into elegant, performant digital infrastructure that drives growth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {content.items.map((item, idx) => (
          <ServiceCard key={idx} item={item} idx={idx} icon={getIcon(idx)} />
        ))}
      </div>

      <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-10 pt-16 md:pt-20 border-t border-white/10">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] mb-4">Ready to modernize?</p>
          <h4 className="text-2xl md:text-3xl font-bold max-w-sm">Every project starts with a conversation.</h4>
        </div>
        <button className="w-full md:w-auto px-10 md:px-12 py-5 bg-accent-contrast text-accent rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95 outline-none focus:ring-4 focus:ring-white/50">
          Consultation
        </button>
      </div>
    </section>
  );
};

export default Services;