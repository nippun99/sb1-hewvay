import React from 'react';
import { Asset } from '../types/portfolio';
import { AssetCard } from './AssetCard';

interface AssetListProps {
  assets: Asset[];
  filter: string;
  onAssetClick: (asset: Asset) => void;
}

export const AssetList: React.FC<AssetListProps> = ({ assets, filter, onAssetClick }) => {
  const filteredAssets = filter === 'all' 
    ? assets 
    : assets.filter(asset => asset.type === filter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAssets.map(asset => (
        <AssetCard 
          key={asset.id} 
          asset={asset} 
          onClick={() => onAssetClick(asset)}
        />
      ))}
    </div>
  );
};