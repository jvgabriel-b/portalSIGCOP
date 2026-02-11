import { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface RowAction<T> {
  label: string;
  onClick: (row: T) => void;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: RowAction<T>[];
  pageSize?: number;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  actions,
  pageSize = 10,
  emptyMessage = 'Nenhum registro encontrado',
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [openAction, setOpenAction] = useState<number | null>(null);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={`px-5 py-3 font-semibold ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-5 py-3 font-semibold text-right">Ações</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-12 text-center text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/80 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-5 py-3.5 ${col.className || ''}`}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="px-5 py-3.5 text-right relative">
                      <button
                        onClick={() => setOpenAction(openAction === rowIdx ? null : rowIdx)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-slate-500" />
                      </button>
                      {openAction === rowIdx && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenAction(null)} />
                          <div className="absolute right-5 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
                            {actions.map((action, actionIdx) => (
                              <button
                                key={actionIdx}
                                onClick={() => { action.onClick(row); setOpenAction(null); }}
                                className={`block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 ${action.className || 'text-slate-700'}`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50/50">
          <p className="text-xs text-slate-500">
            Mostrando {page * pageSize + 1}–{Math.min((page + 1) * pageSize, data.length)} de {data.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  page === i ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
