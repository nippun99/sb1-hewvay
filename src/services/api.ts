import axios from 'axios';
import { mockAssets, mockTransactions, mockHistoricalData } from './mockData';
import { Asset, PortfolioStats } from '../types/portfolio';

const IS_PRODUCTION = import.meta.env.PROD;

// Mock API implementation for production
const mockApi = {
  async getAssets(type?: string) {
    let assets = [...mockAssets];
    if (type && type !== 'all') {
      assets = assets.filter(asset => asset.type === type);
    }
    return { data: assets };
  },

  async getPortfolioStats() {
    const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
    const assetAllocation = mockAssets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + (asset.value / totalValue) * 100;
      return acc;
    }, {} as Record<string, number>);

    return {
      data: {
        totalValue,
        monthlyChange: 5.2,
        yearlyChange: 12.8,
        assetAllocation,
      }
    };
  },

  async getAssetById(id: string) {
    const asset = mockAssets.find(a => a.id === id);
    if (!asset) throw new Error('Asset not found');
    return { data: asset };
  },

  async createAsset(asset: Omit<Asset, 'id'>) {
    const newAsset = {
      ...asset,
      id: (mockAssets.length + 1).toString(),
    };
    mockAssets.push(newAsset as Asset);
    return { data: newAsset };
  }
};

// Create axios instance for development
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  validateStatus: (status) => status < 500,
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }
    
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    
    return Promise.reject(error);
  }
);

// Export the appropriate API implementation based on environment
export const api = IS_PRODUCTION ? mockApi : axiosInstance;