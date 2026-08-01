// src/routes/routes.routes.js
import { Router } from 'express';
import { listRoutes, getRouteById } from '../controllers/routes.controller.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

router.get('/', asyncHandler(listRoutes));
router.get('/:id', asyncHandler(getRouteById));

export default router;