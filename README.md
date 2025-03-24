# EdTech Course Management App

## 📌 Project Overview
This project is a **course management web application** that allows authenticated users to create, view, and manage their course ideas. Built with **Next.js, Strapi, and TailwindCSS**, it ensures a seamless and scalable user experience.

## 🚀 Tech Stack
- **Frontend:** Next.js, TypeScript, Axios, TailwindCSS
- **Backend:** Strapi (Node.js-based CMS), PostgreSQL
- **Authentication:** JWT-based authentication
- **Deployment:** Vercel (Frontend), Railway/Render (Backend)

## 🛠 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/songezomtengwana-code/EdTech
cd EdTech
```

### 2️⃣ Install Dependencies
```sh
npm install  # For frontend
yarn install  # If using Yarn
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the frontend and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_AUTH_SECRET=your_secret_key
```
For the backend, configure `.env` as needed.

### 4️⃣ Start Development Servers
#### **Frontend:**
```sh
cd frontend
npm run dev
```
#### **Backend (Strapi):**
```sh
cd backend
npm run develop
```

## 🔑 Features
- **User Authentication** (Signup, Login, Logout)
- **Course Creation & Management** (CRUD operations)
- **Role-Based Access Control** (Course Owner)
- **API Integration with Strapi**
- **Styled with TailwindCSS**

## 🏗 API Endpoints

### **Authentication**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/auth/local` | User login |
| POST   | `/api/auth/local/register` | User registration |
| GET    | `/api/users/me` | Get current user |

### **Courses**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/api/courses` | Get all courses |
| POST   | `/api/courses` | Create a new course |
| GET    | `/api/courses/:id` | Get course details |
| PUT    | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |
