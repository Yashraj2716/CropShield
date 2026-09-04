import React from 'react';
import { WeatherData, Language } from '../../types';
import { translations } from '../../data/translations';
import { CloudRain, Droplets, Thermometer, Wind, CloudSun, AlertCircle } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
  lang: Language;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, lang }) => {
  const t = translations[lang];

  const conditionText = 
    lang === 'mr' ? weather.weatherConditionMr :
    lang === 'hi' ? weather.weatherConditionHi :
    weather.weatherConditionEn;

  // Agricultural disease incubation thresholds
  const isHighHumidity = weather.humidityPercent >= 80;
  const isRainRisk = weather.precipitationMm > 10;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition hover:shadow-sm">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">{t.weatherTitle}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{weather.locationName} • {weather.district}</p>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CloudSun className="w-5 h-5" />
          </div>
        </div>

        <p className="text-xs font-medium text-slate-700 mt-3 flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-slate-400">🌦️</span>
          <span>{conditionText}</span>
        </p>

        {/* Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
              <Thermometer className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.temp}</span>
            </div>
            <p className="text-base font-bold text-slate-900 mt-1">{weather.temperatureC}°C</p>
          </div>

          <div className={`p-3 rounded-xl border ${
            isHighHumidity 
              ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
              : 'bg-slate-50 border-slate-100'
          }`}>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>{t.humidity}</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-base font-bold text-slate-900">{weather.humidityPercent}%</p>
              {isHighHumidity && (
                <span className="text-[10px] font-semibold text-amber-700">High</span>
              )}
            </div>
          </div>

          <div className={`p-3 rounded-xl border ${
            isRainRisk 
              ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
              : 'bg-slate-50 border-slate-100'
          }`}>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
              <CloudRain className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.rainfall}</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-base font-bold text-slate-900">{weather.precipitationMm} mm</p>
              <span className="text-[10px] text-slate-500 font-mono">({weather.rainfallProbability}%)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
              <Wind className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.wind}</span>
            </div>
            <p className="text-base font-bold text-slate-900 mt-1">{weather.windSpeedKmh} km/h</p>
          </div>
        </div>

        {/* Agricultural Risk Advisory Banner */}
        {isHighHumidity && (
          <div className="mt-3.5 flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span className="leading-snug">
              {lang === 'mr' 
                ? 'हवेतील उच्च आर्द्रता (८४%) बुरशीजन्य रोगांच्या प्रसारासाठी अनुकूल आहे. पानावरील डागांचे बारकाईने निरीक्षण करा.' 
                : lang === 'hi'
                ? '८४% वायुमंडलीय नमी फफूंद जनित रोगों के लिए अनुकूल है। पत्तियों पर धब्बों की नियमित जांच करें।'
                : 'High foliar humidity (84% RH) promotes fungal spore development. Regular field scouting advised.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
