'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useCV } from '../../context/CVContext';
import { useTranslation } from 'react-i18next';
import { FONT_OPTIONS, loadGoogleFont } from '../../lib/fonts';
import { SectionHeader } from './shared';

export function StyleSection({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { cv, updateStyle } = useCV();
  const { t } = useTranslation();

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SectionHeader title={t('style')} open={open} />
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
  );
}
