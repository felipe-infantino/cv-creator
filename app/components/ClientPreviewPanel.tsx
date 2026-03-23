'use client';

import dynamic from 'next/dynamic';

const CVPDFViewer = dynamic(() => import('./CVPDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
      Loading preview…
    </div>
  ),
});

export default function ClientPreviewPanel() {
  return <CVPDFViewer />;
}
