'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CVData, CVStyle, Experience, Education, SkillCategory, Hobby, PersonalInfo } from '../types/cv';
import defaultCV from '../lib/defaultCV';

interface CVContextValue {
  cv: CVData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateProfile: (text: string) => void;
  updateStyle: (style: Partial<CVStyle>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, data: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;
  addHobby: () => void;
  updateHobby: (id: string, data: Partial<Hobby>) => void;
  removeHobby: (id: string) => void;
}

const CVContext = createContext<CVContextValue | null>(null);

function uid() {
  return Math.random().toString(36).slice(2);
}

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cv, setCv] = useState<CVData>(defaultCV);

  useEffect(() => {
    const stored = localStorage.getItem('cv-data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CVData;
        // merge style so new fields get defaults if missing from old data
        setCv({ ...defaultCV, ...parsed, style: { ...defaultCV.style, ...parsed.style } });
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  function save(data: CVData) {
    setCv(data);
    localStorage.setItem('cv-data', JSON.stringify(data));
  }

  const updatePersonalInfo = (info: Partial<PersonalInfo>) =>
    save({ ...cv, personalInfo: { ...cv.personalInfo, ...info } });

  const updateProfile = (text: string) => save({ ...cv, profile: text });

  const updateStyle = (style: Partial<CVStyle>) =>
    save({ ...cv, style: { ...cv.style, ...style } });

  const addExperience = () =>
    save({
      ...cv,
      experience: [
        ...cv.experience,
        { id: uid(), position: '', company: '', startYear: '', endYear: '', bullets: [] },
      ],
    });

  const updateExperience = (id: string, data: Partial<Experience>) =>
    save({
      ...cv,
      experience: cv.experience.map((e) => (e.id === id ? { ...e, ...data } : e)),
    });

  const removeExperience = (id: string) =>
    save({ ...cv, experience: cv.experience.filter((e) => e.id !== id) });

  const addEducation = () =>
    save({
      ...cv,
      education: [
        ...cv.education,
        { id: uid(), degree: '', institution: '', startYear: '', endYear: '' },
      ],
    });

  const updateEducation = (id: string, data: Partial<Education>) =>
    save({
      ...cv,
      education: cv.education.map((e) => (e.id === id ? { ...e, ...data } : e)),
    });

  const removeEducation = (id: string) =>
    save({ ...cv, education: cv.education.filter((e) => e.id !== id) });

  const addSkillCategory = () =>
    save({ ...cv, technicalSkills: [...cv.technicalSkills, { id: uid(), name: '', items: [] }] });

  const updateSkillCategory = (id: string, data: Partial<SkillCategory>) =>
    save({ ...cv, technicalSkills: cv.technicalSkills.map((s) => (s.id === id ? { ...s, ...data } : s)) });

  const removeSkillCategory = (id: string) =>
    save({ ...cv, technicalSkills: cv.technicalSkills.filter((s) => s.id !== id) });

  const addHobby = () =>
    save({ ...cv, hobbies: [...cv.hobbies, { id: uid(), name: '', icon: '⭐' }] });

  const updateHobby = (id: string, data: Partial<Hobby>) =>
    save({ ...cv, hobbies: cv.hobbies.map((h) => (h.id === id ? { ...h, ...data } : h)) });

  const removeHobby = (id: string) =>
    save({ ...cv, hobbies: cv.hobbies.filter((h) => h.id !== id) });

  return (
    <CVContext.Provider
      value={{
        cv,
        updatePersonalInfo,
        updateProfile,
        updateStyle,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkillCategory,
        updateSkillCategory,
        removeSkillCategory,
        addHobby,
        updateHobby,
        removeHobby,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCV must be used within CVProvider');
  return ctx;
}
