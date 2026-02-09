
import React, { useEffect, useRef } from 'react';
import { Content } from '../types';

// Declare GSAP globally
declare var gsap: any;
declare var ScrollTrigger: any;

interface TestimonialsProps { content: Content['testimonials']; }

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const cards = gsap.utils.toArray('.testimonial-card');
      
      // Individual card animations
      cards.forEach((card: any) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        tl.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "expo.out"
          }
        )
        .fromTo(card.querySelectorAll('.animate-text'),
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.8"
        );
      });

      // Staggered logo animations for all card logos across the section
      gsap.fromTo('.testimonial-logo', 
        { 
          opacity: 0, 
          scale: 0.5, 
          y: 20 
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Staggered logo animations for the marquee logos at the bottom
      gsap.fromTo('.marquee-logo', 
        { 
          opacity: 0, 
          scale: 0.8,
          filter: 'grayscale(100%)'
        },
        {
          opacity: 0.3, // Match the target base opacity
          scale: 1,
          filter: 'grayscale(100%)',
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".marquee-container",
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );

      // Subtle parallax for the section title
      gsap.to(".testimonial-title", {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 border-t border-theme transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/3 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12 relative z-10">
        <div className="max-w-3xl testimonial-title">
          <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-8">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            Trust & Social Proof
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-main">
            {content.title.split(' ').map((word, i) => (
              <span key={i} className={i === 2 ? "text-accent italic" : ""}>{word} </span>
            ))}
          </h2>
        </div>
        <div className="hidden md:flex gap-3">
           <div className="w-14 h-14 border border-theme rounded-full flex items-center justify-center text-xl font-light text-muted opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">+</div>
           <div className="w-14 h-14 border border-theme rounded-full flex items-center justify-center text-xl font-light text-muted opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">+</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {content.items.map((item, idx) => (
          <div 
            key={idx} 
            className="testimonial-card group card-theme p-12 rounded-[3rem] flex flex-col justify-between h-full transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] hover:border-accent/30 bg-white/[0.02] backdrop-blur-xl border border-theme"
          >
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 text-accent/10 text-8xl font-serif pointer-events-none">“</div>
              
              <div className="testimonial-logo mb-12 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform origin-left group-hover:scale-105">
                <img src={item.logo} alt={item.company} className="h-6 md:h-7 object-contain" />
              </div>
              
              <blockquote className="animate-text">
                <p className="text-2xl md:text-3xl font-medium leading-[1.3] text-main tracking-tight mb-16 relative z-10">
                  {item.quote}
                </p>
              </blockquote>
            </div>
            
            <div className="flex items-center gap-5 border-t border-theme pt-10 mt-auto animate-text">
              <div className="w-14 h-14 rounded-full bg-theme flex-shrink-0 border-2 border-theme overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ring-0 group-hover:ring-4 ring-accent/5">
                 <img 
                  src={`https://i.pravatar.cc/150?u=${item.author}`} 
                  alt={item.author} 
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-110" 
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-main uppercase tracking-[0.15em]">{item.author}</h4>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full opacity-40"></span>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest opacity-60">
                    {item.role} @ {item.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Refined Partners Marquee Bottom */}
      <div className="marquee-container mt-32 pt-16 border-t border-theme">
         <div className="flex flex-col items-center gap-12">
            <p className="text-[10px] font-black text-muted uppercase tracking-[0.5em] opacity-40">Global Network Integration</p>
            <div className="flex flex-wrap justify-center gap-16 md:gap-32 items-center opacity-20 grayscale transition-all hover:opacity-100 hover:grayscale-0 duration-1000">
               {content.items.map((item, i) => (
                  <img key={i} src={item.logo} className="marquee-logo h-4 md:h-5 object-contain" alt="Client" />
               ))}
               <div className="text-[10px] font-black tracking-[0.3em] flex items-center gap-3">
                 <div className="w-1 h-1 bg-main rounded-full"></div>
                 AND 24+ GLOBAL LEADERS
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Testimonials;
