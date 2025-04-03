'use client';

interface PendingReviewItem {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface PendingReviewTableProps {
  items: PendingReviewItem[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export default function PendingReviewTable({ 
  items, 
  onApprove, 
  onReject,
  onPreview 
}: PendingReviewTableProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#e9ecef] p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Pending Review</h3>
        <div className="text-center p-6 text-gray-500">
          <p>No items waiting for review</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e9ecef] p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Pending Review</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 px-2 py-1">
                    {item.type}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {onPreview && (
                    <button 
                      onClick={() => onPreview(item.id)}
                      className="text-primary hover:text-primary/80 rounded-md px-3 py-1 text-sm transition-colors"
                    >
                      Preview
                    </button>
                  )}
                  {onApprove && (
                    <button 
                      onClick={() => onApprove(item.id)}
                      className="bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90 rounded-md px-3 py-1 text-sm font-medium shadow-sm transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {onReject && (
                    <button 
                      onClick={() => onReject(item.id)}
                      className="bg-[#D84315] text-white hover:bg-[#D84315]/90 rounded-md px-3 py-1 text-sm font-medium shadow-sm transition-colors"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}