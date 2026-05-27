# 3️⃣ PROJECT ARCHITECTURE & DESIGN

## 🏗️ Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SMART GROCERY MANAGER SYSTEM                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────┐         ┌────────────────────────┐         │
│  │   FRONTEND LAYER       │         │   BACKEND LAYER        │         │
│  │  (React.js)            │         │  (Node/Express)        │         │
│  ├────────────────────────┤         ├────────────────────────┤         │
│  │ • Login/Register Page  │         │ • Auth Controller      │         │
│  │ • Dashboard Page       │    ───→ │ • Item Controller      │         │
│  │ • Add Item Form        │    ←──  │ • Inventory Controller │         │
│  │ • Item List View       │         │ • Alert Controller     │         │
│  │ • Shopping List        │         │ • Dashboard Controller │         │
│  │ • Alerts Section       │         │ • Validation Middleware│         │
│  │ • Edit/Delete UI       │         │ • Error Middleware     │         │
│  │ • Filters & Search     │         │ • JWT Middleware       │         │
│  └────────────────────────┘         └────────────────────────┘         │
│            ↓                                      ↓                      │
│     HTTP/HTTPS (REST API)              MongoDB Queries & Storage        │
│            ↓                                      ↓                      │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │              DATABASE LAYER (MongoDB)                      │        │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │        │
│  │  │  Users   │ │  Items   │ │Inventory │ │ Alerts   │     │        │
│  │  │Collection│ │Collection│ │Collection│ │Collection│     │        │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 FRONTEND ARCHITECTURE

### Component Structure

```
src/
├── components/
│   ├── Navbar.jsx                 # Top navigation bar
│   ├── ProtectedRoute.jsx         # Route protection wrapper
│   ├── ItemForm.jsx               # Reusable add/edit form
│   ├── ItemCard.jsx               # Single item display
│   ├── AlertBanner.jsx            # Alert display component
│   └── Loader.jsx                 # Loading indicator
│
├── pages/
│   ├── Login.jsx                  # Login page
│   ├── Register.jsx               # Register page
│   ├── Dashboard.jsx              # Main dashboard with KPIs
│   ├── AddItem.jsx                # Add new item page
│   ├── ItemList.jsx               # View all items
│   ├── EditItem.jsx               # Edit existing item
│   ├── ShoppingList.jsx           # Generated shopping list
│   └── Alerts.jsx                 # Low-stock & expiry alerts
│
├── services/
│   ├── api.js                     # Axios instance & API calls
│   ├── authService.js             # Login/register calls
│   ├── itemService.js             # Item CRUD calls
│   ├── inventoryService.js        # Inventory calls
│   └── alertService.js            # Alert calls
│
├── context/
│   ├── AuthContext.jsx            # User authentication context
│   └── ItemContext.jsx            # Items & inventory context
│
├── App.jsx                        # Main app component
├── index.jsx                      # Entry point
└── App.css                        # Global styles

```

### Frontend Data Flow

```
User Action (Click/Submit)
         ↓
Component Event Handler
         ↓
Call API Service (axios call)
         ↓
Backend API Endpoint
         ↓
Get Response (JSON)
         ↓
Update Context/State (useState/Context API)
         ↓
Component Re-render with New Data
         ↓
Display Updated UI
```

### Frontend Authentication Flow

```
LOGIN PAGE
    ↓ (User enters email/password)
Submit to /api/auth/login
    ↓
Backend validates & returns JWT token
    ↓
Save token in localStorage
    ↓ (localStorage → AuthContext)
Update AuthContext with user info
    ↓
ProtectedRoute checks if token exists
    ↓ (YES) → Navigate to Dashboard
↓ (NO) → Redirect to Login
```

---

## 🔧 BACKEND ARCHITECTURE

### API Routes Structure

```
server/
├── routes/
│   ├── authRoutes.js              # POST /api/auth/register
│   │                              # POST /api/auth/login
│   │
│   ├── itemRoutes.js              # GET /api/items
│   │                              # POST /api/items (create)
│   │                              # PUT /api/items/:id (update)
│   │                              # DELETE /api/items/:id
│   │
│   ├── inventoryRoutes.js         # GET /api/inventory
│   │                              # POST /api/inventory (add lot)
│   │                              # PUT /api/inventory/:id (update qty)
│   │
│   ├── alertRoutes.js             # GET /api/alerts/low-stock
│   │                              # GET /api/alerts/expiry
│   │
│   └── dashboardRoutes.js         # GET /api/dashboard/summary
│
├── controllers/
│   ├── authController.js          # Login & register logic
│   ├── itemController.js          # Item CRUD logic
│   ├── inventoryController.js     # Inventory logic
│   ├── alertController.js         # Alert logic
│   └── dashboardController.js     # Dashboard summary logic
│
├── middleware/
│   ├── authMiddleware.js          # JWT verification
│   ├── validationMiddleware.js    # Data validation
│   └── errorMiddleware.js         # Error handling
│
├── models/
│   ├── User.js                    # User schema & model
│   ├── GroceryItem.js             # Item schema & model
│   ├── Inventory.js               # Inventory schema & model
│   └── Alert.js                   # Alert schema & model
│
├── config/
│   └── db.js                      # MongoDB connection
│
├── utils/
│   ├── validators.js              # Validation functions
│   ├── helpers.js                 # Helper functions
│   └── constants.js               # Constants & enums
│
└── server.js                      # Main server file
```

