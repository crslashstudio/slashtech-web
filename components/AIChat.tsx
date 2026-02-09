import React, { useState, useRef, useEffect, memo } from 'react';
import { getAIStream } from '../services/gemini';
import { marked } from 'marked';

declare var gsap: any;

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface SystemUIData {
  type: 'DASHBOARD' | 'INFRASTRUCTURE' | 'ROADMAP';
  title: string;
  data: any;
}

const STORAGE_KEY = 'slashtech_chat_history';

const INITIAL_PROMPTS = {
  EN: [
    "What services do you offer?", 
    "How do you monitor 400+ BTS?", 
    "Dashboard for logistics?", 
    "How do I start a project?",
    "Tech stack used"
  ],
  ID: [
    "Layanan apa saja?", 
    "Bagaimana monitor 400+ BTS?", 
    "Dashboard logistik?", 
    "Cara mulai proyek?",
    "Teknologi yang digunakan"
  ]
};

const SystemUI = ({ data }: { data: SystemUIData }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && containerRef.current) {
      gsap.fromTo(containerRef.current.querySelectorAll('.ui-anim'), 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [data]);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {data.data.metrics?.map((m: any, i: number) => (
          <div key={i} className="ui-anim p-3 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[7px] font-black uppercase text-white/30 tracking-widest mb-1">{m.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-white">{m.value}</span>
              <div className={`w-1 h-1 rounded-full ${m.status === 'up' ? 'bg-green-400' : 'bg-red-400'}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1 h-12">
        {data.data.chart?.map((v: number, i: number) => (
          <div key={i} className="ui-anim flex-1 bg-accent rounded-t-sm" style={{ height: `${v}%` }} />
        ))}
      </div>
    </div>
  );

  const renderInfrastructure = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
         <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Global Load</span>
         <span className="text-xs font-black text-accent">{data.data.load}%</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {data.data.nodes?.map((n: any, i: number) => (
          <div key={i} className="ui-anim flex flex-col items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className={`w-2 h-2 rounded-full ${n.status === 'active' ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} />
            <span className="text-[7px] font-bold text-white/40 uppercase truncate w-full text-center">{n.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoadmap = () => (
    <div className="space-y-4">
      {data.data.steps?.map((s: any, i: number) => (
        <div key={i} className="ui-anim flex gap-4 items-start group">
          <div className="w-5 h-5 rounded-lg bg-accent text-accent-contrast flex items-center justify-center text-[8px] font-black flex-shrink-0 mt-1">
            {i + 1}
          </div>
          <div>
            <h6 className="text-[10px] font-black uppercase text-white tracking-widest mb-1">{s.step}</h6>
            <p className="text-[9px] text-white/40 leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="mt-4 p-6 bg-black rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">{data.title}</h5>
        <div className="px-2 py-0.5 rounded-full border border-white/10 text-[6px] font-black text-white/20 uppercase tracking-widest">Live System</div>
      </div>

      {data.type === 'DASHBOARD' && renderDashboard()}
      {data.type === 'INFRASTRUCTURE' && renderInfrastructure()}
      {data.type === 'ROADMAP' && renderRoadmap()}
      
      <div className="mt-6 pt-4 border-t border-white/5">
        <button className="text-[8px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
          Request full specification <span className="w-1 h-1 bg-accent rounded-full" />
        </button>
      </div>
    </div>
  );
};

const ThinkingIndicator = ({ lang }: { lang: 'EN' | 'ID' }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && gridRef.current) {
      gsap.to(gridRef.current.querySelectorAll('.node'), {
        opacity: 0.1,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        stagger: { grid: [4, 4], from: "center", amount: 1 }
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 bg-theme rounded-2xl border border-theme animate-in fade-in slide-in-from-bottom-2">
      <div ref={gridRef} className="grid grid-cols-4 gap-1.5 w-max">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="node w-1 h-1 rounded-full bg-accent opacity-60" />
        ))}
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted animate-pulse">
        {lang === 'EN' ? 'Processing digital nodes...' : 'Memproses simpul data...'}
      </p>
    </div>
  );
};

const MarkdownRenderer = memo(({ text }: { text: string }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const parse = async () => {
      marked.setOptions({ gfm: true, breaks: true });
      const res = await marked.parse(text);
      setHtml(res);
    };
    parse();
  }, [text]);

  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
});

const MessageItem = memo(({ message, lang }: { message: Message; lang: 'EN' | 'ID' }) => {
  const isUser = message.role === 'user';
  
  let cleanText = message.text;
  let systemData: SystemUIData | null = null;
  
  const uiMatch = message.text.match(/\[SYSTEM_UI:\s*({.*?})\]/);
  if (uiMatch) {
    try {
      systemData = JSON.parse(uiMatch[1]);
      cleanText = message.text.replace(uiMatch[0], '').trim();
    } catch (e) {}
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-[92%] p-5 rounded-[2rem] text-[13px] leading-[1.6] transition-all duration-500 ${
        isUser 
          ? 'bg-black text-white rounded-tr-none shadow-xl' 
          : 'bg-theme text-main rounded-tl-none border border-theme shadow-sm'
      }`}>
        <MarkdownRenderer text={cleanText} />
        {systemData && <SystemUI data={systemData} />}
      </div>
    </div>
  );
});

const AIChat: React.FC<{ lang: 'EN' | 'ID' }> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrollActive = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) try { setMessages(JSON.parse(saved)); } catch (e) {}
  }, []);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen && typeof gsap !== 'undefined' && chatWindowRef.current) {
      gsap.fromTo(chatWindowRef.current, 
        { y: 30, opacity: 0, scale: 0.95, transformOrigin: "bottom right" }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" }
      );
    }
  }, [isOpen]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    isAutoScrollActive.current = scrollHeight - scrollTop - clientHeight < 60;
  };

  useEffect(() => {
    if (isAutoScrollActive.current && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: isLoading ? 'auto' : 'smooth' });
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setIsLoading(true);
    isAutoScrollActive.current = true;

    try {
      const stream = await getAIStream(trimmed, lang);
      if (!stream) throw new Error();
      
      setMessages(prev => [...prev, { role: 'ai', text: '' }]);
      let fullText = '';
      
      for await (const chunk of stream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'ai', text: fullText };
            return updated;
          });
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: lang === 'EN' ? "Network interruption." : "Gangguan jaringan." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm(lang === 'EN' ? "Wipe intelligence history?" : "Hapus riwayat kecerdasan?")) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-end gap-4">
        {isOpen && (
          <div ref={chatWindowRef} className="w-[92vw] md:w-[450px] h-[75vh] md:h-[680px] bg-main rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.3)] border border-theme flex flex-col overflow-hidden transition-colors duration-500">
            {/* Header */}
            <div className="p-6 bg-black text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping absolute inset-0"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-accent relative"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] leading-none mb-0.5">Slashtech Core</span>
                  <span className="text-[7px] font-bold text-white/30 uppercase tracking-widest leading-none">Intelligence Protocol v3.1</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={clearChat} className="p-2 opacity-40 hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 opacity-40 hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-6 space-y-2 no-scrollbar scroll-smooth bg-main/40">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-theme rounded-[2.5rem] flex items-center justify-center mb-6 text-3xl shadow-inner border border-theme">⚡</div>
                  <h4 className="text-2xl font-black tracking-tighter mb-2 text-main">System Ready.</h4>
                  <p className="text-[9px] text-muted font-bold uppercase tracking-[0.3em] opacity-40 max-w-[200px] leading-loose">
                    {lang === 'EN' ? 'Query Slashtech intelligence protocol for system architecture data.' : 'Kueri protokol intelijen Slashtech untuk data arsitektur sistem.'}
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((m, idx) => <MessageItem key={idx} message={m} lang={lang} />)}
                  {isLoading && messages[messages.length-1].role === 'user' && <ThinkingIndicator lang={lang} />}
                </>
              )}
            </div>

            {/* Chips */}
            {!isLoading && (
              <div className="relative border-t border-theme/10 bg-main/20">
                <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar scroll-smooth">
                  <div className="flex gap-2">
                    {INITIAL_PROMPTS[lang].map((p, i) => (
                      <button key={i} onClick={() => sendMessage(p)} className="whitespace-nowrap px-4 py-2 bg-theme border border-theme rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all active:scale-95 shadow-sm">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-6 border-t border-theme bg-main flex items-center gap-4 flex-shrink-0">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={lang === 'EN' ? "Request system data..." : "Minta data sistem..."} className="flex-1 px-6 py-4 bg-theme rounded-2xl text-[13px] outline-none border border-transparent focus:border-accent/20 transition-all font-medium placeholder:opacity-30" />
              <button type="submit" disabled={isLoading || !input.trim()} className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-2xl disabled:opacity-10 transition-all active:scale-90 hover:bg-accent group">
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
          </div>
        )}

        {/* Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="group relative w-16 h-16 md:w-20 md:h-20 bg-black text-white rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all hover:scale-110 active:scale-90 overflow-hidden">
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <svg className="relative w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"} /></svg>
        </button>
      </div>
    </div>
  );
};

export default AIChat;