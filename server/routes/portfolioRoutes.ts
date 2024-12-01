import express from 'express';
import { getPortfolioStats } from '../controllers/portfolioController';

const router = express.Router();

router.route('/stats').get(getPortfolioStats);

export default router;