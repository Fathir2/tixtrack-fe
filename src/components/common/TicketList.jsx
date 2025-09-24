import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ticketService } from "../../services/ticketServices";
import { TrashIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';

const TicketList = ({
  tickets,
  title = "Tiket Terbaru",
  showAll = false,
  isAdmin = false,
  onDelete,
  currentUser,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari yang lalu`;
    }
  };

  const handleDeleteClick = async (ticket) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Penghapusan',
      html: `
        <div class="text-left">
          <p class="text-gray-600 mb-4">Apakah Anda yakin ingin menghapus tiket ini? Data yang telah dihapus tidak dapat dikembalikan.</p>
          <div class="bg-gray-50 p-4 rounded-lg border">
            <div class="flex items-center space-x-2 mb-2">
              <span class="text-sm font-semibold text-gray-900">${ticket.code}</span>
              <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-${ticket.status === 'open' ? 'blue' : ticket.status === 'in_progress' ? 'yellow' : ticket.status === 'resolved' ? 'green' : 'red'}-100 text-${ticket.status === 'open' ? 'blue' : ticket.status === 'in_progress' ? 'yellow' : ticket.status === 'resolved' ? 'green' : 'red'}-800">
                ${ticket.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <p class="text-sm font-medium text-gray-800">${ticket.title}</p>
            <p class="text-xs text-gray-500 mt-1">${formatTime(ticket.created_at)}</p>
          </div>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-6 py-3 rounded-lg font-medium',
        cancelButton: 'px-6 py-3 rounded-lg font-medium'
      },
      buttonsStyling: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
      focusConfirm: false,
      focusCancel: true
    });

    if (result.isConfirmed) {
      await handleDeleteConfirm(ticket);
    }
  };

  const handleDeleteConfirm = async (ticket) => {
    try {
      setIsDeleting(true);
      
      // Show loading toast
      Swal.fire({
        title: 'Menghapus Tiket...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await ticketService.deleteTicket(ticket.code);
      
      if (onDelete) {
        onDelete(ticket.code);
      }

      // Show success message
      Swal.fire({
        title: 'Berhasil!',
        text: `Tiket ${ticket.code} telah dihapus`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-xl'
        }
      });
      
    } catch (error) {
      console.error("Error deleting ticket:", error);
      
      // Show error message
      Swal.fire({
        title: 'Gagal!',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menghapus tiket',
        icon: 'error',
        confirmButtonColor: '#dc2626',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-xl',
          confirmButton: 'px-6 py-3 rounded-lg font-medium'
        },
        buttonsStyling: false
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const canDeleteTicket = (ticket) => {
    return (
      currentUser &&
      !isAdmin &&
      currentUser.role === "user" &&
      ticket.user_id.id === currentUser.id
    );
  };

  // Show only first 5 tickets if showAll is false
  const displayTickets = showAll ? tickets : tickets.slice(0, 5);

  return (
    <div className="bg-white rounded-lg border-gray-400 shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {!showAll && tickets.length > 5 && (
            <Link
              to="/tickets"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Lihat Semua
            </Link>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {displayTickets.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Tidak ada tiket ditemukan
          </div>
        ) : (
          displayTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {ticket.code}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.replace("_", " ").toUpperCase()}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    <Link
                      to={`/tickets/${ticket.code}`}
                      className="hover:text-blue-600"
                    >
                      {ticket.title}
                    </Link>
                  </h4>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      {isAdmin && <span>By: {ticket.user_id.name}</span>}
                      <span>{formatTime(ticket.created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {ticket.replies && ticket.replies.length > 0 && (
                        <span>{ticket.replies.length} balasan</span>
                      )}
                      
                      {/* Delete Button */}
                      {canDeleteTicket(ticket) && (
                        <button
                          onClick={() => handleDeleteClick(ticket)}
                          disabled={isDeleting}
                          className="ml-2 p-1.5 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus tiket"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {ticket.image && (
                  <div className="ml-4 flex-shrink-0">
                    <img 
                      src={
                        ticket.image.startsWith('http') 
                          ? ticket.image 
                          : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000'}/${ticket.image}`
                      }
                      alt="Ticket attachment"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        console.log('Image failed to load:', ticket.image);
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMSAyNUgyNVYyMUgyMVYyNVpNMjUgMzlIMjFWNDNIMjVWMzlaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zNSAyNUgzOVYyMUgzNVYyNVpNMzkgMzlIMzVWNDNIMzlWMzlaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                        e.target.className = e.target.className + ' opacity-50';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;