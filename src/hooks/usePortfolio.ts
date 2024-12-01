import { useState, useEffect, useRef } from 'react';
import { Asset, PortfolioStats } from '../types/portfolio';
import { portfolioService } from '../services/portfolioService';

export const usePortfolio = (filter: string = 'all') => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        setLoading(true);
        const [assetsData, statsData] = await Promise.all([
          portfolioService.getAssets(filter !== 'all' ? filter : undefined, signal),
          portfolioService.getPortfolioStats(signal),
        ]);
        
        if (!signal.aborted) {
          setAssets(assetsData);
          setStats(statsData);
          setError(null);
        }
      } catch (err) {
        if (!signal.aborted) {
          setError('Failed to fetch portfolio data');
          console.error(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [filter]);

  return { 
    assets, 
    stats, 
    loading, 
    error 
  };
};