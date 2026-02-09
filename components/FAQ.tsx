
import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [active, setActive] = useState<number | null>(0);

  const faqs = [
    { q: "Do you offer custom digital systems or templates?", a: "Every system we build is custom-designed from the ground up to align perfectly with your specific business logic and operational needs." },
    { q: "What's included in your consultation?", a: "We deep-dive into your existing data architecture, identify bottlenecks, and map out a strategic roadmap for your digital transformation." },
    { q: "How long does a typical dashboard project take?", a: "Depending on complexity and data sources, most enterprise dashboards go from strategy to launch in 8-12 weeks." },
    { q: "Do you support existing legacy systems?", a: "Yes, our core expertise is building bridges between legacy data sources and modern decision-making tools." },
  ];

  return (
    <section className="py-24 border-t border-gray-100" aria-labelledby="faq-title">
      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <h2 id="faq-title" className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.8] text-gray-200 select-none">
            FAQ.
          </h2>
          <p className="text-xl font-medium text-gray-500 mt-12 max-w-xs">
            Got questions? We've got answers. Everything you need to know about working with us.
          </p>
        </div>

        <div className="divide-y divide-gray-100" role="list">
          {faqs.map((faq, i) => (
            <div key={i} className="py-8 group" role="listitem">
              <button 
                className="w-full flex items-center justify-between gap-8 text-left focus:ring-2 focus:ring-accent focus:ring-inset outline-none rounded-lg p-2 transition-all"
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <h3 className={`text-xl font-bold tracking-tight transition-colors ${active === i ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
                  {faq.q}
                </h3>
                <div 
                  className={`w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-xs transition-transform flex-shrink-0 ${active === i ? 'rotate-45 bg-black text-white' : ''}`}
                  aria-hidden="true"
                >
                  +
                </div>
              </button>
              <div 
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={`mt-6 text-gray-500 leading-relaxed max-w-md transition-all duration-300 ${active === i ? 'block animate-in fade-in slide-in-from-top-2' : 'hidden'}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
