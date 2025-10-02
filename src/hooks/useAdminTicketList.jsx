import { useState, useEffect, useMemo } from 'react';
import { ticketService } from '../services/ticketServices';
import toast from 'react-hot-toast';

export const useAdminTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: 'created_at_desc'
  });

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await ticketService.getTickets();
        setTickets(response.data || []);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        toast.error('Gagal memuat daftar tiket');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Filter and search logic
  const filteredTickets = useMemo(() => {
    let filtered = tickets;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.code.toLowerCase().includes(searchLower) ||
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.user_id.name.toLowerCase().includes(searchLower) ||
        ticket.description.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }

    // Priority filter
    if (filters.priority) {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case 'created_at_asc':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'created_at_desc':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'priority_high': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    return filtered;
  }, [tickets, searchTerm, filters]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      sort: 'created_at_desc'
    });
    setSearchTerm('');
  };

  return {
    tickets,
    filteredTickets,
    loading,
    searchTerm,
    filters,
    handleSearchChange,
    handleSearchClear,
    handleFiltersChange,
    handleClearFilters
  };
};