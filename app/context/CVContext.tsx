'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CVData, CVStyle, Experience, Education, SkillCategory, PersonalInfo } from '../types/cv';
import defaultCV from '../lib/defaultCV';
import { storage, STORAGE_KEYS } from '../lib/storage';

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
}

const CVContext = createContext<CVContextValue | undefined>(undefined);

function uid() {
  return crypto.randomUUID();
}

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cv, setCv] = useState<CVData>(defaultCV);

  useEffect(() => {
    const parsed = storage.get<CVData>(STORAGE_KEYS.CV);
    if (parsed) {
      // merge style so new fields get defaults if missing from old data
      setCv({ ...defaultCV, ...parsed, personalInfo: { ...defaultCV.personalInfo, ...parsed.personalInfo }, style: { ...defaultCV.style, ...parsed.style } });
    }
  }, []);

  function save(data: CVData) {
    setCv(data);
    storage.set(STORAGE_KEYS.CV, data);
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
