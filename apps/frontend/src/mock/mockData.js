/**
 * MatMap Mock Data Store for Offline Demo
 */

export const mockStages = [
  { id: 'stage-cbd', name: 'Nairobi CBD (Archives)', lat: -1.2841, lng: 36.8252 },
  { id: 'stage-ngara', name: 'Ngara Stage', lat: -1.2770, lng: 36.8280 },
  { id: 'stage-pangani', name: 'Pangani Falls', lat: -1.2650, lng: 36.8380 },
  { id: 'stage-muthaiga', name: 'Muthaiga Interchange', lat: -1.2520, lng: 36.8450 },
  { id: 'stage-thika-rd', name: 'Roysambu Roundabout', lat: -1.2185, lng: 36.8878 },
  { id: 'stage-kasarani', name: 'Kasarani Stadium', lat: -1.2220, lng: 36.8970 },
  { id: 'stage-githurai', name: 'Githurai 44 Stage', lat: -1.1970, lng: 36.9430 },
  { id: 'stage-kahawa', name: 'Kahawa Sukari', lat: -1.1850, lng: 36.9320 },
  { id: 'stage-ruiru', name: 'Ruiru Town Stage', lat: -1.1500, lng: 36.9660 },
  { id: 'stage-juja', name: 'Juja Main Stage', lat: -1.1018, lng: 37.0144 },
  { id: 'stage-thika-town', name: 'Thika Town Main Stage', lat: -1.0396, lng: 37.0700 },
  { id: 'stage-kiamambu', name: 'Kiambu Town', lat: -1.1714, lng: 36.8356 },
  { id: 'stage-westlands', name: 'Westlands Stage', lat: -1.2676, lng: 36.8073 },
];

