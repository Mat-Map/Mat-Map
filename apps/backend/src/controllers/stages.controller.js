// src/controllers/stages.controller.js
import prisma from '../services/prisma.js';

export async function listStages(req, res) {
    const stages = await prisma.stage.findMany({
        orderBy: { order: 'asc' },
    });
    res.json({ stages });
}

export async function getStageById(req, res) {
    const { id } = req.params;
    const stage = await prisma.stage.findUnique({ where: { id } });

    if (!stage) {
        return res.status(404).json({ error: { message: 'Stage not found', statusCode: 404 } });
    }

    res.json({ stage });
}