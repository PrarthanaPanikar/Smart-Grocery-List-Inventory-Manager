const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Dairy', 'Grains', 'Vegetables', 'Fruits', 'Spices', 'Beverages', 'Snacks', 'Other'],
    default: 'Other'
  },
  unit: {
    type: String,
    enum: ['Kg', 'Gram', 'Liter', 'Ml', 'Piece', 'Pack', 'Dozen'],
    default: 'Piece'
  },
  minStockLevel: {
    type: Number,
    default: 1,
    min: 0
  },
  currentQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  expiryDate: {
    type: Date,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  pricePerUnit: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
groceryItemSchema.index({ userId: 1 });
groceryItemSchema.index({ userId: 1, category: 1 });

// Virtual for checking if low stock
groceryItemSchema.virtual('isLowStock').get(function() {
  return this.currentQuantity <= this.minStockLevel;
});

// Virtual for checking if expiring soon
groceryItemSchema.virtual('isExpiringSoon').get(function() {
  if (!this.expiryDate) return false;
  const daysUntilExpiry = Math.ceil((this.expiryDate - Date.now()) / (1000 * 60 * 60 * 24));
  return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
});

// Virtual for days left
groceryItemSchema.virtual('daysLeft').get(function() {
  if (!this.expiryDate) return null;
  return Math.ceil((this.expiryDate - Date.now()) / (1000 * 60 * 60 * 24));
});

groceryItemSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('GroceryItem', groceryItemSchema);
