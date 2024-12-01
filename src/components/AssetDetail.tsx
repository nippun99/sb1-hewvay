import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Clock, DollarSign, BarChart2 } from 'lucide-react';
import { Asset } from '../types/portfolio';
import { TransactionHistory } from './TransactionHistory';
import { PriceChart } from './PriceChart';

interface AssetDetailProps {
  asset: Asset;
  onBack: () => void;
}

export const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onBack }) => {
  const isPositive = asset.currentPrice ? asset.currentPrice > asset.value / (asset.quantity || 1) : true;
  const purchasePrice = asset.quantity ? asset.value / asset.quantity : asset.value;
  const priceChange = asset.currentPrice ? ((asset.currentPrice - purchasePrice) / purchasePrice) * 100 : 0;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Portfolio
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
            <p className="text-gray-500">{asset.type.toUpperCase()}</p>
          </div>
          {isPositive ? (
            <TrendingUp className="text-green-500 w-6 h-6" />
          ) : (
            <TrendingDown className="text-red-500 w-6 h-6" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Current Value</h3>
            </div>
            <p className="text-2xl font-bold">${asset.value.toLocaleString()}</p>
          </div>

          {asset.quantity && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Quantity</h3>
              </div>
              <p className="text-2xl font-bold">{asset.quantity}</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Purchase Date</h3>
            </div>
            <p className="text-2xl font-bold">
              {new Date(asset.purchaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {asset.currentPrice && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">Price Performance</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                priceChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            </div>
            <PriceChart assetId={asset.id} />
          </div>
        )}
      </div>

      <TransactionHistory assetId={asset.id} />
    </div>
  );
};