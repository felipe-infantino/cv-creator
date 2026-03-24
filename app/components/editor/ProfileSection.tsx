'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useCV } from '../../context/CVContext';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from './shared';

export function ProfileSection({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { cv, updateProfile } = useCV();
  const { t } = useTranslation();

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SectionHeader title={t('profile')} open={open} />
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
  );
}
