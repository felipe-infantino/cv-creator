'use client';

import { useState } from 'react';
import { StyleSection } from './editor/StyleSection';
import { PersonalInfoSection } from './editor/PersonalInfoSection';
import { ProfileSection } from './editor/ProfileSection';
import { ExperienceSection } from './editor/ExperienceSection';
import { EducationSection } from './editor/EducationSection';
import { SkillsSection } from './editor/SkillsSection';

type SectionKey = 'style' | 'personal' | 'profile' | 'experience' | 'education' | 'technicalSkills';

const INITIAL_OPEN: Record<SectionKey, boolean> = {
  style: true,
  personal: false,
  profile: false,
  experience: false,
  education: false,
  technicalSkills: false,
};

export default function CVEditor() {
  const [open, setOpen] = useState(INITIAL_OPEN);

  function toggle(key: SectionKey) {
    return (v: boolean) => setOpen((prev) => ({ ...prev, [key]: v }));
  }

  return (
    <div className="flex flex-col gap-2">
      <StyleSection open={open.style} onOpenChange={toggle('style')} />
      <PersonalInfoSection open={open.personal} onOpenChange={toggle('personal')} />
      <ProfileSection open={open.profile} onOpenChange={toggle('profile')} />
      <ExperienceSection open={open.experience} onOpenChange={toggle('experience')} />
      <EducationSection open={open.education} onOpenChange={toggle('education')} />
      <SkillsSection open={open.technicalSkills} onOpenChange={toggle('technicalSkills')} />
    </div>
  );
}