export const mockRoutes = [
  {
    id: 'route-237',
    name: '237 - Thika Express',
    sacco: 'Super Metro Sacco',
    color: '#E8722C', // Amber / Orange accent
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Thika Town Main Stage',
    corridor: 'Thika Road',
    fareRange: 'KES 80 - 120',
    etaMinutes: 12,
    vibeTag: 'nganya', // 'nganya' or 'quiet'
    isSaved: true,
    stages: ['stage-cbd', 'stage-ngara', 'stage-pangani', 'stage-thika-rd', 'stage-kasarani', 'stage-kahawa', 'stage-ruiru', 'stage-juja', 'stage-thika-town'],
    crowdLevelPerStage: {
      'stage-cbd': 'high',
      'stage-ngara': 'medium',
      'stage-thika-rd': 'low',
    },
  },
  {
    id: 'route-237q',
    name: '237B - Thika Quiet',
    sacco: 'Nicco Bus Sacco',
    color: '#1B8A8A', // Teal accent, distinct from nganya orange
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Thika Town Main Stage',
    corridor: 'Thika Road',
    fareRange: 'KES 80 - 100',
    etaMinutes: 16,
    vibeTag: 'quiet',
    isSaved: false,
    stages: ['stage-cbd', 'stage-ngara', 'stage-pangani', 'stage-thika-rd', 'stage-kasarani', 'stage-kahawa', 'stage-ruiru', 'stage-juja', 'stage-thika-town'],
    crowdLevelPerStage: {
      'stage-cbd': 'medium',
      'stage-ngara': 'low',
      'stage-thika-rd': 'low',
    },
  },
  {
    id: 'route-44',
    name: '44 - Kahawa West',
    sacco: 'KSTV Sacco',
    color: '#3B82F6',
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Kahawa Sukari',
    corridor: 'Thika Road',
    fareRange: 'KES 50 - 80',
    etaMinutes: 8,
    vibeTag: 'nganya',
    isSaved: true,
    stages: ['stage-cbd', 'stage-ngara', 'stage-pangani', 'stage-thika-rd', 'stage-kasarani', 'stage-githurai', 'stage-kahawa'],
    crowdLevelPerStage: {
      'stage-cbd': 'medium',
      'stage-ngara': 'low',
    },
  },
  {
    id: 'route-44q',
    name: '44B - Kahawa Quiet',
    sacco: 'Nawasuku Express',
    color: '#0EA5E9', // Sky blue, distinct from nganya blue
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Kahawa Sukari',
    corridor: 'Thika Road',
    fareRange: 'KES 50 - 80',
    etaMinutes: 11,
    vibeTag: 'quiet',
    isSaved: false,
    stages: ['stage-cbd', 'stage-ngara', 'stage-pangani', 'stage-thika-rd', 'stage-kasarani', 'stage-githurai', 'stage-kahawa'],
    crowdLevelPerStage: {
      'stage-cbd': 'low',
      'stage-ngara': 'low',
    },
  },
  {
    id: 'route-100',
    name: '100 - Kiambu Direct',
    sacco: 'MOWASCO Sacco',
    color: '#10B981',
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Kiambu Town',
    corridor: 'Kiambu Road',
    fareRange: 'KES 60 - 90',
    etaMinutes: 18,
    vibeTag: 'quiet',
    isSaved: false,
    stages: ['stage-cbd', 'stage-ngara', 'stage-muthaiga', 'stage-kiamambu'],
    crowdLevelPerStage: {
      'stage-cbd': 'low',
    },
  },
  {
    id: 'route-105',
    name: '105 - Kikuyu Express',
    sacco: 'Kikuyu Line',
    color: '#8B5CF6',
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Westlands Stage',
    corridor: 'Waiyaki Way',
    fareRange: 'KES 40 - 70',
    etaMinutes: 15,
    vibeTag: 'quiet',
    isSaved: false,
    stages: ['stage-cbd', 'stage-westlands'],
    crowdLevelPerStage: {
      'stage-cbd': 'high',
    },
  },
  {
    id: 'route-45',
    name: '45 - Githurai 44/45',
    sacco: 'Githurai Transporters',
    color: '#EC4899',
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Kasarani Stadium',
    corridor: 'Thika Road',
    fareRange: 'KES 50 - 70',
    etaMinutes: 5,
    vibeTag: 'nganya',
    isSaved: false,
    stages: ['stage-cbd', 'stage-ngara', 'stage-thika-rd', 'stage-kasarani'],
    crowdLevelPerStage: {
      'stage-cbd': 'high',
      'stage-kasarani': 'medium',
    },
  },
  {
    id: 'route-45q',
    name: '45B - Kasarani Quiet',
    sacco: 'Nakaski Transport SACCO',
    color: '#F59E0B',
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Kasarani Stadium',
    corridor: 'Thika Road',
    fareRange: 'KES 50 - 70',
    etaMinutes: 9,
    vibeTag: 'quiet',
    isSaved: false,
    stages: ['stage-cbd', 'stage-ngara', 'stage-thika-rd', 'stage-kasarani'],
    crowdLevelPerStage: {
      'stage-cbd': 'low',
      'stage-kasarani': 'low',
    },
  },
  {
    id: 'route-237r',
    name: '237C - Ruiru Quiet',
    sacco: 'Kenya Mpya Bus Services',
    color: '#6366F1',
    originStage: 'Nairobi CBD (Archives)',
    destinationStage: 'Ruiru Town Stage',
    corridor: 'Thika Road',
    fareRange: 'KES 60 - 90',
    etaMinutes: 14,
    vibeTag: 'quiet',
    isSaved: false,
    stages: ['stage-cbd', 'stage-ngara', 'stage-pangani', 'stage-thika-rd', 'stage-kasarani', 'stage-githurai', 'stage-kahawa', 'stage-ruiru'],
    crowdLevelPerStage: {
      'stage-cbd': 'low',
      'stage-ngara': 'low',
    },
  },
];

