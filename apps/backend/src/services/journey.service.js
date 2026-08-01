// src/services/journey.service.js
// Core "how do I get there" logic: finds a route covering both stages,
// looks up the fare, and enriches with a real ETA/polyline from Google.

import prisma from './prisma.js';
import { getDirections } from './googleMaps.service.js';
import { logger } from '../utils/logger.js';

/**
 * Finds routes that serve both stages in the correct direction of travel.
 */
async function findDirectRoutes(fromStageId, toStageId) {
    const candidateRoutes = await prisma.route.findMany({
        where: {
            AND: [
                { routeStages: { some: { stageId: fromStageId } } },
                { routeStages: { some: { stageId: toStageId } } },
            ],
        },
        include: {
            routeStages: {
                where: { stageId: { in: [fromStageId, toStageId] } },
            },
        },
    });

    return candidateRoutes.filter((route) => {
        const fromStop = route.routeStages.find((rs) => rs.stageId === fromStageId);
        const toStop = route.routeStages.find((rs) => rs.stageId === toStageId);
        return fromStop && toStop && fromStop.sequence < toStop.sequence;
    });
}

/**
 * @param {string} fromStageId
 * @param {string} toStageId
 */
export async function getJourneyOptions(fromStageId, toStageId) {
    const [fromStage, toStage] = await Promise.all([
        prisma.stage.findUnique({ where: { id: fromStageId } }),
        prisma.stage.findUnique({ where: { id: toStageId } }),
    ]);

    if (!fromStage || !toStage) {
        const err = new Error('One or both stages were not found');
        err.statusCode = 404;
        throw err;
    }

    const directRoutes = await findDirectRoutes(fromStageId, toStageId);

    const fare = await prisma.fare.findUnique({
        where: { fromStageId_toStageId: { fromStageId, toStageId } },
    });

    let eta = null;
    try {
        eta = await getDirections(
            { lat: fromStage.lat, lng: fromStage.lng },
            { lat: toStage.lat, lng: toStage.lng }
        );
    } catch (err) {
        // Don't fail the whole journey response if Google is unavailable —
        // the fare/route info is still useful without a live ETA.
        logger.error('Failed to fetch directions for journey', { fromStageId, toStageId, error: err.message });
    }

    const options = directRoutes.map((route) => ({
        type: 'direct',
        route: { id: route.id, name: route.name, sacco: route.sacco, color: route.color },
        fare: fare ? { baseFare: fare.baseFare, peakFare: fare.peakFare } : null,
        eta,
    }));

    // No direct route found — single-corridor MVP has no transfer graph yet,
    // but the shape is here so the frontend doesn't need to change later.
    if (options.length === 0) {
        options.push({
            type: 'no_direct_route',
            route: null,
            fare: fare ? { baseFare: fare.baseFare, peakFare: fare.peakFare } : null,
            eta,
        });
    }

    return {
        from: { id: fromStage.id, name: fromStage.name },
        to: { id: toStage.id, name: toStage.name },
        options,
    };
}