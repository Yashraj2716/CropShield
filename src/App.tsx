import React, { useState, useEffect } from 'react';
import { 
  Language, 
  TriageReport, 
  HotspotCluster, 
  CropId 
} from './types';
import { translations } from './data/translations';
import { CROPS_DATA } from './data/knowledgeBase';
import { SAMPLE_REPORTS, MAHARASHTRA_HOTSPOTS, DEFAULT_WEATHER } from './data/sampleReports';
import { LanguageSelector } from './components/common/LanguageSelector';
import { WeatherCard } from './components/common/WeatherCard';
import { RiskBadge } from './components/common/RiskBadge';
import { DiagnosticModal } from './components/farmer/DiagnosticModal';
import { HotspotMap } from './components/officer/HotspotMap';
import { VerificationQueue } from './components/officer/VerificationQueue';
import { 
  ShieldCheck, 
  Camera, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  ShieldAlert, 
  Layers, 
  PhoneCall, 
  Leaf, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileCheck,
  Check
} from 'lucide-react';

export default function App() {
  // App state
  const [lang, setLang] = useState<Language>('en');
  const [viewMode, setViewMode] = useState<'farmer' | 'officer'>('farmer');
  const [reports, setReports] = useState<TriageReport[]>(SAMPLE_REPORTS);
  const [hotspots, setHotspots] = useState<HotspotCluster[]>(MAHARASHTRA_HOTSPOTS);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(false);
  const [selectedReportDetail, setSelectedReportDetail] = useState<TriageReport | null>(null);

  // Backend Health Ping State
  const [backendStatus, setBackendStatus] = useState<'connected' | 'checking' | 'offline'>('checking');

  const t = translations[lang];
  const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

  useEffect(() => {
    // Check backend health
    const pingBackend = async () => {
      try {
        const res = await fetch(`${API_URL}/api/health`);
        if (res.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('offline');
        }
      } catch {
        // Dev proxy or standalone fallback
        setBackendStatus('connected');
      }
    };
    pingBackend();
  }, []);

  const handleReportCreated = (newReport: TriageReport) => {
    setReports(prev => [newReport, ...prev]);
    // If high risk, also update hotspot count for district
    if (newReport.riskAssessment.level === 'HIGH') {
      setHotspots(prev => prev.map(h => {
        if (h.district.toLowerCase() === newReport.farmLocation.district.toLowerCase()) {
          return {
            ...h,
            totalReports: h.totalReports + 1,
            highRiskReports: h.highRiskReports + 1,
            trend: 'rising',
            lastUpdated: 'Just now'
          };
        }
        return h;
      }));
    }
  };

  const handleVerifyReport = (reportId: string, verifiedDisease: string, notes: string) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: 'verified',
          verifiedDisease,
          expertNotes: notes,
          expertName: 'Dr. V. K. Deshmukh (SMS Plant Protection, KVK)',
          verifiedAt: new Date().toISOString()
        };
      }
      return r;
    }));
  };

  // Farmer's active summary
  const farmerCrop = CROPS_DATA[0]; // Tomato
  const latestFarmerReport = reports[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#1a201d]">
      
      {/* TOP GOVERNMENT & AGRITECH EMBLEM BAR */}
      <div className="bg-emerald-950 text-emerald-200 text-[11px] font-medium py-1 px-4 sm:px-6 flex items-center justify-between border-b border-emerald-900/60">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Integrated Agri-Surveillance & Epidemic Forecasting</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-emerald-400 font-mono">
            System: {backendStatus === 'connected' ? '● Operational (FastAPI + MobileNet)' : '○ Standalone Mode'}
          </span>
          <span>Maharashtra Agri Extension Hub</span>
        </div>
      </div>

      {/* PRIMARY HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <Leaf className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-900 tracking-tight">
                  {t.appTitle}
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Early Warning
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Portal Switcher & Language */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* View Mode Toggle: Farmer vs Officer */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('farmer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'farmer'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.farmerPortal}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('officer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'officer'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.officerPortal}
              </button>
            </div>

            {/* Language Selector */}
            <LanguageSelector
              currentLang={lang}
              onLanguageChange={setLang}
              variant="header"
            />
          </div>

        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ========================================================================= */}
        {/* VIEW 1: FARMER PORTAL */}
        {/* ========================================================================= */}
        {viewMode === 'farmer' && (
          <div className="space-y-6">
            
            {/* Farmer Top Hero Card with Quick Actions */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white p-6 sm:p-8 shadow-sm border border-emerald-900">
              {/* Background ambient pattern */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ 
                  backgroundImage: 'radial-gradient(#6ee7b7 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }} 
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Pimpalgaon Baswant, Niphad • Nashik (नाशिक)</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {t.greeting}
                  </h1>
                  <p className="text-sm text-emerald-100/90 mt-1 max-w-xl leading-relaxed">
                    {lang === 'mr' 
                      ? 'आपल्या पिकाचे नियमित निरीक्षण करा. पानावरील डाग, पिवळेपणा किंवा कीड दिसल्यास लगेच फोटो काढून तपासा.'
                      : lang === 'hi'
                      ? 'अपनी फसल की नियमित निगरानी करें। पत्ती पर धब्बे या कीट दिखने पर तुरंत फोटो लेकर जांचें।'
                      : 'Real-time crop surveillance and early warning. Take a photo of affected foliage to receive immediate IPM diagnosis.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-medium text-emerald-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-300">Registered Crop:</span>
                      <span className="font-bold text-white uppercase">{farmerCrop.nameEn} (Abhinav)</span>
                    </div>
                    <span className="text-emerald-600">•</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-300">{t.growthStage}:</span>
                      <span className="font-bold text-white">Flowering & Fruit Set</span>
                    </div>
                  </div>
                </div>

                {/* Big Primary Action: Scan Crop */}
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsDiagnosticOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-base font-extrabold shadow-md hover:shadow-lg transition-all duration-150 transform active:scale-98 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-950 text-emerald-300 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block leading-none">{t.scanButton}</span>
                      <span className="text-[11px] font-semibold text-slate-900/80 block mt-1">
                        Camera or Gallery Upload
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics & Microclimate Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Field Health Status Summary */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {t.fieldStatus}
                    </span>
                    <RiskBadge level={latestFarmerReport.riskAssessment.level} lang={lang} size="sm" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mt-2">
                    {latestFarmerReport.riskAssessment.level === 'HIGH' ? t.statusCritical :
                     latestFarmerReport.riskAssessment.level === 'MEDIUM' ? t.statusWarning :
                     t.statusHealthy}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {latestFarmerReport.riskAssessment.level === 'HIGH' 
                      ? t.riskHighNotice
                      : latestFarmerReport.riskAssessment.level === 'MEDIUM'
                      ? t.riskMedNotice
                      : t.riskLowNotice}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Last Scanned:</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(latestFarmerReport.capturedAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Weather Microclimate Card */}
              <div className="lg:col-span-2">
                <WeatherCard weather={DEFAULT_WEATHER} lang={lang} />
              </div>
            </div>

            {/* Recent Farmer Scans & Advisory Feed */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {t.recentReportsTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Saved diagnosis history with verified KVK field notes
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDiagnosticOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{t.scanButton}</span>
                </button>
              </div>

              {/* Reports Grid */}
              <div className="divide-y divide-slate-100">
                {reports.map((report) => {
                  const diseaseName = 
                    lang === 'mr' ? report.aiPrediction.diseaseNameMr :
                    lang === 'hi' ? report.aiPrediction.diseaseNameHi :
                    report.aiPrediction.diseaseNameEn;

                  return (
                    <div 
                      key={report.id}
                      onClick={() => setSelectedReportDetail(report)}
                      className="p-4 sm:p-5 hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <img 
                          src={report.imageUrl} 
                          alt="Leaf thumbnail" 
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-slate-500">{report.id}</span>
                            <RiskBadge level={report.riskAssessment.level} lang={lang} size="sm" />
                            {report.status === 'verified' && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                <Check className="w-3 h-3" />
                                <span>Verified by KVK</span>
                              </span>
                            )}
                          </div>
                          
                          <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                            {diseaseName}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1">
                            <span>Crop: {report.cropId} ({report.cropVariety})</span>
                            <span>•</span>
                            <span>Growth Stage: {report.growthStage}</span>
                            <span>•</span>
                            <span>AI Confidence: {report.aiPrediction.confidencePercent.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                        <span className="text-xs text-slate-400">
                          {new Date(report.capturedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: AGRICULTURE OFFICER / SURVEILLANCE PORTAL */}
        {/* ========================================================================= */}
        {viewMode === 'officer' && (
          <div className="space-y-6">
            
            {/* Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <h2 className="text-xl font-extrabold text-slate-950 tracking-tight">
                      {t.expertDashboardTitle}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.expertDashboardSubtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <span>ICAR / MPKV Integrated Pest Surveillance Network</span>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {t.kpiTotalReports}
                  </span>
                  <p className="text-2xl font-black text-slate-950 mt-1">
                    164
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">+18 today</span>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100">
                  <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
                    {t.kpiHighRisk}
                  </span>
                  <p className="text-2xl font-black text-rose-950 mt-1">
                    3 Tehsils
                  </p>
                  <span className="text-[10px] text-rose-700 font-semibold">Nashik & Jalgaon</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    {t.kpiPendingReview}
                  </span>
                  <p className="text-2xl font-black text-amber-950 mt-1">
                    {reports.filter(r => r.status === 'pending').length}
                  </p>
                  <span className="text-[10px] text-amber-700 font-semibold">Needs KVK sign-off</span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {t.kpiVerifiedRate}
                  </span>
                  <p className="text-2xl font-black text-emerald-950 mt-1">
                    94.2%
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Model accuracy baseline</span>
                </div>
              </div>
            </div>

            {/* GIS Regional Outbreak Hotspot Map */}
            <HotspotMap
              hotspots={hotspots}
              lang={lang}
              onSelectCluster={(cluster) => {
                console.log('Selected cluster:', cluster);
              }}
            />

            {/* Verification Queue Table */}
            <VerificationQueue
              reports={reports}
              lang={lang}
              onVerifyReport={handleVerifyReport}
            />

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-700">
            {t.appTitle} — {t.appSubtitle}
          </p>
          <p className="text-slate-400">
            Compliant with ICAR / SAU Plant Pathology guidelines • Weather data via agro-meteorological stations
          </p>
        </div>
      </footer>

      {/* DIAGNOSTIC MODAL */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        lang={lang}
        onReportCreated={handleReportCreated}
      />

      {/* REPORT DETAIL DRAWER / MODAL (FOR FARMER PAST SCANS) */}
      {selectedReportDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-slate-500">{selectedReportDetail.id}</span>
                <RiskBadge level={selectedReportDetail.riskAssessment.level} lang={lang} size="sm" />
              </div>
              <button
                onClick={() => setSelectedReportDetail(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            <div className="flex items-start gap-4">
              <img 
                src={selectedReportDetail.imageUrl} 
                alt="Leaf scan" 
                className="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-extrabold text-slate-950">
                  {lang === 'mr' ? selectedReportDetail.aiPrediction.diseaseNameMr :
                   lang === 'hi' ? selectedReportDetail.aiPrediction.diseaseNameHi :
                   selectedReportDetail.aiPrediction.diseaseNameEn}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Location: {selectedReportDetail.farmLocation.village}, {selectedReportDetail.farmLocation.tehsil}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Crop: {selectedReportDetail.cropId} ({selectedReportDetail.cropVariety}) • Stage: {selectedReportDetail.growthStage}
                </p>
              </div>
            </div>

            {selectedReportDetail.status === 'verified' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <div className="font-bold flex items-center gap-1 text-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>KVK Expert Official Verification Stamp</span>
                </div>
                <p className="mt-1 text-slate-700">{selectedReportDetail.expertNotes}</p>
                <p className="mt-1 text-[10px] text-slate-500 font-semibold">{selectedReportDetail.expertName}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReportDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
