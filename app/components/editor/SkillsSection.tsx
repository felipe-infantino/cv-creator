'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useCV } from '../../context/CVContext';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from './shared';

export function SkillsSection({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { cv, addSkillCategory, updateSkillCategory, removeSkillCategory } = useCV();
  const { t } = useTranslation();
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SectionHeader title={t('technicalSkills')} open={open} />
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
  );
}
