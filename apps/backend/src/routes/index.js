// src/routes/index.js
// Mounts every sub-router under /api/v1.

import { Router } from 'express';
import stagesRoutes from './stages.routes.js';
import routesRoutes from './routes.routes.js';
import faresRoutes from './fares.routes.js';
import journeyRoutes from './journey.routes.js';
import directionsRoutes from './directions.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/stages', stagesRoutes);
router.use('/routes', routesRoutes);
router.use('/fares', faresRoutes);
router.use('/journey', journeyRoutes);
router.use('/directions', directionsRoutes);
router.use('/health', healthRoutes);

export default router;