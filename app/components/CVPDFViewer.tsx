'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { CVDocument } from './CVDocument';
import { useCV } from '../context/CVContext';
import { useTranslation } from 'react-i18next';
import { registerPDFFonts, mapFontFamilyForPDF } from '../lib/pdfFonts';

registerPDFFonts();

export default function CVPDFViewer() {
  const { cv } = useCV();
  const { t } = useTranslation();

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

  return (
    <PDFViewer width="100%" height="100%" showToolbar={false}>
      <CVDocument cv={mappedCV} labels={labels} />
    </PDFViewer>
  );
}
