import { useState } from 'react';
import { ArrowRightLeft, Plus, AlertTriangle, Clock } from 'lucide-react';
import { DataTable, type Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { FormModal, type FieldConfig } from '../shared/FormModal';
import { StatusBadge } from '../shared/StatusBadge';
import { StatsCard } from '../shared/StatsCard';
import { PageHeader } from '../shared/RequisitoTag';

interface Rota {
  id: number;
  tipoProcesso: string;
  origem: string;
  destino: string;
  prazoDias: number;
  escalonamento: boolean;
  despachoObrigatorio: boolean;
  justificativaObrigatoria: boolean;
  status: 'Ativa' | 'Inativa';
}

const mockRotas: Rota[] = [
  { id: 1, tipoProcesso: 'Contrato', origem: 'Analista', destino: 'Gestor', prazoDias: 5, escalonamento: true, despachoObrigatorio: true, justificativaObrigatoria: false, status: 'Ativa' },
  { id: 2, tipoProcesso: 'Contrato', origem: 'Gestor', destino: 'Jurídico', prazoDias: 10, escalonamento: true, despachoObrigatorio: true, justificativaObrigatoria: true, status: 'Ativa' },
  { id: 3, tipoProcesso: 'Contrato', origem: 'Jurídico', destino: 'Secretário', prazoDias: 5, escalonamento: false, despachoObrigatorio: true, justificativaObrigatoria: false, status: 'Ativa' },
  { id: 4, tipoProcesso: 'Convênio', origem: 'Analista', destino: 'Gestor', prazoDias: 7, escalonamento: true, despachoObrigatorio: true, justificativaObrigatoria: false, status: 'Ativa' },
  { id: 5, tipoProcesso: 'Convênio', origem: 'Gestor', destino: 'Financeiro', prazoDias: 15, escalonamento: true, despachoObrigatorio: true, justificativaObrigatoria: true, status: 'Ativa' },
  { id: 6, tipoProcesso: 'Fiscalização', origem: 'Fiscal', destino: 'Gestor', prazoDias: 3, escalonamento: true, despachoObrigatorio: false, justificativaObrigatoria: false, status: 'Ativa' },
  { id: 7, tipoProcesso: 'Bolsa Esportiva', origem: 'Analista', destino: 'Gestor', prazoDias: 5, escalonamento: false, despachoObrigatorio: true, justificativaObrigatoria: false, status: 'Ativa' },
  { id: 8, tipoProcesso: 'Planejamento', origem: 'Analista', destino: 'Gestor', prazoDias: 10, escalonamento: true, despachoObrigatorio: true, justificativaObrigatoria: true, status: 'Inativa' },
];

const formFields: FieldConfig[] = [
  { key: 'tipoProcesso', label: 'Tipo de Processo', type: 'select', required: true, options: [
    { value: 'Contrato', label: 'Contrato' },
    { value: 'Convênio', label: 'Convênio' },
    { value: 'Planejamento', label: 'Planejamento' },
    { value: 'Fiscalização', label: 'Fiscalização' },
    { value: 'Bolsa Esportiva', label: 'Bolsa Esportiva' },
  ]},
  { key: 'origem', label: 'Setor/Perfil de Origem', required: true, placeholder: 'Ex: Analista' },
  { key: 'destino', label: 'Setor/Perfil de Destino', required: true, placeholder: 'Ex: Gestor' },
  { key: 'prazoDias', label: 'Prazo (dias)', type: 'number', required: true, placeholder: '5' },
];

export function M05Tramitacao() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const filtered = mockRotas.filter((r) => {
    if (search && !r.origem.toLowerCase().includes(search.toLowerCase()) && !r.destino.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.tipoProcesso && r.tipoProcesso !== filters.tipoProcesso) return false;
    return true;
  });

  const columns: Column<Rota>[] = [
    { key: 'tipoProcesso', header: 'Tipo', render: (row) => (
      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{row.tipoProcesso}</span>
    )},
    { key: 'rota', header: 'Rota', render: (row) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-800">{row.origem}</span>
        <ArrowRightLeft className="w-4 h-4 text-slate-400" />
        <span className="font-medium text-slate-800">{row.destino}</span>
      </div>
    )},
    { key: 'prazoDias', header: 'Prazo', render: (row) => (
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-sm">{row.prazoDias} dias</span>
      </div>
    )},
    { key: 'escalonamento', header: 'Escalonamento', render: (row) => (
      <StatusBadge label={row.escalonamento ? 'Automático' : 'Manual'} variant={row.escalonamento ? 'info' : 'neutral'} />
    )},
    { key: 'despacho', header: 'Despacho', render: (row) => (
      <StatusBadge label={row.despachoObrigatorio ? 'Obrigatório' : 'Opcional'} variant={row.despachoObrigatorio ? 'warning' : 'neutral'} dot={false} />
    )},
    { key: 'justificativa', header: 'Justificativa', render: (row) => (
      <StatusBadge label={row.justificativaObrigatoria ? 'Obrigatória' : 'Opcional'} variant={row.justificativaObrigatoria ? 'info' : 'neutral'} dot={false} />
    )},
    { key: 'status', header: 'Status', render: (row) => (
      <StatusBadge label={row.status} variant={row.status === 'Ativa' ? 'success' : 'danger'} />
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Regras de Tramitação"
        subtitle="Rotas de tramitação por tipo de processo com escalonamento e prazos SLA"
        requisitos={['1.1.22', '1.1.24', '1.1.34']}
      >
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm border border-white/50">
          <Plus className="w-4 h-4" /> Nova Rota
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Rotas Ativas" value={mockRotas.filter((r) => r.status === 'Ativa').length} icon={ArrowRightLeft} color="blue" />
        <StatsCard label="Com Escalonamento" value={mockRotas.filter((r) => r.escalonamento).length} icon={AlertTriangle} color="amber" />
        <StatsCard label="Prazo Médio" value="7 dias" icon={Clock} color="purple" />
        <StatsCard label="Tipos Cobertos" value={new Set(mockRotas.map((r) => r.tipoProcesso)).size} icon={ArrowRightLeft} color="emerald" />
      </div>

      {/* Regra visual de escalonamento */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Regra de Escalonamento Automático</p>
            <p className="text-xs text-amber-700 mt-1">Quando o prazo é excedido, o sistema notifica o gestor responsável e escala automaticamente para o nível hierárquico superior. O processo fica marcado como "SLA Excedido" no monitoramento de workflows.</p>
          </div>
        </div>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por origem ou destino..."
        filters={[
          { key: 'tipoProcesso', label: 'Todos os Tipos', options: [
            { value: 'Contrato', label: 'Contrato' },
            { value: 'Convênio', label: 'Convênio' },
            { value: 'Planejamento', label: 'Planejamento' },
            { value: 'Fiscalização', label: 'Fiscalização' },
            { value: 'Bolsa Esportiva', label: 'Bolsa Esportiva' },
          ]},
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      />

      <DataTable
        columns={columns}
        data={filtered}
        actions={[
          { label: 'Editar Rota', onClick: () => {} },
          { label: 'Configurar Escalonamento', onClick: () => {} },
          { label: 'Desativar', onClick: () => {}, className: 'text-red-600' },
        ]}
      />

      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setFormValues({}); }}
        title="Nova Rota de Tramitação"
        fields={formFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setModalOpen(false); setFormValues({}); }}
      />
    </div>
  );
}
