'use client';

import { useState, useRef, useEffect } from 'react';
import { enhancedFetch } from '@/lib/fetch';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; id: string }>;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Hello! I\'m your BWB Copilot. I can help answer questions about your company processes, policies, and procedures. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  // Handle pressing Enter to submit (but Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    
    try {
      // Call the chat API
      const response = await enhancedFetch('/api/chat', {
        method: 'POST',
        body: { query: userMessage.content },
      });
      
      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer || 'Sorry, I couldn\'t find an answer to that question.',
        timestamp: new Date(),
        sources: response.documents,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] bg-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-6 ${message.role !== 'user' ? 'flex' : 'flex justify-end'}`}
          >
            {/* Avatar for assistant/system */}
            {message.role !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
                B
              </div>
            )}
            
            <div className={`max-w-[90%] ${
              message.role === 'user' 
                ? 'bg-secondary text-gray-800 rounded-2xl rounded-tr-sm px-4 py-3' 
                : message.role === 'system'
                  ? 'bg-white text-gray-800 border border-[#e9ecef] rounded-2xl rounded-tl-sm px-4 py-3'
                  : 'bg-white text-gray-800 border border-[#e9ecef] rounded-2xl rounded-tl-sm px-4 py-3'
            }`}>
              <div className="prose prose-sm">
                <p className="whitespace-pre-wrap mb-2">{message.content}</p>
              </div>
              
              {/* Show sources if available */}
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Sources:</p>
                  <ul className="list-disc list-inside text-xs text-gray-600">
                    {message.sources.map((source, i) => (
                      <li key={i}>{source.title}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <p className="text-xs mt-2 text-gray-500">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Avatar for user */}
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center ml-3 flex-shrink-0">
                U
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />

        {/* Thinking indicator */}
        {isLoading && (
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
              B
            </div>
            <div className="bg-white border border-[#e9ecef] px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Form */}
      <div className="border-t border-[#e9ecef] p-4">
        <form onSubmit={handleSubmit} className="relative flex items-end bg-white rounded-xl border border-[#e9ecef] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Message BWB Copilot..."
            disabled={isLoading}
            rows={1}
            className="flex-1 p-3 pr-12 max-h-[120px] resize-none border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-800"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 px-2">
          BWB Copilot is trained on your company documents and SOPs. Press Enter to send, Shift+Enter for a new line.
        </p>
      </div>
    </div>
  );
}