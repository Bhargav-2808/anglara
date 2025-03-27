# Category Management API

This is a **Category Management API** built using **Node.js**, **Express**, and **MongoDB (Mongoose)** with TypeScript. It provides CRUD operations for categories, supporting a **nested category structure** with tree representation.

## Features
- Create, Read, Update, and Delete categories
- Supports **nested categories**
- Categories are retrievable in **tree structure**
- When a **parent category is deleted**, its children are reassigned to the grandparent
- When a **category is marked inactive**, all its subcategories become inactive

---

## 🛠️ Setup and Installation

### **1. Clone the repository**
```sh
git clone https://github.com/Bhargav-2808/anglara.git
cd anglara
```

### **2. Install dependencies**
```sh
yarn install 
# OR 
npm install or npm install --force
```

### **3. Set up environment variables**
Create a `.env` file in the project root and configure the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/category_db
JWT_SECRET=your_secret_key
```

### **4. Run database migrations (if any)**
```sh
```

---

## 🚀 Running the Project

### **Development Mode**
```sh
yarn dev 
# OR
npm run dev
```

### **Production Mode**
```sh
yarn build 
yarn start 
# OR
npm run build && npm start
```

---

## 🛠️ API Endpoints

### **1. Create a Category**
**POST** `/api/categories`
```json
{
  "name": "Electronics",
  "parent": null  
}
```

### **2. Get All Categories (Tree Structure)**
**GET** `/api/categories/tree`

### **3. Get a Category by ID**
**GET** `/api/categories/:id`

### **4. Update a Category**
**PATCH** `/api/categories/:id`
```json
{
  "name": "Updated Name",
  "status": "inactive"
}
```

### **5. Delete a Category**
**DELETE** `/api/categories/:id`

---

## 📌 Technologies Used
- **Node.js** with **Express.js**
- **TypeScript**
- **MongoDB & Mongoose**
- **Zod** (for input validation)
- **JWT Authentication**
- **Bcrypt** (for password hashing)
- **ESLint & Prettier** (for code quality)

---

## 👥 Contributors
- **Bhargav Valani** 

## 📜 License
This project is licensed under the **ISC License**.

