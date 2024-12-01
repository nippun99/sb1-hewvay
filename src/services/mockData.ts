import { Asset, Transaction, HistoricalData } from '../types/portfolio';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    type: 'stock',
    value: 150000,
    quantity: 100,
    purchaseDate: '2023-01-15',
    currentPrice: 150,
  },
  {
    id: '2',
    name: 'Bitcoin',
    type: 'crypto',
    value: 75000,
    quantity: 1.5,
    purchaseDate: '2023-03-20',
    currentPrice: 50000,
  },
  {
    id: '3',
    name: 'Downtown Apartment',
    type: 'real-estate',
    value: 450000,
    purchaseDate: '2022-08-10',
  },
  {
    id: '4',
    name: 'Emergency Fund',
    type: 'cash',
    value: 25000,
    purchaseDate: '2024-01-01',
  },
  {
    id: '5',
    name: 'Microsoft Corporation',
    type: 'stock',
    value: 180000,
    quantity: 500,
    purchaseDate: '2023-06-15',
    currentPrice: 360,
  },
  {
    id: '6',
    name: 'Tesla Inc.',
    type: 'stock',
    value: 95000,
    quantity: 400,
    purchaseDate: '2023-08-20',
    currentPrice: 237.50,
  },
  {
    id: '7',
    name: 'Amazon.com Inc.',
    type: 'stock',
    value: 165000,
    quantity: 1200,
    purchaseDate: '2023-04-10',
    currentPrice: 137.50,
  },
  {
    id: '8',
    name: 'NVIDIA Corporation',
    type: 'stock',
    value: 220000,
    quantity: 300,
    purchaseDate: '2023-09-05',
    currentPrice: 733.33,
  },
  {
    id: '9',
    name: 'Google (Alphabet Inc.)',
    type: 'stock',
    value: 185000,
    quantity: 1500,
    purchaseDate: '2023-07-12',
    currentPrice: 123.33,
  },
  {
    id: '10',
    name: 'Meta Platforms Inc.',
    type: 'stock',
    value: 142000,
    quantity: 400,
    purchaseDate: '2023-10-15',
    currentPrice: 355,
  },
  {
    id: '11',
    name: 'Ethereum',
    type: 'crypto',
    value: 45000,
    quantity: 15,
    purchaseDate: '2023-11-01',
    currentPrice: 3000,
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    assetId: '1',
    type: 'buy',
    quantity: 50,
    price: 142,
    date: '2023-01-15',
  },
  {
    id: '2',
    assetId: '1',
    type: 'buy',
    quantity: 50,
    price: 145,
    date: '2023-06-20',
  },
  {
    id: '3',
    assetId: '2',
    type: 'buy',
    quantity: 1.5,
    price: 45000,
    date: '2023-03-20',
  }
];

export const mockHistoricalData: HistoricalData[] = [
  {
    id: '1',
    assetId: '1',
    date: '2023-01-15',
    price: 142,
  },
  {
    id: '2',
    assetId: '1',
    date: '2023-06-20',
    price: 145,
  },
  {
    id: '3',
    assetId: '1',
    date: '2024-02-20',
    price: 150,
  }
];