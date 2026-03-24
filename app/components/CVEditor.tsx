'use client';

import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useCV } from '../context/CVContext';
import { useTranslation } from 'react-i18next';
import { FONT_OPTIONS, loadGoogleFont } from '../lib/fonts';

function SectionHeader({ title, open }: { title: string; open: boolean }) {
  return (
    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted/70">
      {title}
      {open
        ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
        : <ChevronDown className="h-4 w-4 text-muted-foreground" />
      }
    </CollapsibleTrigger>
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
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 text-sm"
      />
    </div>
  );
}

export default function CVEditor() {
  const {
    cv, updatePersonalInfo, updateProfile, updateStyle,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkillCategory, updateSkillCategory, removeSkillCategory,
  } = useCV();
  const { t } = useTranslation();
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

  function setSection(key: string, val: boolean) {
    setOpen((prev) => ({ ...prev, [key]: val }));
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
    <div className="flex flex-col gap-2">

      {/* Style */}
      <Collapsible open={open.style} onOpenChange={(v) => setSection('style', v)}>
        <SectionHeader title={t('style')} open={open.style} />
        <CollapsibleContent>
          <Card className="mt-1 border-border">
            <CardContent className="flex flex-col gap-4 p-4">
              {/* Font family */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">{t('fontFamily')}</Label>
                <Select
                  value={cv.style.fontFamily}
                  onValueChange={(v) => {
                    const selected = FONT_OPTIONS.find((f) => f.value === v);
                    if (selected?.googleFamily) loadGoogleFont(selected.googleFamily);
                    updateStyle({ fontFamily: v });
                  }}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((f) => (
                      <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: cv.style.fontFamily }}>
                  The quick brown fox jumps over the lazy dog
                </span>
              </div>

              {/* Accent color */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">{t('accentColor')}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={cv.style.accentColor}
                    onChange={(e) => updateStyle({ accentColor: e.target.value })}
                    className="h-8 w-14 cursor-pointer rounded border border-border bg-transparent p-0.5"
                  />
                  <span className="text-sm text-muted-foreground">{cv.style.accentColor}</span>
                </div>
              </div>

              {/* Base font size */}
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">
                  {t('baseFontSize')} —{' '}
                  <span className="font-semibold text-foreground">{cv.style.baseFontSize}px</span>
                </Label>
                <Slider
                  min={8} max={14} step={0.5}
                  value={[cv.style.baseFontSize]}
                  onValueChange={([v]) => updateStyle({ baseFontSize: v })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>8px</span><span>14px</span>
                </div>
              </div>

              {/* Line height */}
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">
                  {t('lineHeight')} —{' '}
                  <span className="font-semibold text-foreground">{cv.style.lineHeight}</span>
                </Label>
                <Slider
                  min={1.2} max={2.0} step={0.05}
                  value={[cv.style.lineHeight]}
                  onValueChange={([v]) => updateStyle({ lineHeight: v })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1.2</span><span>2.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Personal Info */}
      <Collapsible open={open.personal} onOpenChange={(v) => setSection('personal', v)}>
        <SectionHeader title={t('personalInfo')} open={open.personal} />
        <CollapsibleContent>
          <Card className="mt-1 border-border">
            <CardContent className="flex flex-col gap-3 p-4">
              {/* Photo */}
              <div className="flex items-center gap-3">
                {cv.personalInfo.photo ? (
                  <img
                    src={cv.personalInfo.photo}
                    alt="profile"
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-primary"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl text-muted-foreground">
                    👤
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => photoRef.current?.click()}
                  >
                    {t('uploadPhoto')}
                  </Button>
                  {cv.personalInfo.photo && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-auto px-0 text-xs text-destructive hover:text-destructive"
                      onClick={() => updatePersonalInfo({ photo: null })}
                    >
                      {t('removePhoto')}
                    </Button>
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
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Profile */}
      <Collapsible open={open.profile} onOpenChange={(v) => setSection('profile', v)}>
        <SectionHeader title={t('profile')} open={open.profile} />
        <CollapsibleContent>
          <Card className="mt-1 border-border">
            <CardContent className="p-4">
              <Textarea
                value={cv.profile}
                onChange={(e) => updateProfile(e.target.value)}
                rows={5}
                className="text-sm"
              />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Experience */}
      <Collapsible open={open.experience} onOpenChange={(v) => setSection('experience', v)}>
        <SectionHeader title={t('experience')} open={open.experience} />
        <CollapsibleContent>
          <Card className="mt-1 border-border">
            <CardContent className="flex flex-col gap-3 p-4">
              {cv.experience.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-2 rounded-lg border border-border p-3">
                  <Field label={t('position')} value={exp.position} onChange={(v) => updateExperience(exp.id, { position: v })} />
                  <Field label={t('company')} value={exp.company} onChange={(v) => updateExperience(exp.id, { company: v })} />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label={t('startYear')} value={exp.startYear} onChange={(v) => updateExperience(exp.id, { startYear: v })} placeholder="2020" />
                    <Field label={t('endYear')} value={exp.endYear} onChange={(v) => updateExperience(exp.id, { endYear: v })} placeholder="Present" />
                  </div>
                  {/* Bullets */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Bullets</Label>
                    {exp.bullets.map((bullet, i) => (
                      <div key={i} className="flex gap-1">
                        <Input
                          value={bullet}
                          onChange={(e) => {
                            const bullets = [...exp.bullets];
                            bullets[i] = e.target.value;
                            updateExperience(exp.id, { bullets });
                          }}
                          className="h-8 flex-1 text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                          onClick={() => {
                            const bullets = exp.bullets.filter((_, j) => j !== i);
                            updateExperience(exp.id, { bullets });
                          }}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 justify-start px-0 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => updateExperience(exp.id, { bullets: [...exp.bullets, ''] })}
                    >
                      <Plus className="mr-1 h-3 w-3" /> {t('addBullet')}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-7 self-end gap-1.5 text-xs text-destructive hover:text-destructive"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> {t('removeEntry')}
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addExperience} className="w-full gap-2">
                <Plus className="h-4 w-4" /> {t('addEntry')}
              </Button>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Education */}
      <Collapsible open={open.education} onOpenChange={(v) => setSection('education', v)}>
        <SectionHeader title={t('education')} open={open.education} />
        <CollapsibleContent>
          <Card className="mt-1 border-border">
            <CardContent className="flex flex-col gap-3 p-4">
              {cv.education.map((edu) => (
                <div key={edu.id} className="flex flex-col gap-2 rounded-lg border border-border p-3">
                  <Field label={t('degree')} value={edu.degree} onChange={(v) => updateEducation(edu.id, { degree: v })} />
                  <Field label={t('institution')} value={edu.institution} onChange={(v) => updateEducation(edu.id, { institution: v })} />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label={t('startYear')} value={edu.startYear} onChange={(v) => updateEducation(edu.id, { startYear: v })} placeholder="2011" />
                    <Field label={t('endYear')} value={edu.endYear} onChange={(v) => updateEducation(edu.id, { endYear: v })} placeholder="2015" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-7 self-end gap-1.5 text-xs text-destructive hover:text-destructive"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> {t('removeEntry')}
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addEducation} className="w-full gap-2">
                <Plus className="h-4 w-4" /> {t('addEntry')}
              </Button>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Technical Skills */}
      <Collapsible open={open.technicalSkills} onOpenChange={(v) => setSection('technicalSkills', v)}>
        <SectionHeader title={t('technicalSkills')} open={open.technicalSkills} />
        <CollapsibleContent>
          <Card className="mt-1 border-border">
            <CardContent className="flex flex-col gap-3 p-4">
              {cv.technicalSkills.map((cat) => (
                <div key={cat.id} className="flex flex-col gap-2 rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={cat.name}
                      onChange={(e) => updateSkillCategory(cat.id, { name: e.target.value })}
                      placeholder={t('categoryName')}
                      className="h-8 flex-1 text-sm font-medium"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                      onClick={() => removeSkillCategory(cat.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Input
                    value={skillInputs[cat.id] ?? cat.items.join(', ')}
                    onChange={(e) => setSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                    onBlur={(e) => {
                      const items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      updateSkillCategory(cat.id, { items });
                      setSkillInputs((prev) => ({ ...prev, [cat.id]: items.join(', ') }));
                    }}
                    placeholder={t('categoryItems')}
                    className="h-8 text-xs"
                  />
                  {cat.items.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSkillCategory} className="w-full gap-2">
                <Plus className="h-4 w-4" /> {t('addEntry')}
              </Button>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

    </div>
  );
}
