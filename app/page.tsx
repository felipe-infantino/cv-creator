import Navbar from "./components/Navbar";
import CVEditor from "./components/CVEditor";
import CVPreview from "./components/CVPreview";

export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Editor panel */}
        <div className="w-2/5 overflow-y-auto border-r border-gray-200 bg-white p-5">
          <CVEditor />
        </div>
        {/* Preview panel */}
        <div className="flex w-3/5 flex-col items-center overflow-y-auto bg-gray-100 py-8">
          <CVPreview />
        </div>
      </div>
    </main>
  );
}
