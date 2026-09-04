import React, { useState } from 'react';
import { HotspotCluster, Language, CropId, RiskLevel } from '../../types';
import { translations } from '../../data/translations';
import { RiskBadge } from '../common/RiskBadge';
import { TrendingUp, Minus, TrendingDown, MapPin, AlertCircle, Filter } from 'lucide-react';

interface HotspotMapProps {
  hotspots: HotspotCluster[];
  lang: Language;
  onSelectCluster?: (cluster: HotspotCluster) => void;
}

export const HotspotMap: React.FC<HotspotMapProps> = ({
  hotspots,
  lang,
  onSelectCluster
}) => {
  const t = translations[lang];
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [activeClusterId, setActiveClusterId] = useState<string>(hotspots[0]?.id || '');

  const filteredHotspots = hotspots.filter(h => {
    if (selectedCropFilter !== 'all' && h.activeCrop !== selectedCropFilter) return false;
    if (selectedRiskFilter !== 'all' && h.riskLevel !== selectedRiskFilter) return false;
    return true;
  });

  const activeCluster = hotspots.find(h => h.id === activeClusterId) || filteredHotspots[0] || hotspots[0];

  // Map coordinates normalized into an SVG viewBox (73.0°E to 78.5°E longitude, 16.0°N to 22.0°N latitude)
  // X = ((lon - 73.0) / (78.5 - 73.0)) * 600
  // Y = ((22.0 - lat) / (22.0 - 16.0)) * 400
  const getCoordinates = (lat: number, lon: number) => {
    const x = Math.max(40, Math.min(560, ((lon - 73.0) / 5.5) * 600));
    const y = Math.max(30, Math.min(370, ((22.0 - lat) / 6.0) * 400));
    return { x, y };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">{t.mapTitle}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic distribution of active foliar disease alerts & pest corridors across Maharashtra
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Crop Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold focus:outline-hidden text-xs cursor-pointer"
            >
              <option value="all">{t.allCrops}</option>
              <option value="tomato">Tomato (टोमॅटो)</option>
              <option value="cotton">Cotton (कापूस)</option>
              <option value="soybean">Soybean (सोयाबीन)</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold focus:outline-hidden text-xs cursor-pointer"
            >
              <option value="all">{t.allRisks}</option>
              <option value="HIGH">{t.riskHigh} (उच्च)</option>
              <option value="MEDIUM">{t.riskMed} (मध्यम)</option>
              <option value="LOW">{t.riskLow} (कमी)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* SVG Regional Canvas */}
        <div className="lg:col-span-2 relative bg-slate-900 p-4 min-h-[380px] flex items-center justify-center overflow-hidden">
          
          {/* Subtle Grid Lines for GIS aesthetic */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ 
                 backgroundImage: 'radial-gradient(#34d399 1px, transparent 1px)', 
                 backgroundSize: '24px 24px' 
               }} 
          />

          {/* District boundary contour simulation */}
          <svg 
            viewBox="0 0 600 400" 
            className="w-full h-full max-h-[360px] select-none"
          >
            {/* Outline schematic of Maharashtra agro-ecological zones */}
            <path
              d="M 60,180 Q 90,80 180,60 T 360,50 T 520,70 T 560,150 T 480,260 T 320,340 T 180,360 T 90,300 Z"
              fill="#064e3b"
              fillOpacity="0.35"
              stroke="#047857"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Western Ghats ridge guideline */}
            <path
              d="M 120,90 Q 140,200 160,330"
              fill="none"
              stroke="#059669"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text x="75" y="240" fill="#6ee7b7" fontSize="10" fontWeight="600" opacity="0.6">
              Western Agro Zone
            </text>

            {/* Central Marathwada & Vidarbha labels */}
            <text x="260" y="200" fill="#6ee7b7" fontSize="10" fontWeight="600" opacity="0.6">
              Central Maharashtra
            </text>
            <text x="440" y="140" fill="#6ee7b7" fontSize="10" fontWeight="600" opacity="0.6">
              Vidarbha / Khandesh
            </text>

            {/* Render Hotspot Cluster Markers */}
            {filteredHotspots.map((cluster) => {
              const { x, y } = getCoordinates(cluster.latitude, cluster.longitude);
              const isSelected = cluster.id === activeClusterId;

              const colorClass = 
                cluster.riskLevel === 'HIGH' ? '#f43f5e' :
                cluster.riskLevel === 'MEDIUM' ? '#f59e0b' : '#10b981';

              return (
                <g 
                  key={cluster.id}
                  onClick={() => {
                    setActiveClusterId(cluster.id);
                    if (onSelectCluster) onSelectCluster(cluster);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Radar Ripple Effect for High Risk clusters */}
                  {cluster.riskLevel === 'HIGH' && (
                    <circle
                      cx={x}
                      cy={y}
                      r="22"
                      fill={colorClass}
                      fillOpacity="0.25"
                      className="animate-ping origin-center"
                    />
                  )}

                  {/* Outer selection ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "16" : "11"}
                    fill={colorClass}
                    fillOpacity={isSelected ? "0.4" : "0.2"}
                    stroke={isSelected ? "#ffffff" : colorClass}
                    strokeWidth={isSelected ? "2" : "1"}
                    className="transition-all duration-200"
                  />

                  {/* Center Dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "6" : "5"}
                    fill={colorClass}
                  />

                  {/* Cluster Label Pill */}
                  <g transform={`translate(${x + 10}, ${y - 8})`}>
                    <rect
                      x="0"
                      y="-10"
                      width={cluster.district.length * 6.5 + 30}
                      height="18"
                      rx="9"
                      fill="#0f172a"
                      fillOpacity="0.85"
                      stroke="#334155"
                      strokeWidth="1"
                    />
                    <text
                      x="8"
                      y="2"
                      fill="#f8fafc"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {cluster.district}
                    </text>
                    <text
                      x={cluster.district.length * 6.5 + 16}
                      y="2"
                      fill={colorClass}
                      fontSize="9"
                      fontWeight="800"
                    >
                      {cluster.totalReports}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Map Legend */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>High Risk</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Medium Risk</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Low / Controlled</span>
            </span>
          </div>
        </div>

        {/* Selected Hotspot Details Pane */}
        {activeCluster && (
          <div className="p-5 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeCluster.district} District</span>
                </div>
                <RiskBadge level={activeCluster.riskLevel} lang={lang} size="sm" />
              </div>

              <h4 className="text-base font-extrabold text-slate-950 mt-1">
                {activeCluster.tehsil} Tehsil
              </h4>

              <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Primary Outbreak Condition</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">
                    {lang === 'mr' ? activeCluster.dominantDiseaseMr :
                     lang === 'hi' ? activeCluster.dominantDiseaseHi :
                     activeCluster.dominantDiseaseEn}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500">Active Field Reports</span>
                    <p className="text-sm font-extrabold text-slate-900">{activeCluster.totalReports}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Critical / High Severity</span>
                    <p className="text-sm font-extrabold text-rose-700">{activeCluster.highRiskReports}</p>
                  </div>
                </div>
              </div>

              {/* Spread Trend Indicator */}
              <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 text-xs">
                <span className="font-medium text-slate-600">Spread Trajectory:</span>
                <span className="flex items-center gap-1 font-bold text-slate-900">
                  {activeCluster.trend === 'rising' && (
                    <>
                      <TrendingUp className="w-4 h-4 text-rose-600" />
                      <span className="text-rose-700">{t.trendRising}</span>
                    </>
                  )}
                  {activeCluster.trend === 'stable' && (
                    <>
                      <Minus className="w-4 h-4 text-amber-600" />
                      <span className="text-amber-700">{t.trendStable}</span>
                    </>
                  )}
                  {activeCluster.trend === 'declining' && (
                    <>
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">{t.trendDeclining}</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Agricultural Advisory Directive */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="text-[11px] text-slate-600 leading-snug">
                <span className="font-bold text-slate-800">KVK Advisory Notice: </span>
                {activeCluster.riskLevel === 'HIGH' 
                  ? 'Foliar spore dissemination accelerated by monsoon showers. Broadcast preventive alert to registered farmers in neighboring tehsils.'
                  : 'Containment successful through field sanitation and recommended bio-fungicide sprays.'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
