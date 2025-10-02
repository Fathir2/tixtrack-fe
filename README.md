# TixTrack - Ticket Management System

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

TixTrack is a frontend web application built with React to manage and track customer support tickets. This application provides a clean and modern interface for users to create tickets and for admins to manage all incoming tickets.

## ✨ Key Features

- **User Authentication**: Secure login and registration system.
- **Role-Based Dashboard**:
  - **Admin**: View overall statistics, list of all tickets, and activity summary.
  - **User**: View personal ticket statistics and list of created tickets.
- **Ticket Management**:
  - Create new tickets with title, description, priority, and image attachments.
  - View ticket details, including reply history.
  - Add replies to tickets.
  - Change ticket status (for admin).
  - Delete tickets (for users on their own tickets).
- **Responsive Interface**: Design that adapts well to both desktop and mobile devices.
- **Search & Filter**: Ability to search tickets and filter them by status or priority.
- **FAQ Page**: Searchable and categorized informative page to help users.
- **Real-time Notifications**: Using `react-hot-toast` for instant user feedback.

## 🛠️ Technologies Used

- **Framework**: [React](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management**: React Context API
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📂 Project Structure

This project folder structure is designed to be easily scalable and maintainable.

```
/src
├── assets/         # Static assets like images and SVGs
├── components/     # Reusable UI components
│   ├── Auth/
│   ├── common/
│   ├── FAQ/
│   ├── Navigation/
│   └── Tickets/
├── context/        # React Context for global state (e.g., AuthContext)
├── data/           # Static data or mock data (e.g., faqData)
├── hooks/          # Custom hooks for reusable logic
├── pages/          # Components representing pages/routes
├── services/       # Logic for interacting with external APIs
└── utils/          # Helper utility functions
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/Fathir2/tixtrack-fe.git
   cd tixtrack-fe
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   
   Create a `.env` file in the project root and add your backend API base URL.

   ```env
   # .env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or another port shown in the terminal).

## 📜 Available Scripts

- `npm run dev`: Run the application in development mode.
- `npm run build`: Build the application for production to the `dist` folder.
- `npm run preview`: Run the built application locally.

---

© 2025 TixTrack
