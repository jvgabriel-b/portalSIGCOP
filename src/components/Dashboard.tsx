import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LogOut, User, Server, Target, Map,
  Activity, Menu, X, Search,
  FileSignature, Wallet, FileCheck,
  BarChart3, Bell, Lock, Brain, TrendingUp, Shield,
  Download, QrCode, CheckCircle, AlertCircle as AlertIcon, Clock, Users as UsersIcon,
  ArrowUpRight, Eye, Download as DownloadIcon, FileText, Zap,
  DollarSign, Percent, Briefcase, MapPin
} from 'lucide-react';

type ModulePage =
  | 'dashboard'
  | 'central'
  | 'cadastro'
  | 'planejamento'
  | 'execucao'
  | 'financeiro'
  | 'aditivos'
  | 'fiscalizacao'
  | 'comunicacao'
  | 'indicadores'
  | 'governanca'
  | 'territorial'
  | 'inteligencia_artificial';

// Dados simulados dos Serviços - 12 Módulos SIGCOP
const quickServices = [
  {
    id: 'central',
    title: 'Central de Administração Contratual',
    desc: 'Gerenciar o ciclo completo dos contratos e convênios',
    icon: Server,
    color: 'text-blue-700',
    bg: 'bg-blue-50'
  },
  {
    id: 'cadastro',
    title: 'Cadastro e Classificação',
    desc: 'Padronizar e classificar contratos por tipo, objeto e fonte',
    icon: FileCheck,
    color: 'text-green-700',
    bg: 'bg-green-50'
  },
  {
    id: 'planejamento',
    title: 'Planejamento e Formalização',
    desc: 'Elaborar minutas, termos de referência e pareceres',
    icon: Target,
    color: 'text-purple-700',
    bg: 'bg-purple-50'
  },
  {
    id: 'execucao',
    title: 'Execução e Monitoramento',
    desc: 'Acompanhar entregas, metas e obrigações contratuais',
    icon: TrendingUp,
    color: 'text-orange-700',
    bg: 'bg-orange-50'
  },
  {
    id: 'financeiro',
    title: 'Financeiro e Prestação de Contas',
    desc: 'Controlar repasses, saldos e gerar relatórios financeiros',
    icon: Wallet,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50'
  },
  {
    id: 'aditivos',
    title: 'Aditivos e Reprogramações',
    desc: 'Gerenciar alterações contratuais e reprogramações',
    icon: FileSignature,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50'
  },
  {
    id: 'fiscalizacao',
    title: 'Fiscalização e Auditoria',
    desc: 'Registrar fiscalizações, visitas técnicas e pareceres',
    icon: Shield,
    color: 'text-blue-700',
    bg: 'bg-blue-50'
  },
  {
    id: 'comunicacao',
    title: 'Comunicação e Notificações',
    desc: 'Automatizar notificações, ofícios e comunicações',
    icon: Bell,
    color: 'text-cyan-700',
    bg: 'bg-cyan-50'
  },
  {
    id: 'indicadores',
    title: 'Indicadores e Inteligência Analítica',
    desc: 'Gerar dashboards, KPIs e relatórios estratégicos',
    icon: BarChart3,
    color: 'text-pink-700',
    bg: 'bg-pink-50'
  },
  {
    id: 'governanca',
    title: 'Governança e Transparência',
    desc: 'Publicar dados, garantir rastreabilidade e conformidade',
    icon: Lock,
    color: 'text-amber-700',
    bg: 'bg-amber-50'
  },
  {
    id: 'territorial',
    title: 'Aplicativo Móvel e Inteligência Territorial',
    desc: 'Registros de campo com geolocalização e mapas interativos',
    icon: Map,
    color: 'text-teal-700',
    bg: 'bg-teal-50'
  },
  {
    id: 'inteligencia_artificial',
    title: 'IA para Triagem Documental',
    desc: 'Classificação automática de documentos e sugestões',
    icon: Brain,
    color: 'text-violet-700',
    bg: 'bg-violet-50'
  }
];

const pageMap: ModulePage[] = [
  'central', 'cadastro', 'planejamento', 'execucao', 'financeiro',
  'aditivos', 'fiscalizacao', 'comunicacao', 'indicadores', 'governanca',
  'territorial', 'inteligencia_artificial'
];