### Backend Request-Response Flow

```
HTTP Request (from Frontend)
         ↓
Express Routes Receive Request
         ↓
JWT Middleware (verify token)
         ↓ (Token valid?) → Continue
         ↓ (Token invalid?) → Send 401 Unauthorized
Validation Middleware (check data format)
         ↓ (Valid?) → Continue
         ↓ (Invalid?) → Send 400 Bad Request
Route Handler (Controller)
         ↓
MongoDB Query (via Mongoose)
         ↓
Database Operation (Create/Read/Update/Delete)
         ↓
Return Data
         ↓
Controller Formats Response
         ↓
HTTP Response (JSON) to Frontend
         ↓
Frontend Receives & Displays Data
```

### API Endpoints Reference

#### Authentication APIs
```
POST /api/auth/register
- Body: { email, password, name }
- Response: { message, token, user }

POST /api/auth/login
- Body: { email, password }
- Response: { token, user }

GET /api/auth/me
- Headers: { Authorization: "Bearer token" }
- Response: { user }
```

#### Item Management APIs
```
GET /api/items
- Headers: { Authorization: "Bearer token" }
- Response: [ { id, name, category, unit, minStock, ... } ]

POST /api/items
- Headers: { Authorization: "Bearer token" }
- Body: { name, category, unit, minStock, expiryDate }
- Response: { message, item }

GET /api/items/:id
- Headers: { Authorization: "Bearer token" }
- Response: { item }

PUT /api/items/:id
- Headers: { Authorization: "Bearer token" }
- Body: { name, category, unit, minStock, expiryDate }
- Response: { message, item }

DELETE /api/items/:id
- Headers: { Authorization: "Bearer token" }
- Response: { message }
```

#### Inventory APIs
```
GET /api/inventory
- Headers: { Authorization: "Bearer token" }
- Response: [ { itemId, itemName, quantity, unit, expiryDate, lastUpdated } ]

POST /api/inventory
- Headers: { Authorization: "Bearer token" }
- Body: { itemId, quantity, unit, expiryDate }
- Response: { message, inventory }

PUT /api/inventory/:id
- Headers: { Authorization: "Bearer token" }
- Body: { quantity }
- Response: { message, inventory }
```

#### Alert APIs
```
GET /api/alerts/low-stock
- Headers: { Authorization: "Bearer token" }
- Response: [ { itemId, itemName, currentQty, minQty } ]

GET /api/alerts/expiry
- Headers: { Authorization: "Bearer token" }
- Response: [ { itemId, itemName, expiryDate, daysLeft } ]
```

#### Dashboard APIs
```
GET /api/dashboard/summary
- Headers: { Authorization: "Bearer token" }
- Response: {
    totalItems,
    totalQuantity,
    lowStockCount,
    expiringCount,
    recentActivity,
    categoryBreakdown,
    topExpiring
  }
```

---

## 💾 DATABASE ARCHITECTURE (MongoDB)

### User Collection Schema
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  password: "hashed_password",
  name: "Priya Singh",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### GroceryItem Collection Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Reference to User
  name: "Milk",
  category: "Dairy",          // Dairy, Grains, Vegetables, Fruits, etc.
  unit: "Liter",              // Liter, Kg, Gram, Piece, etc.
  minStockLevel: 2,           // Alert when qty drops below this
  currentQuantity: 5,         // Current stock
  expiryDate: ISODate,        // When item expires
  lastUpdated: ISODate,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Inventory Collection Schema (Optional - for detailed tracking)
```javascript
{
  _id: ObjectId,
  itemId: ObjectId,           // Reference to GroceryItem
  userId: ObjectId,           // Reference to User
  quantityAdded: 5,           // How much added
  quantityUsed: 1,            // How much consumed
  remainingQuantity: 4,       // Current available
  boughtDate: ISODate,        // When purchased
  expiryDate: ISODate,        // When expires
  boughtPrice: 250,           // Purchase price
  notes: "from Big Bazaar",
  addedAt: ISODate,
  updatedAt: ISODate
}
```

### Database Relationships
```
User (1) ──→ (Many) GroceryItem
User (1) ──→ (Many) Inventory
GroceryItem (1) ──→ (Many) Inventory
```

---

## 🔄 Complete Data Flow Example: Adding an Item

### Scenario: User adds "Rice 5kg"

