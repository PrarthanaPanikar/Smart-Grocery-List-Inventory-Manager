const GroceryItem = require('../models/GroceryItem');

// Get dashboard summary
exports.getDashboardSummary = async (req, res, next) => {
  try {
    const items = await GroceryItem.find({
      userId: req.user.userId
    });

    // Calculate totals
    const totalItems = items.length;
    const totalQuantity = items.reduce((sum, item) => sum + item.currentQuantity, 0);

    // Count alerts
    const lowStockCount = items.filter(item => item.isLowStock).length;
    
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    const expiringCount = items.filter(item => {
      if (!item.expiryDate) return false;
      const expiry = new Date(item.expiryDate);
      return expiry <= threeDaysFromNow && expiry >= now;
    }).length;

    const expiredCount = items.filter(item => {
      if (!item.expiryDate) return false;
      return new Date(item.expiryDate) < now;
    }).length;

    // Category breakdown
    const categoryBreakdown = {};
    items.forEach(item => {
      const cat = item.category || 'Other';
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
    });

    // Top expiring items
    const topExpiring = items
      .filter(item => item.expiryDate && item.daysLeft !== null && item.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5)
      .map(item => ({
        id: item._id,
        name: item.name,
        expiryDate: item.expiryDate,
        daysLeft: item.daysLeft,
        quantity: item.currentQuantity
      }));

    // Recent items (last 5)
    const recentItems = items
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(item => ({
        id: item._id,
        name: item.name,
        action: 'Added',
        date: item.createdAt
      }));

    res.status(200).json({
      success: true,
      summary: {
        totalItems,
        totalQuantity: totalQuantity.toFixed(2),
        lowStockCount,
        expiringCount,
        expiredCount,
        totalAlerts: lowStockCount + expiringCount + expiredCount
      },
      categoryBreakdown,
      topExpiring,
      recentItems
    });
  } catch (error) {
    next(error);
  }
};
