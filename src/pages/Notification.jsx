import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BellIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  InformationCircleIcon,
  ClockIcon,
  TrashIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const { user } = useAuth();
  
  // Dummy notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Tiket Anda Telah Diselesaikan',
      message: 'Tiket #TIX-001 "Masalah Login" telah diselesaikan oleh admin.',
      timestamp: '2 menit yang lalu',
      read: false,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'info',
      title: 'Balasan Baru pada Tiket',
      message: 'Admin telah memberikan balasan pada tiket #TIX-002.',
      timestamp: '1 jam yang lalu',
      read: false,
      icon: InformationCircleIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Tiket Memerlukan Informasi Tambahan',
      message: 'Tiket #TIX-003 memerlukan informasi lebih lanjut dari Anda.',
      timestamp: '3 jam yang lalu',
      read: true,
      icon: ExclamationCircleIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 4,
      type: 'info',
      title: 'Tiket Sedang Diproses',
      message: 'Tiket #TIX-004 "Bug pada Dashboard" sedang dalam proses penanganan.',
      timestamp: '5 jam yang lalu',
      read: true,
      icon: ClockIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 5,
      type: 'success',
      title: 'Tiket Berhasil Dibuat',
      message: 'Tiket #TIX-005 "Request Fitur Baru" berhasil dibuat.',
      timestamp: '1 hari yang lalu',
      read: true,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]);

  const [filter, setFilter] = useState('all'); // all, unread, read

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
            <p className="text-gray-600 mt-1">
              Kelola dan lihat semua notifikasi Anda
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {unreadCount} baru
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <CheckIcon className="w-4 h-4 mr-2" />
                Tandai Semua Dibaca
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Hapus Semua
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setFilter('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filter === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Semua
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-600">
                {notifications.length}
              </span>
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filter === 'unread'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Belum Dibaca
              {unreadCount > 0 && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-red-100 text-red-600">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filter === 'read'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sudah Dibaca
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-600">
                {notifications.filter(n => n.read).length}
              </span>
            </button>
          </nav>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada notifikasi</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'unread' 
                  ? 'Semua notifikasi sudah dibaca'
                  : filter === 'read'
                  ? 'Belum ada notifikasi yang dibaca'
                  : 'Anda belum memiliki notifikasi'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${notification.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${notification.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-gray-500 flex items-center">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {notification.timestamp}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                              title="Tandai sebagai dibaca"
                            >
                              <CheckIcon className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            title="Hapus notifikasi"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Info:</span> Notifikasi akan otomatis dihapus setelah 30 hari. Anda akan menerima notifikasi untuk setiap aktivitas terkait tiket Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;