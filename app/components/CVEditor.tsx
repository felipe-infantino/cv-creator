'use client';

import { useState, useRef } from 'react';
import { useCV } from '../context/CVContext';
import { useLanguage } from '../context/LanguageContext';
import { FONT_OPTIONS, loadGoogleFont } from '../lib/fonts';

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100"
    >
      {title}
      <span className="text-gray-400">{open ? '▲' : '▼'}</span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded border border-gray-200 px-2 py-1.5 text-sm focus:border-[#2d7aa8] focus:outline-none"
      />
    </div>
  );
}

export default function CVEditor() {
  const { cv, updatePersonalInfo, updateProfile, updateStyle,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkillCategory, updateSkillCategory, removeSkillCategory,
  } = useCV();
  const { t } = useLanguage();
  const photoRef = useRef<HTMLInputElement>(null);

  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  const [open, setOpen] = useState<Record<string, boolean>>({
    style: true,
    personal: false,
    profile: false,
    experience: false,
    education: false,
    technicalSkills: false,
  });

  function toggle(key: string) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updatePersonalInfo({ photo: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Style */}
      <div>
        <SectionHeader title={t('style')} open={open.style} onToggle={() => toggle('style')} />
        {open.style && (
          <div className="mt-2 flex flex-col gap-4 rounded-lg border border-gray-100 p-4">
            {/* Font family */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">{t('fontFamily')}</label>
              <select
                value={cv.style.fontFamily}
                onChange={(e) => {
                  const selected = FONT_OPTIONS.find((f) => f.value === e.target.value);
                  if (selected?.googleFamily) loadGoogleFont(selected.googleFamily);
                  updateStyle({ fontFamily: e.target.value });
                }}
                className="rounded border border-gray-200 px-2 py-1.5 text-sm focus:border-[#2d7aa8] focus:outline-none"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
              <span className="text-xs text-gray-400" style={{ fontFamily: cv.style.fontFamily }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>

            {/* Accent color */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">{t('accentColor')}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={cv.style.accentColor}
                  onChange={(e) => updateStyle({ accentColor: e.target.value })}
                  className="h-8 w-14 cursor-pointer rounded border border-gray-200 p-0.5"
                />
                <span className="text-sm text-gray-600">{cv.style.accentColor}</span>
              </div>
            </div>

            {/* Base font size */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                {t('baseFontSize')} — <span className="font-semibold text-gray-700">{cv.style.baseFontSize}px</span>
              </label>
              <input
                type="range" min={8} max={14} step={0.5}
                value={cv.style.baseFontSize}
                onChange={(e) => updateStyle({ baseFontSize: Number(e.target.value) })}
                className="accent-[#2d7aa8]"
              />
              <div className="flex justify-between text-xs text-gray-400"><span>8px</span><span>14px</span></div>
            </div>

            {/* Line height */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                {t('lineHeight')} — <span className="font-semibold text-gray-700">{cv.style.lineHeight}</span>
              </label>
              <input
                type="range" min={1.2} max={2.0} step={0.05}
                value={cv.style.lineHeight}
                onChange={(e) => updateStyle({ lineHeight: Number(e.target.value) })}
                className="accent-[#2d7aa8]"
              />
              <div className="flex justify-between text-xs text-gray-400"><span>1.2</span><span>2.0</span></div>
            </div>

          </div>
        )}
      </div>

      {/* Personal Info */}
      <div>
        <SectionHeader title={t('personalInfo')} open={open.personal} onToggle={() => toggle('personal')} />
        {open.personal && (
          <div className="mt-2 flex flex-col gap-3 rounded-lg border border-gray-100 p-4">
            {/* Photo */}
            <div className="flex items-center gap-3">
              {cv.personalInfo.photo ? (
                <img
                  src={cv.personalInfo.photo}
                  alt="profile"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-[#2d7aa8]"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl text-gray-400">
                  👤
                </div>
              )}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => photoRef.current?.click()}
                  className="rounded bg-[#2d7aa8] px-3 py-1 text-xs text-white hover:bg-[#235f87]"
                >
                  {t('uploadPhoto')}
                </button>
                {cv.personalInfo.photo && (
                  <button
                    onClick={() => updatePersonalInfo({ photo: null })}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    {t('removePhoto')}
                  </button>
                )}
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>
            </div>
            <Field label={t('fullName')} value={cv.personalInfo.name} onChange={(v) => updatePersonalInfo({ name: v })} />
            <Field label={t('jobTitle')} value={cv.personalInfo.title} onChange={(v) => updatePersonalInfo({ title: v })} />
            <Field label={t('phone')} value={cv.personalInfo.phone} onChange={(v) => updatePersonalInfo({ phone: v })} />
            <Field label={t('email')} value={cv.personalInfo.email} onChange={(v) => updatePersonalInfo({ email: v })} />
            <Field label={t('address')} value={cv.personalInfo.address} onChange={(v) => updatePersonalInfo({ address: v })} />
            <Field label={t('website')} value={cv.personalInfo.website} onChange={(v) => updatePersonalInfo({ website: v })} />
            <Field label={t('github')} value={cv.personalInfo.github} onChange={(v) => updatePersonalInfo({ github: v })} placeholder="github.com/username" />
            <Field label={t('linkedin')} value={cv.personalInfo.linkedin} onChange={(v) => updatePersonalInfo({ linkedin: v })} placeholder="linkedin.com/in/username" />
          </div>
        )}
      </div>

      {/* Profile */}
      <div>
        <SectionHeader title={t('profile')} open={open.profile} onToggle={() => toggle('profile')} />
        {open.profile && (
          <div className="mt-2 rounded-lg border border-gray-100 p-4">
            <textarea
              value={cv.profile}
              onChange={(e) => updateProfile(e.target.value)}
              rows={5}
              className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:border-[#2d7aa8] focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Experience */}
      <div>
        <SectionHeader title={t('experience')} open={open.experience} onToggle={() => toggle('experience')} />
        {open.experience && (
          <div className="mt-2 flex flex-col gap-4 rounded-lg border border-gray-100 p-4">
            {cv.experience.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-2 rounded border border-gray-200 p-3">
                <Field label={t('position')} value={exp.position} onChange={(v) => updateExperience(exp.id, { position: v })} />
                <Field label={t('company')} value={exp.company} onChange={(v) => updateExperience(exp.id, { company: v })} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label={t('startYear')} value={exp.startYear} onChange={(v) => updateExperience(exp.id, { startYear: v })} placeholder="2020" />
                  <Field label={t('endYear')} value={exp.endYear} onChange={(v) => updateExperience(exp.id, { endYear: v })} placeholder="Present" />
                </div>
                {/* Bullets */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-500">Bullets</label>
                  {exp.bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-1">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const bullets = [...exp.bullets];
                          bullets[i] = e.target.value;
                          updateExperience(exp.id, { bullets });
                        }}
                        className="flex-1 rounded border border-gray-200 px-2 py-1 text-sm focus:border-[#2d7aa8] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const bullets = exp.bullets.filter((_, j) => j !== i);
                          updateExperience(exp.id, { bullets });
                        }}
                        className="text-red-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => updateExperience(exp.id, { bullets: [...exp.bullets, ''] })}
                    className="mt-1 text-left text-xs text-[#2d7aa8] hover:underline"
                  >
                    + {t('addBullet')}
                  </button>
                </div>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="self-end text-xs text-red-400 hover:text-red-600"
                >
                  {t('removeEntry')}
                </button>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="rounded bg-[#2d7aa8] px-3 py-1.5 text-sm text-white hover:bg-[#235f87]"
            >
              + {t('addEntry')}
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div>
        <SectionHeader title={t('education')} open={open.education} onToggle={() => toggle('education')} />
        {open.education && (
          <div className="mt-2 flex flex-col gap-4 rounded-lg border border-gray-100 p-4">
            {cv.education.map((edu) => (
              <div key={edu.id} className="flex flex-col gap-2 rounded border border-gray-200 p-3">
                <Field label={t('degree')} value={edu.degree} onChange={(v) => updateEducation(edu.id, { degree: v })} />
                <Field label={t('institution')} value={edu.institution} onChange={(v) => updateEducation(edu.id, { institution: v })} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label={t('startYear')} value={edu.startYear} onChange={(v) => updateEducation(edu.id, { startYear: v })} placeholder="2011" />
                  <Field label={t('endYear')} value={edu.endYear} onChange={(v) => updateEducation(edu.id, { endYear: v })} placeholder="2015" />
                </div>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="self-end text-xs text-red-400 hover:text-red-600"
                >
                  {t('removeEntry')}
                </button>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="rounded bg-[#2d7aa8] px-3 py-1.5 text-sm text-white hover:bg-[#235f87]"
            >
              + {t('addEntry')}
            </button>
          </div>
        )}
      </div>

      {/* Technical Skills */}
      <div>
        <SectionHeader title={t('technicalSkills')} open={open.technicalSkills} onToggle={() => toggle('technicalSkills')} />
        {open.technicalSkills && (
          <div className="mt-2 flex flex-col gap-3 rounded-lg border border-gray-100 p-4">
            {cv.technicalSkills.map((cat) => (
              <div key={cat.id} className="flex flex-col gap-1 rounded border border-gray-200 p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => updateSkillCategory(cat.id, { name: e.target.value })}
                    placeholder={t('categoryName')}
                    className="flex-1 rounded border border-gray-200 px-2 py-1 text-sm font-medium focus:border-[#2d7aa8] focus:outline-none"
                  />
                  <button onClick={() => removeSkillCategory(cat.id)} className="text-red-400 hover:text-red-600">✕</button>
                </div>
                <input
                  type="text"
                  value={skillInputs[cat.id] ?? cat.items.join(', ')}
                  onChange={(e) => setSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                  onBlur={(e) => {
                    const items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                    updateSkillCategory(cat.id, { items });
                    setSkillInputs((prev) => ({ ...prev, [cat.id]: items.join(', ') }));
                  }}
                  placeholder={t('categoryItems')}
                  className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 focus:border-[#2d7aa8] focus:outline-none"
                />
                {cat.items.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cat.items.map((item, i) => (
                      <span key={i} className="rounded bg-[#2d7aa8]/10 px-2 py-0.5 text-xs text-[#2d7aa8]">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={addSkillCategory} className="rounded bg-[#2d7aa8] px-3 py-1.5 text-sm text-white hover:bg-[#235f87]">
              + {t('addEntry')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
