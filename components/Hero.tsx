import React, { useRef, useEffect } from 'react';
import { Content, Theme } from '../types';
import { ASSETS } from '../constants';

declare var gsap: any;
declare var ScrollTrigger: any;

interface HeroProps {
  content: Content['hero'];
  theme: Theme;
}

const Hero: React.FC<HeroProps> = ({ content, theme }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined') {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Desktop Reveal sequence
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        gsap.set(".hero-char", { opacity: 0, y: 100, rotateX: -90 });
        gsap.set(".hero-bottom-left", { opacity: 0, x: -30 });
        gsap.set(profileCardRef.current, { opacity: 0, y: 50 });

        tl.to(".hero-char", { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          stagger: 0.04, 
          duration: 1.2 
        })
        .to(".hero-bottom-left", { 
          opacity: 1, 
          x: 0, 
          duration: 1 
        }, "-=0.8")
        .to(profileCardRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 1 
        }, "-=0.8");

        // Subtle Parallax for background
        if (videoRef.current) {
          gsap.to(videoRef.current, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

      mm.add("(max-width: 768px)", () => {
        // Mobile Reveal (Snappier, less hardware intensive)
        const tl = gsap.timeline();
        gsap.set(".hero-char", { opacity: 0, y: 30 });
        
        tl.to(".hero-char", { 
          opacity: 1, 
          y: 0, 
          stagger: 0.02, 
          duration: 0.8, 
          ease: "power2.out" 
        })
        .fromTo(".hero-bottom-left", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8 }, 
          "-=0.4"
        )
        .fromTo(profileCardRef.current, 
          { opacity: 0, scale: 0.95 }, 
          { opacity: 1, scale: 1, duration: 0.8 }, 
          "-=0.4"
        );
      });

      // Ambient Animation: Floating Nodes
      gsap.fromTo(".integration-node", 
        { opacity: 0, scale: 0 }, 
        { opacity: 0.5, scale: 1, stagger: 0.1, duration: 1.5, ease: "back.out(1.7)" }
      );

      gsap.to(".integration-node", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Racing F1 Car Logic
      const f1Car = document.querySelector('.f1-car');
      const raceAcross = () => {
        gsap.fromTo(f1Car, 
          { x: "-40vw", opacity: 0 },
          { 
            x: "140vw", 
            opacity: 1,
            duration: window.innerWidth < 768 ? 1.4 : 2.2, 
            ease: "power2.inOut",
            onStart: () => gsap.to(f1Car, { filter: "blur(6px)", duration: 0.4 }),
            onComplete: () => {
              gsap.set(f1Car, { opacity: 0, filter: "blur(0px)" });
              setTimeout(raceAcross, Math.random() * 8000 + 5000);
            }
          }
        );
      };
      setTimeout(raceAcross, 4000);

      return () => mm.revert();
    }
  }, []);

  const renderHeadline = () => {
    const text = theme === 'fresh' ? 'Systems' : 'slashtech';
    return text.split('').map((char, i) => (
      <span key={i} className="hero-char inline-block">{char}</span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] md:min-h-screen w-screen -mx-6 sm:-mx-10 lg:-mx-12 bg-main overflow-hidden flex flex-col justify-center px-6 md:px-20 transition-colors duration-700 landscape-padding-top">
      
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay loop muted playsInline 
          className={`w-full h-full object-cover transition-all duration-1000 ${
            theme === 'dark' ? 'grayscale brightness-[0.35]' : 
            theme === 'fresh' ? 'hue-rotate-180 brightness-[1.1] opacity-25' : 
            'grayscale brightness-[1.1] opacity-15'
          }`}
        >
          <source src={ASSETS.HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-main/10 to-main" />
        
        {/* Floating Digital Nodes */}
        <div ref={nodesRef} className="absolute inset-0 perspective-1000">
           {[...Array(window.innerWidth < 768 ? 8 : 15)].map((_, i) => (
             <div 
               key={i} 
               className="integration-node absolute w-1.5 h-1.5 rounded-full bg-accent"
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%`,
                 boxShadow: '0 0 10px var(--accent)'
               }}
             />
           ))}
        </div>
      </div>

      {/* Hero Headline */}
      <div className="relative z-20 w-full flex flex-col items-center md:items-start select-none">
        <div className="flex items-start">
          <h1 className="text-[15vw] md:text-[14vw] font-black leading-[0.8] tracking-[-0.06em] text-main hero-title-landscape">
            {renderHeadline()}
          </h1>
          {theme !== 'fresh' && (
            <span className="text-[5vw] md:text-[3vw] font-bold text-main border-2 border-theme rounded-full w-[8vw] h-[8vw] md:w-[5vw] md:h-[5vw] flex items-center justify-center mt-2 ml-1">R</span>
          )}
        </div>
        <h2 className="text-[8vw] md:text-[6vw] font-serif italic font-medium leading-none mt-2 ml-2 text-main opacity-80 hero-sub-landscape">
          {theme === 'fresh' ? 'Intelligence' : 'Systems'}
        </h2>
      </div>

      {/* Hero Footer Info */}
      <div className="absolute bottom-10 md:bottom-16 left-6 md:left-20 right-6 md:right-20 z-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-16">
        <div className="hero-bottom-left max-w-sm text-center md:text-left hero-sub-landscape">
          <p className="text-muted text-base md:text-xl leading-relaxed font-medium">
            {content.valueStatement}
          </p>
          <div className="mt-4 md:mt-12 flex items-center justify-center md:justify-start gap-6 opacity-40">
            <p className="text-[10px] uppercase tracking-[0.4em]">Surabaya / ID</p>
            <div className="w-8 h-[1px] bg-theme" />
            <p className="text-[10px] uppercase tracking-[0.4em]">EST 2022</p>
          </div>
        </div>

        {/* Floating Profile Card */}
        <div ref={profileCardRef} className="card-theme p-1 rounded-2xl flex gap-4 items-center shadow-xl max-w-full overflow-hidden scale-90 md:scale-100 origin-bottom">
           <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden grayscale">
             <img src={ASSETS.TEAM.LUHUR} alt="Luhur" className="w-full h-full object-cover" />
           </div>
           <div className="pr-4 md:pr-10">
             <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Lead Strategist</p>
             <h4 className="text-base md:text-xl font-black text-main tracking-tight">Luhur Santoso</h4>
             <div className="mt-1 flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
               <span className="text-[8px] font-black uppercase tracking-widest">Online</span>
             </div>
           </div>
        </div>
      </div>

      {/* Decorative Racing Element */}
      <div className="f1-car absolute inset-0 pointer-events-none z-10 flex items-center opacity-0">
         <svg width="300" height="80" viewBox="0 0 450 120" className={`fill-current ${theme === 'fresh' ? 'text-accent' : 'text-main'} opacity-30`}>
            <path d="M50,85 L380,85 C390,85 400,80 405,70 L425,45 C430,40 430,35 425,30 L380,25 C370,23 340,20 290,20 L160,20 C110,20 90,30 70,45 L20,75 C10,80 10,85 20,85 Z" />
            <circle cx="90" cy="85" r="18" />
            <circle cx="340" cy="85" r="18" />
         </svg>
      </div>
    </section>
  );
};

export default Hero;