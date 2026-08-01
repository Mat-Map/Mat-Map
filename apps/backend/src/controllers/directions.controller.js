// src/controllers/directions.controller.js
import prisma from '../services/prisma.js';
import { getDirections } from '../services/googleMaps.service.js';

export async function getDirectionsBetweenStages(req, res) {
    const { from, to } = req.validatedQuery;

    const [fromStage, toStage] = await Promise.all([
        prisma.stage.findUnique({ where: { id: from } }),
        prisma.stage.findUnique({ where: { id: to } }),
    ]);

    if (!fromStage || !toStage) {
        return res.status(404).json({ error: { message: 'One or both stages were not found', statusCode: 404 } });
    }

    const directions = await getDirections(
        { lat: fromStage.lat, lng: fromStage.lng },
        { lat: toStage.lat, lng: toStage.lng }
    );

    res.json({
        from: { id: fromStage.id, name: fromStage.name },
        to: { id: toStage.id, name: toStage.name },
        ...directions,
    });
}