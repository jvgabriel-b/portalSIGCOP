import { useState } from 'react';
import { Activity, AlertTriangle, Clock, TrendingUp, Filter } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { FilterBar } from '../shared/FilterBar';
import { PageHeader } from '../shared/RequisitoTag';

interface ProcessoAtivo {
  id: string;
  numero: string;
  tipo: string;
  etapaAtual: string;
  responsavel: string;
  diasNaEtapa: number;
  slaDias: number;
  status: 'No prazo' | 'Atenção' | 'SLA Excedido';
}

const mockProcessos: ProcessoAtivo[] = [
  { id: '1', numero: 'PROC-2026/0042', tipo: 'Contrato', etapaAtual: 'Análise Jurídica', responsavel: 'Jurídico', diasNaEtapa: 12, slaDias: 10, status: 'SLA Excedido' },
  { id: '2', numero: 'PROC-2026/0041', tipo: 'Planejamento', etapaAtual: 'Aprovação Técnica', responsavel: 'Maria Santos', diasNaEtapa: 4, slaDias: 5, status: 'Atenção' },
  { id: '3', numero: 'PROC-2026/0040', tipo: 'Convênio', etapaAtual: 'Elaboração do TR', responsavel: 'Ana Costa', diasNaEtapa: 3, slaDias: 10, status: 'No prazo' },
  { id: '4', numero: 'PROC-2026/0039', tipo: 'Fiscalização', etapaAtual: 'Registro de Visita', responsavel: 'Pedro Lima', diasNaEtapa: 1, slaDias: 3, status: 'No prazo' },
  { id: '5', numero: 'PROC-2026/0038', tipo: 'Bolsa Esportiva', etapaAtual: 'Assinatura', responsavel: 'Secretário', diasNaEtapa: 8, slaDias: 5, status: 'SLA Excedido' },
  { id: '6', numero: 'PROC-2026/0037', tipo: 'Contrato', etapaAtual: 'Elaboração do TR', responsavel: 'Ana Costa', diasNaEtapa: 5, slaDias: 10, status: 'No prazo' },
  { id: '7', numero: 'PROC-2026/0036', tipo: 'Convênio', etapaAtual: 'Análise Financeira', responsavel: 'Financeiro', diasNaEtapa: 9, slaDias: 15, status: 'No prazo' },
  { id: '8', numero: 'PROC-2026/0035', tipo: 'Planejamento', etapaAtual: 'Assinatura', responsavel: 'Secretário', diasNaEtapa: 7, slaDias: 5, status: 'SLA Excedido' },
];

const etapasFunil = [
  { nome: 'Elaboração', qtd: 15, cor: 'bg-blue-500' },
  { nome: 'Aprovação Técnica', qtd: 12, cor: 'bg-purple-500' },
  { nome: 'Análise Jurídica', qtd: 8, cor: 'bg-amber-500' },
  { nome: 'Análise Financeira', qtd: 6, cor: 'bg-emerald-500' },
  { nome: 'Assinatura', qtd: 4, cor: 'bg-cyan-500' },
  { nome: 'Concluído', qtd: 45, cor: 'bg-slate-400' },
];

const tempoMedioPorEtapa = [
  { etapa: 'Elaboração', dias: 6 },
  { etapa: 'Aprovação', dias: 4 },
  { etapa: 'Jurídico', dias: 8 },
  { etapa: 'Financeiro', dias: 5 },
  { etapa: 'Assinatura', dias: 3 },
];

export function M11Monitoramento() {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const slaExcedido = mockProcessos.filter((p) => p.status === 'SLA Excedido').length;
  const maxDias = Math.max(...tempoMedioPorEtapa.map((t) => t.dias));

  const filtered = mockProcessos.filter((p) => {
    if (filters.tipo && p.tipo !== filters.tipo) return false;
    if (filters.status && p.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Monitoramento de Workflows"
        subtitle="Dashboard de processos ativos, controle de prazos, SLA, gargalos e pendências"
        requisitos={['6.1.10', '6.1.24']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Workflows Ativos" value={mockProcessos.length} icon={Activity} color="blue" />
        <StatsCard label="SLA Excedido" value={slaExcedido} icon={AlertTriangle} color="rose" />
        <StatsCard label="Tempo Médio" value="5.2 dias" icon={Clock} color="purple" />
        <StatsCard label="Taxa de Conclusão" value="89%" icon={TrendingUp} color="emerald" trend="3% vs. mês anterior" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funil de processos */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800">Processos por Etapa (Funil)</h3>
          </div>
          <div className="p-5 space-y-3">
            {etapasFunil.map((etapa) => (
              <div key={etapa.nome} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-32 text-right truncate">{etapa.nome}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden">
                  <div
                    className={`${etapa.cor} h-full rounded-full flex items-center justify-end pr-2 transition-all`}
                    style={{ width: `${Math.max((etapa.qtd / 50) * 100, 15)}%` }}
                  >
                    <span className="text-xs font-bold text-white">{etapa.qtd}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tempo médio por etapa */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800">Tempo Médio por Etapa (dias)</h3>
          </div>
          <div className="p-5">
            <div className="flex items-end justify-around h-48 gap-3">
              {tempoMedioPorEtapa.map((item) => (
                <div key={item.etapa} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-bold text-slate-700 mb-1">{item.dias}d</span>
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all"
                    style={{ height: `${(item.dias / maxDias) * 80}%` }}
                  />
                  <span className="text-[10px] text-slate-500 mt-2 text-center leading-tight">{item.etapa}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Processos com SLA */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" /> Processos Ativos
          </h3>
        </div>
        <div className="px-5 pt-4">
          <FilterBar
            filters={[
              { key: 'tipo', label: 'Todos os Tipos', options: [
                { value: 'Contrato', label: 'Contrato' },
                { value: 'Convênio', label: 'Convênio' },
                { value: 'Planejamento', label: 'Planejamento' },
                { value: 'Fiscalização', label: 'Fiscalização' },
                { value: 'Bolsa Esportiva', label: 'Bolsa Esportiva' },
              ]},
              { key: 'status', label: 'Todos os Status', options: [
                { value: 'No prazo', label: 'No prazo' },
                { value: 'Atenção', label: 'Atenção' },
                { value: 'SLA Excedido', label: 'SLA Excedido' },
              ]},
            ]}
            filterValues={filters}
            onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 font-semibold">Processo</th>
                <th className="px-5 py-3 font-semibold">Tipo</th>
                <th className="px-5 py-3 font-semibold">Etapa Atual</th>
                <th className="px-5 py-3 font-semibold">Responsável</th>
                <th className="px-5 py-3 font-semibold">Dias na Etapa</th>
                <th className="px-5 py-3 font-semibold">SLA</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className={`hover:bg-slate-50/50 ${p.status === 'SLA Excedido' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-700">{p.numero}</td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{p.tipo}</span></td>
                  <td className="px-5 py-3 text-slate-700">{p.etapaAtual}</td>
                  <td className="px-5 py-3 text-slate-600">{p.responsavel}</td>
                  <td className="px-5 py-3">
                    <span className={`font-semibold ${p.diasNaEtapa > p.slaDias ? 'text-red-600' : 'text-slate-700'}`}>
                      {p.diasNaEtapa} dias
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{p.slaDias} dias</td>
                  <td className="px-5 py-3">
                    <StatusBadge
                      label={p.status}
                      variant={p.status === 'No prazo' ? 'success' : p.status === 'Atenção' ? 'warning' : 'danger'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
