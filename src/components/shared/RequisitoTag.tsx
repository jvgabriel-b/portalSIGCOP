import { BookOpen } from 'lucide-react';

interface RequisitoTagProps {
  ids: string[];
}

export function RequisitoTag({ ids }: RequisitoTagProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
      {ids.map((id) => (
        <span
          key={id}
          className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100"
        >
          {id}
        </span>
      ))}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  requisitos: string[];
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, requisitos, children }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 -mx-6 -mt-6 px-6 pt-6 pb-5 mb-6 rounded-t-none">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">{title}</h1>
          <p className="text-sm text-slate-300">{subtitle}</p>
          <div className="mt-2">
            <RequisitoTag ids={requisitos} />
          </div>
        </div>
        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  );
}
