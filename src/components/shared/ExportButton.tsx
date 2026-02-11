import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react';

interface ExportButtonProps {
  onExport?: (format: 'pdf' | 'xlsx' | 'csv') => void;
}

function getTableData(): string[][] {
  const tables = document.querySelectorAll('table');
  if (tables.length === 0) return [];

  const table = tables[tables.length - 1];
  const rows: string[][] = [];

  table.querySelectorAll('tr').forEach((tr) => {
    const row: string[] = [];
    tr.querySelectorAll('th, td').forEach((cell) => {
      row.push((cell as HTMLElement).innerText.replace(/\n/g, ' ').trim());
    });
    if (row.length > 0) rows.push(row);
  });

  return rows;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function defaultExport(format: 'pdf' | 'xlsx' | 'csv') {
  const rows = getTableData();
  if (rows.length === 0) return;

  const dateStr = new Date().toISOString().slice(0, 10);

  if (format === 'csv') {
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `sigcop_${dateStr}.csv`);
  } else if (format === 'xlsx') {
    const tsv = rows.map((r) => r.join('\t')).join('\n');
    const blob = new Blob(['\uFEFF' + tsv], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    downloadBlob(blob, `sigcop_${dateStr}.xls`);
  } else {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const doc = printWindow.document;
    const style = doc.createElement('style');
    style.textContent = 'body{font-family:Arial,sans-serif;padding:24px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:12px}th{background:#f0f0f0;font-weight:bold}tr:nth-child(even){background:#f9f9f9}h1{font-size:18px;margin-bottom:4px}p{font-size:11px;color:#888}';
    doc.head.appendChild(style);

    const h1 = doc.createElement('h1');
    h1.textContent = 'SIGCOP - Relatório';
    doc.body.appendChild(h1);

    const p = doc.createElement('p');
    p.textContent = `Gerado em ${new Date().toLocaleString('pt-BR')}`;
    doc.body.appendChild(p);

    doc.body.appendChild(doc.createElement('br'));

    const table = doc.createElement('table');
    rows.forEach((r, i) => {
      const tr = doc.createElement('tr');
      r.forEach((c) => {
        const cell = doc.createElement(i === 0 ? 'th' : 'td');
        cell.textContent = c;
        tr.appendChild(cell);
      });
      table.appendChild(tr);
    });
    doc.body.appendChild(table);

    setTimeout(() => printWindow.print(), 300);
  }
}

export function ExportButton({ onExport }: ExportButtonProps) {
  const [open, setOpen] = useState(false);

  const handleExport = (format: 'pdf' | 'xlsx' | 'csv') => {
    if (onExport) {
      onExport(format);
    } else {
      defaultExport(format);
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Download className="w-4 h-4" />
        Exportar
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <FileText className="w-4 h-4 text-red-500" /> Exportar PDF
            </button>
            <button
              onClick={() => handleExport('xlsx')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <FileSpreadsheet className="w-4 h-4 text-green-600" /> Exportar XLSX
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <File className="w-4 h-4 text-slate-500" /> Exportar CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
