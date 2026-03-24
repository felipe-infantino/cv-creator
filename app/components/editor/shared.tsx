'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function SectionHeader({ title, open }: { title: string; open: boolean }) {
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

export function Field({
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
