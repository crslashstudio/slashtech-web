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
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && containerRef.current) {
      // Character-by-character reveal for the main title
      gsap.fromTo(".about-title-char", 
        { opacity: 0, y: 40, rotateX: -45 }, 
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1, 
          stagger: 0.03, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: "#about-title",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Subtitle reveal
      gsap.fromTo(".about-subtitle-reveal", 
        { opacity: 0, x: -20 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-subtitle-reveal",
            start: "top 90%",
          }
        }
      );

      // Parallax effect for the background glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Mission & Vision Card 3D Entrance
      if (missionVisionRef.current) {
        gsap.fromTo(".mission-vision-card", 
          { 
            opacity: 0, 
            y: 100, 
            rotateX: -15,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            scale: 1,
            duration: 1.5, 
            stagger: 0.25, 
            ease: "expo.out",
            scrollTrigger: {
              trigger: missionVisionRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        // Animated icons logic
        gsap.to(".mission-inner-circle", {
          scale: 1.2,
          opacity: 0.4,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center"
        });

        gsap.to(".vision-pupil", {
          x: 3,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          transformOrigin: "center"
        });
      }

      // Refined Values Grid Animation: Subtle fade-in and small upward movement
      gsap.fromTo(".value-item", 
        { 
          opacity: 0, 
          y: 30,
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.12, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Team Section Logic
      if (teamSectionRef.current) {
        const teamTl = gsap.timeline({
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: "top 75%",
          }
        });

        teamTl.fromTo(".team-intro-reveal", 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        )
        .fromTo(".team-member-card",
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.2)" },
          "-=0.4"
        );
      }
    }
  }, []);

  const teamMembers = [
    { name: "Luhur Santoso", role: "Lead Strategist", expertise: "20+ Years Enterprise Systems", img: ASSETS.TEAM.LUHUR },
    { name: "Michael Wilson", role: "Technical Director", expertise: "Full Stack Architect & AI Enthusiast", img: ASSETS.TEAM.MICHAEL },
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 border-t border-theme transition-colors duration-500 overflow-hidden" aria-labelledby="about-title">
      {/* Dynamic background glow with parallax */}
      <div ref={glowRef} className="about-bg-glow absolute top-1/3 -right-32 w-[500px] h-[500px] bg-accent/5 blur-[140px] rounded-full pointer-events-none opacity-40"></div>

      <div className="flex flex-col gap-24 relative z-10">
        
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="about-header-reveal flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-8">
              <div className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></div>
              Who We Are
            </div>
            <h2 id="about-title" className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-main perspective-1000">
              {content.title.split('').map((char, i) => (
                <span key={i} className="about-title-char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
          <div className="about-subtitle-reveal pt-8 md:pt-20">
            <p className="text-2xl md:text-3xl font-medium text-muted leading-tight max-w-lg italic">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div ref={missionVisionRef} className="grid md:grid-cols-2 gap-8 perspective-1000">
          <div className="mission-vision-card card-theme p-10 md:p-14 rounded-[3rem] border border-theme hover:border-accent/30 transition-all duration-500 group shadow-sm hover:shadow-xl" role="region" aria-labelledby="mission-title">
            <div className="w-14 h-14 rounded-full bg-accent text-accent-contrast flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-accent/20" aria-hidden="true">
              <MissionIcon />
            </div>
            <h3 id="mission-title" className="text-3xl font-bold mb-6 text-main tracking-tight">{content.mission.title}</h3>
            <p className="text-xl text-muted leading-relaxed font-medium">
              {content.mission.text}
            </p>
          </div>
          <div className="mission-vision-card card-theme p-10 md:p-14 rounded-[3rem] border border-theme hover:border-accent/30 transition-all duration-500 group shadow-sm hover:shadow-xl" role="region" aria-labelledby="vision-title">
            <div className="w-14 h-14 rounded-full bg-accent text-accent-contrast flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-accent/20" aria-hidden="true">
              <VisionIcon />
            </div>
            <h3 id="vision-title" className="text-3xl font-bold mb-6 text-main tracking-tight">{content.vision.title}</h3>
            <p className="text-xl text-muted leading-relaxed font-medium">
              {content.vision.text}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="flex flex-col gap-12" role="region" aria-labelledby="values-title">
          <div className="about-header-reveal">
             <h3 id="values-title" className="text-[10px] font-black text-muted uppercase tracking-[0.5em]">{content.values.title}</h3>
          </div>
          <div className="values-grid grid md:grid-cols-3 gap-12">
            {content.values.items.map((val, i) => (
              <div key={i} className="value-item flex flex-col gap-5 group">
                 <div className="w-full h-[1px] bg-theme mb-4 group-hover:bg-accent transition-colors" aria-hidden="true"></div>
                 <h4 className="text-2xl font-bold text-main uppercase tracking-tighter group-hover:text-accent transition-colors">{val.name}</h4>
                 <p className="text-sm text-muted leading-relaxed opacity-80 font-medium">
                   {val.description}
                 </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Team Intro Section */}
        <div ref={teamSectionRef} className="pt-24 border-t border-theme" role="region" aria-labelledby="team-heading">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
             <div className="max-w-xl">
               <h3 id="team-heading" className="team-intro-reveal text-5xl md:text-6xl font-black tracking-tighter text-main mb-8 leading-[0.9]">Built by experts,<br/>led by precision.</h3>
               <p className="team-intro-reveal text-xl text-muted font-medium italic">Our leadership team brings decades of experience in enterprise infrastructure and mission-critical software.</p>
             </div>
             <div className="hidden lg:flex gap-3" aria-hidden="true">
                <div className="team-intro-reveal w-16 h-16 border border-theme rounded-full flex items-center justify-center text-xs font-bold opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">+</div>
                <div className="team-intro-reveal w-16 h-16 border border-theme rounded-full flex items-center justify-center text-xs font-bold opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">+</div>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-10 perspective-1000">
             {teamMembers.map((m, i) => (
               <div 
                 key={i} 
                 className="team-member-card group relative aspect-[16/9] md:aspect-[21/9] rounded-[3.5rem] overflow-hidden bg-theme card-theme border-none shadow-sm hover:shadow-2xl transition-all duration-700"
               >
                  <img 
                    src={m.img} 
                    alt={`Portrait of ${m.name}`} 
                    className="w-full h-full object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-[1.2s] ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-12 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                       <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                         <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">{m.role}</p>
                         <h4 className="text-4xl font-bold text-white tracking-tight">{m.name}</h4>
                         <p className="text-xs text-white/60 mt-3 font-medium tracking-wide uppercase">{m.expertise}</p>
                       </div>
                       <div className="hidden sm:block">
                         <div 
                           className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white text-xl group-hover:bg-accent group-hover:border-accent group-hover:text-accent-contrast transition-all duration-500 transform group-hover:scale-110"
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