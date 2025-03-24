'use client';

import { useState } from 'react';
import { enhancedFetch } from '@/lib/fetch';

export default function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Set default title based on filename (without extension)
      const defaultTitle = selectedFile.name.split('.').slice(0, -1).join('.');
      setTitle(defaultTitle);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title.trim() || isUploading) return;
    
    setIsUploading(true);
    setStatus(null);
    
    try {
      // Read the file
      const content = await readFileAsText(file);
      
      // Upload document data to API
      await enhancedFetch('/api/documents/upload', {
        method: 'POST',
        body: {
          title: title.trim(),
          content,
          filename: file.name,
        },
      });
      
      // Success
      setStatus({
        type: 'success',
        message: 'Document uploaded successfully!'
      });
      
      // Reset form
      setFile(null);
      setTitle('');
      
      // Reset file input
      const fileInput = document.getElementById('document-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error uploading document:', error);
      
      setStatus({
        type: 'error',
        message: 'Failed to upload document. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Helper function to read file as text
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          resolve(e.target.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-4">Upload Knowledge Base Document</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="document-file" className="block text-sm font-medium text-gray-700 mb-1">
            Document (txt, md, pdf, docx)
          </label>
          <input
            type="file"
            id="document-file"
            accept=".txt,.md,.pdf,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
                      file:mr-4 file:py-2 file:px-4 
                      file:rounded-md file:border-0 
                      file:text-sm file:font-semibold 
                      file:bg-blue-50 file:text-blue-700 
                      hover:file:bg-blue-100"
            required
          />
        </div>
        
        <div>
          <label htmlFor="document-title" className="block text-sm font-medium text-gray-700 mb-1">
            Document Title
          </label>
          <input
            type="text"
            id="document-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isUploading || !file || !title.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 disabled:bg-blue-300 
                   disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
      
      {status && (
        <div className={`mt-4 p-3 rounded-md ${
          status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
}