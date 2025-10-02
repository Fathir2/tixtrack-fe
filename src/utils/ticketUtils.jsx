import {
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export const getStatusColor = (status) => {
  const colors = {
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'bg-gray-100 text-gray-800 border-gray-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getStatusIcon = (status) => {
  const icons = {
    open: <ClockIcon className="w-5 h-5" />,
    in_progress: <ExclamationTriangleIcon className="w-5 h-5" />,
    resolved: <CheckCircleIcon className="w-5 h-5" />,
    rejected: <XCircleIcon className="w-5 h-5" />
  };
  return icons[status] || <ClockIcon className="w-5 h-5" />;
};