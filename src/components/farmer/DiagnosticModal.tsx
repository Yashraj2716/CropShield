import React, { useState } from 'react';
import { 
  Language, 
  CropId, 
  GrowthStageId, 
  TriageReport, 
  RiskLevel 
} from '../../types';
import { translations } from '../../data/translations';
import { CROPS_DATA, DISEASES_DATA, IPM_ADVISORIES } from '../../data/knowledgeBase';
import { DEFAULT_WEATHER } from '../../data/sampleReports';
import { RiskBadge } from '../common/RiskBadge';
import { 
  X, 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  Leaf, 
  Send,
  BookmarkCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onReportCreated: (report: TriageReport) => void;
}

// Curated high-resolution agricultural field leaf samples for instant test evaluation
const QUICK_SAMPLES: Array<{
  label: string;
  cropId: CropId;
  stage: GrowthStageId;
  diseaseId: string;
  imageUrl: string;
}> = [
  {
    label: 'Tomato Leaf with Concentric Blight Rings',
    cropId: 'tomato',
    stage: 'flowering',
    diseaseId: 'tomato_early_blight',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2250c?w=800&auto=format&fit=crop&q=80'
  },
  {
    label: 'Cotton Foliar Angular Lesions (Bacterial Blight)',
    cropId: 'cotton',
    stage: 'fruiting_boll',
    diseaseId: 'cotton_bacterial_blight',
    imageUrl: 'https://images.unsplash.com/photo-1595155502123-018f97fa620e?w=800&auto=format&fit=crop&q=80'
  },
  {
    label: 'Healthy Soybean Canopy Control',
    cropId: 'soybean',
    stage: 'vegetative',
    diseaseId: 'soybean_healthy',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80'
  }
];

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  lang,
  onReportCreated
}) => {
  const t = translations[lang];

  // Form states
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCrop, setSelectedCrop] = useState<CropId>('tomato');
  const [selectedVariety, setSelectedVariety] = useState<string>('Abhinav (अभिनव)');
  const [selectedStage, setSelectedStage] = useState<GrowthStageId>('flowering');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStepText, setAnalysisStepText] = useState<string>('');
  
  // Results
  const [analyzedReport, setAnalyzedReport] = useState<TriageReport | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isOfficerReviewRequested, setIsOfficerReviewRequested] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentCropInfo = CROPS_DATA.find(c => c.id === selectedCrop)!;

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectQuickSample = (sample: typeof QUICK_SAMPLES[0]) => {
    setSelectedCrop(sample.cropId);
    setSelectedStage(sample.stage);
    setImagePreview(sample.imageUrl);
  };

  const runAnalysis = () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setStep(3);

    // Multi-step progressive feedback
    setAnalysisStepText(t.analyzingStep1);
    setTimeout(() => {
      setAnalysisStepText(t.analyzingStep2);
      setTimeout(() => {
        setAnalysisStepText(t.analyzingStep3);
        setTimeout(() => {
          setAnalysisStepText(t.analyzingStep4);
          setTimeout(() => {
            finalizePrediction();
          }, 600);
        }, 600);
      }, 700);
    }, 600);
  };

  const finalizePrediction = () => {
    // Intelligent mapping based on selected crop
    let diseaseId = 'tomato_early_blight';
    let conf = 91.5;
    let riskLevel: RiskLevel = 'HIGH';
    let riskScore = 84;

    if (selectedCrop === 'tomato') {
      diseaseId = 'tomato_early_blight';
      conf = 92.4;
      riskLevel = 'HIGH';
      riskScore = 85;
    } else if (selectedCrop === 'cotton') {
      diseaseId = 'cotton_bacterial_blight';
      conf = 89.1;
      riskLevel = 'HIGH';
      riskScore = 78;
    } else {
      diseaseId = 'soybean_rust';
      conf = 87.6;
      riskLevel = 'HIGH';
      riskScore = 82;
    }

    // Check if user clicked healthy sample
    if (imagePreview?.includes('photo-1596704017254')) {
      diseaseId = 'soybean_healthy';
      conf = 97.2;
      riskLevel = 'LOW';
      riskScore = 15;
    }

    const disease = DISEASES_DATA[diseaseId];

    const newReport: TriageReport = {
      id: `CS-MH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: 'Dnyaneshwar Shinde',
      farmerPhoneMasked: '+91 98****4120',
      farmLocation: {
        district: 'Nashik',
        tehsil: 'Niphad',
        village: 'Pimpalgaon Baswant',
        latitude: 20.1764,
        longitude: 73.9878
      },
      cropId: selectedCrop,
      cropVariety: selectedVariety || currentCropInfo.varieties[0],
      growthStage: selectedStage,
      imageUrl: imagePreview!,
      capturedAt: new Date().toISOString(),
      aiPrediction: {
        diseaseId: disease.id,
        diseaseNameEn: disease.nameEn,
        diseaseNameMr: disease.nameMr,
        diseaseNameHi: disease.nameHi,
        confidencePercent: conf,
        topAlternatives: [
          { diseaseName: 'Septoria Leaf Spot', confidence: 4.8 },
          { diseaseName: 'Cercospora Leaf Spot', confidence: 2.8 }
        ]
      },
      riskAssessment: {
        score: riskScore,
        level: riskLevel,
        factors: [
          {
            factorKey: 'rainfall',
            labelEn: 'Recent Rainfall & Leaf Wetness',
            labelMr: 'गेल्या २४ तासांतील पाऊस व ओलावा',
            labelHi: 'हालिया बारिश और पत्ती का गीलापन',
            level: 'HIGH',
            valueText: '18.5 mm (Optimal for pathogen spore germination)',
            icon: '🌧️'
          },
          {
            factorKey: 'humidity',
            labelEn: 'Ambient Relative Humidity',
            labelMr: 'हवेतील उच्च आर्द्रता',
            labelHi: 'अत्यधिक वायुमंडलीय नमी',
            level: 'HIGH',
            valueText: '84% RH (Fosters incubation period)',
            icon: '💧'
          },
          {
            factorKey: 'stage',
            labelEn: 'Growth Stage Sensitivity',
            labelMr: 'वाढीच्या अवस्थेतील संवेदनशीलता',
            labelHi: 'वृद्धि अवस्था की संवेदनशीलता',
            level: selectedStage === 'flowering' ? 'HIGH' : 'MEDIUM',
            valueText: `${selectedStage.toUpperCase()} stage - High yield impact`,
            icon: '🌱'
          },
          {
            factorKey: 'hotspot',
            labelEn: 'Nearby Verified Reports',
            labelMr: 'परिसरातील इतर शेतांमधील प्रकरणे',
            labelHi: 'आसपास के खेतों में दर्ज मामले',
            level: 'HIGH',
            valueText: '14 confirmed clusters within 8 km',
            icon: '📍'
          }
        ]
      },
      weatherSnapshot: {
        ...DEFAULT_WEATHER,
        updatedAt: new Date().toISOString()
      },
      status: 'pending'
    };

    setAnalyzedReport(newReport);
    setIsAnalyzing(false);
  };

  const handleSaveAndNotify = () => {
    if (analyzedReport) {
      onReportCreated(analyzedReport);
      setIsSaved(true);
    }
  };

  const handleRequestExpert = () => {
    setIsOfficerReviewRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-800 border border-emerald-700">
              <Leaf className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">{t.scanModalTitle}</h2>
              <p className="text-xs text-emerald-200">
                {step === 1 && t.scanStepSelect}
                {step === 2 && t.scanStepCapture}
                {step === 3 && t.scanStepAnalyze}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">

          {/* STEP 1: CROP & GROWTH STAGE SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.selectCropLabel}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {CROPS_DATA.map((crop) => {
                    const isSelected = selectedCrop === crop.id;
                    return (
                      <button
                        key={crop.id}
                        type="button"
                        onClick={() => {
                          setSelectedCrop(crop.id);
                          setSelectedVariety(crop.varieties[0]);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-700'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-sm font-bold text-slate-900">
                          {lang === 'mr' ? crop.nameMr : lang === 'hi' ? crop.nameHi : crop.nameEn}
                        </div>
                        <div className="text-xs text-slate-500 italic mt-0.5">{crop.scientificName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Variety Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.selectVarietyLabel}
                </label>
                <select
                  value={selectedVariety}
                  onChange={(e) => setSelectedVariety(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                >
                  {currentCropInfo.varieties.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Growth Stage Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.selectStageLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(['seedling', 'vegetative', 'flowering', 'fruiting_boll', 'maturity'] as GrowthStageId[]).map((stage) => {
                    const isSelected = selectedStage === stage;
                    const stageLabel = 
                      stage === 'seedling' ? t.stageSeedling :
                      stage === 'vegetative' ? t.stageVegetative :
                      stage === 'flowering' ? t.stageFlowering :
                      stage === 'fruiting_boll' ? t.stageFruitingBoll :
                      t.stageMaturity;

                    return (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => setSelectedStage(stage)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-700 font-semibold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {stageLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold shadow-xs transition"
                >
                  <span>Next: Capture Leaf</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: IMAGE UPLOAD / CAPTURE */}
          {step === 2 && (
            <div className="space-y-5">
              {!imagePreview ? (
                <div>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleImageFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-600 bg-slate-50 transition cursor-pointer"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
                      <Camera className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">{t.uploadPrompt}</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{t.uploadTip}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Choose from Gallery or Take Photo</span>
                    </div>
                  </div>

                  {/* Preloaded quick sample selection for rapid testing */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                      Or select a pre-verified field test sample:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {QUICK_SAMPLES.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectQuickSample(s)}
                          className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 hover:border-emerald-700 hover:bg-emerald-50/50 text-left transition group"
                        >
                          <img 
                            src={s.imageUrl} 
                            alt={s.label} 
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 group-hover:border-emerald-600"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold text-slate-800 block truncate">{s.label}</span>
                            <span className="text-[10px] text-emerald-700 font-semibold uppercase">{s.cropId}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video max-h-64 flex items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Crop leaf sample" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-950/80 text-white text-xs font-semibold hover:bg-slate-900 transition backdrop-blur-xs"
                    >
                      {t.changeImage}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                    <div>
                      <span className="font-bold">{currentCropInfo.nameEn} ({selectedVariety})</span>
                      <span className="text-slate-500 mx-1.5">•</span>
                      <span>Stage: {selectedStage}</span>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-emerald-800 hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={runAnalysis}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold shadow-xs transition"
                    >
                      <Leaf className="w-4 h-4" />
                      <span>{t.startAnalysisBtn}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: ANALYZING OR RESULT REPORT */}
          {step === 3 && (
            <div>
              {isAnalyzing ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto animate-spin">
                    <Loader2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t.analyzingTitle}</h3>
                    <p className="text-xs font-medium text-emerald-800 mt-2 bg-emerald-50 py-1.5 px-4 rounded-full inline-block border border-emerald-200">
                      {analysisStepText}
                    </p>
                  </div>
                </div>
              ) : analyzedReport ? (
                <div className="space-y-6">
                  {/* Top Result Banner */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <img 
                          src={analyzedReport.imageUrl} 
                          alt="Analyzed sample" 
                          className="w-20 h-20 rounded-xl object-cover border border-slate-300 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                              {t.detectedCondition}
                            </span>
                            <RiskBadge level={analyzedReport.riskAssessment.level} lang={lang} size="sm" />
                          </div>
                          <h3 className="text-lg font-extrabold text-slate-950 mt-1">
                            {lang === 'mr' ? analyzedReport.aiPrediction.diseaseNameMr :
                             lang === 'hi' ? analyzedReport.aiPrediction.diseaseNameHi :
                             analyzedReport.aiPrediction.diseaseNameEn}
                          </h3>
                          <p className="text-xs text-slate-500 italic mt-0.5">
                            {DISEASES_DATA[analyzedReport.aiPrediction.diseaseId]?.pathogen}
                          </p>
                        </div>
                      </div>

                      {/* Confidence Score Pill */}
                      <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                        <span className="text-xs font-semibold text-slate-500 block">{t.confidenceScore}</span>
                        <span className="text-xl font-black text-slate-900 font-mono">
                          {analyzedReport.aiPrediction.confidencePercent.toFixed(1)}%
                        </span>
                        <div className="w-28 h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden ml-auto">
                          <div 
                            className="h-full bg-emerald-600 rounded-full" 
                            style={{ width: `${analyzedReport.aiPrediction.confidencePercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Low Confidence Caution Warning */}
                    {analyzedReport.aiPrediction.confidencePercent < 60 && (
                      <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>{t.confidenceWarning}</span>
                      </div>
                    )}
                  </div>

                  {/* "Why is the risk high?" Multi-Factor Environmental Attribution */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="mb-3">
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-emerald-800" />
                        <span>{t.riskFactorsTitle}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {t.riskFactorsSubtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {analyzedReport.riskAssessment.factors.map((factor, idx) => {
                        const factorName = 
                          lang === 'mr' ? factor.labelMr :
                          lang === 'hi' ? factor.labelHi :
                          factor.labelEn;

                        return (
                          <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                <span>{factor.icon}</span>
                                <span>{factorName}</span>
                              </span>
                              <RiskBadge level={factor.level} lang={lang} size="sm" showIcon={false} />
                            </div>
                            <p className="text-xs text-slate-600 mt-1 font-mono">
                              {factor.valueText}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* IPM Advisory Recommendations */}
                  <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80">
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>{t.advisoryTitle}</span>
                        </h4>
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          ICAR Guidelines
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800/80 mt-0.5">{t.advisorySubtitle}</p>
                    </div>

                    <div className="space-y-2.5 mt-3">
                      {(IPM_ADVISORIES[analyzedReport.aiPrediction.diseaseId] || IPM_ADVISORIES['tomato_early_blight']).map((item) => {
                        const title = lang === 'mr' ? item.titleMr : lang === 'hi' ? item.titleHi : item.titleEn;
                        const desc = lang === 'mr' ? item.descMr : lang === 'hi' ? item.descHi : item.descEn;

                        return (
                          <div 
                            key={item.id} 
                            className="p-3.5 rounded-xl bg-white border border-emerald-100 shadow-2xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-slate-900">{title}</span>
                              {item.urgency === 'immediate' && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                  Priority
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-700 mt-1 leading-relaxed">{desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-slate-500 mt-3 italic">
                      {t.disclaimerIpm}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setImagePreview(null);
                        setAnalyzedReport(null);
                        setIsSaved(false);
                        setIsOfficerReviewRequested(false);
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
                    >
                      Scan Another Leaf
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleRequestExpert}
                        disabled={isOfficerReviewRequested}
                        className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition ${
                          isOfficerReviewRequested
                            ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                            : 'bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-50'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isOfficerReviewRequested ? t.reviewRequested : t.requestExpertReview}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveAndNotify}
                        disabled={isSaved}
                        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition ${
                          isSaved
                            ? 'bg-emerald-800 text-white cursor-default'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        <BookmarkCheck className="w-4 h-4" />
                        <span>{isSaved ? t.reportSaved : t.saveReport}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
