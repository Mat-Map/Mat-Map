// src/routes/directions.routes.js
import { Router } from 'express';
import { z } from 'zod';
import { getDirectionsBetweenStages } from '../controllers/directions.controller.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateQuery } from '../middleware/validateRequest.js';
import { directionsLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const directionsQuerySchema = z.object({
    from: z.string().uuid('from must be a valid stage id'),
    to: z.string().uuid('to must be a valid stage id'),
});

router.get('/', directionsLimiter, validateQuery(directionsQuerySchema), asyncHandler(getDirectionsBetweenStages));

export default router;