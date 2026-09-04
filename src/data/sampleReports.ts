import { TriageReport, HotspotCluster, WeatherData } from '../types';

export const DEFAULT_WEATHER: WeatherData = {
  temperatureC: 27.8,
  humidityPercent: 84,
  precipitationMm: 18.5,
  rainfallProbability: 75,
  weatherConditionEn: 'Overcast with intermittent monsoon drizzle',
  weatherConditionMr: 'ढगाळ हवामान आणि अधूनमधून पावसाची रिमझिम',
  weatherConditionHi: 'बादल छाए रहने के साथ रुक-रुक कर बारिश',
  windSpeedKmh: 14,
  locationName: 'Niphad Tehsil Station',
  district: 'Nashik (नाशिक)',
  updatedAt: new Date().toISOString()
};

export const SAMPLE_REPORTS: TriageReport[] = [
  {
    id: 'CS-MH-2026-0814',
    farmerName: 'Dnyaneshwar Shinde',
    farmerPhoneMasked: '+91 98****4120',
    farmLocation: {
      district: 'Nashik',
      tehsil: 'Niphad',
      village: 'Pimpalgaon Baswant',
      latitude: 20.1764,
      longitude: 73.9878
    },
    cropId: 'tomato',
    cropVariety: 'Abhinav (अभिनव)',
    growthStage: 'flowering',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2250c?w=800&auto=format&fit=crop&q=80',
    capturedAt: '2026-09-03T08:30:00Z',
    aiPrediction: {
      diseaseId: 'tomato_early_blight',
      diseaseNameEn: 'Early Blight',
      diseaseNameMr: 'लवकर येणारा करपा',
      diseaseNameHi: 'अगेती झुलसा',
      confidencePercent: 91.4,
      topAlternatives: [
        { diseaseName: 'Septoria Leaf Spot', confidence: 5.8 },
        { diseaseName: 'Target Spot', confidence: 2.8 }
      ]
    },
    riskAssessment: {
      score: 82,
      level: 'HIGH',
      factors: [
        {
          factorKey: 'rainfall',
          labelEn: 'Recent Rainfall & Leaf Wetness',
          labelMr: 'गेल्या २४ तासांतील पाऊस व ओलावा',
          labelHi: 'हालिया बारिश और पत्ती का गीलापन',
          level: 'HIGH',
          valueText: '18.5 mm (48h continuous dampness)',
          icon: '🌧️'
        },
        {
          factorKey: 'humidity',
          labelEn: 'Relative Air Humidity',
          labelMr: 'हवेतील उच्च आर्द्रता',
          labelHi: 'अत्यधिक वायुमंडलीय नमी',
          level: 'HIGH',
          valueText: '84% RH (Optimal for fungal spore germination)',
          icon: '💧'
        },
        {
          factorKey: 'stage',
          labelEn: 'Crop Growth Stage Vulnerability',
          labelMr: 'फुलधारणेची नाजूक अवस्था',
          labelHi: 'फूल आने की संवेदनशील अवस्था',
          level: 'MEDIUM',
          valueText: 'Flowering & early fruit set (High sensitivity)',
          icon: '🌱'
        },
        {
          factorKey: 'hotspot',
          labelEn: 'Proximity to Reported Outbreaks',
          labelMr: 'परिसरातील इतर शेतांमध्ये करपा',
          labelHi: 'नजदीकी खेतों में प्रकोप के मामले',
          level: 'HIGH',
          valueText: '14 confirmed cases within 8 km radius',
          icon: '📍'
        }
      ]
    },
    weatherSnapshot: {
      ...DEFAULT_WEATHER,
      locationName: 'Niphad Station',
      district: 'Nashik'
    },
    status: 'pending'
  },
  {
    id: 'CS-MH-2026-0809',
    farmerName: 'Santosh Patil',
    farmerPhoneMasked: '+91 94****1982',
    farmLocation: {
      district: 'Jalgaon',
      tehsil: 'Raver',
      village: 'Savda',
      latitude: 21.1492,
      longitude: 75.8942
    },
    cropId: 'cotton',
    cropVariety: 'Rasi 659 (रासी ६५९)',
    growthStage: 'fruiting_boll',
    imageUrl: 'https://images.unsplash.com/photo-1595155502123-018f97fa620e?w=800&auto=format&fit=crop&q=80',
    capturedAt: '2026-09-02T16:45:00Z',
    aiPrediction: {
      diseaseId: 'cotton_bacterial_blight',
      diseaseNameEn: 'Bacterial Blight (Black Arm)',
      diseaseNameMr: 'जीवाणूजन्य करपा / काळा डाग',
      diseaseNameHi: 'जीवाणु झुलसा',
      confidencePercent: 88.7,
      topAlternatives: [
        { diseaseName: 'Alternaria Leaf Spot', confidence: 7.2 },
        { diseaseName: 'Cercospora Spot', confidence: 4.1 }
      ]
    },
    riskAssessment: {
      score: 74,
      level: 'HIGH',
      factors: [
        {
          factorKey: 'rainfall',
          labelEn: 'Wind-driven monsoon rainfall',
          labelMr: 'वाऱ्यासह पाऊस व पाण्याच्या थेंबांचा मारा',
          labelHi: 'हवा के साथ बारिश',
          level: 'HIGH',
          valueText: '22 mm with gusty winds',
          icon: '🌧️'
        },
        {
          factorKey: 'humidity',
          labelEn: 'Foliar Dew Period',
          labelMr: 'पानावरील पाण्याचे थेंब टिकून राहणे',
          labelHi: 'पत्तियों पर नमी का ठहराव',
          level: 'HIGH',
          valueText: '88% Humidity',
          icon: '💧'
        },
        {
          factorKey: 'hotspot',
          labelEn: 'Cluster Alert in Khandesh Belt',
          labelMr: 'खानदेश पट्ट्यातील वाढता प्रादुर्भाव',
          labelHi: 'खानदेश बेल्ट में संक्रमण',
          level: 'HIGH',
          valueText: '19 active cases in Raver & Yawal tehsils',
          icon: '📍'
        }
      ]
    },
    weatherSnapshot: {
      temperatureC: 29.2,
      humidityPercent: 88,
      precipitationMm: 22.0,
      rainfallProbability: 80,
      weatherConditionEn: 'Rain showers with overcast sky',
      weatherConditionMr: 'पावसाच्या सरी आणि ढगाळ आकाश',
      weatherConditionHi: 'बारिश और घने बादल',
      windSpeedKmh: 18,
      locationName: 'Raver Weather Sub-station',
      district: 'Jalgaon (जळगाव)',
      updatedAt: '2026-09-02T16:00:00Z'
    },
    status: 'verified',
    verifiedDisease: 'Bacterial Blight (Xanthomonas citri)',
    expertName: 'Dr. V. K. Deshmukh (SMS Plant Protection, KVK Jalgaon)',
    expertNotes: 'Confirmed angular foliar lesions. Advised Streptocycline 1g/10L + Copper Oxychloride 25g/10L foliar application before boll infection deepens.',
    verifiedAt: '2026-09-02T18:15:00Z'
  },
  {
    id: 'CS-MH-2026-0792',
    farmerName: 'Baburao Kadam',
    farmerPhoneMasked: '+91 97****5533',
    farmLocation: {
      district: 'Kolhapur',
      tehsil: 'Hatkanangale',
      village: 'Vadgaon',
      latitude: 16.7513,
      longitude: 74.3168
    },
    cropId: 'soybean',
    cropVariety: 'Phule Sangam (KDS 726)',
    growthStage: 'vegetative',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
    capturedAt: '2026-09-02T11:20:00Z',
    aiPrediction: {
      diseaseId: 'soybean_healthy',
      diseaseNameEn: 'Healthy Soybean Canopy',
      diseaseNameMr: 'निरोगी सोयाबीन पीक',
      diseaseNameHi: 'स्वस्थ सोयाबीन फसल',
      confidencePercent: 96.2,
      topAlternatives: []
    },
    riskAssessment: {
      score: 18,
      level: 'LOW',
      factors: [
        {
          factorKey: 'rainfall',
          labelEn: 'Adequate Well-Drained Soil Moisture',
          labelMr: 'चांगला निचरा असलेला ओलावा',
          labelHi: 'संतुलित मिट्टी की नमी',
          level: 'LOW',
          valueText: '2.5 mm light shower, no water stagnation',
          icon: '🌧️'
        },
        {
          factorKey: 'humidity',
          labelEn: 'Moderate Ambient Humidity',
          labelMr: 'मध्यम आर्द्रता',
          labelHi: 'संतुलित वायुमंडलीय नमी',
          level: 'LOW',
          valueText: '62% RH (Below fungal epidemic threshold)',
          icon: '💧'
        },
        {
          factorKey: 'hotspot',
          labelEn: 'Zero Outbreak Cluster Reports',
          labelMr: 'परिसरात कोणत्याही रोगाची नोंद नाही',
          labelHi: 'आसपास कोई बीमारी दर्ज नहीं',
          level: 'LOW',
          valueText: '0 active reports within 15 km',
          icon: '📍'
        }
      ]
    },
    weatherSnapshot: {
      temperatureC: 26.5,
      humidityPercent: 62,
      precipitationMm: 2.5,
      rainfallProbability: 20,
      weatherConditionEn: 'Partly cloudy with pleasant breeze',
      weatherConditionMr: 'अंशतः ढगाळ आणि आल्हाददायक हवा',
      weatherConditionHi: 'आंशिक रूप से बादल',
      windSpeedKmh: 11,
      locationName: 'Vadgaon Agri Station',
      district: 'Kolhapur (कोल्हापूर)',
      updatedAt: '2026-09-02T11:00:00Z'
    },
    status: 'verified',
    verifiedDisease: 'Healthy Canopy (No Pathogens Detected)',
    expertName: 'Dr. Anjali Mane (Agronomist, MPKV Rahuri)',
    expertNotes: 'Crop displays excellent vigor and clean foliage. Advised maintaining balanced potash application and scouting for defoliator eggs.',
    verifiedAt: '2026-09-02T14:30:00Z'
  },
  {
    id: 'CS-MH-2026-0785',
    farmerName: 'Gajanan Wankhede',
    farmerPhoneMasked: '+91 88****9044',
    farmLocation: {
      district: 'Akola',
      tehsil: 'Murtizapur',
      village: 'Karanja Road',
      latitude: 20.7323,
      longitude: 77.3621
    },
    cropId: 'cotton',
    cropVariety: 'Ajit 155',
    growthStage: 'vegetative',
    imageUrl: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=800&auto=format&fit=crop&q=80',
    capturedAt: '2026-09-01T14:10:00Z',
    aiPrediction: {
      diseaseId: 'cotton_sucking_pest',
      diseaseNameEn: 'Sucking Pest Foliar Curl',
      diseaseNameMr: 'रसशोषक किडींचे नुकसान (तुडतुडे/मावा)',
      diseaseNameHi: 'रस चूसक कीटों का प्रकोप',
      confidencePercent: 86.4,
      topAlternatives: [
        { diseaseName: 'Leaf Curl Virus', confidence: 9.1 }
      ]
    },
    riskAssessment: {
      score: 58,
      level: 'MEDIUM',
      factors: [
        {
          factorKey: 'temp',
          labelEn: 'Warm Dry Interval',
          labelMr: 'पावसातील खंड आणि वाढलेले तापमान',
          labelHi: 'बारिश में विराम व बढ़ता तापमान',
          level: 'HIGH',
          valueText: '32.1°C after rain spell (Accelerates nymph hatching)',
          icon: '☀️'
        },
        {
          factorKey: 'humidity',
          labelEn: 'Decreasing Canopy Humidity',
          labelMr: 'कमी होणारी आर्द्रता',
          labelHi: 'घटती नमी',
          level: 'MEDIUM',
          valueText: '58% RH',
          icon: '💧'
        },
        {
          factorKey: 'hotspot',
          labelEn: 'Regional Vidarbha Infestation',
          labelMr: 'विदर्भातील रसशोषक किडींचा प्रादुर्भाव',
          labelHi: 'विदर्भ क्षेत्र में कीट प्रकोप',
          level: 'MEDIUM',
          valueText: '8 cases reported in neighboring tehsils',
          icon: '📍'
        }
      ]
    },
    weatherSnapshot: {
      temperatureC: 32.1,
      humidityPercent: 58,
      precipitationMm: 0.0,
      rainfallProbability: 15,
      weatherConditionEn: 'Sunny and dry with mild haze',
      weatherConditionMr: 'उष्ण व कोरडे हवामान',
      weatherConditionHi: 'धूप और शुष्क मौसम',
      windSpeedKmh: 9,
      locationName: 'Murtizapur Observatory',
      district: 'Akola (अकोला)',
      updatedAt: '2026-09-01T13:30:00Z'
    },
    status: 'pending'
  }
];

