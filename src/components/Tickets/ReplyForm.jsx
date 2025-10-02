import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ticketService } from '../../services/ticketServices';
import toast from 'react-hot-toast';

const ReplyForm = ({ ticket, user, onReplyAdded }) => {
  const [replyContent, setReplyContent] = useState('');
  const [replyStatus, setReplyStatus] = useState(ticket.status);
  const [submittingReply, setSubmittingReply] = useState(false);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      toast.error('Pesan reply tidak boleh kosong');
      return;
    }

    setSubmittingReply(true);
    try {
      const replyData = {
        content: replyContent,
        ...(user?.role === 'admin' && { status: replyStatus })
      };

      await ticketService.addReply(ticket.code, replyData);
      toast.success('Reply berhasil ditambahkan');
      setReplyContent('');
      onReplyAdded();
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('Gagal menambahkan reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  return (
    <form onSubmit={handleReplySubmit} className="border-t pt-6">
      <div className="space-y-4">
        {/* Admin Status Update */}
        {user?.role === 'admin' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Status Tiket
            </label>
            <select
              value={replyStatus}
              onChange={(e) => setReplyStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}

        {/* Reply Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pesan Reply
          </label>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Tulis ${user?.role === 'admin' ? 'respon' : 'reply'} Anda di sini...`}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submittingReply || !replyContent.trim()}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
              submittingReply || !replyContent.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
            <span>
              {submittingReply ? 'Mengirim...' : `Kirim ${user?.role === 'admin' ? 'Respon' : 'Reply'}`}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReplyForm;