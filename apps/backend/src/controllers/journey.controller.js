// src/controllers/journey.controller.js
import { getJourneyOptions } from '../services/journey.service.js';

export async function getJourney(req, res) {
    const { from, to } = req.validatedQuery;
    const journey = await getJourneyOptions(from, to);
    res.json(journey);
}