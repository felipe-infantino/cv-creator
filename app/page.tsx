'use client';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import CVEditor from './components/CVEditor';

const CVPDFViewer = dynamic(() => import('./components/CVPDFViewer'), {
  ssr: false,
  loading: () => <div className="flex w-full h-full items-center justify-center text-muted-foreground">Loading preview…</div>,
});


export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Editor panel */}
        <div className="w-2/5 overflow-y-auto border-r border-border bg-background p-5">
          <CVEditor />
        </div>
        {/* PDF preview panel */}
        <div className="flex w-3/5 overflow-hidden">
          <CVPDFViewer />
        </div>
      </div>
    </main>
  );
}
