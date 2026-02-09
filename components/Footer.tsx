
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  content: {
    solutions: string;
    work: string;
    about: string;
    contact: string;
  };
}

const Footer: React.FC<FooterProps> = ({ lang, content }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white pt-24 pb-12 px-8 sm:px-12 lg:px-20 border-t border-gray-100">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid md:grid-cols-12 gap-20 mb-32">
          
          {/* Newsletter / Contact Column */}
          <div className="md:col-span-4 flex flex-col justify-between gap-12">
            <div className="space-y-8">
              <h4 className="text-xl font-bold tracking-tight">Newsletter</h4>
              <div className="space-y-4">
                 <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-gray-200 py-2 focus:border-black outline-none transition-colors" />
                 <button className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                   Subscribe <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                 </button>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-[200px]">
                Join our newsletter and stay updated on the latest trends in digital design.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400">(312) 555-2468</p>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight cursor-pointer hover:opacity-50 transition-opacity">
                hello@slashtech.id
              </h3>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Navigation</h5>
              <div className="flex flex-col gap-4">
                <a href="#" onClick={scrollToTop} className="text-sm font-bold hover:opacity-50 transition-opacity">Home</a>
                <a href="#solutions" onClick={(e) => handleNavClick(e, 'solutions')} className="text-sm font-bold hover:opacity-50 transition-opacity">{content.solutions}</a>
                <a href="#work" onClick={(e) => handleNavClick(e, 'work')} className="text-sm font-bold hover:opacity-50 transition-opacity">{content.work}</a>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-sm font-bold hover:opacity-50 transition-opacity">{content.about}</a>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Social</h5>
              <div className="flex flex-col gap-4">
                <a href="javascript:void(0)" className="text-sm font-bold hover:opacity-50 transition-opacity">LinkedIn</a>
                <a href="javascript:void(0)" className="text-sm font-bold hover:opacity-50 transition-opacity">Instagram</a>
                <a href="javascript:void(0)" className="text-sm font-bold hover:opacity-50 transition-opacity">Twitter / X</a>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col justify-end items-end">
               <div className="flex flex-col items-end gap-2">
                  <h2 className="text-[10vw] md:text-[6vw] font-black text-black leading-[0.8] tracking-[-0.05em] select-none">
                    slashtech
                  </h2>
                  <span className="text-[3vw] md:text-[1.5vw] font-bold text-black border-2 border-black rounded-full px-2 leading-none flex items-center justify-center">
                    R
                  </span>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            © 2025 SLASHTECH STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="javascript:void(0)" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="javascript:void(0)" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2">
              Created by <span className="text-black">Slashtech Core</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
