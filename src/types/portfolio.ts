export interface Asset {
  id: string;
  name: string;
  type: 'stock' | 'crypto' | 'real-estate' | 'cash';
  value: number;
  quantity?: number;
  purchaseDate: string;
  currentPrice?: number;
}

export interface PortfolioStats {
  totalValue: number;
  monthlyChange: number;
  yearlyChange: number;
  assetAllocation: Record<string, number>;
}