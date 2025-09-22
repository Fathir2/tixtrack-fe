import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboardServices';
import { ticketService } from '../../services/ticketServices';
import StatisticCard from './StatisticCard';
import PieChart from './PieCharts';
import TicketList from './TicketList';
import { 
  TicketIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Statistics = () => {
  const { user } = useAuth();
  const [statistics, setStatistics] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch tickets for all users (admin can see all, user can see their own)
        const ticketResponse = await ticketService.getTickets();
        setTickets(ticketResponse.data || []);

        // Fetch statistics only for admin
        if (user?.role === 'admin') {
          const statsResponse = await dashboardService.getStatistics();
          setStatistics(statsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Gagal memuat data dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        {user?.role === 'admin' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-200 h-96 rounded-lg"></div>
              <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>
          </>
        )}
        {user?.role === 'user' && (
          <div className="bg-gray-200 h-96 rounded-lg"></div>
        )}
      </div>
    );
  }

  // Admin Dashboard
  if (user?.role === 'admin') {
    return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatisticCard
              title="Total Tiket"
              value={statistics.total_tickets}
              change="12%"
              changeType="increase"
              icon={TicketIcon}
            />
            <StatisticCard
              title="Tiket Aktif"
              value={statistics.active_tickets}
              change="3%"
              changeType="decrease"
              icon={ClockIcon}
            />
            <StatisticCard
              title="Selesai"
              value={statistics.resolved_tickets}
              change="8%"
              changeType="increase"
              icon={CheckCircleIcon}
            />
            <StatisticCard
              title="Rata-rata Waktu"
              value={`${statistics.avg_resolution_time} Jam`}
              change="15%"
              changeType="increase"
              icon={ChartBarIcon}
            />
          </div>
        )}

        {/* Charts and Ticket List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket List - Takes 2 columns */}
          <div className="lg:col-span-2">
            <TicketList 
              tickets={tickets} 
              title="Tiket Terbaru" 
              isAdmin={true}
            />
          </div>
          
          {/* Pie Chart - Takes 1 column */}
          <div>
            {statistics && (
              <PieChart data={statistics.status_distribution} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // User Dashboard - Only shows their tickets
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatisticCard
          title="Total Tiket Anda"
          value={tickets.length}
          icon={TicketIcon}
        />
        <StatisticCard
          title="Sedang Proses"
          value={tickets.filter(t => ['open', 'in_progress'].includes(t.status)).length}
          icon={ClockIcon}
        />
        <StatisticCard
          title="Selesai"
          value={tickets.filter(t => t.status === 'resolved').length}
          icon={CheckCircleIcon}
        />
      </div>

      <TicketList 
        tickets={tickets} 
        title="Tiket Anda" 
        showAll={true}
        isAdmin={false}
      />
    </div>
  );
};

export default Statistics;