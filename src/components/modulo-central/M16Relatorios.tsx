import { useState } from 'react';
import { FileBarChart, Filter, TrendingUp, Users, Activity } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { ExportButton } from '../shared/ExportButton';
import { PageHeader } from '../shared/RequisitoTag';

type TipoRelatorio = 'processos_status' | 'tempo_tramitacao' | 'uso_modulo' | 'usuarios_ativos';

const tiposRelatorio = [
  { id: 'processos_status' as const, nome: 'Processos por Status', desc: 'Distribuição dos processos por status atual', icon: FileBarChart },
  { id: 'tempo_tramitacao' as const, nome: 'Tempo Médio de Tramitação', desc: 'Tempo médio de cada etapa por tipo de processo', icon: TrendingUp },
  { id: 'uso_modulo' as const, nome: 'Uso do Sistema por Módulo', desc: 'Acessos e operações por módulo do SIGCOP', icon: Activity },
  { id: 'usuarios_ativos' as const, nome: 'Usuários Ativos', desc: 'Relatório de atividade e acessos por usuário', icon: Users },
];

const dadosProcessosStatus = [
  { status: 'Em Elaboração', qtd: 15, cor: 'bg-blue-500' },
  { status: 'Em Aprovação', qtd: 12, cor: 'bg-purple-500' },
  { status: 'Em Análise Jurídica', qtd: 8, cor: 'bg-amber-500' },
  { status: 'Em Execução', qtd: 45, cor: 'bg-emerald-500' },
  { status: 'Concluído', qtd: 120, cor: 'bg-slate-400' },
  { status: 'Cancelado', qtd: 3, cor: 'bg-red-400' },
];

const dadosTempoTramitacao = [
  { tipo: 'Contrato', elaboracao: 8, aprovacao: 5, juridico: 10, financeiro: 7, assinatura: 3, total: 33 },
  { tipo: 'Convênio', elaboracao: 12, aprovacao: 7, juridico: 12, financeiro: 10, assinatura: 4, total: 45 },
  { tipo: 'Planejamento', elaboracao: 6, aprovacao: 4, juridico: 0, financeiro: 0, assinatura: 2, total: 12 },
  { tipo: 'Fiscalização', elaboracao: 3, aprovacao: 2, juridico: 0, financeiro: 0, assinatura: 1, total: 6 },
  { tipo: 'Bolsa Esportiva', elaboracao: 4, aprovacao: 3, juridico: 0, financeiro: 2, assinatura: 1, total: 10 },
];

const dadosUsoModulo = [
  { modulo: 'Central', acessos: 450, operacoes: 120, porcentagem: 22 },
  { modulo: 'Planejamento', acessos: 380, operacoes: 210, porcentagem: 19 },
  { modulo: 'Execução', acessos: 320, operacoes: 180, porcentagem: 16 },
  { modulo: 'Bolsistas', acessos: 280, operacoes: 95, porcentagem: 14 },
  { modulo: 'Financeiro', acessos: 250, operacoes: 140, porcentagem: 12 },
  { modulo: 'Fiscalização', acessos: 180, operacoes: 75, porcentagem: 9 },
  { modulo: 'Indicadores', acessos: 90, operacoes: 30, porcentagem: 4 },
  { modulo: 'Governança', acessos: 50, operacoes: 15, porcentagem: 2 },
  { modulo: 'Territorial', acessos: 30, operacoes: 20, porcentagem: 1.5 },
  { modulo: 'IA', acessos: 20, operacoes: 8, porcentagem: 0.5 },
];

const dadosUsuariosAtivos = [
  { nome: 'João Silva', perfil: 'Administrador', acessos30d: 85, ultimoAcesso: '10/02/2026 14:32', operacoes: 320 },
  { nome: 'Maria Santos', perfil: 'Gestora', acessos30d: 72, ultimoAcesso: '10/02/2026 13:15', operacoes: 280 },
  { nome: 'Ana Costa', perfil: 'Analista', acessos30d: 68, ultimoAcesso: '10/02/2026 11:45', operacoes: 410 },
  { nome: 'Pedro Lima', perfil: 'Fiscal', acessos30d: 45, ultimoAcesso: '09/02/2026 16:20', operacoes: 190 },
  { nome: 'Fernanda Oliveira', perfil: 'Gestora', acessos30d: 60, ultimoAcesso: '10/02/2026 10:30', operacoes: 250 },
  { nome: 'Ricardo Mendes', perfil: 'Fiscal', acessos30d: 38, ultimoAcesso: '08/02/2026 15:45', operacoes: 145 },
];

