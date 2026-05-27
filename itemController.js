const GroceryItem = require('../models/GroceryItem');

// Get all items for user
exports.getAllItems = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    
    let query = { userId: req.user.userId };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const items = await GroceryItem.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
};

// Get single item
exports.getItem = async (req, res, next) => {
  try {
    const item = await GroceryItem.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    next(error);
  }
};

// Create item
exports.createItem = async (req, res, next) => {
  try {
    const { name, category, unit, minStockLevel, currentQuantity, expiryDate } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Item name is required'
      });
    }

    const item = await GroceryItem.create({
      userId: req.user.userId,
      name,
      category: category || 'Other',
      unit: unit || 'Piece',
      minStockLevel: minStockLevel || 1,
      currentQuantity: currentQuantity || 0,
      expiryDate: expiryDate || null
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    next(error);
  }
};

// Update item
exports.updateItem = async (req, res, next) => {
  try {
    let item = await GroceryItem.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Update fields
    const { name, category, unit, minStockLevel, currentQuantity, expiryDate } = req.body;
    
    if (name) item.name = name;
    if (category) item.category = category;
    if (unit) item.unit = unit;
    if (minStockLevel !== undefined) item.minStockLevel = minStockLevel;
    if (currentQuantity !== undefined) item.currentQuantity = currentQuantity;
    if (expiryDate !== undefined) item.expiryDate = expiryDate;
    
    item.updatedAt = new Date();
    
    item = await item.save();

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      item
    });
  } catch (error) {
    next(error);
  }
};

// Delete item
exports.deleteItem = async (req, res, next) => {
  try {
    const item = await GroceryItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update quantity
exports.updateQuantity = async (req, res, next) => {
  try {
    const { quantity, operation } = req.body; // operation: 'add', 'subtract', 'set'

    let item = await GroceryItem.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Update quantity based on operation
    if (operation === 'add') {
      item.currentQuantity += quantity;
    } else if (operation === 'subtract') {
      item.currentQuantity = Math.max(0, item.currentQuantity - quantity);
    } else if (operation === 'set') {
      item.currentQuantity = quantity;
    }

    item.updatedAt = new Date();
    item = await item.save();

    res.status(200).json({
      success: true,
      message: 'Quantity updated',
      item
    });
  } catch (error) {
    next(error);
  }
};
