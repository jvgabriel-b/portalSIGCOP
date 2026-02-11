import { useState } from 'react';
import { ClipboardList, Plus, Settings } from 'lucide-react';
import { DataTable, type Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { FormModal, type FieldConfig } from '../shared/FormModal';
import { StatusBadge } from '../shared/StatusBadge';
import { StatsCard } from '../shared/StatsCard';
import { PageHeader } from '../shared/RequisitoTag';

interface TipoProcesso {
  id: number;
  nome: string;
  codigo: string;
  camposObrigatorios: number;
  slaPadrao: number;
  workflowVinculado: string;
  status: 'Ativo' | 'Inativo';
  processos: number;
  reabertura: boolean;
  encerramento: 'manual' | 'automatico';
  motivoEncerramento: boolean;
}

const mockTipos: TipoProcesso[] = [
  { id: 1, nome: 'Contrato', codigo: 'CT', camposObrigatorios: 12, slaPadrao: 30, workflowVinculado: 'Fluxo Contratual', status: 'Ativo', processos: 45, reabertura: true, encerramento: 'manual', motivoEncerramento: true },
  { id: 2, nome: 'Convênio', codigo: 'CV', camposObrigatorios: 15, slaPadrao: 45, workflowVinculado: 'Fluxo Convênio', status: 'Ativo', processos: 23, reabertura: true, encerramento: 'manual', motivoEncerramento: true },
  { id: 3, nome: 'Planejamento (DOD/ETP/TR)', codigo: 'PL', camposObrigatorios: 8, slaPadrao: 20, workflowVinculado: 'Fluxo Planejamento', status: 'Ativo', processos: 67, reabertura: false, encerramento: 'automatico', motivoEncerramento: false },
  { id: 4, nome: 'Fiscalização', codigo: 'FS', camposObrigatorios: 10, slaPadrao: 15, workflowVinculado: 'Fluxo Fiscalização', status: 'Ativo', processos: 38, reabertura: false, encerramento: 'automatico', motivoEncerramento: true },
  { id: 5, nome: 'Bolsa Esportiva', codigo: 'BE', camposObrigatorios: 9, slaPadrao: 10, workflowVinculado: 'Fluxo Benefício', status: 'Ativo', processos: 120, reabertura: true, encerramento: 'manual', motivoEncerramento: false },
  { id: 6, nome: 'Aditivo Contratual', codigo: 'AD', camposObrigatorios: 7, slaPadrao: 20, workflowVinculado: 'Fluxo Aditivo', status: 'Inativo', processos: 8, reabertura: false, encerramento: 'automatico', motivoEncerramento: true },
];

const formFields: FieldConfig[] = [
  { key: 'nome', label: 'Nome do Tipo', required: true, placeholder: 'Ex: Contrato' },
  { key: 'codigo', label: 'Código', required: true, placeholder: 'Ex: CT' },
  { key: 'slaPadrao', label: 'SLA Padrão (dias)', type: 'number', required: true, placeholder: '30' },
  { key: 'workflowVinculado', label: 'Workflow Vinculado', type: 'select', options: [
    { value: 'Fluxo Contratual', label: 'Fluxo Contratual' },
    { value: 'Fluxo Convênio', label: 'Fluxo Convênio' },
    { value: 'Fluxo Planejamento', label: 'Fluxo Planejamento' },
    { value: 'Fluxo Fiscalização', label: 'Fluxo Fiscalização' },
    { value: 'Fluxo Benefício', label: 'Fluxo Benefício' },
  ]},
  { key: 'encerramento', label: 'Tipo de Encerramento', type: 'select', options: [
    { value: 'manual', label: 'Manual — usuário encerra' },
    { value: 'automatico', label: 'Automático — ao concluir workflow' },
  ]},
  { key: 'reabertura', label: 'Permitir Reabertura', type: 'select', options: [
    { value: 'sim', label: 'Sim — reabertura com justificativa' },
    { value: 'nao', label: 'Não — encerramento definitivo' },
  ]},
];

export function M03TiposProcesso() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const filtered = mockTipos.filter((t) =>
    !search || t.nome.toLowerCase().includes(search.toLowerCase()) || t.codigo.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<TipoProcesso>[] = [
    { key: 'nome', header: 'Tipo de Processo', render: (row) => (
      <div>
        <p className="font-semibold text-slate-800">{row.nome}</p>
        <p className="text-xs text-slate-400">Código: {row.codigo}</p>
      </div>
    )},
    { key: 'slaPadrao', header: 'SLA', render: (row) => (
      <span className="text-sm font-medium">{row.slaPadrao} dias</span>
    )},
    { key: 'workflowVinculado', header: 'Workflow', render: (row) => (
      <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">{row.workflowVinculado}</span>
    )},
    { key: 'camposObrigatorios', header: 'Campos', render: (row) => (
      <span className="text-sm">{row.camposObrigatorios} campos</span>
    )},
    { key: 'processos', header: 'Processos', render: (row) => (
      <span className="text-sm font-semibold text-slate-700">{row.processos}</span>
    )},
    { key: 'encerramento', header: 'Encerramento', render: (row) => (
      <div>
        <StatusBadge label={row.encerramento === 'automatico' ? 'Automático' : 'Manual'} variant={row.encerramento === 'automatico' ? 'info' : 'neutral'} />
        {row.motivoEncerramento && <p className="text-[10px] text-slate-400 mt-0.5">Motivo obrigatório</p>}
      </div>
    )},
    { key: 'reabertura', header: 'Reabertura', render: (row) => (
      <StatusBadge label={row.reabertura ? 'Permitida' : 'Bloqueada'} variant={row.reabertura ? 'success' : 'neutral'} />
    )},
    { key: 'status', header: 'Status', render: (row) => (
      <StatusBadge label={row.status} variant={row.status === 'Ativo' ? 'success' : 'danger'} />
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tipos de Processo"
        subtitle="Parametrização dos tipos de processo, SLAs e workflows vinculados"
        requisitos={['1.1.11', '1.1.31', '1.1.32']}
      >
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm border border-white/50">
          <Plus className="w-4 h-4" /> Novo Tipo
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Tipos Ativos" value={mockTipos.filter((t) => t.status === 'Ativo').length} icon={ClipboardList} color="blue" />
        <StatsCard label="Total de Processos" value={mockTipos.reduce((s, t) => s + t.processos, 0)} icon={ClipboardList} color="emerald" />
        <StatsCard label="SLA Médio" value="24 dias" icon={Settings} color="purple" />
      </div>

      <FilterBar search={search} onSearchChange={setSearch} searchPlaceholder="Buscar por nome ou código..." />

      <DataTable
        columns={columns}
        data={filtered}
        actions={[
          { label: 'Editar', onClick: () => {} },
          { label: 'Configurar Campos', onClick: () => {} },
          { label: 'Desativar', onClick: () => {}, className: 'text-red-600' },
        ]}
      />

      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setFormValues({}); }}
        title="Novo Tipo de Processo"
        fields={formFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setModalOpen(false); setFormValues({}); }}
      />
    </div>
  );
}
