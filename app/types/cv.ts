export interface PersonalInfo {
  photo: string | null;
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startYear: string;
  endYear: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: string[];
}

export interface Hobby {
  id: string;
  name: string;
  icon: string;
}

export interface CVStyle {
  fontFamily: string;
  baseFontSize: number;   // px
  lineHeight: number;     // multiplier
  accentColor: string;    // hex
}

export interface CVData {
  personalInfo: PersonalInfo;
  profile: string;
  experience: Experience[];
  education: Education[];
  technicalSkills: SkillCategory[];
  hobbies: Hobby[];
  style: CVStyle;
}
