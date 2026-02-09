
import { Content } from './types';

export const ASSETS = {
  HERO_VIDEO: "https://player.vimeo.com/external/517728441.sd.mp4?s=7b99c0379f8266205e45a909a32c322b54248443&profile_id=164&oauth2_token_id=57447761",
  TEAM: {
    LUHUR: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800",
    MICHAEL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800"
  }
};

export const CONTENT: Record<'EN' | 'ID', Content> = {
  EN: {
    nav: {
      solutions: "Solutions",
      work: "Portfolios",
      about: "About Us",
      contact: "Contact"
    },
    hero: {
      headline: "Digital Systems That Turn Data Into Decisions",
      subheadline: "Slashtech helps businesses and institutions build data-driven websites, applications, and dashboards to gain operational control and make better decisions.",
      valueStatement: "We don't just build digital products. We build systems that are used, monitored, and trusted for decision-making.",
      cta1: "Discuss Your Project",
      cta2: "See Our Work"
    },
    aboutUs: {
      title: "Designing for Resilience.",
      subtitle: "Slashtech is more than a digital agency; we are system architects focused on the critical intersection of data and human decision-making.",
      mission: {
        title: "Our Mission",
        text: "To bridge the gap between complex data and actionable decisions through resilient, high-performance digital systems."
      },
      vision: {
        title: "Our Vision",
        text: "To become the global standard for data-driven operational control, empowering teams to move with precision."
      },
      values: {
        title: "Core Values",
        items: [
          { name: "Functionality First", description: "Aesthetics serve purpose. We prioritize clarity and utility." },
          { name: "Resilient Architecture", description: "Systems built to withstand scale and critical failure." },
          { name: "Radical Transparency", description: "Data integrity is our baseline. No assumptions, only facts." }
        ]
      }
    },
    problem: {
      title: "Why Most Digital Systems Fail to Deliver Impact",
      copy: "Many organizations invest in digital solutions, yet struggle to gain real value from them. Common challenges include:",
      challenges: [
        "Data scattered across multiple systems",
        "Reports that are delayed and not actionable",
        "Digital tools that are rarely used consistently",
        "Decisions made based on assumptions instead of data"
      ],
      footer: "Without visibility and monitoring, digital transformation fails to create real business impact."
    },
    solutions: {
      title: "Our Data-Driven Digital Solutions",
      copy: "Slashtech designs and builds digital systems that connect data, processes, and people into a single, reliable source of insight.",
      items: [
        "Business Process Digitalization (ERP, CRM, POS)",
        "Custom Web & Mobile Applications",
        "Data & Analytics Platforms",
        "Dashboard & Decision Support Systems",
        "Monitoring & Reporting Systems",
        "AI Consulting (use-case driven)"
      ],
      footer: "Every solution is designed to be scalable, measurable, and aligned with business objectives."
    },
    howItWorks: {
      title: "How We Work",
      steps: [
        { title: "Understand the Business", description: "We start by understanding your processes, data, and decision-making needs." },
        { title: "Design the System", description: "We design system architecture, dashboards, and workflows aligned with your objectives." },
        { title: "Build & Integrate", description: "We develop, integrate, and validate the system across data sources." },
        { title: "Monitor & Improve", description: "We ensure visibility, reporting, and continuous improvement after go-live." }
      ]
    },
    impact: {
      title: "What Clients Achieve with Slashtech",
      outcomes: [
        "Real-time operational visibility",
        "Faster and more accurate decision-making",
        "Improved efficiency and reduced bottlenecks",
        "Scalable systems that grow with the business",
        "Data transparency for management and stakeholders"
      ]
    },
    industry: {
      title: "Built for Teams That Need Control",
      sectors: [
        "SME & growing businesses",
        "Enterprise & corporate teams",
        "Government & public institutions",
        "Digital partners & agencies"
      ]
    },
    portfolio: {
      title: "Selected Case Studies",
      projects: [
        {
          id: "CASE_TL_2024",
          title: "Telco Network Monitoring",
          category: "Infrastructure",
          description: "A mission-critical dashboard monitoring 400+ BTS nodes with automated incident response triggers.",
          metric: "400+",
          metricLabel: "Nodes Monitored",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
          tags: ["Real-time", "Dashboard", "System Architecture"]
        },
        {
          id: "CASE_GOV_2023",
          title: "Public Service Analytics",
          category: "Government",
          description: "Data-driven platform for regional government to track public spending and service efficiency.",
          metric: "32%",
          metricLabel: "Efficiency Gain",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
          tags: ["Big Data", "Analytics", "Security"]
        },
        {
          id: "CASE_ENT_2025",
          title: "ERP Custom Integration",
          category: "Enterprise",
          description: "Seamless synchronization between legacy inventory systems and modern sales pipelines.",
          metric: "24/7",
          metricLabel: "Uptime Guaranteed",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
          tags: ["Integration", "Cloud", "Business Logic"]
        }
      ]
    },
    whyChoose: {
      title: "Why Teams Choose Slashtech",
      reasons: [
        "Led by professionals with over 20 years of experience",
        "Proven experience in enterprise & government environments",
        "Familiar with SLA-driven and mission-critical systems",
        "Focused on long-term impact, not just delivery"
      ]
    },
    testimonials: {
      title: "Trusted by Decision Makers",
      items: [
        {
          quote: "The decision-making speed in our organization improved significantly after implementing Slashtech's custom dashboard. We finally have real-time visibility.",
          author: "Sarah Chen",
          role: "Chief Operating Officer",
          company: "Global Logistics",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
        },
        {
          quote: "Slashtech didn't just give us a tool; they gave us a strategic advantage. Their understanding of complex enterprise systems is unmatched in the region.",
          author: "Budi Santoso",
          role: "Head of Digital Transformation",
          company: "TechCorp Indonesia",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1000px-IBM_logo.svg.png"
        },
        {
          quote: "Reliable, fast, and results-oriented. The BTS monitoring system they built has been a game-changer for our national field operations and response times.",
          author: "James Miller",
          role: "Technical Director",
          company: "TelcoConnect",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Oracle_Logo.svg/2560px-Oracle_Logo.svg.png"
        }
      ]
    },
    partnership: {
      title: "Built to Collaborate",
      copy: "We actively collaborate with consultants, digital agencies, and technology partners to deliver better outcomes for clients."
    },
    finalCta: {
      title: "Let's Build a System That Actually Works",
      copy: "If you're looking for a digital solution that truly supports your operations and decision-making, let's start with a conversation.",
      cta1: "Book a Consultation",
      cta2: "Talk to Our Team"
    }
  },
  ID: {
    nav: {
      solutions: "Solusi",
      work: "Portofolio",
      about: "Tentang Kami",
      contact: "Hubungi"
    },
    hero: {
      headline: "Sistem Digital Berbasis Data untuk Pengambilan Keputusan yang Lebih Tepat",
      subheadline: "Slashtech membantu bisnis dan institusi membangun website, aplikasi, dan dashboard berbasis data untuk meningkatkan kontrol operasional dan kualitas pengambilan keputusan.",
      valueStatement: "Kami tidak sekadar membuat produk digital. Kami membangun sistem yang benar-benar digunakan, dipantau, dan dipercaya sebagai dasar pengambilan keputusan.",
      cta1: "Diskusikan Proyek Anda",
      cta2: "Lihat Portofolio"
    },
    aboutUs: {
      title: "Merancang untuk Ketahanan.",
      subtitle: "Slashtech lebih dari sekadar arsitek sistem; kami berfokus pada titik kritis antara data dan pengambilan keputusan manusia.",
      mission: {
        title: "Misi Kami",
        text: "Menjembatani kesenjangan antara data kompleks dan keputusan strategis melalui sistem digital yang tangguh dan berperforma tinggi."
      },
      vision: {
        title: "Visi Kami",
        text: "Menjadi standar global dalam kontrol operasional berbasis data, memberdayakan tim untuk bergerak dengan presisi."
      },
      values: {
        title: "Nilai-Nilai Inti",
        items: [
          { name: "Fungsionalitas Utama", description: "Estetika melayani tujuan. Kami memprioritaskan kejelasan dan kegunaan." },
          { name: "Arsitektur Tangguh", description: "Sistem yang dibangun untuk skala besar dan kegagalan kritis." },
          { name: "Transparansi Radikal", description: "Integritas data adalah dasar kami. Tidak ada asumsi, hanya fakta." }
        ]
      }
    },
    problem: {
      title: "Mengapa Banyak Sistem Digital Tidak Memberikan Dampak Nyata",
      copy: "Banyak organisasi telah berinvestasi pada solusi digital, namun masih kesulitan mendapatkan manfaat yang nyata. Tantangan yang umum terjadi antara lain:",
      challenges: [
        "Data tersebar di berbagai sistem",
        "Laporan terlambat dan tidak dapat ditindaklanjuti",
        "Sistem digital jarang digunakan secara konsisten",
        "Keputusan masih berbasis asumsi, bukan data"
      ],
      footer: "Tanpa visibilitas dan monitoring yang baik, digitalisasi tidak akan menghasilkan dampak bisnis yang signifikan."
    },
    solutions: {
      title: "Solusi Digital Berbasis Data dari Slashtech",
      copy: "Slashtech merancang dan membangun sistem digital yang menghubungkan data, proses, dan pengguna menjadi satu sumber informasi yang andal.",
      items: [
        "Digitalisasi Proses Bisnis (ERP, CRM, POS)",
        "Aplikasi Web & Mobile Kustom",
        "Platform Data & Analitik",
        "Dashboard & Decision Support System",
        "Sistem Monitoring & Pelaporan",
        "Konsultasi AI berbasis kebutuhan bisnis"
      ],
      footer: "Setiap solusi dirancang agar mudah dikembangkan, terukur, dan selaras dengan tujuan bisnis."
    },
    howItWorks: {
      title: "Cara Kami Bekerja",
      steps: [
        { title: "Memahami Bisnis", description: "Kami memulai dengan memahami proses, data, dan kebutuhan pengambilan keputusan Anda." },
        { title: "Merancang Sistem", description: "Kami merancang arsitektur sistem, dashboard, dan alur kerja sesuai tujuan organisasi." },
        { title: "Membangun & Integrasi", description: "Kami mengembangkan dan mengintegrasikan sistem dengan berbagai sumber data." },
        { title: "Monitoring & Pengembangan", description: "Kami memastikan sistem dapat dipantau dan terus disempurnakan setelah digunakan." }
      ]
    },
    impact: {
      title: "Dampak yang Dirasakan Klien Slashtech",
      outcomes: [
        "Visibilitas operasional secara real-time",
        "Pengambilan keputusan yang lebih cepat dan akurat",
        "Efisiensi proses dan pengurangan hambatan operasional",
        "Sistem yang siap berkembang mengikuti bisnis",
        "Transparansi data bagi manajemen dan pemangku kepentingan"
      ]
    },
    industry: {
      title: "Dirancang untuk Tim yang Membutuhkan Kontrol",
      sectors: [
        "UMKM dan bisnis yang sedang bertumbuh",
        "Perusahaan dan tim enterprise",
        "Instansi pemerintah dan sektor publik",
        "Mitra digital dan agensi"
      ]
    },
    portfolio: {
      title: "Portofolio Terpilih",
      projects: [
        {
          id: "CASE_TL_2024",
          title: "Monitoring Jaringan Telko",
          category: "Infrastruktur",
          description: "Dashboard kritikal memantau 400+ BTS dengan pemicu respon insiden otomatis.",
          metric: "400+",
          metricLabel: "Node Dipantau",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
          tags: ["Real-time", "Dashboard", "Arsitektur Sistem"]
        },
        {
          id: "CASE_GOV_2023",
          title: "Analitik Layanan Publik",
          category: "Pemerintahan",
          description: "Platform data untuk pemerintah daerah melacak pengeluaran publik dan efisiensi layanan.",
          metric: "32%",
          metricLabel: "Peningkatan Efisiensi",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
          tags: ["Big Data", "Analitik", "Keamanan"]
        },
        {
          id: "CASE_ENT_2025",
          title: "Integrasi Kustom ERP",
          category: "Enterprise",
          description: "Sinkronisasi mulus antara sistem inventaris legacy dan pipeline penjualan modern.",
          metric: "24/7",
          metricLabel: "Uptime Terjamin",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
          tags: ["Integrasi", "Cloud", "Logika Bisnis"]
        }
      ]
    },
    whyChoose: {
      title: "Mengapa Memilih Slashtech",
      reasons: [
        "Dipimpin oleh profesional dengan pengalaman lebih dari 20 tahun",
        "Berpengalaman di lingkungan enterprise dan pemerintahan",
        "Terbiasa menangani sistem kritikal berbasis SLA",
        "Fokus pada dampak jangka panjang, bukan sekadar penyelesaian proyek"
      ]
    },
    testimonials: {
      title: "Dipercaya Oleh Para Pemimpin",
      items: [
        {
          quote: "Kecepatan pengambilan keputusan di organisasi kami meningkat pesat setelah menggunakan dashboard kustom dari Slashtech. Akhirnya kami punya visibilitas real-time.",
          author: "Sarah Chen",
          role: "Chief Operating Officer",
          company: "Global Logistics",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
        },
        {
          quote: "Slashtech tidak hanya memberi kami alat, tapi keunggulan strategis. Pemahaman mereka akan sistem enterprise yang kompleks sangat luar biasa.",
          author: "Budi Santoso",
          role: "Head of Digital Transformation",
          company: "TechCorp Indonesia",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1000px-IBM_logo.svg.png"
        },
        {
          quote: "Andal, cepat, dan berorientasi hasil. Sistem monitoring BTS yang mereka bangun telah mengubah cara kerja tim lapangan kami secara nasional.",
          author: "James Miller",
          role: "Technical Director",
          company: "TelcoConnect",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Oracle_Logo.svg/2560px-Oracle_Logo.svg.png"
        }
      ]
    },
    partnership: {
      title: "Siap Berkolaborasi",
      copy: "Kami terbuka untuk kolaborasi dengan konsultan, agensi digital, dan mitra teknologi untuk menghasilkan solusi yang lebih optimal."
    },
    finalCta: {
      title: "Mari Bangun Sistem Digital yang Benar-Benar Bekerja",
      copy: "Jika Anda membutuhkan solusi digital yang benar-benar mendukung operasional dan pengambilan keputusan, mari mulai dari diskusi.",
      cta1: "Jadwalkan Konsultasi",
      cta2: "Hubungi Tim Kami"
    }
  }
};
