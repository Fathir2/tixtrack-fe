import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../services/ticketServices';
import toast from 'react-hot-toast';

export const useTicketForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('File harus berupa gambar');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul wajib diisi';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Judul minimal 5 karakter';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Deskripsi minimal 10 karakter';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Mohon perbaiki kesalahan pada form');
      return;
    }

    setLoading(true);
    try {
      await ticketService.createTicket(formData);
      toast.success('Tiket berhasil dibuat!', {
        duration: 4000,
        style: { background: '#10b981', color: '#fff' },
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Create ticket error:', error);
      toast.error(error.response?.data?.message || 'Gagal membuat tiket. Silakan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass =
      'block w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-200 sm:text-sm';
    if (errors[fieldName]) {
      return `${baseClass} border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50`;
    }
    return `${baseClass} border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400`;
  };

  return {
    formData,
    errors,
    loading,
    imagePreview,
    handleChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    getInputClassName,
  };
};
