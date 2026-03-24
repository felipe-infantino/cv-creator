'use client';

import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useCV } from '../../context/CVContext';
import { useTranslation } from 'react-i18next';
import { SectionHeader, Field } from './shared';

export function ExperienceSection({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { cv, addExperience, updateExperience, removeExperience } = useCV();
  const { t } = useTranslation();

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SectionHeader title={t('experience')} open={open} />
      <CollapsibleContent>
        <Card className="mt-1 border-border">
          <CardContent className="flex flex-col gap-3 p-4">
            {cv.experience.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-2 rounded-lg border border-border p-3">
                <Field label={t('position')} value={exp.position} onChange={(v) => updateExperience(exp.id, { position: v })} />
                <Field label={t('company')} value={exp.company} onChange={(v) => updateExperience(exp.id, { company: v })} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label={t('startYear')} value={exp.startYear} onChange={(v) => updateExperience(exp.id, { startYear: v })} placeholder="2020" />
                  <Field label={t('endYear')} value={exp.endYear} onChange={(v) => updateExperience(exp.id, { endYear: v })} placeholder={t('present')} />
                </div>
                {/* Bullets */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">{t('bullets')}</Label>
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
  );
}
