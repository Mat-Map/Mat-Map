// prisma/seed.js
// Seeds the Thika Road corridor: stages (CBD -> Juja), routes/SACCOs, and a
// simple distance-based fare matrix. Run with: npm run seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ordered CBD -> Juja. Replace lat/lng with verified coordinates before
// treating this as production data — these are approximate placeholders.
const STAGES = [
    { name: 'Nairobi CBD (Ambassadeur)', slug: 'cbd-ambassadeur', lat: -1.2841, lng: 36.8259, order: 1 },
    { name: 'Museum Hill', slug: 'museum-hill', lat: -1.2733, lng: 36.8172, order: 2 },
    { name: 'Pangani', slug: 'pangani', lat: -1.2695, lng: 36.8320, order: 3 },
    { name: 'Allsops', slug: 'allsops', lat: -1.2593, lng: 36.8514, order: 4 },
    { name: 'Muthaiga', slug: 'muthaiga', lat: -1.2497, lng: 36.8319, order: 5 },
    { name: 'Kasarani', slug: 'kasarani', lat: -1.2231, lng: 36.8977, order: 6 },
    { name: 'Mwiki', slug: 'mwiki', lat: -1.2093, lng: 36.9186, order: 7 },
    { name: 'Kahawa Sukari', slug: 'kahawa-sukari', lat: -1.1927, lng: 36.9367, order: 8 },
    { name: 'Kahawa Wendani', slug: 'kahawa-wendani', lat: -1.1834, lng: 36.9421, order: 9 },
    { name: 'Kenyatta University', slug: 'ku', lat: -1.1809, lng: 36.9331, order: 10 },
    { name: 'Ruiru', slug: 'ruiru', lat: -1.1461, lng: 36.9614, order: 11 },
    { name: 'Juja', slug: 'juja', lat: -1.1036, lng: 37.0142, order: 12 },
];

const ROUTES = [
    { name: 'Route 237', sacco: 'Thika Rd Shuttle SACCO', color: '#1D9E75' },
    { name: 'Forward Travellers', sacco: 'Forward Travellers SACCO', color: '#378ADD' },
    { name: 'Super Metro 25', sacco: 'Super Metro SACCO', color: '#D85A30' },
];

function fareForDistance(orderDiff) {
    const baseFare = 20 + orderDiff * 15;
    const peakFare = baseFare + 50;
    return { baseFare, peakFare };
}

async function main() {
    console.log('Seeding stages...');
    const stageRecords = [];
    for (const s of STAGES) {
        const stage = await prisma.stage.upsert({
            where: { slug: s.slug },
            update: s,
            create: s,
        });
        stageRecords.push(stage);
    }

    console.log('Seeding routes...');
    const routeRecords = [];
    for (const r of ROUTES) {
        let route = await prisma.route.findFirst({ where: { name: r.name } });
        if (!route) {
            route = await prisma.route.create({ data: r });
        } else {
            route = await prisma.route.update({ where: { id: route.id }, data: r });
        }
        routeRecords.push(route);
    }

    console.log('Linking every route to every stage (single-corridor MVP)...');
    for (const route of routeRecords) {
        for (const stage of stageRecords) {
            await prisma.routeStage.upsert({
                where: { routeId_stageId: { routeId: route.id, stageId: stage.id } },
                update: { sequence: stage.order },
                create: { routeId: route.id, stageId: stage.id, sequence: stage.order },
            });
        }
    }

    console.log('Seeding fare matrix...');
    for (const from of stageRecords) {
        for (const to of stageRecords) {
            if (from.id === to.id) continue;
            const orderDiff = Math.abs(to.order - from.order);
            const { baseFare, peakFare } = fareForDistance(orderDiff);
            await prisma.fare.upsert({
                where: { fromStageId_toStageId: { fromStageId: from.id, toStageId: to.id } },
                update: { baseFare, peakFare },
                create: { fromStageId: from.id, toStageId: to.id, baseFare, peakFare },
            });
        }
    }

    console.log('Seed complete.');
}

main()
    .catch((err) => {
        console.error('Seed failed:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });