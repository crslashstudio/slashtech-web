import React, { useState, useEffect, useRef } from 'react';
import { Language, Theme } from '../types';

declare var gsap: any;

interface NavbarProps {
  lang: Language;
  toggleLanguage: () => void;
  content: {
    solutions: string;
    work: string;
    about: string;
    contact: string;
  };
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, toggleLanguage, content, theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'fresh'];
    const currentIndex = themes.indexOf(theme);
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      handleClose();
    }
  };

  useEffect(() => {
    // Magnetic Link Hover (Desktop Only)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice && typeof gsap !== 'undefined') {
      const items = document.querySelectorAll('.magnetic-link');
      items.forEach(item => {
        item.addEventListener('mousemove', (e: any) => {
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          gsap.to(item, { x, y, duration: 0.4, ease: "power2.out" });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
      });
    }
  }, []);

  const handleOpen = () => setIsOpen(true);
  
  const handleClose = () => {
    if (typeof gsap !== 'undefined' && modalRef.current) {
      const tl = gsap.timeline({ 
        onComplete: () => setIsOpen(false) 
      });

      tl.to(".mobile-nav-link", {
        y: -15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(modalRef.current, { 
        y: 40, 
        opacity: 0, 
        scale: 0.95, 
        duration: 0.4, 
        ease: "power2.in" 
      }, "-=0.15")
      .to(backdropRef.current, { 
        opacity: 0, 
        duration: 0.3 
      }, "-=0.3");
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Entry animation when menu opens
    if (isOpen && typeof gsap !== 'undefined' && modalRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(backdropRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4 }
      )
      .fromTo(modalRef.current, 
        { y: 30, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" },
        "-=0.2"
      )
      .fromTo(".mobile-nav-link", 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 0.6, 
          ease: "power3.out" 
        },
        "-=0.4"
      )
      .fromTo(".mobile-nav-footer",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, [isOpen]);

  const navLinks = [
    { id: 'solutions', label: content.solutions },
    { id: 'work', label: content.work },
    { id: 'about', label: content.about },
    { id: 'contact', label: content.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-theme transition-all duration-300">
      <div className="max-w-[1800px] mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
        <a href="#" className="font-black text-xl md:text-2xl tracking-tighter uppercase text-main" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); }}>
          Slashtech®
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => handleNavClick(e, link.id)}
              className="magnetic-link text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={cycleTheme} className="px-4 py-2 border border-theme rounded-full text-[9px] font-black uppercase tracking-widest">{theme}</button>
          <button onClick={toggleLanguage} className="px-3 py-1.5 border border-theme rounded-lg text-[10px] font-black">{lang}</button>
        </div>

        {/* Mobile Toggle Button */}
        <button className="lg:hidden p-2 relative z-[110]" onClick={isOpen ? handleClose : handleOpen} aria-label="Toggle Menu">
          <div className="space-y-1.5 w-6">
            <div className={`h-0.5 bg-accent transition-all duration-500 origin-center ${isOpen ? 'rotate-45 translate-y-2' : 'w-full'}`} />
            <div className={`h-0.5 bg-accent transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : 'w-2/3 ml-auto'}`} />
            <div className={`h-0.5 bg-accent transition-all duration-500 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : 'w-full'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Modal Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div ref={backdropRef} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
          
          <div ref={modalRef} className="relative w-full max-w-sm card-theme rounded-[2.5rem] p-6 md:p-10 flex flex-col gap-6 md:gap-8 text-center shadow-2xl border border-white/10 landscape-scroll">
            <div className="flex flex-col gap-3 md:gap-5 mt-4">
              {navLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)} 
                  className="mobile-nav-link text-3xl md:text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors block py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mobile-nav-footer pt-6 md:pt-8 border-t border-theme flex flex-col gap-4">
              <div className="flex gap-4">
                <button 
                  onClick={() => cycleTheme()} 
                  className="flex-1 py-3 md:py-4 bg-main border border-theme rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-transform active:scale-95"
                >
                  {theme}
                </button>
                <button 
                  onClick={() => toggleLanguage()} 
                  className="flex-1 py-3 md:py-4 bg-accent text-accent-contrast rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-transform active:scale-95"
                >
                  {lang}
                </button>
              </div>
              <p className="text-[9px] font-bold text-muted uppercase tracking-[0.3em] opacity-40">
                Slashtech® Digital Systems
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;