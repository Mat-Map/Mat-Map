// src/controllers/fares.controller.js
import prisma from '../services/prisma.js';

export async function getFare(req, res) {
    const { from, to } = req.validatedQuery;

    const fare = await prisma.fare.findUnique({
        where: { fromStageId_toStageId: { fromStageId: from, toStageId: to } },
        include: { fromStage: true, toStage: true },
    });

    if (!fare) {
        return res.status(404).json({ error: { message: 'No fare found for this stage pair', statusCode: 404 } });
    }

    res.json({
        from: { id: fare.fromStage.id, name: fare.fromStage.name },
        to: { id: fare.toStage.id, name: fare.toStage.name },
        baseFare: fare.baseFare,
        peakFare: fare.peakFare,
        updatedAt: fare.updatedAt,
    });
}