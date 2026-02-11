import { useState } from 'react';
import { ShieldAlert, Eye, FileText, Edit, Trash2, LogIn } from 'lucide-react';
import { DataTable, type Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { StatsCard } from '../shared/StatsCard';
import { ExportButton } from '../shared/ExportButton';
import { PageHeader } from '../shared/RequisitoTag';

interface LogEntry {
  id: number;
  dataHora: string;
  usuario: string;
  ip: string;
  acao: string;
  modulo: string;
  processo: string;
  detalhe: string;
  tipo: 'visualizacao' | 'criacao' | 'edicao' | 'exclusao' | 'login';
}

const tipoIcons: Record<string, { icon: typeof Eye; color: string }> = {
  visualizacao: { icon: Eye, color: 'text-blue-500' },
  criacao: { icon: FileText, color: 'text-emerald-500' },
  edicao: { icon: Edit, color: 'text-amber-500' },
  exclusao: { icon: Trash2, color: 'text-red-500' },
  login: { icon: LogIn, color: 'text-purple-500' },
};

const mockLogs: LogEntry[] = [
  { id: 1, dataHora: '10/02/2026 14:32:15', usuario: 'João Silva', ip: '192.168.1.100', acao: 'Login no sistema', modulo: 'Central', processo: '-', detalhe: 'Autenticação via Gov.br', tipo: 'login' },
  { id: 2, dataHora: '10/02/2026 14:30:05', usuario: 'Maria Santos', ip: '192.168.1.101', acao: 'Criou processo', modulo: 'Planejamento', processo: 'PROC-2026/0042', detalhe: 'Novo TR criado: Aquisição de equipamentos esportivos', tipo: 'criacao' },
  { id: 3, dataHora: '10/02/2026 14:28:45', usuario: 'Ana Costa', ip: '192.168.1.102', acao: 'Editou documento', modulo: 'Planejamento', processo: 'PROC-2026/0041', detalhe: 'ETP atualizado com novos valores de referência', tipo: 'edicao' },
  { id: 4, dataHora: '10/02/2026 14:25:00', usuario: 'Pedro Lima', ip: '192.168.1.103', acao: 'Registrou fiscalização', modulo: 'Fiscalização', processo: 'FISC-2026/0015', detalhe: 'Visita técnica no Centro Esportivo Vila Industrial', tipo: 'criacao' },
  { id: 5, dataHora: '10/02/2026 14:20:30', usuario: 'João Silva', ip: '192.168.1.100', acao: 'Visualizou relatório', modulo: 'Indicadores', processo: '-', detalhe: 'Relatório mensal de execução financeira', tipo: 'visualizacao' },
  { id: 6, dataHora: '10/02/2026 14:15:22', usuario: 'Maria Santos', ip: '192.168.1.101', acao: 'Aprovou pagamento', modulo: 'Financeiro', processo: 'PAG-2026/0088', detalhe: 'Repasse de R$ 45.000 para convênio esportivo', tipo: 'edicao' },
  { id: 7, dataHora: '10/02/2026 14:10:10', usuario: 'Fernanda Oliveira', ip: '192.168.1.104', acao: 'Desativou usuário', modulo: 'Central', processo: '-', detalhe: 'Usuário Carlos Souza desativado por inatividade', tipo: 'exclusao' },
  { id: 8, dataHora: '10/02/2026 14:05:00', usuario: 'Ana Costa', ip: '192.168.1.102', acao: 'Criou bolsista', modulo: 'Bolsistas', processo: 'BOL-2026/0120', detalhe: 'Nova bolsa: Programa Atleta do Futuro', tipo: 'criacao' },
  { id: 9, dataHora: '10/02/2026 13:58:33', usuario: 'Ricardo Mendes', ip: '192.168.1.105', acao: 'Upload de documento', modulo: 'Gestão Documental', processo: 'DOC-2026/0312', detalhe: 'Contrato digitalizado: CT-2026-005', tipo: 'criacao' },
  { id: 10, dataHora: '10/02/2026 13:50:15', usuario: 'Pedro Lima', ip: '10.0.0.50', acao: 'Login no sistema', modulo: 'Central', processo: '-', detalhe: 'Acesso via aplicativo móvel (campo)', tipo: 'login' },
  { id: 11, dataHora: '10/02/2026 13:45:00', usuario: 'João Silva', ip: '192.168.1.100', acao: 'Editou workflow', modulo: 'Workflows', processo: 'WF-CONTRATO', detalhe: 'Adicionou etapa de aprovação jurídica', tipo: 'edicao' },
  { id: 12, dataHora: '10/02/2026 13:30:22', usuario: 'Maria Santos', ip: '192.168.1.101', acao: 'Visualizou trilha', modulo: 'Auditoria', processo: 'PROC-2026/0038', detalhe: 'Consulta ao log do processo de convênio', tipo: 'visualizacao' },
];

export function M12Auditoria() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<'tabela' | 'timeline'>('tabela');

  const filtered = mockLogs.filter((log) => {
    if (search && !log.usuario.toLowerCase().includes(search.toLowerCase()) && !log.detalhe.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.modulo && log.modulo !== filters.modulo) return false;
    if (filters.tipo && log.tipo !== filters.tipo) return false;
    if (filters.usuario && log.usuario !== filters.usuario) return false;
    return true;
  });

  const columns: Column<LogEntry>[] = [
    { key: 'dataHora', header: 'Data/Hora', render: (row) => (
      <span className="text-xs font-mono text-slate-600">{row.dataHora}</span>
    )},
    { key: 'usuario', header: 'Usuário', render: (row) => (
      <div>
        <p className="font-medium text-slate-800 text-sm">{row.usuario}</p>
        <p className="text-xs text-slate-400 font-mono">{row.ip}</p>
      </div>
    )},
    { key: 'acao', header: 'Ação', render: (row) => {
      const t = tipoIcons[row.tipo];
      const Icon = t.icon;
      return (
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${t.color}`} />
          <span className="text-sm">{row.acao}</span>
        </div>
      );
    }},
    { key: 'modulo', header: 'Módulo', render: (row) => (
      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">{row.modulo}</span>
    )},
    { key: 'processo', header: 'Processo', render: (row) => (
      <span className="text-xs font-mono text-slate-500">{row.processo}</span>
    )},
    { key: 'detalhe', header: 'Detalhe', className: 'max-w-xs', render: (row) => (
      <span className="text-xs text-slate-500 line-clamp-2">{row.detalhe}</span>
    )},
  ];

  const usuarios = [...new Set(mockLogs.map((l) => l.usuario))];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trilha de Auditoria"
        subtitle="Logs imutáveis de todas as ações do sistema com rastreabilidade completa do processo"
        requisitos={['6.1.9', '6.1.16', '6.1.29']}
      >
        <div className="flex bg-white/20 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('tabela')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'tabela' ? 'bg-white text-slate-800 shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            Tabela
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'timeline' ? 'bg-white text-slate-800 shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            Timeline
          </button>
        </div>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Registros Hoje" value={mockLogs.length} icon={ShieldAlert} color="blue" />
        <StatsCard label="Usuários Ativos" value={usuarios.length} icon={ShieldAlert} color="emerald" />
        <StatsCard label="Ações de Edição" value={mockLogs.filter((l) => l.tipo === 'edicao').length} icon={ShieldAlert} color="amber" />
        <StatsCard label="Logins" value={mockLogs.filter((l) => l.tipo === 'login').length} icon={ShieldAlert} color="purple" />
      </div>

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por usuário ou detalhe..."
        filters={[
          { key: 'modulo', label: 'Todos os Módulos', options: [
            'Central', 'Planejamento', 'Financeiro', 'Fiscalização', 'Bolsistas', 'Indicadores', 'Gestão Documental', 'Workflows', 'Auditoria',
          ].map((m) => ({ value: m, label: m })) },
          { key: 'tipo', label: 'Tipo de Ação', options: [
            { value: 'login', label: 'Login' },
            { value: 'criacao', label: 'Criação' },
            { value: 'edicao', label: 'Edição' },
            { value: 'exclusao', label: 'Exclusão' },
            { value: 'visualizacao', label: 'Visualização' },
          ]},
          { key: 'usuario', label: 'Todos os Usuários', options: usuarios.map((u) => ({ value: u, label: u })) },
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      >
        <ExportButton />
      </FilterBar>

      {viewMode === 'tabela' ? (
        <DataTable columns={columns} data={filtered} pageSize={10} />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
            {filtered.map((log) => {
              const t = tipoIcons[log.tipo];
              const Icon = t.icon;
              return (
                <div key={log.id} className="relative pl-8">
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 flex items-center justify-center ${
                    log.tipo === 'exclusao' ? 'border-red-400' :
                    log.tipo === 'criacao' ? 'border-emerald-400' :
                    log.tipo === 'edicao' ? 'border-amber-400' :
                    log.tipo === 'login' ? 'border-purple-400' : 'border-blue-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      log.tipo === 'exclusao' ? 'bg-red-400' :
                      log.tipo === 'criacao' ? 'bg-emerald-400' :
                      log.tipo === 'edicao' ? 'bg-amber-400' :
                      log.tipo === 'login' ? 'bg-purple-400' : 'bg-blue-400'
                    }`} />
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${t.color}`} />
                        <span className="font-semibold text-slate-800 text-sm">{log.acao}</span>
                        <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">{log.modulo}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{log.dataHora}</span>
                    </div>
                    <p className="text-sm text-slate-600">{log.detalhe}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>{log.usuario}</span>
                      <span className="font-mono">{log.ip}</span>
                      {log.processo !== '-' && <span className="font-mono">{log.processo}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
