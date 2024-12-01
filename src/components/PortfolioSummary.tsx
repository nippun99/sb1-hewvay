import React from 'react';
import { PortfolioStats } from '../types/portfolio';
import { PieChart, DollarSign, TrendingUp } from 'lucide-react';

interface PortfolioSummaryProps {
  stats: PortfolioStats;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="text-blue-500" />
          <h3 className="font-semibold">Total Value</h3>
        </div>
        <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="text-green-500" />
          <h3 className="font-semibold">Performance</h3>
        </div>
        <div className="space-y-1">
          <p>Monthly: {stats.monthlyChange}%</p>
          <p>Yearly: {stats.yearlyChange}%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <PieChart className="text-purple-500" />
          <h3 className="font-semibold">Asset Allocation</h3>
        </div>
        <div className="space-y-1">
          {Object.entries(stats.assetAllocation).map(([type, percentage]) => (
            <p key={type}>{type}: {percentage.toFixed(1)}%</p>
          ))}
        </div>
      </div>
    </div>
  );
};