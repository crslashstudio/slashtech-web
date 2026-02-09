import React, { useEffect, useRef, useState } from 'react';
import { Content, Project } from '../types';
import { generateProjectImage } from '../services/gemini';

declare var gsap: any;
declare var ScrollTrigger: any;

interface PortfolioProps {
  content: Content['portfolio'];
}

const ProjectCard: React.FC<{ 
  project: Project; 
  index: number; 
  onClick: (p: Project, img: string) => void 
}> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentImage, setCurrentImage] = useState(project.image);
  const [isGenerating, setIsGenerating] = useState(false);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    // Reveal animation
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", 
          scrollTrigger: { trigger: cardRef.current, start: "top 90%" }
        }
      );
    }

    // Auto-generate image if missing
    const autoGenerate = async () => {
      if (!currentImage || currentImage.trim() === '') {
        setIsGenerating(true);
        try {
          const aiImage = await generateProjectImage(project.title, project.category);
          if (aiImage) {
            setCurrentImage(aiImage);
          }
        } catch (error) {
          console.error("Failed to generate AI image for project:", project.title, error);
        } finally {
          setIsGenerating(false);
        }
      }
    };

    autoGenerate();
  }, [project.image, project.title, project.category]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    gsap.to(cardRef.current, { rotateX: -y, rotateY: x, duration: 0.5, ease: "power2.out" });
    gsap.to(imageRef.current, { scale: 1.1, duration: 0.5 });
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    gsap.to(imageRef.current, { scale: 1, duration: 0.8 });
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => !isGenerating && onClick(project, currentImage)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-theme card-theme border-none transition-transform active:scale-95 cursor-pointer ${
        index === 0 ? 'md:col-span-2 aspect-[16/10] md:aspect-[21/9]' : 'aspect-square'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden bg-black/20">
        {isGenerating ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Generating System Visual...</p>
          </div>
        ) : (
          <img 
            ref={imageRef}
            src={currentImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
           <span className="text-[9px] font-mono font-bold text-accent uppercase tracking-widest">{project.category}</span>
           {!isGenerating && <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">→</div>}
        </div>
        <div>
          <h3 className="text-2xl md:text-5xl font-black text-white tracking-tighter mb-2">{project.title}</h3>
          <p className="text-xs md:text-lg text-white/60 font-medium max-w-md hidden md:block">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ content }) => {
  const [selectedProject, setSelectedProject] = useState<{ p: Project; img: string } | null>(null);

  return (
    <section id="work" className="py-20 md:py-40 border-t border-theme">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.4em] mb-4">Latest Work</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-main">
            Case Studies.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {content.projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} onClick={(p, img) => setSelectedProject({p, img})} />
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-4xl bg-main rounded-[2.5rem] overflow-hidden border border-theme max-h-[90vh] flex flex-col">
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img src={selectedProject.img} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent">{selectedProject.p.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-theme"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted">{selectedProject.p.metricLabel}: {selectedProject.p.metric}</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-6">{selectedProject.p.title}</h2>
              <p className="text-lg md:text-2xl text-muted leading-relaxed mb-8">{selectedProject.p.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {selectedProject.p.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-theme border border-theme rounded-full text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>

              <button onClick={() => setSelectedProject(null)} className="w-full py-5 bg-accent text-accent-contrast rounded-full font-black uppercase tracking-widest transition-transform active:scale-95">Close Case Study</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;