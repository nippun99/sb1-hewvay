import { api } from './api';
import { Asset, PortfolioStats, Transaction, HistoricalData } from '../types/portfolio';

export const portfolioService = {
  async getAssets(type?: string, signal?: AbortSignal): Promise<Asset[]> {
    const { data } = await api.get('/assets', {
      params: { type },
      signal,
    });
    return data;
  },

  async getPortfolioStats(signal?: AbortSignal): Promise<PortfolioStats> {
    const { data } = await api.get('/portfolio/stats', { signal });
    return data;
  },

  async getAssetById(id: string, signal?: AbortSignal): Promise<Asset> {
    const { data } = await api.get(`/assets/${id}`, { signal });
    return data;
  },

  async getAssetTransactions(id: string, signal?: AbortSignal): Promise<Transaction[]> {
    const { data } = await api.get(`/assets/${id}/transactions`, { signal });
    return data;
  },

  async getAssetHistory(id: string, signal?: AbortSignal): Promise<HistoricalData[]> {
    const { data } = await api.get(`/assets/${id}/history`, { signal });
    return data;
  },

  async createAsset(asset: Omit<Asset, 'id'>, signal?: AbortSignal): Promise<Asset> {
    const { data } = await api.post('/assets', asset, { signal });
    return data;
  },
};