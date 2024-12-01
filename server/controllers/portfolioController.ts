import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { mockAssets } from '../data/mockData';

export const getPortfolioStats = asyncHandler(async (req: Request, res: Response) => {
  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  
  const assetAllocation = mockAssets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + (asset.value / totalValue) * 100;
    return acc;
  }, {} as Record<string, number>);

  res.json({
    totalValue,
    monthlyChange: 5.2,
    yearlyChange: 12.8,
    assetAllocation,
  });
});