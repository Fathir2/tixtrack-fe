import {
  DocumentTextIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useTicketForm } from '../../hooks/useForm';

const TicketForm = () => {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    loading,
    imagePreview,
    handleChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    getInputClassName,
  } = useTicketForm();

  const priorityOptions = [
    { value: 'low', label: 'Rendah', color: 'text-gray-600' },
    { value: 'medium', label: 'Sedang', color: 'text-yellow-600' },
    { value: 'high', label: 'Tinggi', color: 'text-red-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buat Tiket Baru</h1>
            <p className="text-gray-600 mt-1">Laporkan masalah atau keluhan Anda</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Judul Tiket <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className={`${getInputClassName('title')} pl-12`}
                  placeholder="Masukkan judul singkat dan jelas"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Prioritas
              </label>
              <select
                id="priority"
                name="priority"
                className={getInputClassName('priority')}
                value={formData.priority}
                onChange={handleChange}
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Pilih prioritas berdasarkan tingkat urgensi masalah
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Masalah <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                required
                className={getInputClassName('description')}
                placeholder="Jelaskan masalah Anda secara detail..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lampiran Gambar (Opsional)
              </label>
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="image" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Klik untuk upload gambar
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">PNG, JPG, JPEG hingga 2MB</span>
                      </label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="border rounded-lg p-4">
                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Hapus Gambar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-lg text-sm font-medium text-white focus:outline-none transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? 'Membuat Tiket...' : 'Buat Tiket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
