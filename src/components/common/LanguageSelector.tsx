import React from 'react';
import { Language } from '../../types';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'header' | 'standalone';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLang, 
  onLanguageChange,
  variant = 'header'
}) => {
  const languages: Array<{ code: Language; label: string; script: string }> = [
    { code: 'mr', label: 'मराठी', script: 'देवनागरी' },
    { code: 'hi', label: 'हिंदी', script: 'देवनागरी' },
    { code: 'en', label: 'English', script: 'Latin' },
  ];

  if (variant === 'standalone') {
    return (
      <div className="flex items-center gap-1.5 p-1 bg-emerald-950/20 border border-emerald-900/40 rounded-xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentLang === lang.code
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
      <div className="pl-2 pr-1 text-slate-500 flex items-center">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center space-x-0.5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              currentLang === lang.code
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
            title={lang.script}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};