```
1. FRONTEND (React)
   ├─ User fills form: Name="Rice", Category="Grains", Qty=5, Unit="Kg", MinStock=2
   ├─ User clicks "Add Item" button
   └─ onClick handler triggered
   
2. API CALL
   ├─ Axios POST to /api/items
   ├─ Headers: { Authorization: "Bearer token" }
   └─ Body: { name: "Rice", category: "Grains", currentQuantity: 5, ... }

3. BACKEND (Express)
   ├─ Route /api/items receives POST request
   ├─ JWT Middleware: Verify token & extract userId
   ├─ Validation Middleware: Check all required fields
   ├─ Item Controller: Create new item in MongoDB
   │  └─ db.items.insertOne({ userId, name, category, ... })
   ├─ Response sent: { message: "Item added", item: {...} }
   └─ HTTP Status: 201 Created

4. FRONTEND (React)
   ├─ Receive successful response
   ├─ Update ItemContext with new item
   ├─ Show success notification: "Rice added successfully!"
   ├─ Clear form
   ├─ Redirect to ItemList page
   └─ Display Rice in the list

5. DISPLAY ON DASHBOARD
   ├─ Dashboard calls /api/dashboard/summary
   ├─ Backend aggregates: totalItems++, check if low-stock alert needed
   ├─ Returns updated KPI cards
   └─ Dashboard shows: "Total Items: 1"
```

---

## 📊 Alert Logic Flowchart

```
SYSTEM RUNS (On Dashboard Load)
         ↓
Fetch all items from MongoDB
         ↓
For each item:
    ├─ Check 1: Is currentQuantity ≤ minStockLevel?
    │   └─ YES → Add to LOW_STOCK_ALERTS
    │
    └─ Check 2: Is expiryDate ≤ (today + 3 days)?
        └─ YES → Add to EXPIRY_ALERTS
         ↓
Return both alerts to frontend
         ↓
Frontend displays:
    ├─ Red banner: "Expiring Soon!" with items
    └─ Yellow banner: "Low Stock!" with items
         ↓
User can add these items to shopping list (1-click)
```

---

## 🔐 Security Architecture

### Authentication Flow
```
LOGIN PAGE
    ↓ (email, password)
Backend: Hash provided password
    ↓
Compare with stored hash
    ↓ (Match?) 
    ├─ YES: Generate JWT token
    ├─ Token contains: userId, email, expiry (24 hours)
    └─ Send token to frontend
         ↓ (No match?)
         └─ Send 401 Unauthorized
              ↓
Frontend: Save token in localStorage
    ↓
Every API request includes:
    Authorization: "Bearer token"
         ↓
Backend JWT Middleware:
    ├─ Extract token from headers
    ├─ Verify signature (using secret)
    ├─ Check expiry
    ├─ Extract userId
    └─ Attach to request.user
         ↓ (Valid?)
         ├─ YES: Continue to controller
         └─ NO: Send 401 Unauthorized
```

---

## 🎯 Component Interaction Diagram

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Login      │         │  Dashboard   │         │  Add Item    │
│   Page       │────────→│   Page       │←────────│   Page       │
└──────────────┘         └──────────────┘         └──────────────┘
       ↓                         ↓                        ↓
  Enter Email             Fetch Summary             Fill Form
  & Password              Show KPIs                 & Submit
       ↓                   Show Alerts                    ↓
  Call Login API          Show Recent                Call Add API
       ↓                         ↓                        ↓
Receive Token         Update Context             Update Items List
       ↓                   & State                        ↓
Store in localStorage            ↓                   Show Success
       ↓                  Re-render Page                  ↓
Set in Context                                   Redirect to List
       ↓                                               ↓
Redirect to                                        Show New Item
Dashboard                                         in List View
```

---

## 🏁 Architecture Summary

| Layer | Technology | Responsibility |
|-------|-----------|-----------------|
| **Frontend** | React.js | UI, User interaction, state management |
| **API Communication** | Axios | HTTP calls, error handling |
| **Backend** | Express.js | Route handling, business logic |
| **Authentication** | JWT + bcrypt | Secure login, token management |
| **Database** | MongoDB | Data storage, queries |
| **Middleware** | Express Middleware | Auth, validation, error handling |
| **State** | Context API | Global state management |
| **Styling** | Tailwind CSS | Responsive, professional UI |

---

## ✅ Architecture Benefits

✅ **Separation of Concerns** - Frontend, Backend, Database are separate  
✅ **Scalability** - Easy to add new features without breaking existing code  
✅ **Reusability** - Components and services are modular  
✅ **Maintainability** - Clear structure makes debugging easier  
✅ **Security** - JWT authentication, password hashing, validated inputs  
✅ **Performance** - Efficient API calls, proper indexing in database  
✅ **Professional** - Follows industry best practices  

**Next:** Let's look at the 12-Phase Implementation Plan! 🚀

