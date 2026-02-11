import { useState } from 'react';
import { Users, Plus, UserCheck, UserX, Clock, Shield, Mail, Building2 } from 'lucide-react';
import { DataTable, type Column, type RowAction } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { FormModal, type FieldConfig } from '../shared/FormModal';
import { StatusBadge } from '../shared/StatusBadge';
import { StatsCard } from '../shared/StatsCard';
import { ExportButton } from '../shared/ExportButton';
import { PageHeader } from '../shared/RequisitoTag';

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  perfil: string;
  orgao: string;
  status: 'Ativo' | 'Inativo';
  ultimoAcesso: string;
}

const mockUsuarios: Usuario[] = [
  { id: 1, nome: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@sjc.sp.gov.br', perfil: 'Administrador', orgao: 'SEQV', status: 'Ativo', ultimoAcesso: '10/02/2026 14:32' },
  { id: 2, nome: 'Maria Santos', cpf: '234.567.890-11', email: 'maria.santos@sjc.sp.gov.br', perfil: 'Gestora', orgao: 'SEQV', status: 'Ativo', ultimoAcesso: '10/02/2026 13:15' },
  { id: 3, nome: 'Ana Costa', cpf: '345.678.901-22', email: 'ana.costa@sjc.sp.gov.br', perfil: 'Analista', orgao: 'SEQV', status: 'Ativo', ultimoAcesso: '10/02/2026 11:45' },
  { id: 4, nome: 'Pedro Lima', cpf: '456.789.012-33', email: 'pedro.lima@sjc.sp.gov.br', perfil: 'Fiscal', orgao: 'SEQV', status: 'Ativo', ultimoAcesso: '09/02/2026 16:20' },
  { id: 5, nome: 'Carlos Souza', cpf: '567.890.123-44', email: 'carlos.souza@sjc.sp.gov.br', perfil: 'Analista', orgao: 'SEQV', status: 'Inativo', ultimoAcesso: '05/01/2026 09:00' },
  { id: 6, nome: 'Fernanda Oliveira', cpf: '678.901.234-55', email: 'fernanda.oliveira@sjc.sp.gov.br', perfil: 'Gestora', orgao: 'SEQV', status: 'Ativo', ultimoAcesso: '10/02/2026 10:30' },
  { id: 7, nome: 'Ricardo Mendes', cpf: '789.012.345-66', email: 'ricardo.mendes@sjc.sp.gov.br', perfil: 'Fiscal', orgao: 'SEQV', status: 'Ativo', ultimoAcesso: '08/02/2026 15:45' },
  { id: 8, nome: 'Luciana Pereira', cpf: '890.123.456-77', email: 'luciana.pereira@sjc.sp.gov.br', perfil: 'Cidadão', orgao: 'Externo', status: 'Ativo', ultimoAcesso: '07/02/2026 12:00' },
];

const formFields: FieldConfig[] = [
  { key: 'nome', label: 'Nome Completo', required: true, placeholder: 'Nome do usuário' },
  { key: 'cpf', label: 'CPF', required: true, placeholder: '000.000.000-00' },
  { key: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'usuario@sjc.sp.gov.br' },
  { key: 'perfil', label: 'Perfil', type: 'select', required: true, options: [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Gestora', label: 'Gestor(a)' },
    { value: 'Analista', label: 'Analista' },
    { value: 'Fiscal', label: 'Fiscal' },
    { value: 'Cidadão', label: 'Cidadão' },
  ]},
  { key: 'orgao', label: 'Órgão', type: 'select', options: [
    { value: 'SEQV', label: 'SEQV — Sec. Esportes e Qualidade de Vida' },
    { value: 'Externo', label: 'Externo' },
  ]},
];

const perfilColors: Record<string, string> = {
  Administrador: 'bg-red-50 text-red-700 border-red-200',
  Gestora: 'bg-blue-50 text-blue-700 border-blue-200',
  Analista: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Fiscal: 'bg-amber-50 text-amber-700 border-amber-200',
  'Cidadão': 'bg-slate-50 text-slate-700 border-slate-200',
};

export function M01Usuarios() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const filtered = mockUsuarios.filter((u) => {
    if (search && !u.nome.toLowerCase().includes(search.toLowerCase()) && !u.cpf.includes(search)) return false;
    if (filters.perfil && u.perfil !== filters.perfil) return false;
    if (filters.status && u.status !== filters.status) return false;
    return true;
  });

  const columns: Column<Usuario>[] = [
    {
      key: 'nome',
      header: 'Usuário',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {row.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <p className="font-semibold text-slate-800">{row.nome}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3 text-slate-400" />
              <p className="text-xs text-slate-500">{row.email}</p>
            </div>
          </div>
        </div>
      ),
    },
    { key: 'cpf', header: 'CPF', render: (row) => (
      <span className="font-mono text-sm text-slate-600">{row.cpf}</span>
    )},
    { key: 'perfil', header: 'Perfil', render: (row) => (
      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium border ${perfilColors[row.perfil] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
        <Shield className="w-3 h-3" />
        {row.perfil}
      </span>
    )},
    { key: 'orgao', header: 'Órgão', render: (row) => (
      <span className="flex items-center gap-1.5 text-sm text-slate-600">
        <Building2 className="w-3.5 h-3.5 text-slate-400" />
        {row.orgao}
      </span>
    )},
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <StatusBadge label={row.status} variant={row.status === 'Ativo' ? 'success' : 'danger'} />
      ),
    },
    { key: 'ultimoAcesso', header: 'Último Acesso', render: (row) => (
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs text-slate-500">{row.ultimoAcesso}</span>
      </div>
    )},
  ];

  const actions: RowAction<Usuario>[] = [
    { label: 'Editar', onClick: () => {} },
    { label: 'Ver Permissões', onClick: () => {} },
    {
      label: 'Desativar',
      onClick: () => {},
      className: 'text-red-600',
    },
  ];

  const ativos = mockUsuarios.filter((u) => u.status === 'Ativo').length;
  const inativos = mockUsuarios.filter((u) => u.status === 'Inativo').length;
  const perfis = new Set(mockUsuarios.map((u) => u.perfil)).size;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão de Usuários"
        subtitle="Cadastro, controle de acesso e monitoramento de usuários da plataforma"
        requisitos={['1.1.28', '6.1.1']}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm border border-white/50"
        >
          <Plus className="w-4 h-4" /> Novo Usuário
        </button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total de Usuários" value={mockUsuarios.length} icon={Users} color="blue" />
        <StatsCard label="Ativos" value={ativos} icon={UserCheck} color="emerald" />
        <StatsCard label="Inativos" value={inativos} icon={UserX} color="rose" />
        <StatsCard label="Perfis Distintos" value={perfis} icon={Shield} color="purple" trend={`${ativos} online hoje`} trendUp />
      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nome ou CPF..."
        filters={[
          { key: 'perfil', label: 'Todos os Perfis', options: [
            { value: 'Administrador', label: 'Administrador' },
            { value: 'Gestora', label: 'Gestor(a)' },
            { value: 'Analista', label: 'Analista' },
            { value: 'Fiscal', label: 'Fiscal' },
            { value: 'Cidadão', label: 'Cidadão' },
          ]},
          { key: 'status', label: 'Todos os Status', options: [
            { value: 'Ativo', label: 'Ativo' },
            { value: 'Inativo', label: 'Inativo' },
          ]},
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      >
        <ExportButton />
      </FilterBar>

      {/* Table */}
      <DataTable columns={columns} data={filtered} actions={actions} pageSize={8} />

      {/* Modal */}
      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setFormValues({}); }}
        title="Novo Usuário"
        fields={formFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setModalOpen(false); setFormValues({}); }}
      />
    </div>
  );
}
