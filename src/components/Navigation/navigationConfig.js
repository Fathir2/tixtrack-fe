import {
  ChartBarSquareIcon,
  TicketIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

/**
 * Generate navigation items based on user role
 * @param {string} userRole - The role of the user (admin, user)
 * @returns {Array} Array of navigation items
 */
export const getNavigationByRole = (userRole) => {
  const baseNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: ChartBarSquareIcon,
      description: "Overview & Stats",
    },
  ];

  const settingsNav = {
    name: "Settings",
    href: `/${userRole}/settings`,
    icon: Cog6ToothIcon,
    description: "Account Settings",
  };

  switch (userRole) {
    case "admin":
      return [
        ...baseNavigation,
        {
          name: "Tickets",
          href: "/admin/tickets",
          icon: TicketIcon,
          description: "Manage Tickets",
        },
        settingsNav,
      ];

    case "user":
    default:
      return [
        ...baseNavigation,
        {
          name: "Create Ticket",
          href: "/tickets/create",
          icon: PlusCircleIcon,
          description: "New Support Ticket",
        },
        {
          name: "FAQ",
          href: "/faq",
          icon: QuestionMarkCircleIcon,
          description: "Frequently Asked Questions",
        },
        settingsNav,
      ];
  }
};