export const MAHARASHTRA_HOTSPOTS: HotspotCluster[] = [
  {
    id: 'hs-1',
    district: 'Nashik',
    tehsil: 'Niphad / Dindori',
    latitude: 20.08,
    longitude: 73.95,
    totalReports: 42,
    highRiskReports: 28,
    activeCrop: 'tomato',
    dominantDiseaseEn: 'Tomato Early Blight',
    dominantDiseaseMr: 'टोमॅटो लवकर येणारा करपा',
    dominantDiseaseHi: 'टमाटर अगेती झुलसा',
    riskLevel: 'HIGH',
    trend: 'rising',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'hs-2',
    district: 'Jalgaon',
    tehsil: 'Raver / Yawal',
    latitude: 21.16,
    longitude: 75.75,
    totalReports: 36,
    highRiskReports: 21,
    activeCrop: 'cotton',
    dominantDiseaseEn: 'Bacterial Blight (Black Arm)',
    dominantDiseaseMr: 'कापूस जीवाणूजन्य करपा',
    dominantDiseaseHi: 'कपास जीवाणु झुलसा',
    riskLevel: 'HIGH',
    trend: 'rising',
    lastUpdated: '1 hour ago'
  },
  {
    id: 'hs-3',
    district: 'Kolhapur',
    tehsil: 'Shirol / Hatkanangale',
    latitude: 16.72,
    longitude: 74.45,
    totalReports: 24,
    highRiskReports: 8,
    activeCrop: 'soybean',
    dominantDiseaseEn: 'Soybean Rust Alert (Early signs)',
    dominantDiseaseMr: 'सोयाबीन तांबेरा पूर्वसूचना',
    dominantDiseaseHi: 'सोयाबीन गेरुआ पूर्व-चेतावनी',
    riskLevel: 'MEDIUM',
    trend: 'stable',
    lastUpdated: '3 hours ago'
  },
  {
    id: 'hs-4',
    district: 'Akola',
    tehsil: 'Murtizapur / Akot',
    latitude: 20.70,
    longitude: 77.05,
    totalReports: 19,
    highRiskReports: 6,
    activeCrop: 'cotton',
    dominantDiseaseEn: 'Sucking Pest Hopperburn',
    dominantDiseaseMr: 'तुडतुडे व रसशोषक कीड',
    dominantDiseaseHi: 'रस चूसक कीट प्रकोप',
    riskLevel: 'MEDIUM',
    trend: 'declining',
    lastUpdated: '4 hours ago'
  },
  {
    id: 'hs-5',
    district: 'Amravati',
    tehsil: 'Achalpur / Morshi',
    latitude: 21.28,
    longitude: 77.52,
    totalReports: 14,
    highRiskReports: 2,
    activeCrop: 'soybean',
    dominantDiseaseEn: 'Foliar Defoliator (Spodoptera)',
    dominantDiseaseMr: 'पाने खाणारी लष्करी अळी',
    dominantDiseaseHi: 'पत्ती खाने वाली इल्ली',
    riskLevel: 'LOW',
    trend: 'stable',
    lastUpdated: '5 hours ago'
  },
  {
    id: 'hs-6',
    district: 'Pune',
    tehsil: 'Junnar / Ambegaon',
    latitude: 19.20,
    longitude: 73.88,
    totalReports: 29,
    highRiskReports: 14,
    activeCrop: 'tomato',
    dominantDiseaseEn: 'Yellow Leaf Curl Virus',
    dominantDiseaseMr: 'पिवळा पानांचा गुंडाळा (TYLCV)',
    dominantDiseaseHi: 'पत्ती मरोड़ विषाणु',
    riskLevel: 'MEDIUM',
    trend: 'stable',
    lastUpdated: '2 hours ago'
  }
];
