import React, { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolioService';
import { HistoricalData } from '../types/portfolio';

interface PriceChartProps {
  assetId: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ assetId }) => {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const data = await portfolioService.getAssetHistory(assetId);
        setHistoricalData(data);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [assetId]);

  if (historicalData.length === 0) {
    return null;
  }

  const maxPrice = Math.max(...historicalData.map(d => d.price));
  const minPrice = Math.min(...historicalData.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="h-48 flex items-end space-x-2">
      {historicalData.map((data, index) => {
        const height = ((data.price - minPrice) / priceRange) * 100;
        return (
          <div
            key={data.id}
            className="flex-1 flex flex-col items-center group"
          >
            <div className="relative w-full">
              <div
                className="absolute bottom-0 w-full bg-blue-500 rounded-t"
                style={{ height: `${height}%` }}
              >
                <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  ${data.price.toLocaleString()}
                  <br />
                  {new Date(data.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};