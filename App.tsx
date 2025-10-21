import React, { useState } from 'react';
import { CameraView } from './components/CameraView';
import { Header } from './components/Header';
import { ResultView } from './components/ResultView';
import { StyleSelector } from './components/StyleSelector';
import { BackdropSelector } from './components/BackdropSelector';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateStyledImage } from './services/geminiService';
import { STYLE_OPTIONS, BACKDROP_OPTIONS } from './constants';
import type { StyleOption, BackdropOption } from './types';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>(STYLE_OPTIONS[0]);
  const [selectedBackdrop, setSelectedBackdrop] = useState<BackdropOption>(BACKDROP_OPTIONS[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setGeneratedImage(null);
    setError(null);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerateClick = async () => {
    if (!selectedImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      // The base64 string from FileReader includes the data URI prefix,
      // which we need to remove before sending to the service.
      const base64Data = selectedImage.split(',')[1];
      
      const prompt = selectedStyle.prompt.replace('{{backdrop}}', selectedBackdrop.prompt).trim();

      const resultImage = await generateStyledImage(base64Data, prompt);
      setGeneratedImage(resultImage);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-6">
            <CameraView
              selectedImage={selectedImage}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
            />
            <StyleSelector
              options={STYLE_OPTIONS}
              selected={selectedStyle}
              onSelect={setSelectedStyle}
            />
            <BackdropSelector
              options={BACKDROP_OPTIONS}
              selected={selectedBackdrop}
              onSelect={setSelectedBackdrop}
            />
            <button
              onClick={handleGenerateClick}
              disabled={!selectedImage || isLoading}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 text-lg shadow-md disabled:bg-indigo-900/50 disabled:cursor-not-allowed disabled:text-gray-400 hover:shadow-indigo-500/50"
            >
              <SparklesIcon className="w-6 h-6" />
              {isLoading ? 'Generating...' : 'Generate Portrait'}
            </button>
          </div>

          {/* Right Column: Result */}
          <div className="h-full">
            <ResultView
              generatedImage={generatedImage}
              isLoading={isLoading}
              error={error}
            />
          </div>

        </div>
      </main>
      <footer className="text-center p-6 text-gray-500 text-sm">
        <p>Powered by Gemini. Built for demo purposes.</p>
      </footer>
    </div>
  );
}

export default App;