import { type LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, trendUp, color = 'blue' }: StatsCardProps) {
  const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
    blue: { bg: 'from-blue-600 to-blue-700', icon: 'text-blue-100', text: 'text-blue-100' },
    emerald: { bg: 'from-emerald-600 to-emerald-700', icon: 'text-emerald-100', text: 'text-emerald-100' },
    amber: { bg: 'from-amber-500 to-amber-600', icon: 'text-amber-100', text: 'text-amber-100' },
    purple: { bg: 'from-purple-600 to-purple-700', icon: 'text-purple-100', text: 'text-purple-100' },
    rose: { bg: 'from-rose-600 to-rose-700', icon: 'text-rose-100', text: 'text-rose-100' },
    cyan: { bg: 'from-cyan-600 to-cyan-700', icon: 'text-cyan-100', text: 'text-cyan-100' },
    slate: { bg: 'from-slate-600 to-slate-700', icon: 'text-slate-100', text: 'text-slate-100' },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-gradient-to-br ${c.bg} rounded-xl p-5 text-white shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`${c.text} text-sm font-medium mb-1`}>{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${c.text}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <Icon className={`w-8 h-8 opacity-70`} />
      </div>
    </div>
  );
}
