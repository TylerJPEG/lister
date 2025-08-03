'use client'
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [groups, setGroups] = useState<Record<string, File[]>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [label, setLabel] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const removeFile = (name: string) => {
    setFiles(prev => prev.filter(file => file.name !== name));
  };

  const toggleSelect = (name: string) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  const handleGroup = () => {
    if (!label || selected.size === 0) return;
    const newGroup = files.filter(file => selected.has(file.name));
    setGroups(prev => ({ ...prev, [label]: newGroup }));
    setFiles(prev => prev.filter(file => !selected.has(file.name)));
    setSelected(new Set());
    setLabel('');
  };

  const handleUpload = () => {
    setUploading(true);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setUploading(false);
      }
    }, 150);
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload images</h1>

      <div {...getRootProps()} className="border p-6 bg-gray-100 text-center cursor-pointer mb-4">
        <input {...getInputProps()} />
        Drag and Drop or <span className="text-blue-600 underline">Browse</span>
      </div>

      <p className="mb-2 font-medium">Queued:</p>
      <div className="border p-4 mb-4 min-h-[80px]">
        {files.length === 0 ? (
          <p className="text-gray-500">No images added yet.</p>
        ) : (
          <ul className="text-sm">
            {files.map(file => (
              <li key={file.name} className="flex justify-between text-red-700">
                {file.name}
                <button onClick={() => removeFile(file.name)} className="ml-2">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className={`w-full py-2 rounded text-white ${files.length === 0 ? 'bg-gray-400' : 'bg-green-600'}`}
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
      >
        Upload
      </button>

      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-64">
            <p className="mb-2 font-medium">Progress ({progress}%)</p>
            <div className="w-full bg-gray-200 h-4 rounded">
              <div className="h-4 bg-blue-500 rounded" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {files.length > 0 && !uploading && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Group Images</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              className="border px-2 py-1 flex-1"
              placeholder="Enter label..."
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
            <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={handleGroup}>Group</button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {files.map(file => (
              <div
                key={file.name}
                onClick={() => toggleSelect(file.name)}
                className={`border p-2 relative aspect-square cursor-pointer ${selected.has(file.name) ? 'bg-blue-200' : ''}`}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(groups).length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Grouped</h2>
          {Object.entries(groups).map(([key, value]) => (
            <p key={key} className="text-sm text-gray-800">{key} ({value.length} photos)</p>
          ))}
        </div>
      )}
    </main>
  );
}
