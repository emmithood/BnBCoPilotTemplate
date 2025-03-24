'use client';

import DocumentUploader from "@/components/DocumentUploader";
import DocumentList from "@/components/DocumentList";

export default function DocumentsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Knowledge Base Documents</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Upload and manage documents for the AI assistant to use when answering questions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Upload Form */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Upload Documents</h3>
            <DocumentUploader />
          </div>
        </div>
        
        {/* Right Column: Document List */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Uploaded Documents</h3>
            <DocumentList />
          </div>
        </div>
      </div>
    </div>
  );
}