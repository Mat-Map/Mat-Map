// src/routes/fares.routes.js
import { Router } from 'express';
import { z } from 'zod';
import { getFare } from '../controllers/fares.controller.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateQuery } from '../middleware/validateRequest.js';

const router = Router();

const faresQuerySchema = z.object({
    from: z.string().uuid('from must be a valid stage id'),
    to: z.string().uuid('to must be a valid stage id'),
});

router.get('/', validateQuery(faresQuerySchema), asyncHandler(getFare));

export default router;