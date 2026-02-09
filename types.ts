
export type Language = 'EN' | 'ID';
export type Theme = 'light' | 'dark' | 'fresh';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo: string;
}

export interface Content {
  hero: {
    headline: string;
    subheadline: string;
    valueStatement: string;
    cta1: string;
    cta2: string;
  };
  aboutUs: {
    title: string;
    subtitle: string;
    mission: { title: string; text: string };
    vision: { title: string; text: string };
    values: { title: string; items: { name: string; description: string }[] };
  };
  problem: {
    title: string;
    copy: string;
    challenges: string[];
    footer: string;
  };
  solutions: {
    title: string;
    copy: string;
    items: string[];
    footer: string;
  };
  howItWorks: {
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  impact: {
    title: string;
    outcomes: string[];
  };
  industry: {
    title: string;
    sectors: string[];
  };
  portfolio: {
    title: string;
    projects: Project[];
  };
  whyChoose: {
    title: string;
    reasons: string[];
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  partnership: {
    title: string;
    copy: string;
  };
  finalCta: {
    title: string;
    copy: string;
    cta1: string;
    cta2: string;
  };
  nav: {
    solutions: string;
    work: string;
    about: string;
    contact: string;
  };
}
