import { GoogleGenAI } from "@google/genai";

export const getAIStream = async (prompt: string, lang: 'EN' | 'ID') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const context = lang === 'EN' 
    ? `Slashtech: Professional system architects. 
       Specialties: ERP/CRM Integration, BTS/Telco Monitoring, Public Service Analytics, AI Consulting. 
       Approach: Functional, resilient, transparent.
       Projects: 400+ BTS nodes monitored for Telco; 32% efficiency gain for Gov Analytics.`
    : `Slashtech: Arsitek sistem profesional.
       Spesialisasi: Integrasi ERP/CRM, Monitoring BTS/Telko, Analitik Layanan Publik, Konsultasi AI.
       Pendekatan: Fungsional, tangguh, transparan.
       Proyek: 400+ node BTS dipantau; 32% peningkatan efisiensi analitik pemerintah.`;

  const systemInstruction = `You are the Slashtech Intelligence Core.
    ${context}
    - Be authoritative, technical yet accessible, and professional.
    - Format responses with Markdown (use bolding for emphasis, headers for structure).
    - If explaining a system or use case, YOU MUST append a UI block in JSON syntax:
      [SYSTEM_UI: {"type": "DASHBOARD" | "INFRASTRUCTURE" | "ROADMAP", "title": "System Name", "data": {...}}]
    
    UI Type Rules:
    1. DASHBOARD: Use for metrics. Data: {"metrics": [{"label": "Name", "value": "Val", "status": "up"|"down"}], "chart": [numbers]}
    2. INFRASTRUCTURE: Use for health/monitoring. Data: {"nodes": [{"name": "Node A", "status": "active"|"alert"}], "load": number}
    3. ROADMAP: Use for project steps. Data: {"steps": [{"step": "Step 1", "desc": "Info"}]}`;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 800,
        temperature: 0.6,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    return responseStream;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const generateAIImage = async (prompt: string, aspectRatio: "1:1" | "4:3" | "16:9" | "3:4" | "9:16" = "16:9") => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const generateProjectImage = async (title: string, category: string) => {
  const prompt = `A professional, cinematic, hyper-realistic architectural or data visualization shot for a project titled '${title}' in the '${category}' industry. Style: Sophisticated tech aesthetic, depth of field, 8k resolution, clean and modern corporate portfolio photography.`;
  return generateAIImage(prompt, "4:3");
};

export const generateServiceImage = async (serviceName: string) => {
  const prompt = `A high-end, professional, minimalistic abstract digital art representation of '${serviceName}' for a corporate technology website. Style: Blueprint, dark mode, cinematic lighting, ultra-sharp details, vector aesthetic, tech-driven.`;
  return generateAIImage(prompt, "16:9");
};