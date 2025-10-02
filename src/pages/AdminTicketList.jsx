import React from 'react';
import { useAdminTicketList } from '../hooks/useAdminTicketList';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import TicketStats from '../components/common/TicketStats';
import TicketList from '../components/common/TicketList';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const AdminTicketList = () => {
  const {
    tickets,
    filteredTickets,
    loading,
    searchTerm,
    filters,
    handleSearchChange,
    handleSearchClear,
    handleFiltersChange,
    handleClearFilters
  } = useAdminTicketList();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <DocumentTextIcon className="h-8 w-8 mr-3 text-blue-600" />
            Manajemen Tiket
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola dan monitor semua tiket yang masuk dari pengguna
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onSearchClear={handleSearchClear}
              placeholder="Cari berdasarkan kode, judul, nama user, atau deskripsi..."
            />
          </div>
          <div className="flex-shrink-0">
            <FilterDropdown
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>

      {/* Ticket Statistics */}
      <TicketStats tickets={tickets} filteredTickets={filteredTickets} />

      {/* Results Summary */}
      {(searchTerm || filters.status || filters.priority) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-blue-800">
                Menampilkan <span className="font-semibold">{filteredTickets.length}</span> dari{' '}
                <span className="font-semibold">{tickets.length}</span> total tiket
              </span>
              {searchTerm && (
                <span className="text-sm text-blue-600">
                  untuk pencarian "{searchTerm}"
                </span>
              )}
            </div>
            {(searchTerm || filters.status || filters.priority || filters.sort !== 'created_at_desc') && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Hapus Semua Filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Ticket List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filters.status || filters.priority 
                ? 'Tidak ada tiket yang sesuai'
                : 'Belum ada tiket'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || filters.status || filters.priority
                ? 'Coba ubah kata kunci pencarian atau filter yang dipilih'
                : 'Tiket yang dibuat oleh pengguna akan muncul di sini'
              }
            </p>
            {(searchTerm || filters.status || filters.priority) && (
              <button
                onClick={handleClearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Hapus Filter
              </button>
            )}
          </div>
        ) : (
          <TicketList 
            tickets={filteredTickets}
            title=""
            showAll={true}
            isAdmin={true}
          />
        )}
      </div>

      {/* Footer Info */}
      {filteredTickets.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Total {filteredTickets.length} tiket ditampilkan
        </div>
      )}
    </div>
  );
};

export default AdminTicketList;