
import React from 'react';
import { Content } from '../types';

interface SolutionsProps {
  content: Content['solutions'];
}

const Solutions: React.FC<SolutionsProps> = ({ content }) => {
  return (
    <section className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl reveal">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Our Expertise</h2>
          <h3 className="text-4xl md:text-6xl font-bold leading-tight">
            {content.title}
          </h3>
        </div>
        <p className="text-lg text-gray-500 max-w-sm reveal">
          {content.copy}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.items.map((item, idx) => (
          <div key={idx} className="reveal p-8 bg-white border border-gray-100 rounded-3xl hover:border-black transition-all hover:shadow-xl group">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
              <svg className="w-6 h-6 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold leading-tight mb-4">{item}</h4>
            <p className="text-sm text-gray-400">Tailored digital systems designed for high performance and reliability.</p>
          </div>
        ))}
      </div>
      
      <p className="mt-12 text-center text-gray-400 font-medium italic reveal">
        {content.footer}
      </p>
    </section>
  );
};

export default Solutions;
