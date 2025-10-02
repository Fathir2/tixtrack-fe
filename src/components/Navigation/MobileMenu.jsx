import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const MobileMenuNavigation = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white shadow-xl border border-gray-100 hover:bg-gray-50 transition-colors"
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <XMarkIcon className="h-5 w-5 text-gray-700" />
      ) : (
        <Bars3Icon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
};

export default MobileMenuNavigation;