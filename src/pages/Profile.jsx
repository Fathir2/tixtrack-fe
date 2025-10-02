import { useAuth } from '../context/AuthContext';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  ShieldCheckIcon,
  IdentificationIcon 
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'user':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return ShieldCheckIcon;
      case 'user':
      default:
        return IdentificationIcon;
    }
  };

  const RoleIcon = getRoleIcon(user?.role);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-600 mt-1">Informasi akun dan pengaturan profil Anda</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Cover Background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        {/* Profile Content */}
        <div className="px-8 pb-8">
          {/* Profile Picture */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12 mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <UserCircleIcon className="w-28 h-28 text-gray-400" />
              </div>
              {/* Online Status Indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user?.role)}`}>
                  <RoleIcon className="w-4 h-4 mr-1" />
                  {user?.role === 'admin' ? 'Administrator' : 'User'}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Profile Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Akun</h3>
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserCircleIcon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="text-base font-semibold text-gray-900 mt-1 truncate">
                    {user?.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base font-semibold text-gray-900 mt-1 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    user?.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
                  }`}>
                    <RoleIcon className={`w-6 h-6 ${
                      user?.role === 'admin' ? 'text-purple-600' : 'text-blue-600'
                    }`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-base font-semibold text-gray-900 mt-1 capitalize">
                    {user?.role === 'admin' ? 'Administrator' : 'User'}
                  </p>
                </div>
              </div>

              {/* User ID */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <IdentificationIcon className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    #{user?.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Informasi:</span> Jika Anda perlu mengubah informasi profil, silakan hubungi administrator sistem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;