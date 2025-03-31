'use client';

import Chatbot from '@/components/Chatbot';
import { useState, useEffect } from 'react';

export default function ChatPage() {
  // This would typically come from context or a database check
  const hasDocuments = false;
  const [showDocumentNotice, setShowDocumentNotice] = useState(true);
  const [noticeHeight, setNoticeHeight] = useState('auto');
  const [noticeOpacity, setNoticeOpacity] = useState(1);
  
  useEffect(() => {
    if (!hasDocuments) {
      // Measure the height of the notice div first
      const notice = document.getElementById('document-notice');
      if (notice) {
        setNoticeHeight(notice.offsetHeight + 'px');
      }
      
      // Set a timeout to start the animation after 4 seconds
      const timer = setTimeout(() => {
        setNoticeOpacity(0);
        
        // Set another timeout to hide the element completely after animation completes
        setTimeout(() => {
          setShowDocumentNotice(false);
        }, 500); // Match this with the transition duration
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [hasDocuments]);
  
  return (
    <div className="max-w-4xl mx-auto">
      {(!hasDocuments && showDocumentNotice) && (
        <div 
          id="document-notice"
          className="bg-secondary border border-primary/20 rounded-2xl p-4 mb-6 text-center transition-all duration-500 ease-in-out" 
          style={{ 
            opacity: noticeOpacity,
            height: showDocumentNotice ? noticeHeight : '0',
            overflow: 'hidden',
            marginBottom: showDocumentNotice ? '1.5rem' : '0'
          }}
        >
          <p className="text-primary">
            To get the most out of your AI assistant, please add your company documents (SOPs, guides, etc.) in the Documents tab to train the AI brain.
          </p>
        </div>
      )}
      <div 
        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e9ecef] transition-all duration-500 ease-in-out"
        style={{ 
          height: showDocumentNotice ? 'calc(100vh - 220px - ' + noticeHeight + ')' : 'calc(100vh - 220px)'
        }}
      >
        <Chatbot />
      </div>
    </div>
  );
}