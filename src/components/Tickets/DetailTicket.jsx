import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketServices';
import toast from 'react-hot-toast';

// Import komponen-komponen yang sudah dipecah
import TicketHeader from './TicketHeader';
import TicketInfoCard from './TicketInfoCard';
import TicketReplies from './TicketReplies';
import TicketSidebar from './TicketSidebar';
import ImageModal from './ImageModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import NotFound from '../../components/common/NotFound';

const TicketDetail = () => {
  const { code } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchTicketDetail();
  }, [code]);

  const fetchTicketDetail = async () => {
    try {
      setLoading(true);
      const response = await ticketService.getTicket(code);
      setTicket(response.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast.error('Gagal memuat detail tiket');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleReplyAdded = () => {
    fetchTicketDetail(); // Refresh ticket data after reply added
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!ticket) {
    return <NotFound title="Tiket Tidak Ditemukan" />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <TicketHeader onBack={() => navigate('/dashboard')} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <TicketInfoCard 
            ticket={ticket}
            onImageClick={() => setShowImageModal(true)}
          />
          
          <TicketReplies 
            ticket={ticket}
            user={user}
            onReplyAdded={handleReplyAdded}
          />
        </div>

        {/* Sidebar */}
        <TicketSidebar ticket={ticket} user={user} />
      </div>

      {/* Image Modal */}
      {showImageModal && ticket.image && (
        <ImageModal
          imageUrl={ticket.image}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
};

export default TicketDetail;