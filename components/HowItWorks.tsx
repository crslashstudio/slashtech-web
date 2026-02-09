
import React from 'react';
import { Content } from '../types';

interface HowItWorksProps {
  content: Content['howItWorks'];
}

const HowItWorks: React.FC<HowItWorksProps> = ({ content }) => {
  return (
    <section className="py-24 bg-black text-white rounded-[3rem] px-8 md:px-16 overflow-hidden">
      <div className="reveal mb-20">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
          {content.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {content.steps.map((step, idx) => (
          <div key={idx} className="reveal flex flex-col gap-6 relative">
            <div className="text-8xl font-black text-white/5 absolute -top-12 -left-4 pointer-events-none">
              {idx + 1}
            </div>
            <div className="w-full h-[1px] bg-white/20 mb-4"></div>
            <h4 className="text-2xl font-bold">{step.title}</h4>
            <p className="text-gray-400 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
