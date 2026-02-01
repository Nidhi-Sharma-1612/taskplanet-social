# 🚀 TaskPlanet Social – Mini Social Post Application

A full-stack social feed application built as part of the **3W Full Stack Internship Assignment**.  
Users can sign up, log in, create posts (text/image), view a public feed, like posts, and comment — inspired by the **TaskPlanet Social Page**.

---

## ✨ Features

### 🔐 Authentication

- User signup & login with email and password
- Secure authentication using **HTTP-only cookies**
- Persistent login across page reloads

### 📝 Posts

- Create posts with:
  - Text only
  - Image only
  - Text + Image
- Image upload handled via **Cloudinary**
- Relative time display (e.g. _2 minutes ago_)

### ❤️ Social Interactions

- Like / Unlike posts
- Add comments on posts
- Each comment displays:
  - User avatar
  - Username
  - Email
  - Comment text
  - Time of comment

### 📰 Feed

- Public feed showing posts from all users
- Paginated feed with **Load More**
- Optimistic UI updates

### 🎨 UI & UX

- Clean, modern UI using **Material UI**
- Sticky header with:
  - App icon
  - User avatar
  - Logout menu
- Loading spinners for async actions
- Disabled actions for invalid inputs
- Responsive layout (mobile-friendly)

---

## 🛠️ Tech Stack

### Frontend

- **React (Vite)**
- **Material UI**
- React Router
- Axios

### Backend

- **Node.js**
- **Express.js**
- MongoDB (Mongoose)
- JWT Authentication
- HTTP-only cookies

### Database & Services

- **MongoDB Atlas**
- **Cloudinary** (image uploads)

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🌍 Live Demo

- **Frontend:**  
  👉 https://taskplanet-social.vercel.app

- **Backend API:**  
  👉 https://taskplanet-backend-4g9s.onrender.com

---

## 📂 Project Structure

```bash
taskplanet-social/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

> ⚠️ Do not commit `.env` files.

---

## 🚀 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/taskplanet-social.git
cd taskplanet-social
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🏆 Bonus Points Covered

- ✅ Clean & modern UI
- ✅ Responsive layout
- ✅ Efficient pagination
- ✅ Secure authentication
- ✅ Well-structured, reusable code
- ✅ Best practices for cookies & CORS
- ✅ Production-ready deployment

---

## 👩‍💻 Author

**Nidhi Sharma**  
Full Stack Developer

---

## 📌 Notes

- Authentication uses **HTTP-only cookies** (no tokens in localStorage)
- Designed with production-level security practices
- Inspired by TaskPlanet Social UI