export const mockLiveVehicles = [
  {
    id: 'veh-01',
    routeId: 'route-237',
    registration: 'KDA 123X',
    sacco: 'Super Metro',
    name: 'Catalyst Nganya',
    currentStage: 'Royston/Roysambu',
    nextStage: 'Kahawa Sukari',
    liveEtaSeconds: 240, // 4 mins
    crowdLevel: 'medium',
    vibe: 'nganya',
  },
  {
    id: 'veh-02',
    routeId: 'route-44',
    registration: 'KCB 456Y',
    sacco: 'KSTV Sacco',
    name: 'Mastermind',
    currentStage: 'Pangani',
    nextStage: 'Roysambu',
    liveEtaSeconds: 180, // 3 mins
    crowdLevel: 'high',
    vibe: 'nganya',
  },
  {
    id: 'veh-03',
    routeId: 'route-45',
    registration: 'KDD 789Z',
    sacco: 'Githurai Transporters',
    name: 'The Beast',
    currentStage: 'Ngara',
    nextStage: 'Pangani',
    liveEtaSeconds: 300, // 5 mins
    crowdLevel: 'high',
    vibe: 'nganya',
  },
  {
    id: 'veh-04',
    routeId: 'route-237q',
    registration: 'KDF 234A',
    sacco: 'Nicco Bus Sacco',
    name: 'Nicco Comfort',
    currentStage: 'Muthaiga',
    nextStage: 'Roysambu',
    liveEtaSeconds: 360, // 6 mins
    crowdLevel: 'low',
    vibe: 'quiet',
  },
  {
    id: 'veh-05',
    routeId: 'route-44q',
    registration: 'KDG 567B',
    sacco: 'Nawasuku Express',
    name: 'Nawasuku Serene',
    currentStage: 'Kasarani',
    nextStage: 'Githurai',
    liveEtaSeconds: 210, // 3.5 mins
    crowdLevel: 'low',
    vibe: 'quiet',
  },
  {
    id: 'veh-06',
    routeId: 'route-45q',
    registration: 'KDH 890C',
    sacco: 'Nakaski Transport SACCO',
    name: 'Nakaski Steady',
    currentStage: 'Roysambu',
    nextStage: 'Kasarani',
    liveEtaSeconds: 150, // 2.5 mins
    crowdLevel: 'low',
    vibe: 'quiet',
  },
];

export const mockSavedRoutes = mockRoutes.filter((r) => r.isSaved);

export const mockThikaRoadRoutes = mockRoutes.filter((r) => r.corridor === 'Thika Road');

export const mockAlerts = [
  {
    id: 'alert-01',
    type: 'route_change',
    severity: 'high',
    title: 'Sudden Route Change: Pangani Interchange',
    description: 'Matatus bypassing Pangani underpass due to heavy congestion; using Forest Road detour.',
    affectedRoute: '237 - Thika Express',
    timestamp: '10 min ago',
  },
  {
    id: 'alert-02',
    type: 'delay',
    severity: 'medium',
    title: 'Heavy Traffic Delay near Roysambu',
    description: 'Expect 15-20 min additional travel time bound for Juja/Thika.',
    affectedRoute: '44 & 237 Corridor',
    timestamp: '25 min ago',
  },
  {
    id: 'alert-03',
    type: 'crowd_spike',
    severity: 'low',
    title: 'High Crowd Volume at Archives Stage',
    description: 'Long queues reported for Westlands & Kikuyu routes.',
    affectedRoute: '105 - Kikuyu Express',
    timestamp: '40 min ago',
  },
];

export const mockSupportedStages = [
  'Juja',
  'Kasarani',
  'Ruiru',
  'Kahawa Sukari',
  'Githurai',
  'Thika Town',
];

