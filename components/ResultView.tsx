import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultViewProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
        <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg">Creating your masterpiece...</p>
        <p className="text-sm">This can take a moment.</p>
    </div>
);

const Placeholder = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-500 p-4">
        <div className="w-24 h-24 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        </div>
        <h3 className="text-xl font-semibold">Your Artwork Will Appear Here</h3>
        <p className="text-center">Upload a photo, select a style, and click 'Generate' to see the magic happen.</p>
    </div>
);

export function ResultView({ generatedImage, isLoading, error }: ResultViewProps) {
    
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'pet-portrait.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-200">Generated Portrait</h2>
      <div className="w-full flex-grow aspect-w-4 aspect-h-3 bg-gray-900/50 rounded-lg flex items-center justify-center shadow-inner">
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && (
            <div className="text-center text-red-400 p-4">
                <h3 className="font-bold text-lg">Oops! Something went wrong.</h3>
                <p>{error}</p>
            </div>
        )}
        {!isLoading && !error && !generatedImage && <Placeholder />}
        {generatedImage && !isLoading && !error && (
            <img src={generatedImage} alt="Generated pet portrait" className="w-full h-full object-contain rounded-lg" />
        )}
      </div>
      {generatedImage && !isLoading && (
        <button
            onClick={handleDownload}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-lg shadow-md hover:shadow-green-500/50"
        >
          <DownloadIcon className="w-6 h-6" />
          Download PNG
        </button>
      )}
    </div>
  );
}