'use client';

import Chatbot from '@/components/Chatbot';

export default function ChatPage() {
  // This would typically come from context or a database check
  const hasDocuments = false;
  
  return (
    <div className="max-w-4xl mx-auto">
      {!hasDocuments && (
        <div className="bg-secondary border border-primary/20 rounded-2xl p-4 mb-6 text-center">
          <p className="text-primary">
            To get the most out of your AI assistant, please add your company documents (SOPs, guides, etc.) in the Documents tab to train the AI brain.
          </p>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e9ecef]">
        <Chatbot />
      </div>
    </div>
  );
}