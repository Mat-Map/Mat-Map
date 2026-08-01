// src/routes/stages.routes.js
import { Router } from 'express';
import { listStages, getStageById } from '../controllers/stages.controller.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

router.get('/', asyncHandler(listStages));
router.get('/:id', asyncHandler(getStageById));

export default router;