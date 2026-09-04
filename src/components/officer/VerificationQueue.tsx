import React, { useState } from 'react';
import { TriageReport, Language } from '../../types';
import { translations } from '../../data/translations';
import { RiskBadge } from '../common/RiskBadge';
import { DISEASES_DATA } from '../../data/knowledgeBase';
import { 
  CheckCircle2, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  UserCheck, 
  Check, 
  Clock, 
  MapPin, 
  Calendar 
} from 'lucide-react';

interface VerificationQueueProps {
  reports: TriageReport[];
  lang: Language;
  onVerifyReport: (reportId: string, verifiedDisease: string, notes: string) => void;
}

export const VerificationQueue: React.FC<VerificationQueueProps> = ({
  reports,
  lang,
  onVerifyReport
}) => {
  const t = translations[lang];
  const [selectedReport, setSelectedReport] = useState<TriageReport | null>(null);
  const [overrideDisease, setOverrideDisease] = useState<string>('');
  const [expertNotes, setExpertNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleOpenReview = (report: TriageReport) => {
    setSelectedReport(report);
    setOverrideDisease(report.aiPrediction.diseaseNameEn);
    setExpertNotes(report.expertNotes || '');
  };

  const handleConfirmVerification = () => {
    if (!selectedReport) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onVerifyReport(
        selectedReport.id,
        overrideDisease || selectedReport.aiPrediction.diseaseNameEn,
        expertNotes || 'Verified consistent with field symptoms.'
      );
      setIsSubmitting(false);
      setSelectedReport(null);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">{t.queueTitle}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{t.queueSubtitle}</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {reports.filter(r => r.status === 'pending').length} Pending Review
        </span>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              <th className="py-3 px-4">{t.colId}</th>
              <th className="py-3 px-4">{t.colLocation}</th>
              <th className="py-3 px-4">{t.colCrop}</th>
              <th className="py-3 px-4">{t.colPrediction}</th>
              <th className="py-3 px-4">{t.colConfidence}</th>
              <th className="py-3 px-4">{t.colRisk}</th>
              <th className="py-3 px-4">{t.colStatus}</th>
              <th className="py-3 px-4 text-right">{t.colAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((r) => {
              const dateStr = new Date(r.capturedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const diseaseName = 
                lang === 'mr' ? r.aiPrediction.diseaseNameMr :
                lang === 'hi' ? r.aiPrediction.diseaseNameHi :
                r.aiPrediction.diseaseNameEn;

              return (
                <tr key={r.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {r.id}
                    <span className="block text-[10px] text-slate-400 font-sans font-normal">{dateStr}</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 block">{r.farmLocation.district}</span>
                    <span className="text-[10px] text-slate-500">{r.farmLocation.tehsil}, {r.farmLocation.village}</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 uppercase tracking-tight block">{r.cropId}</span>
                    <span className="text-[10px] text-slate-500">{r.growthStage}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={r.imageUrl} 
                        alt="Leaf preview" 
                        className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-bold text-slate-800 line-clamp-1">{diseaseName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono font-bold text-slate-700">
                    {r.aiPrediction.confidencePercent.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <RiskBadge level={r.riskAssessment.level} lang={lang} size="sm" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {r.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <Check className="w-3 h-3" />
                        <span>{t.statusVerified}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Clock className="w-3 h-3" />
                        <span>{t.statusPending}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenReview(r)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition shadow-2xs"
                    >
                      {r.status === 'verified' ? 'View Stamp' : t.actionReview}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* EXPERT REVIEW MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <div>
                  <h3 className="text-base font-bold tracking-tight">{t.reviewModalTitle}</h3>
                  <p className="text-xs text-emerald-200">Case Reference: {selectedReport.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Farmer & Location Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Farmer</span>
                  <span className="font-bold text-slate-900">{selectedReport.farmerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Location</span>
                  <span className="font-bold text-slate-900">{selectedReport.farmLocation.tehsil}, {selectedReport.farmLocation.district}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Crop & Stage</span>
                  <span className="font-bold text-slate-900 uppercase">{selectedReport.cropId} ({selectedReport.growthStage})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Microclimate</span>
                  <span className="font-bold text-slate-900">{selectedReport.weatherSnapshot.temperatureC}°C, {selectedReport.weatherSnapshot.humidityPercent}% RH</span>
                </div>
              </div>

              {/* Sample Photo & AI Prediction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video sm:aspect-square bg-slate-900 flex items-center justify-center">
                  <img 
                    src={selectedReport.imageUrl} 
                    alt="Farmer leaf submission" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Automated AI Classification
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-1">
                      {selectedReport.aiPrediction.diseaseNameEn}
                    </h4>
                    <p className="text-xs text-slate-500 italic">
                      {DISEASES_DATA[selectedReport.aiPrediction.diseaseId]?.pathogen}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">Confidence:</span>
                      <span className="text-sm font-mono font-bold text-emerald-800">
                        {selectedReport.aiPrediction.confidencePercent.toFixed(1)}%
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">Regional Risk Level:</span>
                      <RiskBadge level={selectedReport.riskAssessment.level} lang={lang} size="sm" />
                    </div>
                  </div>

                  {selectedReport.status === 'verified' && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                      <div className="font-bold flex items-center gap-1 text-emerald-800">
                        <Check className="w-4 h-4" />
                        <span>Officially Verified Record</span>
                      </div>
                      <p className="text-slate-600 mt-1 font-medium">{selectedReport.expertNotes}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5">{selectedReport.expertName}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Diagnosis Confirmation or Override */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Official Plant Pathology Confirmation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOverrideDisease(selectedReport.aiPrediction.diseaseNameEn)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      overrideDisease === selectedReport.aiPrediction.diseaseNameEn
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-700'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 inline mr-1 text-emerald-700" />
                    <span>{t.verifyAccept} ({selectedReport.aiPrediction.diseaseNameEn})</span>
                  </button>

                  <select
                    value={overrideDisease}
                    onChange={(e) => setOverrideDisease(e.target.value)}
                    className="p-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:outline-hidden focus:border-emerald-700"
                  >
                    <option value={selectedReport.aiPrediction.diseaseNameEn}>-- Or Select Pathogen Correction --</option>
                    {Object.values(DISEASES_DATA).map(d => (
                      <option key={d.id} value={d.nameEn}>
                        {d.nameEn} ({d.cropId.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 mt-3">
                    {t.expertNotesLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={expertNotes}
                    onChange={(e) => setExpertNotes(e.target.value)}
                    placeholder={t.expertNotesPlaceholder}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t.verificationFeedbackNotice}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
              >
                {t.close}
              </button>

              <button
                type="button"
                onClick={handleConfirmVerification}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition"
              >
                <Check className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving...' : t.confirmVerificationBtn}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
