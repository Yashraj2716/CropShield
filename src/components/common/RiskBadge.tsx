import React from 'react';
import { RiskLevel, Language } from '../../types';
import { translations } from '../../data/translations';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  lang: Language;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  level, 
  lang, 
  size = 'md',
  showIcon = true 
}) => {
  const t = translations[lang];

  const config = {
    LOW: {
      label: t.riskLow,
      bg: 'bg-emerald-50 border-emerald-300 text-emerald-800',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600'
    },
    MEDIUM: {
      label: t.riskMed,
      bg: 'bg-amber-50 border-amber-300 text-amber-800',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
      iconColor: 'text-amber-600'
    },
    HIGH: {
      label: t.riskHigh,
      bg: 'bg-rose-50 border-rose-300 text-rose-800',
      dot: 'bg-rose-500',
      icon: ShieldAlert,
      iconColor: 'text-rose-600'
    }
  };

  const current = config[level];
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold tracking-wide'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full border shadow-xs transition-colors ${current.bg} ${sizeClasses[size]}`}
    >
      {showIcon && <IconComponent className={`${iconSizes[size]} ${current.iconColor} shrink-0`} />}
      <span>{current.label}</span>
    </span>
  );
};
