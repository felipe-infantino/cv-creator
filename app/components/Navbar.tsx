'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  async function handleExportPDF() {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('cv-preview');
    if (!element) return;
    html2pdf()
      .set({
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
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
        className="rounded-lg bg-[#2d7aa8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#235f87]"
      >
        {t('exportPDF')}
      </button>
    </header>
  );
}
