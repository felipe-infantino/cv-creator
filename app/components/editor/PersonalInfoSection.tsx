'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useCV } from '../../context/CVContext';
import { useTranslation } from 'react-i18next';
import { SectionHeader, Field } from './shared';

export function PersonalInfoSection({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { cv, updatePersonalInfo } = useCV();
  const { t } = useTranslation();
  const photoRef = useRef<HTMLInputElement>(null);

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
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SectionHeader title={t('personalInfo')} open={open} />
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
  );
}
