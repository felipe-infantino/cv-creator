'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useCV } from '../../context/CVContext';
import { useTranslation } from 'react-i18next';
import { SectionHeader, Field } from './shared';

export function EducationSection({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { cv, addEducation, updateEducation, removeEducation } = useCV();
  const { t } = useTranslation();

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SectionHeader title={t('education')} open={open} />
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
  );
}
