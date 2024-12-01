import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { mockAssets, mockTransactions, mockHistoricalData } from '../data/mockData';
import { AssetSchema } from '../types';

export const getAssets = asyncHandler(async (req: Request, res: Response) => {
  const type = req.query.type as string;
  let assets = [...mockAssets];
  
  if (type && type !== 'all') {
    assets = assets.filter(asset => asset.type === type);
  }
  
  res.json(assets);
});

export const getAssetById = asyncHandler(async (req: Request, res: Response) => {
  const asset = mockAssets.find(a => a.id === req.params.id);
  
  if (!asset) {
    res.status(404);
    throw new Error('Asset not found');
  }
  
  res.json(asset);
});

export const getAssetTransactions = asyncHandler(async (req: Request, res: Response) => {
  const transactions = mockTransactions.filter(t => t.assetId === req.params.id);
  res.json(transactions);
});

export const getAssetHistory = asyncHandler(async (req: Request, res: Response) => {
  const history = mockHistoricalData.filter(h => h.assetId === req.params.id);
  res.json(history);
});

export const createAsset = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = AssetSchema.parse({
    ...req.body,
    id: (mockAssets.length + 1).toString(),
  });
  
  mockAssets.push(validatedData);
  res.status(201).json(validatedData);
});