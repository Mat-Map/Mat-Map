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
  { id: 'stage-kahawa', name: 'Kahawa Sukari', lat: -1.1850, lng: 36.9320 },
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
    stages: ['stage-cbd', 'stage-ngara', 'stage-pangani', 'stage-thika-rd', 'stage-juja', 'stage-thika-town'],
    crowdLevelPerStage: {
      'stage-cbd': 'high',
      'stage-ngara': 'medium',
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
    stages: ['stage-cbd', 'stage-ngara', 'stage-pangani', 'stage-thika-rd', 'stage-kahawa'],
    crowdLevelPerStage: {
      'stage-cbd': 'medium',
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
