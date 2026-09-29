# HK Masso (Frontend)

A modern, responsive multi-language web application built for customers to explore services, book massage therapy sessions, manage appointments, and leave reviews. 

🌐 **Live Demo:** [hk-masso-website.vercel.app](https://hk-masso-website.vercel.app)

---

## 🚀 Features

* **Authentication & User Management:**
  * Google OAuth Sign-In via Auth.js (NextAuth)
  * Account management (profile updates, logout, and account deletion)
* **Booking System:**
  * Explore services and select available dates/times using interactive date pickers
  * Real-time booking management (view current and past bookings)
* **Reviews & Feedback:**
  * Customers can submit reviews for completed sessions
* **Localization & Theming:**
  * **Trilingual Support:** Full i18n support in Arabic, French, and English
  * **Theme Switcher:** Light and Dark mode options
* **Static & Informational Pages:**
  * Dedicated About Us and Contact pages

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **Authentication:** [Auth.js / NextAuth](https://next-auth.js.org/)
* **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), `tailwindcss-animate`, [Lucide React](https://lucide.dev/), `react-icons`
* **State Management & Data Fetching:** [Redux Toolkit](https://redux-toolkit.js.org/), [TanStack Query (React Query)](https://tanstack.com/query/latest), Context API, [Axios](https://axios-http.com/)
* **Internationalization:** `next-intl` / `i18n`
* **Utilities:** `date-fns`, `react-day-picker`, `use-debounce`

> **Note:** This repository houses the **Frontend** application. The backend service runs on a separate API repository.

---

## 📂 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/hk-masso-frontend.git](https://github.com/your-username/hk-masso-frontend.git)
   cd hk-masso-frontend