export function M16Relatorios() {
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoRelatorio>('processos_status');
  const [periodo, setPeriodo] = useState('mensal');

  const maxQtd = Math.max(...dadosProcessosStatus.map((d) => d.qtd));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios Administrativos"
        subtitle="Relatórios gerenciais com exportação de documentos e dados em múltiplos formatos"
        requisitos={['6.1.33']}
      >
        <ExportButton />
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Relatórios Gerados" value={28} icon={FileBarChart} color="blue" />
        <StatsCard label="Processos Ativos" value={80} icon={TrendingUp} color="emerald" />
        <StatsCard label="Usuários Ativos" value={6} icon={Users} color="purple" />
        <StatsCard label="Módulos em Uso" value={10} icon={Activity} color="cyan" />
      </div>

      {/* Seleção de tipo de relatório */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tiposRelatorio.map((tipo) => (
          <button
            key={tipo.id}
            onClick={() => setTipoSelecionado(tipo.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              tipoSelecionado === tipo.id
                ? 'border-blue-400 bg-blue-50 shadow-md ring-2 ring-blue-100'
                : 'border-slate-200 bg-white hover:shadow-md hover:border-slate-300'
            }`}
          >
            <tipo.icon className={`w-5 h-5 mb-2 ${tipoSelecionado === tipo.id ? 'text-blue-600' : 'text-slate-400'}`} />
            <p className={`font-semibold text-sm ${tipoSelecionado === tipo.id ? 'text-blue-800' : 'text-slate-700'}`}>{tipo.nome}</p>
            <p className="text-xs text-slate-500 mt-0.5">{tipo.desc}</p>
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-slate-400" />
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="semanal">Última Semana</option>
          <option value="mensal">Último Mês</option>
          <option value="trimestral">Último Trimestre</option>
          <option value="anual">Último Ano</option>
        </select>
      </div>

      {/* Conteúdo do Relatório */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {tipoSelecionado === 'processos_status' && (
          <div className="p-6">
            <h3 className="font-semibold text-slate-800 mb-6">Processos por Status</h3>
            <div className="space-y-4 mb-6">
              {dadosProcessosStatus.map((d) => (
                <div key={d.status} className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 w-36 text-right">{d.status}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                    <div
                      className={`${d.cor} h-full rounded-full flex items-center justify-end pr-3 transition-all`}
                      style={{ width: `${Math.max((d.qtd / maxQtd) * 100, 8)}%` }}
                    >
                      <span className="text-xs font-bold text-white">{d.qtd}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right text-xs text-slate-400">Total: {dadosProcessosStatus.reduce((s, d) => s + d.qtd, 0)} processos</div>
          </div>
        )}

        {tipoSelecionado === 'tempo_tramitacao' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Tipo</th>
                  <th className="px-5 py-3 font-semibold text-center">Elaboração</th>
                  <th className="px-5 py-3 font-semibold text-center">Aprovação</th>
                  <th className="px-5 py-3 font-semibold text-center">Jurídico</th>
                  <th className="px-5 py-3 font-semibold text-center">Financeiro</th>
                  <th className="px-5 py-3 font-semibold text-center">Assinatura</th>
                  <th className="px-5 py-3 font-semibold text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dadosTempoTramitacao.map((d) => (
                  <tr key={d.tipo} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-medium text-slate-800">{d.tipo}</td>
                    <td className="px-5 py-3 text-center">{d.elaboracao}d</td>
                    <td className="px-5 py-3 text-center">{d.aprovacao}d</td>
                    <td className="px-5 py-3 text-center">{d.juridico > 0 ? `${d.juridico}d` : '-'}</td>
                    <td className="px-5 py-3 text-center">{d.financeiro > 0 ? `${d.financeiro}d` : '-'}</td>
                    <td className="px-5 py-3 text-center">{d.assinatura}d</td>
                    <td className="px-5 py-3 text-center font-bold text-blue-700">{d.total}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tipoSelecionado === 'uso_modulo' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Módulo</th>
                  <th className="px-5 py-3 font-semibold">Acessos</th>
                  <th className="px-5 py-3 font-semibold">Operações</th>
                  <th className="px-5 py-3 font-semibold">% do Total</th>
                  <th className="px-5 py-3 font-semibold">Distribuição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dadosUsoModulo.map((d) => (
                  <tr key={d.modulo} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-medium text-slate-800">{d.modulo}</td>
                    <td className="px-5 py-3">{d.acessos}</td>
                    <td className="px-5 py-3">{d.operacoes}</td>
                    <td className="px-5 py-3">{d.porcentagem}%</td>
                    <td className="px-5 py-3">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${d.porcentagem * 4}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tipoSelecionado === 'usuarios_ativos' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Usuário</th>
                  <th className="px-5 py-3 font-semibold">Perfil</th>
                  <th className="px-5 py-3 font-semibold">Acessos (30d)</th>
                  <th className="px-5 py-3 font-semibold">Operações</th>
                  <th className="px-5 py-3 font-semibold">Último Acesso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dadosUsuariosAtivos.map((d) => (
                  <tr key={d.nome} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-medium text-slate-800">{d.nome}</td>
                    <td className="px-5 py-3"><span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{d.perfil}</span></td>
                    <td className="px-5 py-3 font-semibold">{d.acessos30d}</td>
                    <td className="px-5 py-3">{d.operacoes}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{d.ultimoAcesso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
