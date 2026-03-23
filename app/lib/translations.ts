export type Lang = 'en' | 'de';

const translations = {
  en: {
    // Navbar
    exportPDF: 'Export PDF',
    // Style section
    style: 'Style',
    fontFamily: 'Font',
    baseFontSize: 'Base Font Size',
    lineHeight: 'Line Height',
    sectionSpacing: 'Section Spacing',
    contentPadding: 'Horizontal Padding',
    headerPadding: 'Header Padding',
    accentColor: 'Accent Color',
    // Editor sections
    personalInfo: 'Personal Info',
    profile: 'Profile',
    experience: 'Experience',
    education: 'Education',
    technicalSkills: 'Technical Skills',
    hobbies: 'Hobbies',
    // Personal info fields
    fullName: 'Full Name',
    jobTitle: 'Job Title',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    website: 'Website',
    uploadPhoto: 'Upload Photo',
    removePhoto: 'Remove',
    // Experience fields
    position: 'Position',
    company: 'Company',
    startYear: 'Start Year',
    endYear: 'End Year',
    addBullet: 'Add bullet',
    addEntry: 'Add',
    removeEntry: 'Remove',
    // Education fields
    degree: 'Degree',
    institution: 'Institution',
    // Technical skills fields
    categoryName: 'Category',
    categoryItems: 'Technologies (comma-separated)',
    // Hobbies fields
    hobbyName: 'Name',
    hobbyIcon: 'Icon (emoji)',
    // CV Preview sections
    cvProfile: 'PROFILE',
    cvExperience: 'EXPERIENCE',
    cvEducation: 'EDUCATION',
    cvTechnicalSkills: 'TECHNICAL SKILLS',
    cvHobbies: 'HOBBIES',
    present: 'Present',
  },
  de: {
    // Navbar
    exportPDF: 'PDF exportieren',
    // Style section
    style: 'Stil',
    fontFamily: 'Schriftart',
    baseFontSize: 'Schriftgröße',
    lineHeight: 'Zeilenhöhe',
    sectionSpacing: 'Abschnitt-Abstand',
    contentPadding: 'Horizontaler Rand',
    headerPadding: 'Kopfzeilen-Rand',
    accentColor: 'Akzentfarbe',
    // Editor sections
    personalInfo: 'Persönliche Daten',
    profile: 'Profil',
    experience: 'Erfahrung',
    education: 'Ausbildung',
    technicalSkills: 'Technische Fähigkeiten',
    hobbies: 'Hobbys',
    // Personal info fields
    fullName: 'Vollständiger Name',
    jobTitle: 'Berufsbezeichnung',
    phone: 'Telefon',
    email: 'E-Mail',
    address: 'Adresse',
    website: 'Website',
    uploadPhoto: 'Foto hochladen',
    removePhoto: 'Entfernen',
    // Experience fields
    position: 'Position',
    company: 'Unternehmen',
    startYear: 'Startjahr',
    endYear: 'Endjahr',
    addBullet: 'Punkt hinzufügen',
    addEntry: 'Hinzufügen',
    removeEntry: 'Entfernen',
    // Education fields
    degree: 'Abschluss',
    institution: 'Einrichtung',
    // Technical skills fields
    categoryName: 'Kategorie',
    categoryItems: 'Technologien (kommagetrennt)',
    // Hobbies fields
    hobbyName: 'Name',
    hobbyIcon: 'Symbol (Emoji)',
    // CV Preview sections
    cvProfile: 'PROFIL',
    cvExperience: 'ERFAHRUNG',
    cvEducation: 'AUSBILDUNG',
    cvTechnicalSkills: 'TECHNISCHE FÄHIGKEITEN',
    cvHobbies: 'HOBBYS',
    present: 'Heute',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(lang: Lang, key: TranslationKey): string {
  return translations[lang][key];
}

export default translations;
