'use client';
import Navbar from './components/Navbar';
import CVEditor from './components/CVEditor';
import CVPDFViewer from './components/CVPDFViewer';


export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Editor panel */}
        <div className="w-2/5 overflow-y-auto border-r border-gray-200 bg-white p-5">
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
