import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ title = "Tidak Ditemukan", linkText = "Kembali ke Dashboard", linkTo = "/dashboard" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <Link to={linkTo} className="text-blue-600 hover:text-blue-500">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;