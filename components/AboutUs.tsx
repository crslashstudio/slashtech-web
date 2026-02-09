import React, { useEffect, useRef } from 'react';
import { Content } from '../types';
import { ASSETS } from '../constants';

// Declare GSAP globally
declare var gsap: any;
declare var ScrollTrigger: any;

interface AboutUsProps {
  content: Content['aboutUs'];
}

const MissionIcon = () => (
  <svg className="w-6 h-6 text-accent-contrast" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <circle className="mission-inner-circle" cx="12" cy="12" r="6" />
    <circle className="mission-dot" cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const VisionIcon = () => (
  <svg className="w-6 h-6 text-accent-contrast" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle className="vision-pupil" cx="12" cy="12" r="3" />
  </svg>
);

const AboutUs: React.FC<AboutUsProps> = ({ content }) => {
  const containerRef = useRef<HTMLElement>(null);
  const missionVisionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && containerRef.current) {
      // Header Animation
      gsap.fromTo(".about-header-reveal", 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Targeted Mission & Vision Animation
      if (missionVisionRef.current) {
        gsap.fromTo(".mission-vision-card", 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            stagger: 0.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: missionVisionRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // Icon Specific Animations
        gsap.to(".mission-inner-circle", {
          scale: 1.15,
          opacity: 0.6,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center"
        });

        gsap.to(".mission-dot", {
          scale: 1.3,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          transformOrigin: "center"
        });

        gsap.to(".vision-pupil", {
          x: 2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center"
        });
      }

      // Subtle upward fade-in for Core Values items
      gsap.fromTo(".value-item", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const teamMembers = [
    { name: "Luhur Santoso", role: "Lead Strategist", expertise: "20+ Years Enterprise Systems", img: ASSETS.TEAM.LUHUR },
    { name: "Michael Wilson", role: "Technical Director", expertise: "Full Stack Architect & AI Enthusiast", img: ASSETS.TEAM.MICHAEL },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <section ref={containerRef} className="py-24 md:py-40 border-t border-theme transition-colors duration-500 overflow-hidden" aria-labelledby="about-title">
      <div className="flex flex-col gap-24">
        
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="about-header-reveal">
            <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-8">
              <div className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></div>
              Who We Are
            </div>
            <h2 id="about-title" className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-main">
              {content.title}
            </h2>
          </div>
          <div className="about-header-reveal pt-8 md:pt-20">
            <p className="text-2xl md:text-3xl font-medium text-muted leading-tight max-w-lg italic">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div ref={missionVisionRef} className="grid md:grid-cols-2 gap-8">
          <div className="mission-vision-card card-theme p-12 rounded-[3rem] border border-theme hover:border-accent/20 transition-all group" role="region" aria-labelledby="mission-title">
            <div className="w-12 h-12 rounded-full bg-accent text-accent-contrast flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-accent/20" aria-hidden="true">
              <MissionIcon />
            </div>
            <h3 id="mission-title" className="text-3xl font-bold mb-6 text-main tracking-tight">{content.mission.title}</h3>
            <p className="text-lg text-muted leading-relaxed font-medium">
              {content.mission.text}
            </p>
          </div>
          <div className="mission-vision-card card-theme p-12 rounded-[3rem] border border-theme hover:border-accent/20 transition-all group" role="region" aria-labelledby="vision-title">
            <div className="w-12 h-12 rounded-full bg-accent text-accent-contrast flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-accent/20" aria-hidden="true">
              <VisionIcon />
            </div>
            <h3 id="vision-title" className="text-3xl font-bold mb-6 text-main tracking-tight">{content.vision.title}</h3>
            <p className="text-lg text-muted leading-relaxed font-medium">
              {content.vision.text}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="flex flex-col gap-12" role="region" aria-labelledby="values-title">
          <div className="about-header-reveal">
             <h3 id="values-title" className="text-sm font-black text-muted uppercase tracking-[0.4em]">{content.values.title}</h3>
          </div>
          <div className="values-grid grid md:grid-cols-3 gap-8">
            {content.values.items.map((val, i) => (
              <div key={i} className="value-item flex flex-col gap-4">
                 <div className="w-full h-[1px] bg-theme mb-4" aria-hidden="true"></div>
                 <h4 className="text-xl font-bold text-main uppercase tracking-tighter">{val.name}</h4>
                 <p className="text-sm text-muted leading-relaxed opacity-70">
                   {val.description}
                 </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Team Intro Section */}
        <div className="pt-24 border-t border-theme" role="region" aria-labelledby="team-heading">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
             <div className="max-w-xl">
               <h3 id="team-heading" className="text-4xl md:text-5xl font-black tracking-tighter text-main mb-6">Built by experts, led by precision.</h3>
               <p className="text-lg text-muted font-medium">Our leadership team brings decades of experience in enterprise infrastructure and mission-critical software.</p>
             </div>
             <div className="hidden lg:flex gap-2" aria-hidden="true">
                <div className="w-12 h-12 border border-theme rounded-full flex items-center justify-center text-xs font-bold opacity-30">+</div>
                <div className="w-12 h-12 border border-theme rounded-full flex items-center justify-center text-xs font-bold opacity-30">+</div>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
             {teamMembers.map((m, i) => (
               <div 
                 key={i} 
                 role="button"
                 tabIndex={0}
                 aria-label={`View profile for ${m.name}, ${m.role}`}
                 onKeyDown={(e) => handleKeyDown(e, () => {})}
                 className="group relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden bg-theme card-theme border-none focus-within:ring-4 focus-within:ring-accent outline-none"
               >
                  <img 
                    src={m.img} 
                    alt={`Portrait of ${m.name}`} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-12 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                       <div>
                         <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1">{m.role}</p>
                         <h4 className="text-3xl font-bold text-white tracking-tight">{m.name}</h4>
                         <p className="text-xs text-white/50 mt-2 font-medium tracking-wide">{m.expertise}</p>
                       </div>
                       <div className="hidden sm:block">
                         <div 
                           className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-xl group-hover:bg-white group-hover:text-black transition-all"
                           aria-hidden="true"
                         >
                           →
                         </div>
                       </div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;