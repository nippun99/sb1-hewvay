import { z } from 'zod';

export const AssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['stock', 'crypto', 'real-estate', 'cash']),
  value: z.number(),
  quantity: z.number().optional(),
  purchaseDate: z.string(),
  currentPrice: z.number().optional(),
});

export const TransactionSchema = z.object({
  id: z.string(),
  assetId: z.string(),
  type: z.enum(['buy', 'sell']),
  quantity: z.number(),
  price: z.number(),
  date: z.string(),
});

export const HistoricalDataSchema = z.object({
  id: z.string(),
  assetId: z.string(),
  date: z.string(),
  price: z.number(),
});

export type Asset = z.infer<typeof AssetSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type HistoricalData = z.infer<typeof HistoricalDataSchema>;