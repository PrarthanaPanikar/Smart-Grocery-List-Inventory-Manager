# 🛒 Smart Grocery List & Inventory Manager

**A Full-Stack MERN Application for Managing Household & Inventory Management with Alerts & Auto-Generated Shopping Lists**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Tech Stack](https://img.shields.io/badge/tech-MERN-blueviolet)

---

## 📖 Project Overview

**Smart Grocery List & Inventory Manager** is a production-ready full-stack web application that helps users, families, and small businesses:

- 📝 Track pantry inventory in real-time
- 🔔 Get intelligent low-stock and expiry alerts
- 📱 Auto-generate smart shopping lists
- 👥 Share inventory with family members
- 📊 View analytics and insights
- 🏷️ Organize items by category
- 💰 Track prices and spending

**Perfect for:** Families, hostels, small cafés, cloud kitchens, and grocery stores

---

## 🎯 Problem Statement

**Before this app:**
- Forgot what groceries you have at home
- Bought duplicate items
- Let items expire and waste food
- Had to manually check pantry every time
- No coordination between family members
- Wasted time and money

**After this app:**
- Know exactly what's in your pantry
- Never buy duplicates
- Get alerts before items expire
- Automatically generate shopping lists
- Coordinated shopping with family
- Save money and reduce waste

---

## ✨ Key Features

### 1. **User Authentication** 🔐
- Secure registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Session management

### 2. **Inventory Management** 📦
- Add/Edit/Delete grocery items
- Track quantities and units
- Set minimum stock levels
- Categorize items (Dairy, Grains, Vegetables, etc.)
- Update consumption

### 3. **Smart Alerts** 🔔
- Low-stock alerts (when qty ≤ minimum)
- Expiry alerts (3 days before expiry)
- Expired items notification
- Real-time alert updates

### 4. **Auto Shopping List** 📝
- Generated from low-stock items
- Generated from expiring items
- Manual item addition
- Checkbox to track purchases
- One-click list clearing

### 5. **Dashboard Analytics** 📊
- Total items count
- Low-stock items count
- Expiring soon count
- Category breakdown
- Top expiring items
- Recent activity log

### 6. **Search & Filtering** 🔍
- Filter by category
- Search by item name
- Sort by expiry date
- Filter by status (low-stock, expiring, etc.)

### 7. **Responsive Design** 📱
- Works on mobile, tablet, desktop
- Tailwind CSS styling
- Optimized UI/UX
- Professional interface

---

## 🛠️ Tech Stack

### Frontend
```
✅ React.js 18+           - UI library
✅ React Router v6        - Client-side routing
✅ Tailwind CSS 3+        - Styling
✅ Axios                  - HTTP client
✅ Context API            - State management
✅ Vite                   - Build tool
```

### Backend
```
✅ Node.js 16+            - Runtime
✅ Express.js 4+          - Web framework
✅ MongoDB 6+             - Database
✅ Mongoose 7+            - ODM
✅ JWT                    - Authentication
✅ bcryptjs               - Password hashing
```

### DevOps & Deployment
```
✅ Git & GitHub           - Version control
✅ MongoDB Atlas          - Managed database
✅ Vercel                 - Frontend hosting
✅ Railway/Render         - Backend hosting
```

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────┐
│              USER BROWSER                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │    FRONTEND (React + Tailwind)               │   │
│  │    Pages: Login, Dashboard, Items, Alerts    │   │
│  └──────────────────────────────────────────────┘   │
│                        ↕                            │
│                  HTTP/HTTPS (REST API)             │
│                        ↕                            │
│  ┌──────────────────────────────────────────────┐   │
│  │  BACKEND (Node/Express)                      │   │
│  │  Controllers, Routes, Middleware, Models     │   │
│  └──────────────────────────────────────────────┘   │
│                        ↕                            │
│                   MongoDB Queries                   │
│                        ↕                            │
│  ┌──────────────────────────────────────────────┐   │
│  │    DATABASE (MongoDB)                        │   │
│  │    Collections: Users, Items, Inventory      │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (free)
- Git
- VS Code or any editor

### Installation (5 minutes)

**1. Clone Repository**
```bash
git clone https://github.com/yourusername/Smart-Grocery-Inventory-Manager.git
cd Smart-Grocery-Inventory-Manager
```

**2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm start
# Should show: ✅ MongoDB connected successfully
#             🚀 Server running on port 3001
```

**3. Frontend Setup** (in new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# Should show: http://localhost:5173/
```

**4. Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

---

## 📚 API Endpoints Reference

### Authentication
```
POST   /api/auth/register           - Register new user
POST   /api/auth/login              - Login user
GET    /api/auth/me                 - Get current user (Protected)
```

### Items (All Protected)
```
GET    /api/items                   - Get all items
POST   /api/items                   - Create new item
GET    /api/items/:id               - Get single item
PUT    /api/items/:id               - Update item
DELETE /api/items/:id               - Delete item
PUT    /api/items/:id/quantity      - Update quantity
```

### Alerts (All Protected)
```
GET    /api/alerts                  - Get all alerts
GET    /api/alerts/low-stock        - Get low-stock alerts
GET    /api/alerts/expiry           - Get expiry alerts
```

### Dashboard (All Protected)
```
GET    /api/dashboard/summary       - Get dashboard summary
```

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### GroceryItem Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  category: String (Dairy, Grains, etc.),
  unit: String (Kg, Liter, Piece, etc.),
  minStockLevel: Number,
  currentQuantity: Number,
  expiryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎮 Usage Guide

### 1. Register & Login
- Go to http://localhost:5173/register
- Create account with email and password
- Login with credentials

### 2. Add Items
- Click "Add Item" in navbar
- Fill in item details (name, category, quantity, expiry)
- Click "Add Item"
- Item appears in dashboard

### 3. Track Inventory
- Go to "Items" page
- View all your items
- Update quantities with +/- buttons
- See real-time low-stock badges

### 4. Monitor Alerts
- Go to "Alerts" page
- See low-stock items (red badge)
- See expiring items (yellow badge)
- See expired items (dark red badge)

### 5. Generate Shopping List
- Go to "Shopping List"
- Auto-populated from low-stock + expiring items
- Check items as you buy them
- Clear checked items

### 6. View Dashboard
- See KPI cards (Total items, Total qty, Alerts)
- View category breakdown
- See top expiring items
- Check recent activity

---

## 🧪 Testing

### Test User Account
```
Email: demo@example.com
Password: demo123
```

### Manual Test Cases

**Test Case 1: Add Item & Low-Stock Alert**
1. Add "Milk" with qty=1, min=2
2. Should appear in alerts immediately

**Test Case 2: Expiry Alert**
1. Add "Tomato" with expiry=today+1day
2. Should appear in expiry alerts

**Test Case 3: Update Quantity**
1. Add "Rice" qty=10
2. Click "- Decrease" 5 times
3. Quantity should be 5

**Test Case 4: Category Filter**
1. Add items from different categories
2. Filter by category
3. Should show only selected category

**Test Case 5: Search**
1. Add multiple items
2. Search for specific item name
3. Should filter results

---

## 📁 Folder Structure

```
Smart-Grocery-Inventory-Manager/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── GroceryItem.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   └── alertController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── itemRoutes.js
│   │   └── alertRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Alerts.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── itemService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── .env
│
├── docs/
│   ├── 01-PROJECT-EXPLANATION.md
│   ├── 02-TECH-STACK-OPTIONS.md
│   ├── 03-ARCHITECTURE.md
│   ├── 04-IMPLEMENTATION-PLAN.md
│   └── 05-FOLDER-STRUCTURE-AND-INSTALLATION.md
│
└── README.md
```

---

## 🌐 Deployment

### Deploy Backend (Railway/Render)

**Railway:**
```bash
# Push to GitHub
git push

# Connect GitHub repo to Railway
# Railway auto-deploys on git push
```

**Render:**
```
1. Connect GitHub repo to Render
2. Set Environment Variables in dashboard
3. Deploy automatically
```

### Deploy Frontend (Vercel)

```bash
# Vercel auto-deploys on GitHub push
npm run build
vercel
```

**Set Environment Variables in Vercel:**
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:

### Frontend Skills
✅ React hooks and functional components  
✅ React Router for navigation  
✅ Context API for state management  
✅ Axios for API calls  
✅ Form validation and error handling  
✅ Responsive design with Tailwind CSS  
✅ Component composition and reusability  

### Backend Skills
✅ Express.js server creation  
✅ RESTful API design  
✅ MongoDB schema modeling  
✅ Middleware implementation  
✅ JWT authentication  
✅ Error handling and validation  
✅ Controller-Route architecture  

### DevOps Skills
✅ Environment variables management  
✅ Git workflow and GitHub  
✅ Database connection and management  
✅ API testing with Postman/Thunder Client  
✅ Deployment to production  

### Professional Skills
✅ Code organization and structure  
✅ README documentation  
✅ Commit message best practices  
✅ Project folder structure  
✅ Production-ready code  

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Inspired by real-world apps like BigBasket, AnyList, Instacart
- Built for educational purposes
- Perfect for portfolio building
- Industry-standard tech stack

---

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and screenshots
4. Mention your OS and Node version

---

## 📈 Future Enhancements

- [ ] Barcode scanning with camera
- [ ] Receipt image upload and OCR
- [ ] Price tracking and comparison
- [ ] Recipe suggestions
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration with Socket.io
- [ ] Payment integration
- [ ] Offline support with PWA
- [ ] Multi-language support

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com)
- Email: your@email.com

---

## ⭐ Star if Helpful!

If this project helped you, please star this repository! It helps others discover it. ⭐

---

**Happy Coding! 🚀**

*Last Updated: 2024*

