import type { ResumeData, ResumeSection } from './types';

const defaultSettings = {
  showProfile: true,
  showSummary: true,
  showExperience: true,
  showEducation: true,
  showProjects: true,
  showSkills: true,
  showCustomSections: true,
};

const defaultSections: ResumeSection[] = ['profile', 'summary', 'experience', 'education', 'projects', 'skills', 'customSections'];

export const initialDataEn: ResumeData = {
  profile: {
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    phone: '+1 (123) 456-7890',
    email: 'jane.doe@example.com',
    address: 'San Francisco, CA',
    photoUrl: 'https://picsum.photos/seed/1/200/200',
  },
  summary:
    'Innovative Senior Software Engineer with over 8 years of experience in designing, developing, and deploying scalable web applications. Proficient in modern JavaScript frameworks, cloud technologies, and agile methodologies. Passionate about creating elegant and efficient solutions to complex problems.',
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: `- Led the development of a new microservices architecture, improving system scalability by 40%.\n- Mentored a team of 5 junior engineers, fostering their growth and improving team productivity.\n- Optimized application performance, reducing page load times by 25% through code splitting and caching strategies.`,
    },
    {
      id: 'exp2',
      title: 'Software Engineer',
      company: 'Innovate Co.',
      location: 'Palo Alto, CA',
      startDate: 'Jun 2016',
      endDate: 'Dec 2019',
      description: `- Developed and maintained key features for a high-traffic e-commerce platform using React and Node.js.\n- Collaborated with product managers and designers to deliver a seamless user experience.\n- Implemented a CI/CD pipeline, reducing deployment time by 50%.`,
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2014',
      endDate: '2016',
    },
     {
      id: 'edu2',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2010',
      endDate: '2014',
    },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'Full-Stack Website Development Project',
      date: 'May 2024',
      description: `- Engineered a full-stack website, integrating front-end and back-end components, with the codebase shared on GitHub for collaborative development.\n- Applied expertise in C# and WebAssembly (Wasm) rendering to create a high-performance game engine, enhancing user interaction and experience.`
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'WebAssembly', 'Version Control with Git', 'Donor Engagement'],
  customSections: [],
  settings: defaultSettings,
  sections: defaultSections,
};

export const initialDataTr: ResumeData = {
  profile: {
    name: 'Ayşe Yılmaz',
    title: 'Kıdemli Yazılım Mühendisi',
    phone: '+90 (555) 123-4567',
    email: 'ayse.yilmaz@example.com',
    address: 'İstanbul, Türkiye',
    photoUrl: 'https://picsum.photos/seed/1/200/200',
  },
  summary:
    'Ölçeklenebilir web uygulamaları tasarlama, geliştirme ve dağıtma konusunda 8 yıldan fazla deneyime sahip yenilikçi Kıdemli Yazılım Mühendisi. Modern JavaScript frameworkleri, bulut teknolojileri ve çevik metodolojilerde yetkin. Karmaşık sorunlara zarif ve verimli çözümler yaratma konusunda tutkulu.',
  experience: [
    {
      id: 'exp1',
      title: 'Kıdemli Yazılım Mühendisi',
      company: 'Teknoloji Çözümleri A.Ş.',
      location: 'İstanbul, Türkiye',
      startDate: 'Oca 2020',
      endDate: 'Günümüz',
      description: `- Yeni bir mikroservis mimarisinin geliştirilmesine liderlik ederek sistem ölçeklenebilirliğini %40 artırdı.\n- 5 genç mühendisten oluşan bir ekibe mentorluk yaparak gelişimlerini destekledi ve ekip verimliliğini artırdı.\n- Kod bölme ve önbellekleme stratejileriyle uygulama performansını optimize ederek sayfa yükleme sürelerini %25 azalttı.`,
    },
    {
      id: 'exp2',
      title: 'Yazılım Mühendisi',
      company: 'İnovasyon Ltd.',
      location: 'Ankara, Türkiye',
      startDate: 'Haz 2016',
      endDate: 'Ara 2019',
      description: `- React ve Node.js kullanarak yüksek trafikli bir e-ticaret platformu için temel özellikleri geliştirdi ve bakımını yaptı.\n- Sorunsuz bir kullanıcı deneyimi sunmak için ürün yöneticileri ve tasarımcılarla işbirliği yaptı.\n- Dağıtım süresini %50 azaltan bir CI/CD boru hattı uyguladı.`,
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Bilgisayar Mühendisliği Yüksek Lisansı',
      institution: 'Orta Doğu Teknik Üniversitesi',
      location: 'Ankara, Türkiye',
      startDate: '2014',
      endDate: '2016',
    },
     {
      id: 'edu2',
      degree: 'Bilgisayar Mühendisliği Lisansı',
      institution: 'Boğaziçi Üniversitesi',
      location: 'İstanbul, Türkiye',
      startDate: '2010',
      endDate: '2014',
    },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'Full-Stack Web Sitesi Geliştirme Projesi',
      date: 'Mayıs 2024',
      description: `- İşbirliğine dayalı geliştirme için kod tabanının GitHub\'da paylaşıldığı, ön uç ve arka uç bileşenlerini entegre eden tam yığın bir web sitesi tasarladı.\n- Kullanıcı etkileşimini ve deneyimini geliştiren yüksek performanslı bir oyun motoru oluşturmak için C# ve WebAssembly (Wasm) oluşturma konusundaki uzmanlığını uyguladı.`
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'WebAssembly', 'Git ile Sürüm Kontrolü', 'Bağışçı Etkileşimi'],
  customSections: [],
  settings: defaultSettings,
  sections: defaultSections,
};
