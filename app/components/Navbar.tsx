'use client';

import { useState } from 'react';
import { Sun, Moon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useCV } from '../context/CVContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { cv } = useCV();
  const { theme, toggleTheme } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleExportPDF() {
    setIsGenerating(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { CVDocument } = await import('./CVDocument');
      const { registerPDFFonts, mapFontFamilyForPDF } = await import('../lib/pdfFonts');

      registerPDFFonts();

      const labels = {
        profile: t('cvProfile'),
        experience: t('cvExperience'),
        education: t('cvEducation'),
        technicalSkills: t('cvTechnicalSkills'),
      };

      const mappedCV = {
        ...cv,
        style: { ...cv.style, fontFamily: mapFontFamilyForPDF(cv.style.fontFamily) },
      };

      const blob = await pdf(
        <CVDocument cv={mappedCV} labels={labels} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-3 shadow-sm">
      <span className="text-lg font-bold tracking-tight text-foreground">CV Creator</span>

      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <div className="flex overflow-hidden rounded-full border border-border">
          <Button
            variant={i18n.language === 'en' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none rounded-l-full px-4 text-xs"
            onClick={() => { i18n.changeLanguage('en'); localStorage.setItem('cv-lang', 'en'); }}
          >
            EN
          </Button>
          <Button
            variant={i18n.language === 'de' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none rounded-r-full px-4 text-xs"
            onClick={() => { i18n.changeLanguage('de'); localStorage.setItem('cv-lang', 'de'); }}
          >
            DE
          </Button>
        </div>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="h-8 w-8"
        >
          {theme === 'dark'
            ? <Sun className="h-4 w-4" />
            : <Moon className="h-4 w-4" />
          }
        </Button>

        {/* Export */}
        <Button
          onClick={handleExportPDF}
          disabled={isGenerating}
          size="sm"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          {isGenerating ? 'Generating…' : t('exportPDF')}
        </Button>
      </div>
    </header>
  );
}
