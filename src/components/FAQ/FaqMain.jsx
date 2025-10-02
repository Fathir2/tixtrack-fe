import { useState } from "react";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Categories from "./Categories";
import FaqItems from "./FaqItems";
import { faqData } from "../../data/faqData"; // You should move the FAQ data to a separate file

const FaqMain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openAccordion, setOpenAccordion] = useState(null);

  const filteredFAQ = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pertanyaan yang Sering Diajukan
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temukan jawaban untuk pertanyaan umum tentang TixTrack. Jika tidak
          menemukan jawaban yang Anda cari, jangan ragu untuk membuat tiket
          baru.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        faqData={faqData}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Menampilkan{" "}
          <span className="font-semibold">{filteredFAQ.length}</span> pertanyaan
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset Pencarian
          </button>
        )}
      </div>

      {/* FAQ Items */}
      <FaqItems
        filteredFAQ={filteredFAQ}
        openAccordion={openAccordion}
        toggleAccordion={toggleAccordion}
      />

      {/* Help Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              Tidak menemukan jawaban yang Anda cari?
            </h3>
            <p className="text-blue-100">
              Tim support kami siap membantu Anda. Buat tiket baru dan kami akan
              merespons secepatnya.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/tickets/create")}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg whitespace-nowrap"
          >
            Buat Tiket Baru
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <LightBulbIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              Tips Menggunakan TixTrack
            </h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>
                • Gunakan judul yang jelas dan deskriptif untuk tiket Anda
              </li>
              <li>
                • Lampirkan screenshot jika memungkinkan untuk mempercepat
                penanganan
              </li>
              <li>• Pilih prioritas yang sesuai dengan urgensi masalah Anda</li>
              <li>• Pantau notifikasi untuk update terbaru dari admin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqMain;
