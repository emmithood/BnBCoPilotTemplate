'use client';

import { useState, useEffect } from 'react';
import { enhancedFetch } from '@/lib/fetch';

type Document = {
  id: string;
  title: string;
  created_at: string;
};

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch documents on component mount
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await enhancedFetch('/api/documents/list', {
        method: 'GET',
      });
      
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to load documents. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      await enhancedFetch('/api/documents/delete', {
        method: 'POST',
        body: { id },
      });
      
      // Refresh the list
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Failed to delete document.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p>Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchDocuments}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No documents uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Upload Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{doc.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(doc.created_at).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}