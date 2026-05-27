import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Placeholder pages (we'll create these next)
const AddItem = () => <div className="max-w-6xl mx-auto p-6"><h1>Add Item - Coming Soon</h1></div>;
const ItemList = () => <div className="max-w-6xl mx-auto p-6"><h1>Item List - Coming Soon</h1></div>;
const EditItem = () => <div className="max-w-6xl mx-auto p-6"><h1>Edit Item - Coming Soon</h1></div>;
const ShoppingList = () => <div className="max-w-6xl mx-auto p-6"><h1>Shopping List - Coming Soon</h1></div>;
const Alerts = () => <div className="max-w-6xl mx-auto p-6"><h1>Alerts - Coming Soon</h1></div>;
const NotFound = () => <div className="max-w-6xl mx-auto p-6"><h1>404 - Page Not Found</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-item"
            element={
              <ProtectedRoute>
                <AddItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-item/:id"
            element={
              <ProtectedRoute>
                <EditItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <Alerts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping-list"
            element={
              <ProtectedRoute>
                <ShoppingList />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
