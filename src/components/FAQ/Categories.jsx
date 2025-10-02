import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Categories = ({ selectedCategory, setSelectedCategory, faqData }) => {
  const categories = [
    {
      id: "all",
      name: "Semua",
      icon: QuestionMarkCircleIcon,
      color: "text-blue-600",
    },
    {
      id: "ticket",
      name: "Tiket",
      icon: ChatBubbleLeftRightIcon,
      color: "text-green-600",
    },
    {
      id: "account",
      name: "Akun",
      icon: ShieldCheckIcon,
      color: "text-purple-600",
    },
    {
      id: "general",
      name: "Umum",
      icon: LightBulbIcon,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              isActive
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`p-2 rounded-lg ${
                  isActive ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-blue-900" : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
              <span className="text-xs text-gray-500">
                {
                  faqData.filter(
                    (f) => category.id === "all" || f.category === category.id
                  ).length
                }{" "}
                pertanyaan
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
