import express from 'express';
import {
  getAssets,
  getAssetById,
  getAssetTransactions,
  getAssetHistory,
  createAsset,
} from '../controllers/assetController';

const router = express.Router();

router.route('/').get(getAssets).post(createAsset);
router.route('/:id').get(getAssetById);
router.route('/:id/transactions').get(getAssetTransactions);
router.route('/:id/history').get(getAssetHistory);

export default router;