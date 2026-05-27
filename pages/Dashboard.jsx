import React, { useState, useEffect } from 'react';
import dashboardService from '../services/dashboardService';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardService.getDashboardSummary();
        setData(response);
      } catch (err) {
        setError('Failed to load dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  const { summary = {}, categoryBreakdown = {}, topExpiring = [], recentItems = [] } = data || {};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <div className="text-gray-600 text-sm font-semibold">Total Items</div>
          <div className="text-3xl font-bold text-blue-600">{summary.totalItems || 0}</div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <div className="text-gray-600 text-sm font-semibold">Total Quantity</div>
          <div className="text-3xl font-bold text-green-600">{summary.totalQuantity || 0}</div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <div className="text-gray-600 text-sm font-semibold">Low Stock</div>
          <div className="text-3xl font-bold text-yellow-600">{summary.lowStockCount || 0}</div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="text-gray-600 text-sm font-semibold">Alerts</div>
          <div className="text-3xl font-bold text-red-600">{summary.totalAlerts || 0}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Category Breakdown</h2>
          <div className="space-y-2">
            {Object.entries(categoryBreakdown).length > 0 ? (
              Object.entries(categoryBreakdown).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">{category}</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items yet</p>
            )}
          </div>
        </div>

        {/* Top Expiring Items */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Expiring Items</h2>
          <div className="space-y-2">
            {topExpiring.length > 0 ? (
              topExpiring.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-orange-50 rounded border-l-4 border-orange-500">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.quantity} units</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    item.daysLeft <= 0 ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {item.daysLeft <= 0 ? 'EXPIRED' : `${item.daysLeft}d`}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No expiring items</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {recentItems.length > 0 ? (
            recentItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                <span className="text-gray-700">{item.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
