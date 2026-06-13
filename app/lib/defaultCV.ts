import { CVData } from '../types/cv';

const sharedPersonalInfo = {
  photo: null,
  name: 'Felipe Infantino M',
  title: 'FULLSTACK ENGINEER',
  phone: '+123 456 7890',
  email: 'felipe.infantino@icloud.com',
  address: 'Mock address, Berlin, Germany',
  website: 'www.felipeinfantino.com',
  github: 'https://github.com/felipe-infantino',
  linkedin: 'https://linkedin.com/in/felipe-infantino-m-7066b8198/',
};

const sharedStyle = {
  fontFamily: "'Roboto', sans-serif",
  baseFontSize: 10,
  lineHeight: 1.5,
  accentColor: '#2654df',
};

const sharedSkills = [
  { id: '1', name: 'Languages', items: ['TypeScript', 'Python', 'Java'] },
  { id: '2', name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Shadcn', 'MUI'] },
  { id: '3', name: 'Backend', items: ['Nest.js', 'FastAPI', 'Spring Boot', 'REST', 'Websockets', 'JWT'] },
  { id: '4', name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { id: '5', name: 'Cloud & Infrastructure', items: ['AWS', 'EC2', 'S3', 'RDS', 'Lambda', 'VPC', 'IAM'] },
  { id: '6', name: 'DevOps & CI/CD', items: ['GitHub Actions', 'Docker', 'Terraform'] },
  { id: '7', name: 'AI & ML Tools', items: ['LLM integration', 'LangGraph', 'RAG', 'Mastra'] },
  { id: '8', name: 'Testing', items: ['React Testing Library', 'Playwright', 'Pytest'] },
];

const defaultCV: CVData = {
  personalInfo: sharedPersonalInfo,
  profile:
    `Ergebnisorientierter Softwareentwickler
mit über 7 Jahren Erfahrung in der
Konzeption, Entwicklung und Bereitstellung skalierbarer Webanwendungen.
Erfahren im Umgang mit modernen
Webtechnologien und leidenschaftlich engagiert für sauberen, effizienten und wartbaren Code.`,
  experience: [
    {
      id: '1',
      position: 'Fullstack Entwickler',
      company: 'DeepUp GmbH, Bonn',
      startYear: '2022',
      endYear: '2026',
      bullets: [
        'Entwicklung des internen 3D-Tools zur Dokumentation von Untergrundleitungen mit React.js, Three.js und einem Spring-Boot-Backend',
        'Entwicklung einer internen Admin-Anwendung mit rollenbasierter Zugriffsverwaltung fur spezielle administrative Aktionen',
      ],
    },
    {
      id: '2',
      position: 'Fullstack Entwickler',
      company: 'Codecentric AG, Berlin',
      startYear: '2020',
      endYear: '2022',
      bullets: [
        'Mitentwicklung der internen React.js-Oberflache fur SHERLOQ zur manuellen Korrektur fehlerhaft erkannter KI-Datensatze, integriert in einen Camunda-Workflow',
        'Mitentwicklung eines IoT-Personenzahlsystems mit React.js-Frontend, AWS Lambda-Backend und Custom-Raspbian-Image-Generierung fur Raspberry-Pi-basierte Hardwaresensoren',
      ],
    },
    {
      id: '3',
      position: 'Co-Founder & Fullstack Entwickler',
      company: 'Peqas GmbH, Berlin',
      startYear: '2018',
      endYear: '2020',
      bullets: [
        'Eigenstandige Entwicklung eines webbasierten Desktop Page Builders mit Drag-and-Drop-Kachelsystem zur einfachen Erstellung von Webseiten',
        'Umsetzung mit Angular, Firebase und Nest.js',
      ],
    },
    {
      id: '4',
      position: 'Java Entwickler',
      company: 'PIKETEC GmbH, Berlin',
      startYear: '2017',
      endYear: '2018',
      bullets: [
        'Entwicklung eines verteilten Systems mit Jenkins-Plugin zur automatischen Verteilung und parallelen Ausfuhrung von TPT-Test-Suites',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Studium Informatik',
      institution: 'Technische Universitat Berlin',
      startYear: '2017',
      endYear: '2022',
    },
    {
      id: '2',
      degree: 'Studienkolleg',
      institution: 'Technische Universitat Darmstadt',
      startYear: '2016',
      endYear: '2017',
    },
    {
      id: '3',
      degree: 'Schulabschluss',
      institution: 'Deutsche Schule Medellin, Kolumbien',
      startYear: '2002',
      endYear: '2015',
    },
  ],
  technicalSkills: [
    ...sharedSkills,
    { id: '9', name: 'Methodik', items: ['Agile/Scrum', 'Requirements Engineering', 'Technical Design'] },
  ],
  style: sharedStyle,
};

export const defaultCVEn: CVData = {
  personalInfo: sharedPersonalInfo,
  profile:
    `Results-driven software engineer with over 7 years of experience
designing, developing, and deploying scalable web applications.
Proficient in modern web technologies and passionate about writing
clean, efficient, and maintainable code.`,
  experience: [
    {
      id: '1',
      position: 'Fullstack Developer',
      company: 'DeepUp GmbH, Bonn',
      startYear: '2022',
      endYear: '2026',
      bullets: [
        'Developed an internal 3D tool for documenting underground pipelines using React.js, Three.js, and a Spring Boot backend',
        'Built an internal admin application with role-based access control for specialized administrative operations',
      ],
    },
    {
      id: '2',
      position: 'Fullstack Developer',
      company: 'Codecentric AG, Berlin',
      startYear: '2020',
      endYear: '2022',
      bullets: [
        'Co-developed the internal React.js interface for SHERLOQ to manually correct misidentified AI datasets, integrated into a Camunda workflow',
        'Co-developed an IoT people-counting system with a React.js frontend, AWS Lambda backend, and custom Raspbian image generation for Raspberry Pi hardware sensors',
      ],
    },
    {
      id: '3',
      position: 'Co-Founder & Fullstack Developer',
      company: 'Peqas GmbH, Berlin',
      startYear: '2018',
      endYear: '2020',
      bullets: [
        'Independently developed a web-based desktop page builder with a drag-and-drop tile system for easy website creation',
        'Built with Angular, Firebase, and Nest.js',
      ],
    },
    {
      id: '4',
      position: 'Java Developer',
      company: 'PIKETEC GmbH, Berlin',
      startYear: '2017',
      endYear: '2018',
      bullets: [
        'Developed a distributed system with a Jenkins plugin for automatic distribution and parallel execution of TPT test suites',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.Sc. Computer Science',
      institution: 'Technische Universität Berlin',
      startYear: '2017',
      endYear: '2022',
    },
    {
      id: '2',
      degree: 'Foundation Course',
      institution: 'Technische Universität Darmstadt',
      startYear: '2016',
      endYear: '2017',
    },
    {
      id: '3',
      degree: 'High School Diploma',
      institution: 'Deutsche Schule Medellin, Colombia',
      startYear: '2002',
      endYear: '2015',
    },
  ],
  technicalSkills: [
    ...sharedSkills,
    { id: '9', name: 'Methodology', items: ['Agile/Scrum', 'Requirements Engineering', 'Technical Design'] },
  ],
  style: sharedStyle,
};

export default defaultCV;
