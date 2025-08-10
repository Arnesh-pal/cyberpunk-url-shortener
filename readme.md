# 🚀 Cyberpunk URL Shortener

A full-stack MERN application that shortens long URLs, built with a futuristic, cyberpunk aesthetic. Shorten your links, jack into the matrix.

---

## ⛓️ Live Demo

### [> Jack In Now <](https://cyberpunk-url-shortener-1.onrender.com/)



---

## 📝 Features

* **Shorten URLs:** Convert long, unwieldy URLs into compact, easy-to-share links.
* **Seamless Redirection:** Visiting a short link immediately redirects to the original URL.
* **Admin Dashboard:** A private admin page to view all generated links.
* **Real-Time Analytics:** The admin page tracks click counts for each link, updating automatically without needing a refresh.
* **Futuristic UI:** A responsive, cyberpunk-themed interface with neon glow effects and a custom font.

---

## 💻 Tech Stack

This project is built with the MERN stack and deployed on Render.

![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

---

## 🛠️ Local Development Setup

To run this project on your local machine, follow these steps.

### **Prerequisites**

* Node.js installed
* npm or yarn installed
* A free MongoDB Atlas account for the database

### **1. Clone the Repository**
```bash
git clone [https://github.com/your-username/cyberpunk-url-shortener.git](https://github.com/your-username/cyberpunk-url-shortener.git)
cd cyberpunk-url-shortener
```

### **2. Backend Setup**
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend folder and add your variables
touch .env
```

### Your backend/.env file should look like this:

```bash
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5001
```

```bash
# Start the backend server
node server.js
# The server will be running on http://localhost:5001
```

### **3. Frontend Setup**
Open a new terminal window for this step.


```bash
# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
# The app will open at http://localhost:3000
```

### 🌐 Deployment
This application is deployed on Render using a monorepo structure.

The backend is deployed as a Web Service.

The frontend is deployed as a Static Site, with rewrite rules to handle client-side routing.

### 📜 License
Distributed under the MIT License. See LICENSE for more information.

