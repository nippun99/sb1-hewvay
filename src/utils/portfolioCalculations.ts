import { Asset, PortfolioStats } from '../types/portfolio';

export const calculatePortfolioStats = (assets: Asset[]): PortfolioStats => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  const assetAllocation = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + (asset.value / totalValue) * 100;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalValue,
    monthlyChange: 5.2, // Mock data - would be calculated from historical data
    yearlyChange: 12.8, // Mock data - would be calculated from historical data
    assetAllocation,
  };
};