// src/controllers/routes.controller.js
import prisma from '../services/prisma.js';

export async function listRoutes(req, res) {
    const routes = await prisma.route.findMany({
        include: {
            routeStages: {
                orderBy: { sequence: 'asc' },
                include: { stage: true },
            },
        },
    });

    const shaped = routes.map((route) => ({
        id: route.id,
        name: route.name,
        sacco: route.sacco,
        color: route.color,
        stages: route.routeStages.map((rs) => ({
            id: rs.stage.id,
            name: rs.stage.name,
            lat: rs.stage.lat,
            lng: rs.stage.lng,
            sequence: rs.sequence,
        })),
    }));

    res.json({ routes: shaped });
}

export async function getRouteById(req, res) {
    const { id } = req.params;
    const route = await prisma.route.findUnique({
        where: { id },
        include: {
            routeStages: {
                orderBy: { sequence: 'asc' },
                include: { stage: true },
            },
        },
    });

    if (!route) {
        return res.status(404).json({ error: { message: 'Route not found', statusCode: 404 } });
    }

    res.json({
        route: {
            id: route.id,
            name: route.name,
            sacco: route.sacco,
            color: route.color,
            stages: route.routeStages.map((rs) => ({
                id: rs.stage.id,
                name: rs.stage.name,
                lat: rs.stage.lat,
                lng: rs.stage.lng,
                sequence: rs.sequence,
            })),
        },
    });
}