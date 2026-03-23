import { CVData } from '../types/cv';

const defaultCV: CVData = {
  personalInfo: {
    photo: null,
    name: 'James Parker',
    title: 'Software Developer',
    phone: '+123 456 7890',
    email: 'james@email.com',
    address: 'San Francisco, CA',
    website: 'www.jamesparker.com',
  },
  profile:
    'Results-driven software developer with 7+ years of experience in designing, developing, and deploying scalable web applications. Proficient in modern web technologies and passionate about writing clean, efficient, and maintainable code.',
  experience: [
    {
      id: '1',
      position: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startYear: '2018',
      endYear: 'Present',
      bullets: [
        'Lead the development of customer-facing web applications, improved application performance by 30% through code optimization',
        'Mentored junior developers through code reviews and pair programming.',
      ],
    },
    {
      id: '2',
      position: 'Full Stack Developer',
      company: 'Web Innovate LLC',
      startYear: '2015',
      endYear: '2018',
      bullets: [
        'Build responsive web applications using JavaScript, React, and Node.js.',
        'Collaborated with designers and product managers to deliver features.',
        'Write API endpoints and worked with databases.',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.Sc. in Computer Science',
      institution: 'University of California',
      startYear: '2011',
      endYear: '2015',
    },
    {
      id: '2',
      degree: 'Diploma in Software Development',
      institution: 'Tech Academy',
      startYear: '2009',
      endYear: '2011',
    },
  ],
  technicalSkills: [
    { id: '1', name: 'Languages', items: ['Python', 'JavaScript/TypeScript', 'Java', 'Go'] },
    { id: '2', name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Vue'] },
    { id: '3', name: 'Backend', items: ['Node.js', 'Django', 'FastAPI', 'Spring Boot'] },
    { id: '4', name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'] },
    { id: '5', name: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform'] },
    { id: '6', name: 'DevOps & CI/CD', items: ['GitHub Actions', 'GitLab CI', 'ArgoCD'] },
    { id: '7', name: 'AI & ML Tools', items: ['LLM integration', 'LangChain', 'RAG pipelines'] },
    { id: '8', name: 'Testing', items: ['Jest', 'Pytest', 'Cypress'] },
    { id: '9', name: 'Version Control', items: ['Git', 'GitHub', 'Jira', 'Confluence'] },
    { id: '10', name: 'Other / Methodologies', items: ['Agile/Scrum', 'REST APIs', 'GraphQL', 'Microservices'] },
  ],
  hobbies: [
    { id: '1', name: 'Coding', icon: '💻' },
    { id: '2', name: 'Chess', icon: '♟️' },
    { id: '3', name: 'Hiking', icon: '🏔️' },
  ],
  style: {
    fontFamily: 'Georgia, serif',
    baseFontSize: 10,
    lineHeight: 1.5,
    sectionSpacing: 18,
    contentPadding: 40,
    headerPadding: 32,
    accentColor: '#2d7aa8',
  },
};

export default defaultCV;
