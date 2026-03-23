'use client';

import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { CVDocument } from './CVDocument';
import { useCV } from '../context/CVContext';
import { useLanguage } from '../context/LanguageContext';
import { registerPDFFonts, mapFontFamilyForPDF } from '../lib/pdfFonts';

// Safe at module level: this module is only loaded via dynamic import with ssr:false
registerPDFFonts();

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

export default function CVPDFViewer() {
  const { cv } = useCV();
  const { t } = useLanguage();
  const [hobbyImages, setHobbyImages] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const images: Record<string, string> = {};
      for (const h of cv.hobbies) {
        if (h.icon) images[h.id] = await emojiToDataUri(h.icon);
      }
      setHobbyImages(images);
    })();
  }, [cv.hobbies]);

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

  return (
    <PDFViewer width="100%" height="100%" showToolbar={false}>
      <CVDocument cv={mappedCV} labels={labels} hobbyImages={hobbyImages} />
    </PDFViewer>
  );
}
