import React, { useState, useEffect } from 'react';
import { Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import { Transaction } from '../types/portfolio';

interface TransactionHistoryProps {
  assetId: string;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ assetId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await portfolioService.getAssetTransactions(assetId);
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, [assetId]);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {transaction.type === 'buy' ? (
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">
                  {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.quantity} units
                </p>
                <p className="text-sm text-gray-500">
                  at ${transaction.price.toLocaleString()} per unit
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{new Date(transaction.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};