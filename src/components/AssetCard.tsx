import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Asset } from '../types/portfolio';

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  const isPositive = asset.currentPrice ? asset.currentPrice > asset.value / (asset.quantity || 1) : true;

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{asset.name}</h3>
        {isPositive ? (
          <TrendingUp className="text-green-500 w-5 h-5" />
        ) : (
          <TrendingDown className="text-red-500 w-5 h-5" />
        )}
      </div>
      <div className="text-gray-600">
        <p>Value: ${asset.value.toLocaleString()}</p>
        {asset.quantity && (
          <p>Quantity: {asset.quantity}</p>
        )}
        <p className="text-sm">Added: {new Date(asset.purchaseDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};