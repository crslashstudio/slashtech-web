
import React, { useEffect, useRef } from 'react';

// Declare GSAP globally
declare var gsap: any;

const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const logos = [
    { name: "UPP", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
    { name: "Warp", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Logo", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png" },
    { name: "Tech", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1000px-IBM_logo.svg.png" },
    { name: "SaaS", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Oracle_Logo.svg/2560px-Oracle_Logo.svg.png" },
    { name: "Meta", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png" },
  ];

  useEffect(() => {
    if (typeof gsap !== 'undefined' && trackRef.current) {
      // Create infinite loop
      const track = trackRef.current;
      const trackWidth = track.offsetWidth;
      
      gsap.to(track, {
        x: `-${trackWidth / 2}px`,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // Subtle hover effect to slow down
      containerRef.current?.addEventListener('mouseenter', () => {
        gsap.to(gsap.getTweensOf(track), { timeScale: 0.3, duration: 1 });
      });
      containerRef.current?.addEventListener('mouseleave', () => {
        gsap.to(gsap.getTweensOf(track), { timeScale: 1, duration: 1 });
      });
    }
  }, []);

  return (
    <section className="py-20 border-b border-theme transition-colors duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        {/* Label */}
        <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-[0.4em] flex-shrink-0 whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          Global Partners (2016–2025)
        </div>

        {/* Logo Ticker Container */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div 
            ref={trackRef}
            className="flex items-center gap-16 md:gap-32 w-max opacity-40 grayscale hover:grayscale-0 transition-all duration-700 py-4"
          >
            {/* First Set */}
            {logos.map((logo, i) => (
              <img 
                key={`orig-${i}`} 
                src={logo.src} 
                alt={logo.name} 
                className="h-5 md:h-7 object-contain select-none pointer-events-none" 
              />
            ))}
            {/* Cloned Set for Seamless Loop */}
            {logos.map((logo, i) => (
              <img 
                key={`clone-${i}`} 
                src={logo.src} 
                alt={logo.name} 
                className="h-5 md:h-7 object-contain select-none pointer-events-none" 
              />
            ))}
            {/* Extra Clone for ultra-wide screens */}
            {logos.map((logo, i) => (
              <img 
                key={`clone2-${i}`} 
                src={logo.src} 
                alt={logo.name} 
                className="h-5 md:h-7 object-contain select-none pointer-events-none" 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