export const mockOperators = [
  {
    id: 'op-supermetro',
    name: 'Super Metro Sacco',
    sacco: 'Super Metro Sacco',
    vibeTag: 'nganya',
    stagesServed: ['Juja', 'Kahawa Sukari', 'Ruiru'],
    fareRange: 'KES 80 - 120',
    frequency: 'every 5–10 min',
    routeNumber: '237',
    color: '#E8722C',
    terminus: 'Nairobi CBD (Archives)',
  },
  {
    id: 'op-expresso',
    name: 'Expresso Line',
    sacco: 'Expresso Transporters',
    vibeTag: 'nganya',
    stagesServed: ['Kasarani'],
    fareRange: 'KES 50 - 80',
    frequency: 'every 3–7 min',
    routeNumber: '145',
    color: '#EC4899',
    terminus: 'Tom Mboya St / CBD',
  },
  {
    id: 'op-nicco',
    name: 'Nicco Movers',
    sacco: 'Nicco Bus Sacco',
    vibeTag: 'quiet',
    stagesServed: ['Ruiru', 'Juja', 'Thika Town'],
    fareRange: 'KES 80 - 100',
    frequency: 'every 10–15 min',
    routeNumber: '237',
    color: '#3B82F6',
    terminus: 'Khoja / CBD',
  },
  {
    id: 'op-lopha',
    name: 'Lopha Travels',
    sacco: 'Lopha Multipurpose Co-op',
    vibeTag: 'quiet',
    stagesServed: ['Kasarani', 'Ruiru', 'Juja'],
    fareRange: 'KES 70 - 100',
    frequency: 'every 5–10 min',
    routeNumber: '145',
    color: '#10B981',
    terminus: 'Latema Rd / CBD',
  },
  {
    id: 'op-nawasuku',
    name: 'Nawasuku Sacco',
    sacco: 'Nawasuku Express',
    vibeTag: 'quiet',
    stagesServed: ['Kahawa Sukari', 'Ruiru', 'Githurai'],
    fareRange: 'KES 50 - 80',
    frequency: 'every 5–10 min',
    routeNumber: '45K',
    color: '#8B5CF6',
    terminus: 'Archives / CBD',
  },
  {
    id: 'op-nakaski',
    name: 'Nakaski SACCO',
    sacco: 'Nakaski Transport SACCO',
    vibeTag: 'quiet',
    stagesServed: ['Kasarani'],
    fareRange: 'KES 50 - 70',
    frequency: 'every 8–12 min',
    routeNumber: '45',
    color: '#F59E0B',
    terminus: 'Muthurwa / CBD',
  },
  {
    id: 'op-nazigi',
    name: 'Nazigi Express',
    sacco: 'Nazigi Transporters',
    vibeTag: 'quiet',
    stagesServed: ['Kasarani', 'Kahawa Sukari'],
    fareRange: 'KES 50 - 70',
    frequency: 'every 10–15 min',
    routeNumber: '44',
    color: '#06B6D4',
    terminus: 'Khoja Mosque / CBD',
  },
  {
    id: 'op-kenyampya',
    name: 'Kenya Mpya',
    sacco: 'Kenya Mpya Bus Services',
    vibeTag: 'quiet',
    stagesServed: ['Juja', 'Ruiru'],
    fareRange: 'KES 70 - 100',
    frequency: 'every 5–10 min',
    routeNumber: '237',
    color: '#6366F1',
    terminus: 'Commercial Area / CBD',
  },
  {
    id: 'op-citihoppa',
    name: 'City Hoppa',
    sacco: 'City Hoppa Ltd',
    vibeTag: 'quiet',
    stagesServed: ['Githurai', 'Kahawa Sukari', 'Thika Town'],
    fareRange: 'KES 60 - 100',
    frequency: 'every 10–15 min',
    routeNumber: '237B',
    color: '#1B8A8A',
    terminus: 'Ambassadeur / CBD',
  },
];

/**
 * Pure route search function using mock operators.
 * Implements soft-sorting by vibe (preferred vibe placed first).
 */
export function searchRoutes({ origin = 'Nairobi CBD', destination = '', vibe = null } = {}) {
  const destLower = destination.trim().toLowerCase();
  if (!destLower) return [];

  // Filter operators that serve the destination stage
  const matches = mockOperators.filter((op) =>
    op.stagesServed.some(
      (stage) =>
        stage.toLowerCase() === destLower ||
        stage.toLowerCase().includes(destLower) ||
        destLower.includes(stage.toLowerCase())
    )
  );

  // Soft sort: preferred vibe matching operators listed first
  if (vibe) {
    matches.sort((a, b) => {
      const aMatch = a.vibeTag === vibe ? 1 : 0;
      const bMatch = b.vibeTag === vibe ? 1 : 0;
      return bMatch - aMatch;
    });
  }

  return matches.map((op) => {
    const matchedStage =
      op.stagesServed.find(
        (s) =>
          s.toLowerCase() === destLower ||
          s.toLowerCase().includes(destLower) ||
          destLower.includes(s.toLowerCase())
      ) || destination;

    return {
      id: `search-${op.id}-${matchedStage.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${op.routeNumber ? op.routeNumber + ' - ' : ''}${op.name}`,
      sacco: op.sacco,
      color: op.color,
      originStage: origin || 'Nairobi CBD',
      destinationStage: matchedStage,
      corridor: 'Thika Road',
      fareRange: op.fareRange,
      frequency: op.frequency,
      etaMinutes: 10,
      vibeTag: op.vibeTag,
      isSaved: false,
    };
  });
}