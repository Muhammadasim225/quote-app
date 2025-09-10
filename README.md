# 📜 Quote App

A modern, responsive Quote Application built with React, Apollo Client, GraphQL, JWT authentication, and Materialize CSS. This frontend interfaces seamlessly with a Node.js backend powered by Apollo Server and MongoDB.

## 🧰 Tech Stack

- **Frontend**: React, React Router, Apollo Client, Materialize CSS
- **Backend**: Node.js, Express, Apollo Server, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Profile Images**: RoboHash API
- **Deployment**: Vercel (Frontend), Railway (Backend), MongoDB Atlas (Database)

## 📸 Features

- 🔐 User Authentication (Signup/Login) with JWT
- 📝 Create, Read, Update, and Delete Quotes
- 👤 View Personal and Other Users' Profiles
- 🎨 Responsive Design with Materialize CSS
- 🖼️ Random Profile Images via RoboHash API
- ⚡ Efficient State Management with Apollo Client Cache

## 🖥️ Project Structure

```bash
frontend/
├── node_modules/          → Project dependencies (auto-generated)
├── public/                → Static files (e.g., index.html)
├── src/                   → All source code
│   ├── assets/            → (Optional) Images, icons, etc.
│   ├── components/        → All React UI components:
│   │   ├── CreateQuote.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotFound.jsx
│   │   ├── OtherUserProfile.jsx
│   │   ├── Profile.jsx
│   │   └── Signup.jsx
│   ├── gqloperations/     → GraphQL operations:
│   │   ├── mutations.js   → All GraphQL mutations
│   │   └── queries.js     → All GraphQL queries
│   ├── App.css            → Component styles
│   ├── App.jsx            → Main app logic and routing
│   ├── index.css          → Global styles
│   └── main.jsx           → Entry point for the React app
├── .gitignore             → Files Git should ignore
├── eslint.config.js       → Linting rules
├── index.html             → HTML template
├── package.json           → Project metadata & dependencies
├── README.md              → Project documentation
└── vite.config.js         → Vite configuration
```


## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Muhammadasim225/quote-app.git
   cd quote-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a .env file in the root directory and add:

   ```bash  
   VITE_API_URL=https://your-backend-url.com/graphql
   ```
   
4. **Run the application:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   The app should now be running at http://localhost:5173.


