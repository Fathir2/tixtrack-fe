import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const FaqItems = ({ filteredFAQ, openAccordion, toggleAccordion }) => {
  const getCategoryStyle = (category) => {
    switch (category) {
      case "ticket":
        return "bg-green-100 text-green-800";
      case "account":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  if (filteredFAQ.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <QuestionMarkCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Tidak ada hasil ditemukan
        </h3>
        <p className="text-gray-500">
          Coba gunakan kata kunci lain atau pilih kategori berbeda
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredFAQ.map((faq) => (
        <div
          key={faq.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
        >
          <button
            onClick={() => toggleAccordion(faq.id)}
            className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-2 mb-1">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryStyle(
                    faq.category
                  )}`}
                >
                  {faq.category === "ticket"
                    ? "Tiket"
                    : faq.category === "account"
                    ? "Akun"
                    : "Umum"}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                {faq.question}
              </h3>
            </div>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                openAccordion === faq.id ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {openAccordion === faq.id && (
            <div className="px-6 pb-4 pt-2 border-t border-gray-100 animate-fadeIn">
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqItems;
