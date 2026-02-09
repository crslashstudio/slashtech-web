
import React from 'react';
import { Content } from '../types';
import { ASSETS } from '../constants';

interface FinalCtaProps {
  content: Content['finalCta'];
}

const FinalCta: React.FC<FinalCtaProps> = ({ content }) => {
  return (
    <section id="contact" className="py-24 md:py-40 bg-black text-white -mx-6 sm:-mx-10 lg:-mx-12 px-8 md:px-20 rounded-[4rem] mb-20 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[60%] h-full opacity-20 pointer-events-none">
         <video autoPlay loop muted playsInline aria-hidden="true" className="w-full h-full object-cover grayscale contrast-150 brightness-150">
           <source src={ASSETS.HERO_VIDEO} type="video/mp4" />
         </video>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-20">
        <div>
          <h2 id="cta-heading" className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] mb-12">
            Let's<br />talk.
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-white/50 max-w-sm mb-16">
            Tell us about your project—whether it's a website, SEO, or marketing.
          </p>

          <div className="hidden md:flex flex-col gap-1 items-start">
            <div className="bg-white p-1 rounded-2xl flex gap-4 items-center shadow-2xl scale-90 origin-left" role="complementary" aria-label="Team Lead Info">
              <div className="w-20 h-20 rounded-xl overflow-hidden grayscale bg-gray-200">
                <img src={ASSETS.TEAM.LUHUR} alt="Luhur Santoso" className="w-full h-full object-cover" />
              </div>
              <div className="pr-6 py-2 text-black">
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Luhur Santoso</p>
                <h4 className="text-lg font-black tracking-tight mb-2">Lead Strategist</h4>
                <button 
                  className="bg-black text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-accent transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black outline-none"
                  aria-label="Ask Luhur directly"
                >
                  Ask directly <div className="w-1.5 h-1.5 bg-white rounded-full" aria-hidden="true"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/10">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()} aria-label="Contact Form">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="full-name" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Full Name <span className="text-accent" aria-hidden="true">*</span></label>
                <input 
                  id="full-name"
                  type="text" 
                  required
                  placeholder="John Doe" 
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-white" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Address <span className="text-accent" aria-hidden="true">*</span></label>
                <input 
                  id="email"
                  type="email" 
                  required
                  placeholder="hello@site.com" 
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-white" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Your Message <span className="text-accent" aria-hidden="true">*</span></label>
              <textarea 
                id="message"
                required
                placeholder="Tell us about your project..." 
                rows={4} 
                className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-white resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] transition-transform hover:scale-[1.02] active:scale-95 focus:ring-4 focus:ring-white/20 outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
