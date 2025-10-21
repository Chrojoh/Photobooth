import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ImageUploaderProps {
  onImageSelect: (imageSrc: string) => void;
  onImageRemove: () => void;
  selectedImage: string | null;
}

export function CameraView({ onImageSelect, onImageRemove, selectedImage }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (e.g., PNG, JPG).');
        return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files[0]);
    }
    // Reset file input to allow selecting the same file again
    e.target.value = '';
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onImageSelect]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div 
        className="w-full aspect-w-4 aspect-h-3 bg-gray-900 rounded-lg overflow-hidden relative group shadow-inner"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
    >
        <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onInputChange}
        />
        
        {selectedImage ? (
            <>
                <img src={selectedImage} alt="Uploaded pet" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={onImageRemove} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-5 rounded-lg backdrop-blur-sm">
                        <TrashIcon className="w-5 h-5" />
                        Remove Image
                    </button>
                </div>
            </>
        ) : (
            <div 
                onClick={() => inputRef.current?.click()}
                className={`w-full h-full p-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
                ${isDragging ? 'border-indigo-500 bg-gray-800' : 'border-gray-600 hover:border-gray-500'}`}
            >
                <div className="text-center text-gray-400">
                    <UploadIcon className="w-12 h-12 mx-auto mb-3" />
                    <p className="font-semibold">Drag & drop an image</p>
                    <p className="text-sm">or click to browse</p>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </div>
        )}
    </div>
  );
}