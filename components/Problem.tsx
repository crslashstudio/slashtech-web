
import React from 'react';
import { Content } from '../types';

interface ProblemProps {
  content: Content['problem'];
}

const Problem: React.FC<ProblemProps> = ({ content }) => {
  return (
    <section className="py-24 border-t border-theme transition-colors duration-500">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 reveal">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-main">
            {content.title}
          </h2>
        </div>
        
        <div className="md:col-span-7 reveal">
          <p className="text-lg text-muted mb-8 max-w-2xl">
            {content.copy}
          </p>
          
          <ul className="space-y-6 mb-12">
            {content.challenges.map((challenge, idx) => (
              <li key={idx} className="flex gap-4 items-start group">
                <span className="w-6 h-6 rounded-full bg-accent text-accent-contrast text-[10px] flex items-center justify-center flex-shrink-0 mt-1">
                  0{idx + 1}
                </span>
                <span className="text-xl md:text-2xl font-medium text-main group-hover:text-accent transition-colors">
                  {challenge}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="p-6 bg-main border-l-4 border-accent card-theme rounded-r-xl italic text-main">
            {content.footer}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
