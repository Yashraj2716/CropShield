export type Language = 'mr' | 'hi' | 'en';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type CropId = 'tomato' | 'cotton' | 'soybean';

export type GrowthStageId = 'seedling' | 'vegetative' | 'flowering' | 'fruiting_boll' | 'maturity';

export interface CropInfo {
  id: CropId;
  nameEn: string;
  nameMr: string;
  nameHi: string;
  scientificName: string;
  varieties: string[];
}

export interface DiseaseInfo {
  id: string;
  cropId: CropId;
  nameEn: string;
  nameMr: string;
  nameHi: string;
  pathogen: string;
  severity: 'None' | 'Moderate' | 'Severe' | 'Critical';
  category: 'fungal' | 'bacterial' | 'viral' | 'pest_damage' | 'healthy';
  descriptionEn: string;
  descriptionMr: string;
  descriptionHi: string;
}

export interface RiskFactor {
  factorKey: 'rainfall' | 'humidity' | 'stage' | 'hotspot' | 'temp';
  labelEn: string;
  labelMr: string;
  labelHi: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  valueText: string;
  icon: string;
}

export interface AdvisoryItem {
  id: string;
  category: 'monitoring' | 'cultural' | 'biological' | 'expert' | 'chemical';
  titleEn: string;
  titleMr: string;
  titleHi: string;
  descEn: string;
  descMr: string;
  descHi: string;
  urgency: 'normal' | 'immediate';
}

export interface WeatherData {
  temperatureC: number;
  humidityPercent: number;
  precipitationMm: number;
  rainfallProbability: number;
  weatherConditionEn: string;
  weatherConditionMr: string;
  weatherConditionHi: string;
  windSpeedKmh: number;
  locationName: string;
  district: string;
  updatedAt: string;
}

export interface TriageReport {
  id: string;
  farmerName: string;
  farmerPhoneMasked: string;
  farmLocation: {
    district: string;
    tehsil: string;
    village: string;
    latitude: number;
    longitude: number;
  };
  cropId: CropId;
  cropVariety: string;
  growthStage: GrowthStageId;
  imageUrl: string;
  capturedAt: string;
  aiPrediction: {
    diseaseId: string;
    diseaseNameEn: string;
    diseaseNameMr: string;
    diseaseNameHi: string;
    confidencePercent: number;
    topAlternatives?: Array<{
      diseaseName: string;
      confidence: number;
    }>;
  };
  riskAssessment: {
    score: number; // 0 - 100
    level: RiskLevel;
    factors: RiskFactor[];
  };
  weatherSnapshot: WeatherData;
  status: 'pending' | 'verified' | 'rejected';
  verifiedDisease?: string;
  expertNotes?: string;
  expertName?: string;
  verifiedAt?: string;
}

export interface HotspotCluster {
  id: string;
  district: string;
  tehsil: string;
  latitude: number;
  longitude: number;
  totalReports: number;
  highRiskReports: number;
  activeCrop: CropId;
  dominantDiseaseEn: string;
  dominantDiseaseMr: string;
  dominantDiseaseHi: string;
  riskLevel: RiskLevel;
  trend: 'rising' | 'stable' | 'declining';
  lastUpdated: string;
}
