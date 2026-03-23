'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCV } from '../context/CVContext';

async function emojiToDataUri(emoji: string, size = 32): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.font = `${size * 0.8}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2);
  return canvas.toDataURL('image/png');
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { cv } = useCV();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleExportPDF() {
    setIsGenerating(true);
    try {
      // Rasterize emoji hobby icons (PDF fonts don't support emoji)
      const hobbyImages: Record<string, string> = {};
      for (const h of cv.hobbies) {
        if (h.icon) hobbyImages[h.id] = await emojiToDataUri(h.icon);
      }

      // Lazy-import to keep these out of the SSR bundle
      const { pdf } = await import('@react-pdf/renderer');
      const { CVDocument } = await import('./CVDocument');
      const { registerPDFFonts, mapFontFamilyForPDF } = await import('../lib/pdfFonts');

      registerPDFFonts();

      const labels = {
        profile: t('cvProfile'),
        experience: t('cvExperience'),
        education: t('cvEducation'),
        technicalSkills: t('cvTechnicalSkills'),
        hobbies: t('cvHobbies'),
      };

      const mappedCV = {
        ...cv,
        style: { ...cv.style, fontFamily: mapFontFamilyForPDF(cv.style.fontFamily) },
      };

      const blob = await pdf(
        <CVDocument cv={mappedCV} labels={labels} hobbyImages={hobbyImages} />
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
    <header className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <span className="text-lg font-bold tracking-tight text-[#2d7aa8]">CV Creator</span>

      {/* Language toggle */}
      <div className="flex overflow-hidden rounded-full border border-[#2d7aa8]">
        <button
          onClick={() => setLang('en')}
          className={`px-4 py-1 text-sm font-medium transition-colors ${
            lang === 'en'
              ? 'bg-[#2d7aa8] text-white'
              : 'bg-white text-[#2d7aa8] hover:bg-[#eaf3fa]'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('de')}
          className={`px-4 py-1 text-sm font-medium transition-colors ${
            lang === 'de'
              ? 'bg-[#2d7aa8] text-white'
              : 'bg-white text-[#2d7aa8] hover:bg-[#eaf3fa]'
          }`}
        >
          DE
        </button>
      </div>

      <button
        onClick={handleExportPDF}
        disabled={isGenerating}
        className="rounded-lg bg-[#2d7aa8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#235f87] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating…' : t('exportPDF')}
      </button>
    </header>
  );
}
