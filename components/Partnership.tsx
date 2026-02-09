
import React from 'react';
import { Content } from '../types';

interface PartnershipProps {
  content: Content['partnership'];
}

const Partnership: React.FC<PartnershipProps> = ({ content }) => {
  return (
    <section className="py-24 border-y border-gray-100 reveal text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.title}</h2>
        <p className="text-xl text-gray-500 leading-relaxed mb-10">
          {content.copy}
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale items-center">
          <div className="text-3xl font-black italic">AGENCY_X</div>
          <div className="text-3xl font-black italic">TECH_PARTNER</div>
          <div className="text-3xl font-black italic">CONSULT_CO</div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