// Mock data para contratos
const mockContratos = [
  { id: 1, numero: 'CT-2024-001', descricao: 'Fornecimento de Equipamentos de TI', valor: 150000, status: 'Ativo', dataInicio: '2024-01-15', dataFim: '2025-01-15', convenente: 'Secretaria de Educação' },
  { id: 2, numero: 'CT-2024-002', descricao: 'Serviços de Consultoria', valor: 75000, status: 'Ativo', dataInicio: '2024-02-01', dataFim: '2024-12-31', convenente: 'Secretaria de Saúde' },
  { id: 3, numero: 'CT-2023-045', descricao: 'Obras de Infraestrutura', valor: 500000, status: 'Em Execução', dataInicio: '2023-06-01', dataFim: '2025-06-01', convenente: 'Secretaria de Obras' },
  { id: 4, numero: 'CT-2024-003', descricao: 'Manutenção Predial', valor: 45000, status: 'Finalizado', dataInicio: '2024-01-10', dataFim: '2024-06-10', convenente: 'Secretaria de Patrimônio' },
];

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<ModulePage>('dashboard');
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);


  const renderContent = () => {
    if (currentPage === 'dashboard') {
      return (
        <div className="space-y-8">
          {/* Header da Dashboard */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Bem-vindo, {user?.full_name}
            </h2>
            <p className="text-slate-600">
              {searchQuery 
                ? `Resultados para "${searchQuery}"`
                : 'Visão geral do sistema e serviços disponíveis'}
            </p>
          </div>

          {/* 1. Grid de Módulos Principais */}
          <section>
             <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-700" />
                Módulos de Gestão
             </h3>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickServices.map((service, index) => {
                  return (
                    <button
                      key={service.id}
                      onClick={() => setCurrentPage(pageMap[index])}
                      className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all text-left group relative overflow-hidden"
                    >
                      {/* Detalhe decorativo prateado/vermelho no topo */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-start gap-4">
                        {/* Ícone com gradiente Azul */}
                        <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md shadow-blue-900/20">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              }
            </div>
          </section>

          {/* 2. Dashboards BI com KPIs e Notificações */}
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-700" />
              Dashboards de Gestão
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Painel 1: Indicadores Principais */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-lg p-6">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  Indicadores Principais
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* KPI 1 */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-slate-700 text-sm font-medium">Taxa de Execução</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">78.4%</p>
                      </div>
                      <div className="bg-slate-200 p-2 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-slate-700" />
                      </div>
                    </div>
                    <div className="w-full bg-slate-300 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-700 h-full rounded-full" style={{width: '78.4%'}}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">↑ 2.3% vs. mês anterior</p>
                  </div>

                  {/* KPI 2 */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-slate-700 text-sm font-medium">Contratos em Risco</p>
                        <p className="text-2xl font-bold text-amber-900 mt-1">3</p>
                      </div>
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <AlertIcon className="w-5 h-5 text-amber-900" />
                      </div>
                    </div>
                    <div className="bg-slate-300 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-900 h-full rounded-full" style={{width: '15%'}}></div>
                    </div>
                    <p className="text-xs text-amber-900 mt-2">Requerem atenção imediata</p>
                  </div>

                  {/* KPI 3 */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-slate-700 text-sm font-medium">Repasses Realizados</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">R$ 12.8M</p>
                      </div>
                      <div className="bg-slate-200 p-2 rounded-lg">
                        <DollarSign className="w-5 h-5 text-slate-700" />
                      </div>
                    </div>
                    <div className="bg-slate-300 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-900 h-full rounded-full" style={{width: '64%'}}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">De R$ 20M orçados</p>
                  </div>

                  {/* KPI 4 */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-slate-700 text-sm font-medium">Documentos Pendentes</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">12</p>
                      </div>
                      <div className="bg-slate-200 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-slate-700" />
                      </div>
                    </div>
                    <div className="bg-slate-300 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">Para análise e aprovação</p>
                  </div>
                </div>

                {/* Mini Gráfico Simulado */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-300">
                  <p className="text-xs font-semibold text-slate-700 mb-3">Evolução de Contratos (últimos 6 meses)</p>
                  <div className="flex items-end justify-around h-20 gap-2">
                    {[45, 52, 58, 62, 70, 78].map((height, i) => (
                      <div key={i} className="flex-1 bg-slate-600 rounded-t-sm" style={{height: `${height}%`}}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Painel 2: Notificações */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-700" />
                  Notificações
                </h4>

                <div className="space-y-3">
                  {/* Notificação 1 - Crítica */}
                  <div className="bg-amber-50 border-l-4 border-amber-900 p-3 rounded-r-lg hover:bg-amber-100 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <AlertIcon className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-amber-900 text-sm">Contrato vencendo</p>
                        <p className="text-xs text-amber-800 mt-0.5">CT-2024-001 vence em 5 dias</p>
                        <p className="text-xs text-amber-700 mt-1">Há 2 horas</p>
                      </div>
                    </div>
                  </div>

                  {/* Notificação 2 - Aviso */}
                  <div className="bg-orange-50 border-l-4 border-orange-900 p-3 rounded-r-lg hover:bg-orange-100 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-orange-900 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-orange-900 text-sm">Pagamento pendente</p>
                        <p className="text-xs text-orange-800 mt-0.5">Empenho EMP-2024-45 aguarda processamento</p>
                        <p className="text-xs text-orange-700 mt-1">Há 1 hora</p>
                      </div>
                    </div>
                  </div>

                  {/* Notificação 3 - Informação */}
                  <div className="bg-blue-50 border-l-4 border-blue-900 p-3 rounded-r-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-blue-900 text-sm">Auditoria concluída</p>
                        <p className="text-xs text-blue-800 mt-0.5">Fiscalização AUD-2024-03 aprovada</p>
                        <p className="text-xs text-blue-700 mt-1">Há 3 horas</p>
                      </div>
                    </div>
                  </div>

                  {/* Notificação 4 - Informação */}
                  <div className="bg-slate-100 border-l-4 border-slate-700 p-3 rounded-r-lg hover:bg-slate-200 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 text-sm">Documento processado</p>
                        <p className="text-xs text-slate-700 mt-0.5">4 documentos classificados por IA</p>
                        <p className="text-xs text-slate-600 mt-1">Há 5 horas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 pt-4 border-t border-slate-300 text-center text-blue-900 hover:text-blue-950 text-sm font-medium transition-colors">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          </section>

          {/* 3. Atividades Recentes  */}
          {!searchQuery && (
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <Activity className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Linha do Tempo</h3>
                  <p className="text-slate-600 text-sm">
                    Nenhuma atividade registrada recentemente no sistema.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Conteúdo dos Módulos Internos
    const ContratosTable = () => (
      <div className="space-y-6">
        {/* Header com Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Contratos Ativos</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <Briefcase className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">↑ 3 novos este mês</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Valor Total</p>
                <p className="text-2xl font-bold">R$ 1.8M</p>
              </div>
              <DollarSign className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">Alocado e ativo</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Em Execução</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <Clock className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-3">Acompanhamento ativo</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Conformidade</p>
                <p className="text-3xl font-bold">92%</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Todos os regulamentos</p>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="flex gap-3">
          <input type="text" placeholder="Buscar por número ou descrição..." className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">+ Novo</button>
        </div>

        {/* Tabela de Contratos */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Contrato</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Convenente</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-700">Valor</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Execução</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockContratos.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">{c.numero}</p>
                      <p className="text-xs text-slate-500">{c.descricao}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{c.convenente}</td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-slate-800">R$ {(c.valor/1000).toFixed(0)}k</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{ width: `${c.status === 'Ativo' ? 45 : c.status === 'Em Execução' ? 68 : 100}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-600">{c.status === 'Ativo' ? 45 : c.status === 'Em Execução' ? 68 : 100}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${c.status === 'Ativo' ? 'bg-green-100 text-green-700' : c.status === 'Em Execução' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Ativo' ? 'bg-green-600' : c.status === 'Em Execução' ? 'bg-yellow-600' : 'bg-slate-400'}`}></span>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 hover:bg-slate-200 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    const CadastroForm = () => (
      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Registrar Novo Contrato</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Número do Contrato</label>
              <input type="text" placeholder="CT-2024-XXX" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
              <input type="text" placeholder="Descrição do contrato ou convênio" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Início</label>
                <input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Fim</label>
                <input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Cadastrar Contrato</button>
          </div>
        </div>
      </div>
    );

    const PlanejamentoContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Em Elaboração</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <FileText className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Minutas ativas</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Pendentes de Aprovação</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-3">Requerem ação urgente</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Aprovados</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">Finalizados este mês</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Pipeline de Formalização</h3>
          <div className="space-y-4">
            {[
              { titulo: 'Minuta CT-2024-001', status: 'Em Revisão', progresso: 60, revisor: 'Dra. Maria Santos', dataInicio: '18/11/2024' },
              { titulo: 'Parecer CT-2024-002', status: 'Aguardando Aprovação', progresso: 75, revisor: 'Dr. João Silva', dataInicio: '15/11/2024' },
              { titulo: 'Termo de Referência CT-2023-045', status: 'Finalizado', progresso: 100, revisor: 'Adm. Carlos Costa', dataInicio: '10/10/2024' },
              { titulo: 'Aditivo CT-2024-003', status: 'Em Revisão', progresso: 45, revisor: 'Dra. Ana Paula', dataInicio: '20/11/2024' },
            ].map((doc, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-slate-800">{doc.titulo}</p>
                    <p className="text-xs text-slate-500 mt-1">Revisor: <span className="font-medium">{doc.revisor}</span> • Iniciado: {doc.dataInicio}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-4 ${doc.status === 'Em Revisão' ? 'bg-blue-100 text-blue-700' : doc.status === 'Aguardando Aprovação' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {doc.status}
                  </span>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all" style={{ width: `${doc.progresso}%` }}></div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 w-12 text-right">{doc.progresso}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-4">
            <p className="font-semibold text-slate-800 mb-3">Próximos Prazos</p>
            <div className="space-y-2">
              {[
                { titulo: 'Parecer CT-2024-002', prazo: '25/11/2024' },
                { titulo: 'Minuta CT-2024-001', prazo: '28/11/2024' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <p className="text-sm text-slate-700">{item.titulo}</p>
                  <p className="text-sm font-semibold text-red-600">{item.prazo}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200 p-4">
            <p className="font-semibold text-slate-800 mb-3">Ações Rápidas</p>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium">Criar Nova Minuta</button>
              <button className="w-full px-3 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium">Enviar para Aprovação</button>
            </div>
          </div>
        </div>
      </div>
    );

    const ExecucaoContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Contratos em Execução</p>
            <p className="text-3xl font-bold text-blue-700">3</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Meta Atingida</p>
            <p className="text-3xl font-bold text-green-700">85%</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Atrasos Detectados</p>
            <p className="text-3xl font-bold text-orange-700">2</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Cronograma</p>
            <p className="text-3xl font-bold text-purple-700">No Prazo</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Monitoramento de Entregas</h3>
          <div className="space-y-4">
            {mockContratos.filter(c => c.status !== 'Finalizado').map((c) => (
              <div key={c.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-slate-800">{c.numero} - {c.descricao}</p>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Acompanhando</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">Prazo: {c.dataFim}</p>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-green-600 h-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">68% concluído</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const FinanceiroContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Repassado</p>
                <p className="text-2xl font-bold">R$ 770k</p>
              </div>
              <ArrowUpRight className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-emerald-100 mt-3">↑ 12% vs mês anterior</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Saldo Livre</p>
                <p className="text-2xl font-bold">R$ 230k</p>
              </div>
              <Wallet className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">De R$ 1M alocado</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Taxa de Execução</p>
                <p className="text-2xl font-bold">77%</p>
              </div>
              <Percent className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Acima da meta</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Pagamentos</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-orange-100 mt-3">Este mês</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Fluxo de Pagamentos (Últimos 30 dias)</h3>
            <div className="space-y-3">
              {[
                { contrato: 'CT-2024-002', convenente: 'Secretaria de Saúde', valor: 18750, data: '20/11/2024', status: 'Liberado', tipo: 'Parcela 2' },
                { contrato: 'CT-2024-001', convenente: 'Secretaria de Educação', valor: 37500, data: '15/11/2024', status: 'Liberado', tipo: 'Parcela 3' },
                { contrato: 'CT-2023-045', convenente: 'Secretaria de Obras', valor: 125000, data: '10/11/2024', status: 'Liberado', tipo: 'Parcela 8' },
                { contrato: 'CT-2024-003', convenente: 'Secretaria de Patrimônio', valor: 11250, data: '05/11/2024', status: 'Liberado', tipo: 'Parcela 1' },
              ].map((pag, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-emerald-50/50 hover:border-emerald-300 transition-all group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-800">{pag.contrato}</p>
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">{pag.tipo}</span>
                    </div>
                    <p className="text-sm text-slate-600">{pag.convenente}</p>
                    <p className="text-xs text-slate-500 mt-1">{pag.data}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">R$ {(pag.valor/1000).toFixed(1)}k</p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold inline-block mt-1">✓ {pag.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Distribuição Orçamentária</h3>
              <div className="space-y-3">
                {[
                  { area: 'Educação', valor: 450, percent: 45 },
                  { area: 'Saúde', valor: 320, percent: 32 },
                  { area: 'Obras', valor: 150, percent: 15 },
                  { area: 'Patrimônio', valor: 80, percent: 8 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-slate-700 font-medium">{item.area}</p>
                      <p className="text-xs text-slate-600">R$ {item.valor}k</p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-400 to-green-600 h-full" style={{ width: `${item.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Próximos Pagamentos</h3>
              <div className="space-y-2">
                {[
                  { data: '25/11', valor: 'R$ 45k', contrato: 'CT-2024-001' },
                  { data: '28/11', valor: 'R$ 28.5k', contrato: 'CT-2024-002' },
                ].map((pag, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-blue-100">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{pag.contrato}</p>
                      <p className="text-xs text-slate-500">{pag.data}</p>
                    </div>
                    <p className="font-semibold text-blue-600">{pag.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <button className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <DownloadIcon className="w-4 h-4" />
                Extrair Relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    const AditivosContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Total de Aditivos</p>
                <p className="text-3xl font-bold">18</p>
              </div>
              <FileSignature className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-indigo-100 mt-3">Registrados no sistema</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Aprovados</p>
                <p className="text-3xl font-bold">14</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">Implementados</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Pendentes</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <Clock className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-3">Aguardando aprovação</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Valor Adicional</p>
                <p className="text-2xl font-bold">R$ 280k</p>
              </div>
              <DollarSign className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Agregado aos contratos</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">+ Novo Aditivo</button>
          <input type="text" placeholder="Buscar aditivo..." className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Contrato</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Tipo de Aditivo</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Modificação</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">Data</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-700">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { contrato: 'CT-2024-001', tipo: 'Extensão de Prazo', modificacao: '+60 dias', data: '10/11/2024', status: 'Aprovado' },
                { contrato: 'CT-2023-045', tipo: 'Aumento de Valor', modificacao: '+R$ 125k', data: '08/11/2024', status: 'Aprovado' },
                { contrato: 'CT-2024-002', tipo: 'Alteração de Escopo', modificacao: 'Revisão', data: '05/11/2024', status: 'Aguardando' },
                { contrato: 'CT-2024-003', tipo: 'Extensão de Prazo', modificacao: '+30 dias', data: '01/11/2024', status: 'Rascunho' },
              ].map((aditivo, idx) => (
                <tr key={idx} className="hover:bg-indigo-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-indigo-600 font-semibold">{aditivo.contrato}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{aditivo.tipo}</td>
                  <td className="px-6 py-4 text-slate-600">{aditivo.modificacao}</td>
                  <td className="px-6 py-4 text-slate-600">{aditivo.data}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                      aditivo.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                      aditivo.status === 'Aguardando' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        aditivo.status === 'Aprovado' ? 'bg-green-600' :
                        aditivo.status === 'Aguardando' ? 'bg-yellow-600' :
                        'bg-slate-400'
                      }`}></span>
                      {aditivo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 hover:bg-slate-200 rounded-full opacity-0 group-hover:opacity-100 transition-all" title="Visualizar">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    const FiscalizacaoContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Fiscalizações</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <Shield className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">Este ano</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Conformes</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">86% de aprovação</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Não-Conformes</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-3">Requerem ação</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Auditorias</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <FileText className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Completas</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">+ Registrar Fiscalização</button>
          <input type="text" placeholder="Buscar fiscalização..." className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Registros Recentes de Fiscalização</h3>
            <div className="space-y-4">
              {[
                { contrato: 'CT-2024-001', data: '20/11/2024', hora: '14:30', auditor: 'Ana Silva', parecer: 'Conforme', observacoes: 'Todas as obrigações em dia' },
                { contrato: 'CT-2023-045', data: '18/11/2024', hora: '10:15', auditor: 'Carlos Santos', parecer: 'Não-Conforme', observacoes: 'Atraso na entrega de documentos' },
                { contrato: 'CT-2024-002', data: '15/11/2024', hora: '16:00', auditor: 'Maria Oliveira', parecer: 'Conforme', observacoes: 'Execução dentro do planejado' },
                { contrato: 'CT-2024-003', data: '12/11/2024', hora: '09:45', auditor: 'João Santos', parecer: 'Conforme', observacoes: 'Sem pendências' },
              ].map((reg, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-slate-800">{reg.contrato}</p>
                      <p className="text-sm text-slate-600">Auditor: <span className="font-medium">{reg.auditor}</span></p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-4 ${reg.parecer === 'Conforme' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {reg.parecer}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{reg.observacoes}</p>
                  <p className="text-xs text-slate-500">{reg.data} • {reg.hora}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Critérios de Conformidade</h3>
              <div className="space-y-3">
                {[
                  { critério: 'Documentação Completa', status: true },
                  { critério: 'Prazos Atendidos', status: true },
                  { critério: 'Qualidade de Entrega', status: true },
                  { critério: 'Conformidade Legal', status: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.status ? 'bg-green-500' : 'bg-yellow-500'}`}>
                      <span className="text-white text-xs font-bold">{item.status ? '✓' : '!'}</span>
                    </div>
                    <span className="text-sm text-slate-700">{item.critério}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Pendências Detectadas</h3>
              <div className="space-y-2">
                {[
                  'CT-2023-045: Documentos atrasados',
                  'CT-2024-002: Relatório técnico pendente',
                ].map((pend, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-orange-100">
                    <AlertIcon className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700">{pend}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Gerar Relatório Completo
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    const ComunicacaoContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-100 text-sm font-medium mb-1">Enviadas</p>
                <p className="text-3xl font-bold">247</p>
              </div>
              <Bell className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-cyan-100 mt-3">Este mês</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Lidas</p>
                <p className="text-3xl font-bold">227</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">92% de leitura</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Não Lidas</p>
                <p className="text-3xl font-bold">20</p>
              </div>
              <AlertIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-3">Requerem atenção</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Tempo Médio</p>
                <p className="text-2xl font-bold">2.4h</p>
              </div>
              <Clock className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">Para leitura</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium">+ Nova Notificação</button>
          <input type="text" placeholder="Buscar notificação..." className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Histórico de Notificações</h3>
            <div className="space-y-3">
              {[
                { titulo: 'Contrato CT-2024-001 vence em 30 dias', tipo: 'alerta', data: '20/11/2024 14:35', remetente: 'Sistema', lido: true },
                { titulo: 'Pagamento confirmado para CT-2024-002', tipo: 'sucesso', data: '19/11/2024 10:20', remetente: 'Financeiro', lido: true },
                { titulo: 'Fiscalização pendente: CT-2023-045', tipo: 'aviso', data: '18/11/2024 09:15', remetente: 'Auditoria', lido: false },
                { titulo: 'Novo aditivo aprovado em CT-2024-003', tipo: 'sucesso', data: '17/11/2024 16:45', remetente: 'Administração', lido: true },
                { titulo: 'Documentação faltante para CT-2024-002', tipo: 'alerta', data: '16/11/2024 11:30', remetente: 'Planejamento', lido: false },
              ].map((notif, idx) => (
                <div key={idx} className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${notif.lido ? 'border-slate-200 bg-white' : 'border-cyan-300 bg-cyan-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${
                      notif.tipo === 'alerta' ? 'bg-red-500' :
                      notif.tipo === 'sucesso' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className={`font-medium ${notif.lido ? 'text-slate-800' : 'text-slate-900 font-semibold'}`}>{notif.titulo}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          notif.tipo === 'alerta' ? 'bg-red-100 text-red-700' :
                          notif.tipo === 'sucesso' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {notif.tipo}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{notif.remetente} • {notif.data}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Canais de Comunicação</h3>
              <div className="space-y-2">
                {[
                  { canal: 'Email', status: 'Ativo', msgs: '156' },
                  { canal: 'SMS', status: 'Ativo', msgs: '48' },
                  { canal: 'Push Notification', status: 'Ativo', msgs: '43' },
                ].map((canal, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-cyan-100">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{canal.canal}</p>
                      <p className="text-xs text-slate-500">{canal.msgs} mensagens</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">{canal.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Modos de Contato</h3>
              <div className="space-y-2">
                {[
                  { tipo: 'Telefone (24h)', valor: '+55 11 3333-3333' },
                  { tipo: 'Email', valor: 'sigcop@governo.sp.gov.br' },
                  { tipo: 'Chat', valor: 'Disponível 8h-18h' },
                ].map((contato, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-blue-100">
                    <p className="text-xs font-medium text-slate-700">{contato.tipo}</p>
                    <p className="text-xs text-slate-600 mt-1">{contato.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <button className="w-full px-4 py-2 border border-cyan-300 text-cyan-700 rounded-lg hover:bg-cyan-50 transition-colors text-sm font-medium">
                Configurar Preferências
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    const IndicadoresContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-2">Taxa de Execução</p>
            <p className="text-3xl font-bold text-blue-600">73%</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: '73%' }}></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-2">Conformidade</p>
            <p className="text-3xl font-bold text-green-600">87%</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-green-600 h-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-2">Adimplência</p>
            <p className="text-3xl font-bold text-purple-600">95%</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-purple-600 h-full" style={{ width: '95%' }}></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-2">Satisfação</p>
            <p className="text-3xl font-bold text-pink-600">4.2/5</p>
            <p className="text-xs text-slate-600 mt-2">Média de avaliações</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">KPIs por Módulo</h3>
          <div className="space-y-4">
            {[
              { nome: 'Cadastro & Classificação', valor: 92 },
              { nome: 'Planejamento', valor: 85 },
              { nome: 'Execução', valor: 78 },
              { nome: 'Financeiro', valor: 88 },
            ].map((kpi, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-slate-700">{kpi.nome}</p>
                  <p className="text-sm font-bold text-slate-800">{kpi.valor}%</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: `${kpi.valor}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const GovernancaContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Documentos Publicados</p>
            <p className="text-3xl font-bold text-blue-600">156</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Auditorias Realizadas</p>
            <p className="text-3xl font-bold text-purple-600">12</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Score de Transparência</p>
            <p className="text-3xl font-bold text-green-600">94%</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Conformidade Regulatória</h3>
          <div className="space-y-3">
            {[
              { norma: 'Lei de Responsabilidade Fiscal', status: 'Conforme' },
              { norma: 'LGPD', status: 'Conforme' },
              { norma: 'Decreto de Transparência', status: 'Conforme' },
              { norma: 'Normas de Licitação', status: 'Parcial' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                <p className="font-medium text-slate-800">{item.norma}</p>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${item.status === 'Conforme' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const TerritorialContent = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-teal-100 text-sm font-medium mb-1">Registros de Campo</p>
                <p className="text-3xl font-bold">324</p>
              </div>
              <MapPin className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-teal-100 mt-3">Geolocalização ativa</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Usuários Móveis</p>
                <p className="text-3xl font-bold">47</p>
              </div>
              <UsersIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-emerald-100 mt-3">Online agora</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-100 text-sm font-medium mb-1">Evidências Coletadas</p>
                <p className="text-3xl font-bold">1.2k</p>
              </div>
              <Zap className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-cyan-100 mt-3">Imagens + Documentos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Mapa Interativo de Atividades</h3>
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg border border-teal-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Mapa com 324 marcadores ativos</p>
                <p className="text-sm text-slate-500 mt-1">São Paulo, SP • Raio de 25km</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="px-3 py-2 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium">Ver em Mapa Completo</button>
              <button className="px-3 py-2 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium">Exportar Dados</button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Baixar App Móvel</h3>
              <p className="text-sm text-slate-600 mb-4">Acesse SIGCOP em qualquer lugar com geolocalização e captura de evidências multimídia.</p>

              {/* QR Code Simulado */}
              <div className="bg-white rounded-lg p-3 mb-4 border border-slate-200">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-900 to-slate-800 rounded flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className={`absolute ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}
                        style={{
                          width: '40px',
                          height: '40px',
                          left: `${(i % 5) * 20}%`,
                          top: `${Math.floor(i / 5) * 20}%`
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center z-10">
                    <QrCode className="w-16 h-16 text-white mx-auto mb-2" />
                    <p className="text-white text-xs font-bold">QR CODE</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  App Store (iOS)
                </button>
                <button className="w-full px-3 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Play Store (Android)
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-slate-700"><span className="font-semibold">Versão:</span> 2.4.1</p>
                <p className="text-xs text-slate-700 mt-1"><span className="font-semibold">Atualizado:</span> 18/11/2024</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Recursos do App</h3>
              <div className="space-y-2">
                {[
                  'Geolocalização em tempo real',
                  'Captura de fotos/vídeos',
                  'Formulários offline',
                  'Sincronização automática',
                  'Relatórios gráficos',
                ].map((recurso, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-slate-700">{recurso}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Últimos Registros de Campo</h3>
          <div className="space-y-3">
            {[
              { local: 'Secretaria de Obras - Rua A, 123', usuario: 'Paulo Costa', hora: '14:35', evidencias: 'Foto + Doc' },
              { local: 'Prefeitura - Avenida Principal, 456', usuario: 'Maria Silva', hora: '13:20', evidencias: 'Vídeo + Foto' },
              { local: 'Câmara Municipal - Praça Central, 789', usuario: 'João Oliveira', hora: '11:45', evidencias: '3 Fotos' },
            ].map((reg, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-blue-50 transition-colors">
                <div>
                  <p className="font-medium text-slate-800">{reg.local}</p>
                  <p className="text-xs text-slate-500">Por: {reg.usuario} • {reg.hora}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-semibold">{reg.evidencias}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const moduleContent: any = {
      central: { title: 'Central de Administração Contratual', icon: Server, content: <ContratosTable /> },
      cadastro: { title: 'Cadastro e Classificação', icon: FileCheck, content: <CadastroForm /> },
      planejamento: { title: 'Planejamento e Formalização', icon: Target, content: <PlanejamentoContent /> },
      execucao: { title: 'Execução e Monitoramento', icon: TrendingUp, content: <ExecucaoContent /> },
      financeiro: { title: 'Financeiro e Prestação de Contas', icon: Wallet, content: <FinanceiroContent /> },
      aditivos: { title: 'Aditivos e Reprogramações', icon: FileSignature, content: <AditivosContent /> },
      fiscalizacao: { title: 'Fiscalização e Auditoria', icon: Shield, content: <FiscalizacaoContent /> },
      comunicacao: { title: 'Comunicação e Notificações', icon: Bell, content: <ComunicacaoContent /> },
      indicadores: { title: 'Indicadores e Inteligência Analítica', icon: BarChart3, content: <IndicadoresContent /> },
      governanca: { title: 'Governança e Transparência', icon: Lock, content: <GovernancaContent /> },
      territorial: { title: 'Aplicativo Móvel e Inteligência Territorial', icon: Map, content: <TerritorialContent /> },
      inteligencia_artificial: { title: 'IA para Triagem Documental', icon: Brain, content:
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-600 mb-1">Documentos Analisados</p>
              <p className="text-3xl font-bold text-blue-600">2,456</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-600 mb-1">Taxa de Acurácia</p>
              <p className="text-3xl font-bold text-green-600">96.8%</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-600 mb-1">Risco Detectado</p>
              <p className="text-3xl font-bold text-red-600">34</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Classificações Automáticas Recentes</h3>
            <div className="space-y-3">
              {[
                { doc: 'CT-2024-001_Minuta.pdf', classe: 'Documento Contratual', confianca: 98 },
                { doc: 'CT-2024-002_Parecer.pdf', classe: 'Parecer Técnico', confianca: 94 },
                { doc: 'CT-2023-045_Anexo.pdf', classe: 'Especificação Técnica', confianca: 91 },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-slate-800">{item.doc}</p>
                      <p className="text-sm text-slate-600">{item.classe}</p>
                    </div>
                    <p className="text-sm font-semibold text-green-600">{item.confianca}%</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-green-600 h-full" style={{ width: `${item.confianca}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      },
    };

    const currentModule = moduleContent[currentPage] || { title: 'Módulo', icon: Server, content: null };
    const Icon = currentModule.icon;

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            ← Voltar ao Início
          </button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-3 rounded-lg shadow-lg shadow-blue-900/20">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{currentModule.title}</h2>
        </div>
        {currentModule.content}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
           <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
           <div className="text-slate-500 font-medium">Carregando sistema...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          /> 
          <div className="relative w-80 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <span className="font-bold text-slate-900 text-lg">Menu Principal</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-300">
              <div className="space-y-1 px-3">
                <button
                   onClick={() => { setCurrentPage('dashboard'); setIsSidebarOpen(false); }}
                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentPage === 'dashboard' ? 'bg-blue-50 text-blue-800 border border-blue-100 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <Activity className="w-4 h-4" />
                  Painel de Controle
                </button>

                <div className="pt-4 pb-2 px-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Módulos</div>

                {quickServices.map((service, index) => {
                   return (
                     <button
                       key={service.id}
                       onClick={() => { setCurrentPage(pageMap[index]); setIsSidebarOpen(false); }}
                       className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${currentPage === pageMap[index] ? 'bg-blue-50 text-blue-800 border border-blue-100 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                     >
                       <div className="p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                         <service.icon className={`w-4 h-4 transition-colors ${currentPage === pageMap[index] ? 'text-blue-700' : 'text-slate-400 group-hover:text-blue-700'}`} />
                       </div>
                       <div className="flex-1 text-left">
                         <div className="font-medium">{service.title}</div>
                         <div className="text-xs text-slate-500">{service.desc}</div>
                       </div>
                     </button>
                   );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button onClick={signOut} className="flex items-center gap-2 text-slate-700 hover:text-white hover:bg-blue-700 text-sm font-medium transition-all w-full justify-center border border-slate-300 bg-white py-2 rounded-lg shadow-sm">
                <LogOut className="w-4 h-4" />
                Encerrar Sessão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3 border-l border-slate-300 pl-4">
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-2 rounded-lg shadow-sm">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">SIGCOP</h1>
                  <p className="text-[10px] text-blue-700 uppercase tracking-widest font-bold">{user?.organization || 'Sistema de Gestão'}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-700 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 transition-all sm:text-sm"
                  placeholder="Buscar módulos ou serviços..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                 <Search className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-white hover:bg-slate-50 transition-colors rounded-full border border-slate-200 shadow-sm cursor-pointer group">
                <div className="bg-blue-100 p-1 rounded-full group-hover:bg-blue-200 transition-colors">
                  <User className="w-4 h-4 text-blue-700" />
                </div>
                <div className="pr-2">
                  <p className="text-sm font-bold text-slate-800">{user?.full_name?.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>
    </div>
  );
}