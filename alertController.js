const GroceryItem = require('../models/GroceryItem');

// Get low stock alerts
exports.getLowStockAlerts = async (req, res, next) => {
  try {
    const items = await GroceryItem.find({
      userId: req.user.userId
    });

    const lowStockItems = items.filter(item => item.isLowStock);

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      alerts: lowStockItems.map(item => ({
        id: item._id,
        name: item.name,
        category: item.category,
        currentQuantity: item.currentQuantity,
        minStockLevel: item.minStockLevel,
        unit: item.unit,
        type: 'low-stock'
      }))
    });
  } catch (error) {
    next(error);
  }
};

// Get expiry alerts
exports.getExpiryAlerts = async (req, res, next) => {
  try {
    const items = await GroceryItem.find({
      userId: req.user.userId,
      expiryDate: { $ne: null }
    });

    const now = new Date();
    const threeeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    const expiryAlerts = items.filter(item => {
      const expiry = new Date(item.expiryDate);
      return expiry <= threeeDaysFromNow && expiry >= now;
    });

    const expiredItems = items.filter(item => {
      return new Date(item.expiryDate) < now;
    });

    res.status(200).json({
      success: true,
      expiringCount: expiryAlerts.length,
      expiredCount: expiredItems.length,
      alerts: [
        ...expiryAlerts.map(item => ({
          id: item._id,
          name: item.name,
          category: item.category,
          expiryDate: item.expiryDate,
          daysLeft: item.daysLeft,
          currentQuantity: item.currentQuantity,
          unit: item.unit,
          type: 'expiring-soon'
        })),
        ...expiredItems.map(item => ({
          id: item._id,
          name: item.name,
          category: item.category,
          expiryDate: item.expiryDate,
          daysLeft: item.daysLeft,
          currentQuantity: item.currentQuantity,
          unit: item.unit,
          type: 'expired'
        }))
      ]
    });
  } catch (error) {
    next(error);
  }
};

// Get all alerts
exports.getAllAlerts = async (req, res, next) => {
  try {
    const items = await GroceryItem.find({
      userId: req.user.userId
    });

    const lowStockAlerts = items.filter(item => item.isLowStock);
    
    const now = new Date();
    const threeeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    const expiryAlerts = items.filter(item => {
      if (!item.expiryDate) return false;
      const expiry = new Date(item.expiryDate);
      return expiry <= threeeDaysFromNow && expiry >= now;
    });

    const expiredItems = items.filter(item => {
      if (!item.expiryDate) return false;
      return new Date(item.expiryDate) < now;
    });

    res.status(200).json({
      success: true,
      summary: {
        lowStockCount: lowStockAlerts.length,
        expiringCount: expiryAlerts.length,
        expiredCount: expiredItems.length,
        totalAlerts: lowStockAlerts.length + expiryAlerts.length + expiredItems.length
      },
      alerts: {
        lowStock: lowStockAlerts,
        expiringSoon: expiryAlerts,
        expired: expiredItems
      }
    });
  } catch (error) {
    next(error);
  }
};
