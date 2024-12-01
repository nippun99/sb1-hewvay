import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { PortfolioSummary } from './components/PortfolioSummary';
import { AssetList } from './components/AssetList';
import { AssetDetail } from './components/AssetDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { usePortfolio } from './hooks/usePortfolio';
import { Asset } from './types/portfolio';

function App() {
  const [filter, setFilter] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { assets, stats, loading, error } = usePortfolio(filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Manager</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && <ErrorMessage message={error} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : selectedAsset ? (
          <AssetDetail 
            asset={selectedAsset} 
            onBack={() => setSelectedAsset(null)} 
          />
        ) : (
          <>
            {stats && <PortfolioSummary stats={stats} />}

            <div className="mb-6">
              <div className="flex gap-2">
                {['all', 'stock', 'crypto', 'real-estate', 'cash'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg ${
                      filter === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <AssetList 
              assets={assets} 
              filter={filter} 
              onAssetClick={setSelectedAsset} 
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;