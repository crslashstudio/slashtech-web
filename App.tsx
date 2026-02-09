
import React, { useState, useEffect, useRef } from 'react';
import { Language, Theme } from './types';
import { CONTENT } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Problem from './components/Problem';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import Portfolio from './components/Portfolio';
import WhySlashtech from './components/WhySlashtech';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

// Declare GSAP globally
declare var gsap: any;
declare var ScrollTrigger: any;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('EN');
  const [theme, setTheme] = useState<Theme>('light');
  const content = CONTENT[lang];
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update body class for themes
    document.body.className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Global reveal for sections
      const revealElements = document.querySelectorAll('.reveal-section');
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
  }, [lang, theme]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'EN' ? 'ID' : 'EN');
  };

  return (
    <div ref={appRef} className="min-h-screen transition-colors duration-500 overflow-x-hidden">
      <Navbar 
        lang={lang} 
        toggleLanguage={toggleLanguage} 
        content={content.nav} 
        theme={theme}
        setTheme={setTheme}
      />
      
      <main className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-12">
        <Hero content={content.hero} theme={theme} />
        
        <div className="reveal-section">
          <Clients />
        </div>

        <div id="problem" className="reveal-section">
          <Problem content={content.problem} />
        </div>

        <div id="solutions" className="reveal-section">
          <Services content={content.solutions} />
        </div>

        <div className="reveal-section">
          <Impact content={content.impact} />
        </div>

        <div id="about" className="reveal-section">
          <AboutUs content={content.aboutUs} />
        </div>

        <div id="work" className="reveal-section">
          <Portfolio content={content.portfolio} />
        </div>

        <div id="process" className="reveal-section">
          <HowItWorks content={content.howItWorks} />
        </div>

        <div className="reveal-section">
          <WhySlashtech content={content.whyChoose} industry={content.industry} />
        </div>

        <div className="reveal-section">
          <Testimonials content={content.testimonials} />
        </div>

        <div className="reveal-section">
          <FAQ />
        </div>

        <div id="contact" className="reveal-section">
          <FinalCta content={content.finalCta} />
        </div>
      </main>

      <Footer lang={lang} content={content.nav} />
      <AIChat lang={lang} />
    </div>
  );
};

export default App;
