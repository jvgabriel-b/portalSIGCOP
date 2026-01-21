import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LogOut, User, Server, Target, Map,
  Activity, Menu, X, Search,
  Wallet, Package, Bell,
  BarChart3, Lock, Brain, TrendingUp, Shield,
  Download, QrCode, CheckCircle, AlertCircle as AlertIcon, Clock, Users as UsersIcon,
  ArrowUpRight, Eye, Download as DownloadIcon, FileText, Zap,
  DollarSign, Percent, Briefcase, MapPin, GraduationCap
} from 'lucide-react';

type ModulePage =
  | 'dashboard'
  | 'central'
  | 'planejamento'
  | 'execucao'
  | 'bolsistas'
  | 'almoxarifado'
  | 'financeiro'
  | 'fiscalizacao'
  | 'indicadores'
  | 'governanca'
  | 'territorial'
  | 'inteligencia_artificial';

// Dados simulados dos Serviços - 11 Módulos SIGCOP conforme TR
const quickServices = [
  {
    id: 'central',
    title: 'Módulo Central da Plataforma Digital',
    desc: 'Infraestrutura em nuvem, segurança, controle de acessos e trilhas de auditoria',
    icon: Server,
    color: 'text-blue-700',
    bg: 'bg-blue-50'
  },
  {
    id: 'planejamento',
    title: 'Módulo de Planejamento e Formalização',
    desc: 'DOD, ETP, Termos de Referência, minutas e pareceres com controle de versões',
    icon: Target,
    color: 'text-purple-700',
    bg: 'bg-purple-50'
  },
  {
    id: 'execucao',
    title: 'Módulo de Execução e Monitoramento',
    desc: 'Execução física e administrativa, metas, prazos, cronogramas e alertas',
    icon: TrendingUp,
    color: 'text-orange-700',
    bg: 'bg-orange-50'
  },
  {
    id: 'bolsistas',
    title: 'Módulo de Gestão de Bolsistas',
    desc: 'Cadastro e acompanhamento de bolsistas via web e app, com notificações',
    icon: GraduationCap,
    color: 'text-green-700',
    bg: 'bg-green-50'
  },
  {
    id: 'almoxarifado',
    title: 'Módulo de Gestão de Almoxarifado',
    desc: 'Controle de materiais, movimentações, estoque mínimo e relatórios',
    icon: Package,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50'
  },
  {
    id: 'financeiro',
    title: 'Módulo Financeiro e Prestação de Contas',
    desc: 'Repasses, pagamentos, saldos e execução financeira com relatórios auditáveis',
    icon: Wallet,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50'
  },
  {
    id: 'fiscalizacao',
    title: 'Módulo de Fiscalização e Auditoria',
    desc: 'Fiscalizações, visitas técnicas, checklists, evidências e pareceres',
    icon: Shield,
    color: 'text-cyan-700',
    bg: 'bg-cyan-50'
  },
  {
    id: 'indicadores',
    title: 'Módulo de Indicadores e Inteligência Analítica',
    desc: 'Dashboards, KPIs e relatórios estratégicos para tomada de decisão',
    icon: BarChart3,
    color: 'text-pink-700',
    bg: 'bg-pink-50'
  },
  {
    id: 'governanca',
    title: 'Módulo de Governança e Transparência',
    desc: 'Rastreabilidade dos atos, transparência ativa, LAI e LGPD',
    icon: Lock,
    color: 'text-amber-700',
    bg: 'bg-amber-50'
  },
  {
    id: 'territorial',
    title: 'Módulo Aplicativo Móvel e Inteligência Territorial',
    desc: 'Geolocalização, evidências multimídia, operação offline e mapas interativos',
    icon: Map,
    color: 'text-teal-700',
    bg: 'bg-teal-50'
  },
  {
    id: 'inteligencia_artificial',
    title: 'Módulo de IA para Triagem Documental',
    desc: 'Classificação automática, identificação de pendências e riscos',
    icon: Brain,
    color: 'text-violet-700',
    bg: 'bg-violet-50'
  }
];

const pageMap: ModulePage[] = [
  'central', 'planejamento', 'execucao', 'bolsistas', 'almoxarifado',
  'financeiro', 'fiscalizacao', 'indicadores', 'governanca',
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
    // Módulo Central da Plataforma Digital - TR 6.1
    // Infraestrutura SaaS, segurança, controle de acessos, trilhas de auditoria, APIs, governança
    const CentralContent = () => (
      <div className="space-y-6">
        {/* KPIs do Módulo Central */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Disponibilidade</p>
                <p className="text-3xl font-bold">99.97%</p>
              </div>
              <Server className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-3">SLA: 99.9% garantido</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Usuários Ativos</p>
                <p className="text-3xl font-bold">178</p>
              </div>
              <UsersIcon className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-3">De 200 licenciados</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">APIs Integradas</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Zap className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-3">RESTful documentadas</p>
          </div>
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-100 text-sm font-medium mb-1">Logs de Auditoria</p>
                <p className="text-3xl font-bold">24.5k</p>
              </div>
              <Shield className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-xs text-amber-100 mt-3">Últimos 30 dias</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Painel de Gestão de Usuários */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-600" />
              Gestão de Usuários e Perfis
            </h3>
            <div className="space-y-4">
              {[
                { perfil: 'Administrador', usuarios: 5, permissoes: 'Acesso total', status: 'Ativo' },
                { perfil: 'Gestor de Contratos', usuarios: 15, permissoes: 'Planejamento, Execução, Financeiro', status: 'Ativo' },
                { perfil: 'Fiscal', usuarios: 28, permissoes: 'Fiscalização, Auditoria, Territorial', status: 'Ativo' },
                { perfil: 'Analista Financeiro', usuarios: 12, permissoes: 'Financeiro, Prestação de Contas', status: 'Ativo' },
                { perfil: 'Técnico de Bolsas', usuarios: 18, permissoes: 'Bolsistas, Almoxarifado', status: 'Ativo' },
                { perfil: 'Consulta', usuarios: 100, permissoes: 'Visualização apenas', status: 'Ativo' },
              ].map((perfil, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-blue-50/50 hover:border-blue-300 transition-all">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{perfil.perfil}</p>
                    <p className="text-sm text-slate-600">{perfil.permissoes}</p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="font-bold text-blue-600">{perfil.usuarios}</p>
                      <p className="text-xs text-slate-500">usuários</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">{perfil.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">+ Novo Perfil</button>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-4">
            {/* Status de Segurança */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                Segurança e Criptografia
              </h3>
              <div className="space-y-2">
                {[
                  { item: 'Criptografia em Trânsito (TLS 1.3)', status: true },
                  { item: 'Criptografia em Repouso (AES-256)', status: true },
                  { item: 'Autenticação Gov.br', status: true },
                  { item: 'Backup Automático Diário', status: true },
                  { item: 'Conformidade LGPD', status: true },
                ].map((seg, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-green-100">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-slate-700">{seg.item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status das Integrações */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                Integrações via API
              </h3>
              <div className="space-y-2">
                {[
                  { sistema: 'SICONV', status: 'Online' },
                  { sistema: 'ComprasNet', status: 'Online' },
                  { sistema: 'Contratos.gov.br', status: 'Online' },
                  { sistema: 'Sistema Contábil', status: 'Online' },
                  { sistema: 'Portal Transparência', status: 'Online' },
                ].map((api, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-blue-100">
                    <span className="text-xs text-slate-700">{api.sistema}</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">{api.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações Administrativas */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Administração</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Configurações Globais</button>
                <button className="w-full px-3 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">Gerenciar Integrações</button>
                <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Exportar Logs</button>
              </div>
            </div>
          </div>
        </div>

        {/* Trilha de Auditoria */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Trilha de Auditoria Recente
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Data/Hora</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Usuário</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Ação</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Módulo</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { data: '21/01/2026 14:32', usuario: 'maria.silva', acao: 'Aprovou documento', modulo: 'Planejamento', ip: '192.168.1.45' },
                  { data: '21/01/2026 14:28', usuario: 'joao.santos', acao: 'Registrou fiscalização', modulo: 'Fiscalização', ip: '192.168.1.78' },
                  { data: '21/01/2026 14:15', usuario: 'ana.costa', acao: 'Cadastrou bolsista', modulo: 'Bolsistas', ip: '192.168.1.23' },
                  { data: '21/01/2026 14:02', usuario: 'carlos.lima', acao: 'Registrou saída material', modulo: 'Almoxarifado', ip: '192.168.1.91' },
                  { data: '21/01/2026 13:55', usuario: 'admin', acao: 'Alterou perfil de acesso', modulo: 'Central', ip: '192.168.1.1' },
                ].map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{log.data}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{log.usuario}</td>
                    <td className="px-4 py-3 text-slate-700">{log.acao}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{log.modulo}</span></td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    // Módulo de Gestão de Bolsistas - TR 6.4
    // Web responsivo, autocadastro, upload documentos, frequência, notificações, LGPD
    const BolsistasContent = () => (
      <div className="space-y-6">
        {/* KPIs do Módulo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Total Bolsistas</p>
                <p className="text-2xl font-bold">1.247</p>
              </div>
              <GraduationCap className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-2">Cadastrados</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Ativos</p>
                <p className="text-2xl font-bold">892</p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-2">Recebendo bolsa</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Pendentes</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Clock className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-2">Documentação</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Autocadastros</p>
                <p className="text-2xl font-bold">78</p>
              </div>
              <UsersIcon className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-2">Este mês</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Valor Mensal</p>
                <p className="text-2xl font-bold">R$ 445k</p>
              </div>
              <DollarSign className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-emerald-100 mt-2">Total em bolsas</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">+ Novo Bolsista</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Enviar Notificação</button>
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Importar Lista</button>
          <input type="text" placeholder="Buscar bolsista por nome ou CPF..." className="flex-1 min-w-[200px] px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Bolsistas */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Bolsistas - Acompanhamento
            </h3>
            <div className="space-y-3">
              {[
                { nome: 'Maria Silva Santos', cpf: '***.***.***-12', programa: 'Bolsa Atleta', valor: 'R$ 500', status: 'Ativo', modalidade: 'Natação', etapa: 'Em dia', docs: 'Completo', freq: '95%' },
                { nome: 'João Pedro Costa', cpf: '***.***.***-45', programa: 'Bolsa Formação', valor: 'R$ 400', status: 'Ativo', modalidade: 'Futebol', etapa: 'Em dia', docs: 'Completo', freq: '88%' },
                { nome: 'Ana Beatriz Oliveira', cpf: '***.***.***-78', programa: 'Bolsa Atleta', valor: 'R$ 600', status: 'Pendente', modalidade: 'Atletismo', etapa: 'Análise Docs', docs: 'Pendente', freq: '-' },
                { nome: 'Carlos Eduardo Lima', cpf: '***.***.***-90', programa: 'Bolsa Técnico', valor: 'R$ 800', status: 'Ativo', modalidade: 'Vôlei', etapa: 'Em dia', docs: 'Completo', freq: '100%' },
                { nome: 'Fernanda Souza', cpf: '***.***.***-23', programa: 'Bolsa Atleta', valor: 'R$ 500', status: 'Autocadastro', modalidade: 'Ginástica', etapa: 'Validação', docs: 'Em análise', freq: '-' },
              ].map((bolsista, idx) => (
                <div key={idx} className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                  bolsista.status === 'Pendente' || bolsista.status === 'Autocadastro' ? 'border-yellow-300 bg-yellow-50/30' : 'border-slate-200 hover:border-green-300'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-800">{bolsista.nome}</p>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{bolsista.modalidade}</span>
                      </div>
                      <p className="text-sm text-slate-600">{bolsista.programa} • CPF: {bolsista.cpf}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{bolsista.valor}/mês</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold inline-block mt-1 ${
                        bolsista.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                        bolsista.status === 'Autocadastro' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{bolsista.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs">
                    <span className="text-slate-600">Etapa: <span className="font-medium text-slate-800">{bolsista.etapa}</span></span>
                    <span className="text-slate-600">Docs: <span className={`font-medium ${bolsista.docs === 'Completo' ? 'text-green-600' : 'text-yellow-600'}`}>{bolsista.docs}</span></span>
                    {bolsista.freq !== '-' && (
                      <span className="text-slate-600">Frequência: <span className="font-medium text-blue-600">{bolsista.freq}</span></span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Detalhes</button>
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Documentos</button>
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Histórico</button>
                    {(bolsista.status === 'Pendente' || bolsista.status === 'Autocadastro') && (
                      <button className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Validar</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-4">
            {/* Programas de Bolsa */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Programas de Bolsa</h3>
              <div className="space-y-2">
                {[
                  { programa: 'Bolsa Atleta', qtd: 456, valor: 'R$ 228k' },
                  { programa: 'Bolsa Formação', qtd: 312, valor: 'R$ 124.8k' },
                  { programa: 'Bolsa Técnico', qtd: 124, valor: 'R$ 99.2k' },
                ].map((prog, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-green-100">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{prog.programa}</p>
                      <p className="text-xs text-slate-500">{prog.valor}/mês</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{prog.qtd}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Autocadastros Pendentes */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-blue-600" />
                Autocadastros (Web/App)
              </h3>
              <div className="space-y-2">
                {[
                  { nome: 'Fernanda Souza', data: 'Hoje 10:30', status: 'Validação' },
                  { nome: 'Roberto Silva', data: 'Ontem 15:45', status: 'Docs pendentes' },
                  { nome: 'Juliana Costa', data: '19/01/2026', status: 'Validação' },
                ].map((auto, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-blue-100">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{auto.nome}</p>
                      <p className="text-xs text-slate-500">{auto.data}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">{auto.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notificações Enviadas */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-600" />
                Notificações Recentes
              </h3>
              <div className="space-y-2">
                {[
                  { msg: 'Lembrete de frequência enviado', qtd: 45, data: 'Hoje' },
                  { msg: 'Documentos pendentes', qtd: 12, data: 'Ontem' },
                  { msg: 'Pagamento processado', qtd: 892, data: '15/01' },
                ].map((notif, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-purple-100">
                    <p className="text-xs text-slate-700">{notif.msg}</p>
                    <p className="text-xs text-slate-500 mt-1">{notif.qtd} destinatários • {notif.data}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Ações</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Gerar Folha de Pagamento
                </button>
                <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                  Relatório de Frequência
                </button>
                <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                  Exportar Dados (LGPD)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Módulo de Gestão de Almoxarifado - TR 6.5
    // Cadastro itens, entradas/saídas, estoque mínimo, inventário digital, vinculação a eventos/projetos
    const AlmoxarifadoContent = () => (
      <div className="space-y-6">
        {/* KPIs do Módulo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Itens Cadastrados</p>
                <p className="text-2xl font-bold">2.847</p>
              </div>
              <Package className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-indigo-100 mt-2">No almoxarifado</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Entradas</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <ArrowUpRight className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-2">Este mês</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Saídas</p>
                <p className="text-2xl font-bold">203</p>
              </div>
              <TrendingUp className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-orange-100 mt-2">Este mês</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Estoque Crítico</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <AlertIcon className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-2">Abaixo do mínimo</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Vinculados</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Target className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-2">Eventos/Projetos</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">+ Entrada de Material</button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">Registrar Saída</button>
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Inventário Digital</button>
          <input type="text" placeholder="Buscar material por código ou descrição..." className="flex-1 min-w-[200px] px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Movimentações */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              Movimentações com Rastreabilidade
            </h3>
            <div className="space-y-3">
              {[
                { item: 'Bolas de Futebol Oficial', tipo: 'Saída', qtd: 50, destino: 'Centro Esportivo Norte', data: '20/01/2026', responsavel: 'João Silva', evento: 'Copa Municipal Sub-15' },
                { item: 'Coletes de Treino', tipo: 'Entrada', qtd: 200, destino: 'Almoxarifado Central', data: '19/01/2026', responsavel: 'Maria Santos', evento: '-' },
                { item: 'Cones de Sinalização', tipo: 'Saída', qtd: 30, destino: 'Ginásio Municipal', data: '18/01/2026', responsavel: 'Carlos Costa', evento: 'Escolinha de Atletismo' },
                { item: 'Redes de Vôlei', tipo: 'Entrada', qtd: 15, destino: 'Almoxarifado Central', data: '17/01/2026', responsavel: 'Ana Paula', evento: '-' },
                { item: 'Uniformes Completos', tipo: 'Saída', qtd: 100, destino: 'Secretaria', data: '16/01/2026', responsavel: 'Pedro Lima', evento: 'Programa Bolsa Atleta' },
              ].map((mov, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-indigo-50/50 hover:border-indigo-300 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-800">{mov.item}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mov.tipo === 'Entrada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{mov.tipo}</span>
                      </div>
                      <p className="text-sm text-slate-600">{mov.destino} • {mov.responsavel}</p>
                      {mov.evento !== '-' && (
                        <p className="text-xs text-indigo-600 mt-1">📌 {mov.evento}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${mov.tipo === 'Entrada' ? 'text-green-600' : 'text-orange-600'}`}>{mov.tipo === 'Entrada' ? '+' : '-'}{mov.qtd} un</p>
                      <p className="text-xs text-slate-500 mt-1">{mov.data}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="text-xs px-2 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Detalhes</button>
                    <button className="text-xs px-2 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Log Auditoria</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-4">
            {/* Alertas de Estoque Mínimo */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <AlertIcon className="w-4 h-4 text-red-600" />
                Alertas de Estoque Mínimo
              </h3>
              <div className="space-y-2">
                {[
                  { item: 'Bolas de Basquete', atual: 5, minimo: 20 },
                  { item: 'Uniformes M', atual: 8, minimo: 30 },
                  { item: 'Apitos', atual: 3, minimo: 15 },
                  { item: 'Colchonetes', atual: 12, minimo: 25 },
                ].map((alerta, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-red-100">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{alerta.item}</p>
                      <p className="text-xs text-slate-500">Mín: {alerta.minimo}</p>
                    </div>
                    <span className="text-xs font-bold text-red-600 px-2 py-1 bg-red-100 rounded">{alerta.atual} un</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categorias */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Categorias de Itens</h3>
              <div className="space-y-2">
                {[
                  { cat: 'Material Esportivo', qtd: 1245 },
                  { cat: 'Uniformes', qtd: 892 },
                  { cat: 'Equipamentos', qtd: 456 },
                  { cat: 'Outros', qtd: 254 },
                ].map((cat, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-indigo-100">
                    <p className="text-xs text-slate-700">{cat.cat}</p>
                    <span className="text-xs font-semibold text-indigo-600">{cat.qtd}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vinculação a Eventos */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Vinculado a Eventos</h3>
              <div className="space-y-2">
                {[
                  { evento: 'Copa Municipal Sub-15', itens: 120 },
                  { evento: 'Programa Bolsa Atleta', itens: 340 },
                  { evento: 'Escolinha de Atletismo', itens: 85 },
                ].map((ev, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-blue-100">
                    <p className="text-xs text-slate-700">{ev.evento}</p>
                    <span className="text-xs font-semibold text-blue-600">{ev.itens} itens</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relatórios */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  Relatório de Inventário
                </button>
                <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                  Relatório por Período
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Módulo de Planejamento e Formalização - TR 6.2
    // DOD, ETP, TR, minutas, pareceres, assinatura digital ICP-Brasil/Gov.br, controle de versões
    const PlanejamentoContent = () => (
      <div className="space-y-6">
        {/* KPIs do Módulo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">DODs</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <FileText className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-2">Em elaboração</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">ETPs</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <FileText className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-2">Estudos técnicos</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">TRs</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <FileText className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-indigo-100 mt-2">Termos de Referência</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Pareceres</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <AlertIcon className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-2">Aguardando</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Assinados</p>
                <p className="text-2xl font-bold">34</p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-2">Este mês</p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">+ Novo DOD</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">+ Novo ETP</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">+ Novo TR</button>
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">+ Nova Minuta</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline de Documentos */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Pipeline de Formalização
            </h3>
            <div className="space-y-4">
              {[
                { tipo: 'DOD', titulo: 'Demanda - Programa Esporte na Comunidade', status: 'Em Elaboração', versao: 'v1.2', responsavel: 'Maria Santos', data: '20/01/2026', assinatura: 'Pendente' },
                { tipo: 'ETP', titulo: 'Estudo Técnico - Aquisição de Materiais Esportivos', status: 'Revisão Jurídica', versao: 'v2.0', responsavel: 'João Silva', data: '19/01/2026', assinatura: 'Pendente' },
                { tipo: 'TR', titulo: 'Termo de Referência - Convênio Centro Esportivo', status: 'Aguardando Parecer', versao: 'v1.5', responsavel: 'Carlos Costa', data: '18/01/2026', assinatura: 'Pendente' },
                { tipo: 'Minuta', titulo: 'Minuta de Contrato - Manutenção Quadras', status: 'Parecer Técnico', versao: 'v3.1', responsavel: 'Ana Paula', data: '17/01/2026', assinatura: 'Gov.br' },
                { tipo: 'Parecer', titulo: 'Parecer Jurídico - Convênio Federação', status: 'Assinado', versao: 'v1.0', responsavel: 'Dr. Pedro Lima', data: '15/01/2026', assinatura: 'ICP-Brasil' },
              ].map((doc, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          doc.tipo === 'DOD' ? 'bg-purple-100 text-purple-700' :
                          doc.tipo === 'ETP' ? 'bg-blue-100 text-blue-700' :
                          doc.tipo === 'TR' ? 'bg-indigo-100 text-indigo-700' :
                          doc.tipo === 'Minuta' ? 'bg-slate-100 text-slate-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{doc.tipo}</span>
                        <span className="text-xs text-slate-500">{doc.versao}</span>
                      </div>
                      <p className="font-semibold text-slate-800">{doc.titulo}</p>
                      <p className="text-xs text-slate-500 mt-1">Responsável: {doc.responsavel} • {doc.data}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        doc.status === 'Assinado' ? 'bg-green-100 text-green-700' :
                        doc.status === 'Em Elaboração' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{doc.status}</span>
                      <p className="text-xs text-slate-500 mt-2">
                        {doc.assinatura === 'Pendente' ? '⏳ Assinatura pendente' :
                         doc.assinatura === 'Gov.br' ? '✓ Assinado via Gov.br' : '✓ Assinado ICP-Brasil'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Visualizar</button>
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Histórico</button>
                    {doc.assinatura === 'Pendente' && (
                      <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">Assinar</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-4">
            {/* Controle de Versões */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                Controle de Versões
              </h3>
              <div className="space-y-2">
                {[
                  { doc: 'TR-2026-015', versoes: 5, ultima: 'Hoje 14:30' },
                  { doc: 'ETP-2026-012', versoes: 3, ultima: 'Hoje 11:15' },
                  { doc: 'DOD-2026-008', versoes: 2, ultima: 'Ontem 16:45' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-purple-100">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{item.doc}</p>
                      <p className="text-xs text-slate-500">{item.ultima}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">{item.versoes} versões</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tramitação Eletrônica */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Tramitação em Andamento</h3>
              <div className="space-y-3">
                {[
                  { de: 'Técnico', para: 'Jurídico', doc: 'TR-015' },
                  { de: 'Jurídico', para: 'Gestor', doc: 'Minuta-008' },
                ].map((tram, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-blue-100">
                    <p className="text-xs text-slate-700 font-medium">{tram.doc}</p>
                    <p className="text-xs text-slate-500 mt-1">{tram.de} → {tram.para}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertas de Prazo */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <AlertIcon className="w-4 h-4 text-red-600" />
                Alertas de Prazo
              </h3>
              <div className="space-y-2">
                {[
                  { doc: 'Parecer Jurídico TR-012', prazo: '22/01/2026', dias: 1 },
                  { doc: 'Revisão ETP-015', prazo: '25/01/2026', dias: 4 },
                ].map((alerta, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-red-100">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{alerta.doc}</p>
                      <p className="text-xs text-slate-500">{alerta.prazo}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${alerta.dias <= 2 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {alerta.dias}d
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assinatura Digital */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Assinatura Digital</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Assinar via Gov.br
                </button>
                <button className="w-full px-3 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
                  Assinar via ICP-Brasil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Módulo de Execução e Monitoramento - TR 6.3
    // Acompanhamento físico/administrativo, aditivos, prorrogações, supressões, alertas, encerramento
    const ExecucaoContent = () => (
      <div className="space-y-6">
        {/* KPIs do Módulo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Em Execução</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <TrendingUp className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-orange-100 mt-2">Contratos/Convênios</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">No Prazo</p>
                <p className="text-2xl font-bold">14</p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-2">78% do total</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Aditivos</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <FileText className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-yellow-100 mt-2">Em tramitação</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Alertas</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <AlertIcon className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-red-100 mt-2">Requerem ação</p>
          </div>
          <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-100 text-sm font-medium mb-1">Encerrados</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-slate-100 mt-2">Este ano</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">+ Registrar Aditivo</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">+ Prorrogação</button>
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Registrar Supressão</button>
          <input type="text" placeholder="Buscar instrumento..." className="flex-1 min-w-[200px] px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Instrumentos em Execução */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Monitoramento de Execução
            </h3>
            <div className="space-y-4">
              {[
                { numero: 'CV-2026-001', tipo: 'Convênio', descricao: 'Programa Esporte na Escola', execFisica: 72, execFinanceira: 68, status: 'No Prazo', prazo: '30/06/2026', alertas: 0 },
                { numero: 'CT-2026-005', tipo: 'Contrato', descricao: 'Manutenção Centros Esportivos', execFisica: 45, execFinanceira: 42, status: 'No Prazo', prazo: '31/12/2026', alertas: 0 },
                { numero: 'TC-2025-012', tipo: 'Termo Cooperação', descricao: 'Parceria Federação Atletismo', execFisica: 88, execFinanceira: 75, status: 'Atrasado', prazo: '28/02/2026', alertas: 2 },
                { numero: 'CV-2025-008', tipo: 'Convênio', descricao: 'Bolsa Atleta Municipal', execFisica: 95, execFinanceira: 90, status: 'No Prazo', prazo: '31/03/2026', alertas: 0 },
                { numero: 'CT-2025-022', tipo: 'Contrato', descricao: 'Aquisição Material Esportivo', execFisica: 30, execFinanceira: 25, status: 'Alerta', prazo: '15/04/2026', alertas: 1 },
              ].map((inst, idx) => (
                <div key={idx} className={`border rounded-lg p-4 hover:shadow-md transition-all ${
                  inst.status === 'Atrasado' ? 'border-red-300 bg-red-50/30' :
                  inst.status === 'Alerta' ? 'border-yellow-300 bg-yellow-50/30' :
                  'border-slate-200 hover:border-orange-300'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">{inst.tipo}</span>
                        <span className="font-semibold text-slate-800">{inst.numero}</span>
                        {inst.alertas > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">{inst.alertas} alertas</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-700">{inst.descricao}</p>
                      <p className="text-xs text-slate-500 mt-1">Prazo: {inst.prazo}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      inst.status === 'No Prazo' ? 'bg-green-100 text-green-700' :
                      inst.status === 'Atrasado' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{inst.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Execução Física</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-orange-500 h-full" style={{ width: `${inst.execFisica}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{inst.execFisica}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Execução Financeira</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-500 h-full" style={{ width: `${inst.execFinanceira}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{inst.execFinanceira}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Detalhes</button>
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Cronograma</button>
                    <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Histórico</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-4">
            {/* Alertas Automáticos */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <AlertIcon className="w-4 h-4 text-red-600" />
                Alertas Automáticos
              </h3>
              <div className="space-y-2">
                {[
                  { msg: 'TC-2025-012: Prazo de entrega vencido há 5 dias', tipo: 'critico' },
                  { msg: 'CT-2025-022: Execução abaixo de 50% do cronograma', tipo: 'alerta' },
                  { msg: 'CV-2026-001: Documentação pendente de envio', tipo: 'info' },
                  { msg: 'CV-2025-008: Vencimento em 60 dias', tipo: 'info' },
                ].map((alerta, idx) => (
                  <div key={idx} className={`p-2 rounded-lg border ${
                    alerta.tipo === 'critico' ? 'bg-red-100 border-red-200' :
                    alerta.tipo === 'alerta' ? 'bg-yellow-100 border-yellow-200' :
                    'bg-blue-50 border-blue-100'
                  }`}>
                    <p className="text-xs text-slate-700">{alerta.msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Aditivos e Alterações */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Aditivos em Tramitação</h3>
              <div className="space-y-2">
                {[
                  { inst: 'CV-2026-001', tipo: 'Prorrogação', status: 'Análise' },
                  { inst: 'CT-2026-005', tipo: 'Acréscimo 25%', status: 'Aprovado' },
                  { inst: 'TC-2025-012', tipo: 'Supressão', status: 'Pendente' },
                ].map((aditivo, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-yellow-100">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{aditivo.inst}</p>
                      <p className="text-xs text-slate-500">{aditivo.tipo}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      aditivo.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                      aditivo.status === 'Análise' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{aditivo.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cronograma Resumido */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Próximos Vencimentos</h3>
              <div className="space-y-2">
                {[
                  { inst: 'TC-2025-012', data: '28/02/2026', dias: 38 },
                  { inst: 'CV-2025-008', data: '31/03/2026', dias: 69 },
                  { inst: 'CT-2025-022', data: '15/04/2026', dias: 84 },
                ].map((venc, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-blue-100">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{venc.inst}</p>
                      <p className="text-xs text-slate-500">{venc.data}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      venc.dias <= 30 ? 'bg-red-100 text-red-700' :
                      venc.dias <= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>{venc.dias}d</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relatórios */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Relatórios</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  Relatório de Desempenho
                </button>
                <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                  Exportar Cronograma
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Módulo Financeiro e Prestação de Contas - TR 6.6
    // Repasses, pagamentos, saldos, integração contábil, prestação de contas auditável
    const FinanceiroContent = () => {
      const [abaAtiva, setAbaAtiva] = useState<'pagamentos' | 'prestacao' | 'orcamento'>('pagamentos');

      return (
        <div className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Repassado</p>
                  <p className="text-2xl font-bold">R$ 12.8M</p>
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-emerald-100 mt-2">↑ 12% vs. ano anterior</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Saldo Disponível</p>
                  <p className="text-2xl font-bold">R$ 7.2M</p>
                </div>
                <Wallet className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-blue-100 mt-2">De R$ 20M alocado</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Execução</p>
                  <p className="text-2xl font-bold">64%</p>
                </div>
                <Percent className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-purple-100 mt-2">Meta: 75%</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm font-medium mb-1">Prestações</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <FileText className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-amber-100 mt-2">Pendentes</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Aprovadas</p>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <CheckCircle className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-green-100 mt-2">Este ano</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            <div className="flex gap-1">
              {[
                { id: 'pagamentos', label: 'Pagamentos e Repasses', icon: DollarSign },
                { id: 'prestacao', label: 'Prestação de Contas', icon: FileText },
                { id: 'orcamento', label: 'Orçamento', icon: Wallet },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAbaAtiva(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    abaAtiva === tab.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {abaAtiva === 'pagamentos' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Fluxo de Pagamentos Recentes
                </h3>
                <div className="space-y-3">
                  {[
                    { instrumento: 'CV-2026-001', descricao: 'Programa Esporte na Escola', valor: 150000, data: '20/01/2026', status: 'Liberado', tipo: 'Repasse', parcela: '3/12' },
                    { instrumento: 'CT-2026-005', descricao: 'Manutenção Centros Esportivos', valor: 85000, data: '18/01/2026', status: 'Em Processamento', tipo: 'Pagamento', parcela: '2/6' },
                    { instrumento: 'CV-2025-008', descricao: 'Bolsa Atleta Municipal', valor: 445000, data: '15/01/2026', status: 'Liberado', tipo: 'Repasse Mensal', parcela: 'Jan/2026' },
                    { instrumento: 'TC-2025-012', descricao: 'Parceria Federação Atletismo', valor: 75000, data: '10/01/2026', status: 'Pendente Docs', tipo: 'Repasse', parcela: '4/8' },
                    { instrumento: 'CT-2025-022', descricao: 'Aquisição Material Esportivo', valor: 120000, data: '05/01/2026', status: 'Liberado', tipo: 'Pagamento', parcela: '1/3' },
                  ].map((pag, idx) => (
                    <div key={idx} className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      pag.status === 'Pendente Docs' ? 'border-amber-200 bg-amber-50/30' :
                      pag.status === 'Em Processamento' ? 'border-blue-200 bg-blue-50/30' :
                      'border-slate-200 hover:border-emerald-300'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-800">{pag.instrumento}</p>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{pag.tipo}</span>
                            <span className="text-xs text-slate-500">{pag.parcela}</span>
                          </div>
                          <p className="text-sm text-slate-600">{pag.descricao}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600">R$ {(pag.valor/1000).toFixed(0)}k</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            pag.status === 'Liberado' ? 'bg-green-100 text-green-700' :
                            pag.status === 'Em Processamento' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>{pag.status}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">{pag.data}</span>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">Detalhes</button>
                          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">Comprovante</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Resumo Financeiro</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Orçamento Total', valor: 'R$ 20M' },
                      { label: 'Repassado', valor: 'R$ 12.8M' },
                      { label: 'A Repassar', valor: 'R$ 7.2M' },
                      { label: 'Rendimentos', valor: 'R$ 145k' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-emerald-100">
                        <span className="text-xs text-slate-600">{item.label}</span>
                        <span className="text-sm font-bold text-slate-800">{item.valor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Próximos Vencimentos
                  </h3>
                  <div className="space-y-2">
                    {[
                      { instrumento: 'CV-2026-001', valor: 'R$ 150k', data: '25/01', dias: 4 },
                      { instrumento: 'CT-2026-005', valor: 'R$ 85k', data: '30/01', dias: 9 },
                      { instrumento: 'CV-2025-008', valor: 'R$ 445k', data: '15/02', dias: 25 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-amber-100">
                        <div>
                          <p className="text-xs font-medium text-slate-700">{item.instrumento}</p>
                          <p className="text-xs text-slate-500">{item.data}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-emerald-600">{item.valor}</p>
                          <span className={`text-xs ${item.dias <= 7 ? 'text-red-600' : 'text-slate-500'}`}>{item.dias}d</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Novo Pagamento
                    </button>
                    <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                      Extrato Bancário
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {abaAtiva === 'prestacao' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  Prestações de Contas
                </h3>
                <div className="space-y-3">
                  {[
                    { instrumento: 'CV-2025-008', periodo: 'Dez/2025', valor: 445000, status: 'Aprovada', dataEnvio: '10/01/2026', parecer: 'Regular' },
                    { instrumento: 'CV-2026-001', periodo: 'Jan/2026', valor: 150000, status: 'Em Análise', dataEnvio: '18/01/2026', parecer: 'Pendente' },
                    { instrumento: 'TC-2025-012', periodo: 'Q4/2025', valor: 225000, status: 'Diligência', dataEnvio: '05/01/2026', parecer: 'Docs. pendentes' },
                    { instrumento: 'CT-2025-022', periodo: 'Dez/2025', valor: 120000, status: 'Aprovada', dataEnvio: '02/01/2026', parecer: 'Regular' },
                  ].map((pc, idx) => (
                    <div key={idx} className={`p-4 border rounded-lg ${
                      pc.status === 'Diligência' ? 'border-red-200 bg-red-50/30' :
                      pc.status === 'Em Análise' ? 'border-blue-200 bg-blue-50/30' :
                      'border-slate-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-800">{pc.instrumento}</p>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{pc.periodo}</span>
                          </div>
                          <p className="text-sm text-slate-600">Valor: R$ {(pc.valor/1000).toFixed(0)}k</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          pc.status === 'Aprovada' ? 'bg-green-100 text-green-700' :
                          pc.status === 'Em Análise' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>{pc.status}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Enviado: {pc.dataEnvio} • Parecer: {pc.parecer}</span>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">Ver Docs</button>
                          {pc.status === 'Diligência' && (
                            <button className="px-2 py-1 bg-amber-600 text-white rounded hover:bg-amber-700">Responder</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Status das Prestações</h3>
                  <div className="space-y-2">
                    {[
                      { status: 'Aprovadas', qtd: 42, cor: 'bg-green-500' },
                      { status: 'Em Análise', qtd: 5, cor: 'bg-blue-500' },
                      { status: 'Em Diligência', qtd: 3, cor: 'bg-red-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.cor}`}></div>
                        <span className="flex-1 text-xs text-slate-700">{item.status}</span>
                        <span className="text-xs font-bold text-slate-800">{item.qtd}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <button className="w-full px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Nova Prestação de Contas
                  </button>
                </div>
              </div>
            </div>
          )}

          {abaAtiva === 'orcamento' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-600" />
                  Distribuição Orçamentária
                </h3>
                <div className="space-y-4">
                  {[
                    { programa: 'Bolsa Atleta', alocado: 5340000, executado: 4012000, percent: 75 },
                    { programa: 'Manutenção Esportiva', alocado: 3200000, executado: 1920000, percent: 60 },
                    { programa: 'Eventos Esportivos', alocado: 4500000, executado: 2925000, percent: 65 },
                    { programa: 'Infraestrutura', alocado: 5000000, executado: 3500000, percent: 70 },
                    { programa: 'Capacitação', alocado: 1960000, executado: 1443000, percent: 74 },
                  ].map((prog, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-slate-800">{prog.programa}</p>
                        <span className="text-sm font-bold text-blue-600">{prog.percent}%</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Alocado: R$ {(prog.alocado/1000000).toFixed(1)}M</span>
                        <span>Executado: R$ {(prog.executado/1000000).toFixed(1)}M</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full" style={{ width: `${prog.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Totais</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-lg border border-blue-100 text-center">
                      <p className="text-xs text-slate-500">Orçamento Total</p>
                      <p className="text-xl font-bold text-slate-800">R$ 20M</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-100 text-center">
                      <p className="text-xs text-slate-500">Total Executado</p>
                      <p className="text-xl font-bold text-emerald-600">R$ 13.8M</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    Relatório Orçamentário
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    // Módulo de Fiscalização e Auditoria - TR 6.7
    // Visitas técnicas, checklists, evidências multimídia, geolocalização, pareceres
    const FiscalizacaoContent = () => {
      const [tipoFiscalizacao, setTipoFiscalizacao] = useState<'visitas' | 'checklists' | 'pareceres'>('visitas');

      return (
        <div className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-indigo-100 text-sm font-medium mb-1">Fiscalizações</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <Shield className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-indigo-100 mt-2">Este ano</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Conformes</p>
                  <p className="text-2xl font-bold">41</p>
                </div>
                <CheckCircle className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-green-100 mt-2">87% aprovação</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-red-100 text-sm font-medium mb-1">Não-Conformes</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <AlertIcon className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-red-100 mt-2">Ação requerida</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm font-medium mb-1">Evidências</p>
                  <p className="text-2xl font-bold">324</p>
                </div>
                <FileText className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-amber-100 mt-2">Fotos/Docs</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Auditorias</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Eye className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-purple-100 mt-2">Concluídas</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            <div className="flex gap-1">
              {[
                { id: 'visitas', label: 'Visitas Técnicas', icon: MapPin },
                { id: 'checklists', label: 'Checklists', icon: CheckCircle },
                { id: 'pareceres', label: 'Pareceres', icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTipoFiscalizacao(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    tipoFiscalizacao === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {tipoFiscalizacao === 'visitas' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    Visitas Técnicas Recentes
                  </h3>
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                    + Nova Visita
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { local: 'Centro Esportivo Norte', instrumento: 'CV-2026-001', data: '20/01/2026', fiscal: 'Ana Oliveira', status: 'Conforme', evidencias: 12, geolocalizacao: true, observacao: 'Instalações em bom estado, manutenção preventiva em dia' },
                    { local: 'Ginásio Poliesportivo Sul', instrumento: 'CT-2025-022', data: '18/01/2026', fiscal: 'Carlos Silva', status: 'Parcial', evidencias: 8, geolocalizacao: true, observacao: 'Iluminação da quadra precisa de reparo' },
                    { local: 'Pista de Atletismo', instrumento: 'TC-2025-012', data: '15/01/2026', fiscal: 'Maria Santos', status: 'Não-Conforme', evidencias: 15, geolocalizacao: true, observacao: 'Obras atrasadas em 30 dias, material incompleto' },
                    { local: 'Academia ao Ar Livre - Praça Central', instrumento: 'CV-2025-008', data: '12/01/2026', fiscal: 'João Ferreira', status: 'Conforme', evidencias: 6, geolocalizacao: true, observacao: 'Equipamentos funcionando corretamente' },
                    { local: 'Campo de Futebol Municipal', instrumento: 'CT-2026-005', data: '10/01/2026', fiscal: 'Ana Oliveira', status: 'Conforme', evidencias: 10, geolocalizacao: true, observacao: 'Gramado bem cuidado, vestiários limpos' },
                  ].map((visita, idx) => (
                    <div key={idx} className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                      visita.status === 'Não-Conforme' ? 'border-red-200 bg-red-50/30' :
                      visita.status === 'Parcial' ? 'border-amber-200 bg-amber-50/30' :
                      'border-slate-200 hover:border-indigo-300'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-800">{visita.local}</p>
                            {visita.geolocalizacao && <MapPin className="w-3 h-3 text-indigo-500" />}
                          </div>
                          <p className="text-sm text-slate-600">{visita.instrumento} • Fiscal: {visita.fiscal}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          visita.status === 'Conforme' ? 'bg-green-100 text-green-700' :
                          visita.status === 'Parcial' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>{visita.status}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{visita.observacao}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">{visita.data}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-indigo-600 font-medium">{visita.evidencias} evidências</span>
                          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">Ver Detalhes</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Próximas Visitas Agendadas</h3>
                  <div className="space-y-2">
                    {[
                      { local: 'Quadras Poliesportivas Leste', data: '25/01', hora: '09:00' },
                      { local: 'Parque Esportivo Central', data: '28/01', hora: '14:00' },
                      { local: 'Centro de Treinamento', data: '30/01', hora: '10:00' },
                    ].map((ag, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-indigo-100">
                        <div>
                          <p className="text-xs font-medium text-slate-700">{ag.local}</p>
                          <p className="text-xs text-slate-500">{ag.data} às {ag.hora}</p>
                        </div>
                        <button className="text-xs px-2 py-1 border border-indigo-300 text-indigo-600 rounded hover:bg-indigo-50">Editar</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Taxa de Conformidade</h3>
                  <div className="text-center mb-3">
                    <p className="text-3xl font-bold text-green-600">87%</p>
                    <p className="text-xs text-slate-500">41 de 47 fiscalizações</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    Relatório de Fiscalizações
                  </button>
                </div>
              </div>
            </div>
          )}

          {tipoFiscalizacao === 'checklists' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Checklists de Verificação
                </h3>
                <div className="space-y-4">
                  {[
                    { nome: 'Checklist Infraestrutura Esportiva', itens: 25, preenchidos: 25, status: 'Completo', versao: '2.1' },
                    { nome: 'Checklist Segurança', itens: 18, preenchidos: 18, status: 'Completo', versao: '1.5' },
                    { nome: 'Checklist Manutenção Preventiva', itens: 30, preenchidos: 24, status: 'Em Andamento', versao: '3.0' },
                    { nome: 'Checklist Documentação', itens: 15, preenchidos: 12, status: 'Em Andamento', versao: '1.2' },
                  ].map((cl, idx) => (
                    <div key={idx} className={`p-4 border rounded-lg ${
                      cl.status === 'Completo' ? 'border-green-200 bg-green-50/30' : 'border-amber-200 bg-amber-50/30'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-slate-800">{cl.nome}</p>
                          <p className="text-xs text-slate-500">Versão {cl.versao}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          cl.status === 'Completo' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>{cl.status}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">{cl.preenchidos}/{cl.itens} itens</span>
                        <span className="text-sm font-medium text-slate-700">{Math.round((cl.preenchidos/cl.itens)*100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className={`h-full ${cl.status === 'Completo' ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${(cl.preenchidos/cl.itens)*100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Modelos Disponíveis</h3>
                  <div className="space-y-2">
                    {[
                      { nome: 'Vistoria Geral', itens: 30 },
                      { nome: 'Manutenção Corretiva', itens: 20 },
                      { nome: 'Entrega de Obra', itens: 45 },
                      { nome: 'Auditoria Documental', itens: 25 },
                    ].map((modelo, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-blue-100">
                        <div>
                          <p className="text-xs font-medium text-slate-700">{modelo.nome}</p>
                          <p className="text-xs text-slate-500">{modelo.itens} itens</p>
                        </div>
                        <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Usar</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    + Criar Novo Checklist
                  </button>
                </div>
              </div>
            </div>
          )}

          {tipoFiscalizacao === 'pareceres' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Pareceres Técnicos
                </h3>
                <div className="space-y-3">
                  {[
                    { numero: 'PAR-2026-012', assunto: 'Fiscalização Centro Esportivo Norte', fiscal: 'Ana Oliveira', data: '20/01/2026', resultado: 'Favorável', instrumento: 'CV-2026-001' },
                    { numero: 'PAR-2026-011', assunto: 'Auditoria Programa Bolsa Atleta', fiscal: 'Carlos Silva', data: '18/01/2026', resultado: 'Favorável com Ressalvas', instrumento: 'CV-2025-008' },
                    { numero: 'PAR-2026-010', assunto: 'Vistoria Pista de Atletismo', fiscal: 'Maria Santos', data: '15/01/2026', resultado: 'Desfavorável', instrumento: 'TC-2025-012' },
                    { numero: 'PAR-2026-009', assunto: 'Análise Prestação de Contas Q4', fiscal: 'João Ferreira', data: '10/01/2026', resultado: 'Favorável', instrumento: 'CT-2025-022' },
                  ].map((parecer, idx) => (
                    <div key={idx} className={`p-4 border rounded-lg ${
                      parecer.resultado === 'Desfavorável' ? 'border-red-200 bg-red-50/30' :
                      parecer.resultado === 'Favorável com Ressalvas' ? 'border-amber-200 bg-amber-50/30' :
                      'border-slate-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-800">{parecer.numero}</p>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{parecer.instrumento}</span>
                          </div>
                          <p className="text-sm text-slate-600">{parecer.assunto}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          parecer.resultado === 'Favorável' ? 'bg-green-100 text-green-700' :
                          parecer.resultado === 'Favorável com Ressalvas' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>{parecer.resultado}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Fiscal: {parecer.fiscal} • {parecer.data}</span>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">Ver PDF</button>
                          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">Histórico</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Resumo de Pareceres</h3>
                  <div className="space-y-2">
                    {[
                      { tipo: 'Favoráveis', qtd: 38, cor: 'bg-green-500' },
                      { tipo: 'Com Ressalvas', qtd: 6, cor: 'bg-amber-500' },
                      { tipo: 'Desfavoráveis', qtd: 3, cor: 'bg-red-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.cor}`}></div>
                        <span className="flex-1 text-xs text-slate-700">{item.tipo}</span>
                        <span className="text-xs font-bold text-slate-800">{item.qtd}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Emitir Parecer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    // Módulo de Indicadores e Inteligência Analítica - TR 6.8
    // Dashboards, KPIs, filtros avançados, integração BI, análises comparativas, relatórios estratégicos
    const IndicadoresContent = () => {
      const [periodoSelecionado, setPeriodoSelecionado] = useState('mensal');
      const [moduloFiltro, setModuloFiltro] = useState('todos');

      return (
        <div className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-pink-100 text-sm font-medium mb-1">Taxa de Execução</p>
                  <p className="text-2xl font-bold">78.4%</p>
                </div>
                <TrendingUp className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-pink-100 mt-2">↑ 2.3% vs. mês anterior</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Conformidade</p>
                  <p className="text-2xl font-bold">92.1%</p>
                </div>
                <CheckCircle className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-green-100 mt-2">Meta: 90%</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Execução Financeira</p>
                  <p className="text-2xl font-bold">R$ 12.8M</p>
                </div>
                <DollarSign className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-blue-100 mt-2">64% do orçamento</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Bolsistas Ativos</p>
                  <p className="text-2xl font-bold">892</p>
                </div>
                <GraduationCap className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-purple-100 mt-2">↑ 45 novos este mês</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm font-medium mb-1">Alertas Ativos</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <AlertIcon className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-amber-100 mt-2">3 críticos</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Período:</span>
                <div className="flex gap-1">
                  {['diario', 'semanal', 'mensal', 'trimestral', 'anual'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriodoSelecionado(p)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        periodoSelecionado === p
                          ? 'bg-pink-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Módulo:</span>
                <select
                  value={moduloFiltro}
                  onChange={(e) => setModuloFiltro(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                >
                  <option value="todos">Todos os Módulos</option>
                  <option value="planejamento">Planejamento</option>
                  <option value="execucao">Execução</option>
                  <option value="bolsistas">Bolsistas</option>
                  <option value="almoxarifado">Almoxarifado</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="fiscalizacao">Fiscalização</option>
                </select>
              </div>
              <button className="ml-auto px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium flex items-center gap-2">
                <DownloadIcon className="w-4 h-4" />
                Exportar Relatório
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráficos e Dashboards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Evolução Temporal */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-pink-600" />
                  Evolução da Execução (Últimos 6 meses)
                </h3>
                <div className="h-48 flex items-end justify-around gap-4 px-4">
                  {[
                    { mes: 'Ago', exec: 62, fin: 58 },
                    { mes: 'Set', exec: 68, fin: 64 },
                    { mes: 'Out', exec: 71, fin: 67 },
                    { mes: 'Nov', exec: 74, fin: 70 },
                    { mes: 'Dez', exec: 76, fin: 73 },
                    { mes: 'Jan', exec: 78, fin: 75 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 items-end justify-center h-36">
                        <div
                          className="w-5 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t"
                          style={{ height: `${item.exec}%` }}
                          title={`Física: ${item.exec}%`}
                        ></div>
                        <div
                          className="w-5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                          style={{ height: `${item.fin}%` }}
                          title={`Financeira: ${item.fin}%`}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600 font-medium">{item.mes}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-pink-500"></div>
                    <span className="text-xs text-slate-600">Execução Física</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500"></div>
                    <span className="text-xs text-slate-600">Execução Financeira</span>
                  </div>
                </div>
              </div>

              {/* KPIs por Módulo */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Desempenho por Módulo</h3>
                <div className="space-y-4">
                  {[
                    { nome: 'Planejamento e Formalização', valor: 94, meta: 90, status: 'acima' },
                    { nome: 'Execução e Monitoramento', valor: 78, meta: 85, status: 'abaixo' },
                    { nome: 'Gestão de Bolsistas', valor: 96, meta: 90, status: 'acima' },
                    { nome: 'Gestão de Almoxarifado', valor: 88, meta: 85, status: 'acima' },
                    { nome: 'Financeiro e Prestação de Contas', valor: 82, meta: 90, status: 'abaixo' },
                    { nome: 'Fiscalização e Auditoria', valor: 91, meta: 85, status: 'acima' },
                  ].map((kpi, idx) => (
                    <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-slate-700">{kpi.nome}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${kpi.status === 'acima' ? 'text-green-600' : 'text-amber-600'}`}>
                            {kpi.valor}%
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            kpi.status === 'acima' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            Meta: {kpi.meta}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden relative">
                        <div
                          className={`h-full rounded-full ${kpi.status === 'acima' ? 'bg-green-500' : 'bg-amber-500'}`}
                          style={{ width: `${kpi.valor}%` }}
                        ></div>
                        <div
                          className="absolute top-0 w-0.5 h-full bg-slate-600"
                          style={{ left: `${kpi.meta}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Painel Lateral */}
            <div className="space-y-4">
              {/* Resumo Executivo */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-3">Resumo Executivo</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Instrumentos Ativos', valor: '18', cor: 'text-blue-600' },
                    { label: 'Instrumentos no Prazo', valor: '14 (78%)', cor: 'text-green-600' },
                    { label: 'Documentos Pendentes', valor: '23', cor: 'text-amber-600' },
                    { label: 'Riscos Identificados', valor: '7', cor: 'text-red-600' },
                    { label: 'Fiscalizações Realizadas', valor: '28', cor: 'text-purple-600' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-pink-100">
                      <span className="text-xs text-slate-600">{item.label}</span>
                      <span className={`text-sm font-bold ${item.cor}`}>{item.valor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Indicadores */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Melhores Desempenhos
                </h3>
                <div className="space-y-2">
                  {[
                    { indicador: 'Taxa de Bolsistas Ativos', valor: '96%' },
                    { indicador: 'Conformidade Documental', valor: '94%' },
                    { indicador: 'Auditorias Aprovadas', valor: '92%' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-green-100">
                      <span className="text-xs text-slate-700">{item.indicador}</span>
                      <span className="text-xs font-bold text-green-600">{item.valor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicadores com Atenção */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <AlertIcon className="w-4 h-4 text-amber-600" />
                  Requerem Atenção
                </h3>
                <div className="space-y-2">
                  {[
                    { indicador: 'Execução Física', valor: '78%', meta: '85%' },
                    { indicador: 'Prestação de Contas', valor: '82%', meta: '90%' },
                    { indicador: 'Prazos de Entrega', valor: '76%', meta: '95%' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-lg border border-amber-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-700">{item.indicador}</span>
                        <span className="text-xs font-bold text-amber-600">{item.valor}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Meta: {item.meta}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-3">Relatórios Disponíveis</h3>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    Relatório Gerencial
                  </button>
                  <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                    Relatório de KPIs
                  </button>
                  <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                    Análise Comparativa
                  </button>
                  <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                    Integração BI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // Módulo de Governança e Transparência - TR 6.9
    // Portal Transparência, LGPD, LAI, Lei 14.133/21, APIs para órgãos de controle
    const GovernancaContent = () => (
      <div className="space-y-6">
        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-100 text-sm font-medium mb-1">Score Transparência</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <Eye className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-amber-100 mt-2">Portal atualizado</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">LGPD</p>
                <p className="text-2xl font-bold">100%</p>
              </div>
              <Shield className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-green-100 mt-2">Conforme</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Docs Publicados</p>
                <p className="text-2xl font-bold">1.247</p>
              </div>
              <FileText className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-blue-100 mt-2">No portal</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Solicitações LAI</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <FileText className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-purple-100 mt-2">Este mês</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-100 text-sm font-medium mb-1">APIs Ativas</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Zap className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-xs text-cyan-100 mt-2">Órgãos de controle</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Conformidade Regulatória */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                Conformidade Regulatória
              </h3>
              <div className="space-y-3">
                {[
                  { norma: 'Lei 14.133/2021 (Nova Lei de Licitações)', status: 'Conforme', detalhes: 'Todas as contratações seguem os novos procedimentos' },
                  { norma: 'LGPD - Lei Geral de Proteção de Dados', status: 'Conforme', detalhes: 'Dados pessoais tratados conforme base legal' },
                  { norma: 'Lei de Acesso à Informação (LAI)', status: 'Conforme', detalhes: 'Portal de transparência ativo e atualizado' },
                  { norma: 'Lei de Responsabilidade Fiscal', status: 'Conforme', detalhes: 'Limites e prazos respeitados' },
                  { norma: 'Decreto de Transparência Municipal', status: 'Parcial', detalhes: 'Pendente publicação de 3 relatórios' },
                  { norma: 'IN TCE - Prestação de Contas', status: 'Conforme', detalhes: 'Documentação enviada dentro do prazo' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                    item.status === 'Conforme' ? 'border-green-200 hover:border-green-300' : 'border-yellow-200 bg-yellow-50/30 hover:border-yellow-300'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-slate-800">{item.norma}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        item.status === 'Conforme' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{item.detalhes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solicitações LAI */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Solicitações de Acesso à Informação (LAI)
              </h3>
              <div className="space-y-3">
                {[
                  { protocolo: 'LAI-2026-0089', assunto: 'Contratos de manutenção esportiva', solicitante: 'Cidadão', prazo: '25/01/2026', status: 'Em análise', dias: 4 },
                  { protocolo: 'LAI-2026-0088', assunto: 'Execução orçamentária 2025', solicitante: 'Imprensa', prazo: '23/01/2026', status: 'Em análise', dias: 2 },
                  { protocolo: 'LAI-2026-0087', assunto: 'Lista de bolsistas ativos', solicitante: 'Cidadão', prazo: '22/01/2026', status: 'Respondido', dias: 0 },
                  { protocolo: 'LAI-2026-0086', assunto: 'Licitações em andamento', solicitante: 'Empresa', prazo: '20/01/2026', status: 'Respondido', dias: 0 },
                ].map((sol, idx) => (
                  <div key={idx} className={`p-4 border rounded-lg ${
                    sol.status === 'Em análise' && sol.dias <= 2 ? 'border-red-200 bg-red-50/30' :
                    sol.status === 'Em análise' ? 'border-yellow-200 bg-yellow-50/30' :
                    'border-slate-200'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-slate-800">{sol.protocolo}</p>
                        <p className="text-sm text-slate-600">{sol.assunto}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        sol.status === 'Respondido' ? 'bg-green-100 text-green-700' :
                        sol.dias <= 2 ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {sol.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Solicitante: {sol.solicitante}</span>
                      {sol.status === 'Em análise' && (
                        <span className={`font-medium ${sol.dias <= 2 ? 'text-red-600' : 'text-amber-600'}`}>
                          Prazo: {sol.prazo} ({sol.dias}d restantes)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-4">
            {/* Portal de Transparência */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                Portal de Transparência
              </h3>
              <div className="space-y-2">
                {[
                  { secao: 'Contratos e Convênios', docs: 342, atualizado: 'Hoje' },
                  { secao: 'Licitações', docs: 156, atualizado: 'Hoje' },
                  { secao: 'Despesas', docs: 489, atualizado: 'Hoje' },
                  { secao: 'Receitas', docs: 124, atualizado: 'Ontem' },
                  { secao: 'Servidores', docs: 136, atualizado: 'Semanal' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-amber-100">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{item.secao}</p>
                      <p className="text-xs text-slate-500">{item.docs} documentos</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{item.atualizado}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
                Acessar Portal
              </button>
            </div>

            {/* LGPD - Dados Pessoais */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Conformidade LGPD
              </h3>
              <div className="space-y-2">
                {[
                  { item: 'Dados de bolsistas anonimizados', ok: true },
                  { item: 'Consentimentos registrados', ok: true },
                  { item: 'Política de privacidade publicada', ok: true },
                  { item: 'DPO designado', ok: true },
                  { item: 'Relatório de Impacto', ok: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-green-100">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-slate-700">{item.item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrações com Órgãos de Controle */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                APIs - Órgãos de Controle
              </h3>
              <div className="space-y-2">
                {[
                  { orgao: 'TCE-SP', status: 'Online', sync: 'Tempo real' },
                  { orgao: 'CGU', status: 'Online', sync: 'Diário' },
                  { orgao: 'Portal Transparência', status: 'Online', sync: 'Tempo real' },
                  { orgao: 'e-SIC', status: 'Online', sync: 'Sob demanda' },
                ].map((api, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-blue-100">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{api.orgao}</p>
                      <p className="text-xs text-slate-500">{api.sync}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">{api.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relatórios */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Relatórios de Governança</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  Relatório de Conformidade
                </button>
                <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                  Relatório LGPD
                </button>
                <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                  Auditoria de Acessos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Módulo de IA para Triagem Documental - TR 6.11
    // Classificação automática, identificação de pendências, análise de riscos, NLP, machine learning
    const IAContent = () => {
      const [activeTab, setActiveTab] = useState<'triagem' | 'analise' | 'riscos' | 'treinamento'>('triagem');
      const [uploading, setUploading] = useState(false);
      const [analyzing, setAnalyzing] = useState(false);

      return (
        <div className="space-y-6">
          {/* KPIs do Módulo */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-violet-100 text-sm font-medium mb-1">Docs Analisados</p>
                  <p className="text-2xl font-bold">4.892</p>
                </div>
                <FileText className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-violet-100 mt-2">Este mês</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Acurácia</p>
                  <p className="text-2xl font-bold">96.8%</p>
                </div>
                <CheckCircle className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-green-100 mt-2">Classificação</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-red-100 text-sm font-medium mb-1">Riscos Detectados</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <AlertIcon className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-red-100 mt-2">Requerem análise</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm font-medium mb-1">Pendências</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <Clock className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-amber-100 mt-2">Identificadas</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Tempo Médio</p>
                  <p className="text-2xl font-bold">2.3s</p>
                </div>
                <Zap className="w-6 h-6 opacity-70" />
              </div>
              <p className="text-xs text-blue-100 mt-2">Por documento</p>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div className="bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            <div className="flex gap-1">
              {[
                { id: 'triagem', label: 'Triagem Documental', icon: FileText },
                { id: 'analise', label: 'Análise de Conteúdo', icon: Search },
                { id: 'riscos', label: 'Detecção de Riscos', icon: AlertIcon },
                { id: 'treinamento', label: 'Treinamento do Modelo', icon: Brain },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo das Tabs */}
          {activeTab === 'triagem' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload e Processamento */}
              <div className="lg:col-span-2 space-y-6">
                {/* Área de Upload */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-violet-600" />
                    Upload de Documentos para Triagem
                  </h3>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      uploading ? 'border-violet-400 bg-violet-50' : 'border-slate-300 hover:border-violet-400 hover:bg-violet-50/50'
                    }`}
                  >
                    <Brain className={`w-12 h-12 mx-auto mb-4 ${uploading ? 'text-violet-600 animate-pulse' : 'text-slate-400'}`} />
                    <p className="font-medium text-slate-700 mb-2">
                      {uploading ? 'Processando documentos...' : 'Arraste documentos ou clique para selecionar'}
                    </p>
                    <p className="text-sm text-slate-500 mb-4">PDF, DOC, DOCX, TXT, XLS, XLSX (máx. 50MB)</p>
                    <button
                      onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 3000); }}
                      className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
                    >
                      Selecionar Arquivos
                    </button>
                  </div>
                </div>

                {/* Resultados da Triagem */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Documentos Triados Recentemente</h3>
                  <div className="space-y-3">
                    {[
                      { nome: 'TR_Aquisicao_Material_Esportivo.pdf', tipo: 'Termo de Referência', classe: 'Licitação', confianca: 98, pendencias: 0, risco: 'Baixo', tamanho: '2.4 MB', data: 'Há 5 min' },
                      { nome: 'Parecer_Juridico_Convenio_015.pdf', tipo: 'Parecer Jurídico', classe: 'Jurídico', confianca: 96, pendencias: 1, risco: 'Médio', tamanho: '1.8 MB', data: 'Há 15 min' },
                      { nome: 'Relatorio_Prestacao_Contas_Q4.xlsx', tipo: 'Prestação de Contas', classe: 'Financeiro', confianca: 94, pendencias: 3, risco: 'Alto', tamanho: '5.2 MB', data: 'Há 32 min' },
                      { nome: 'ETP_Centro_Esportivo_Norte.docx', tipo: 'Estudo Técnico', classe: 'Planejamento', confianca: 97, pendencias: 0, risco: 'Baixo', tamanho: '3.1 MB', data: 'Há 1h' },
                      { nome: 'Ata_Registro_Precos_2026.pdf', tipo: 'Ata de Registro', classe: 'Contratual', confianca: 99, pendencias: 0, risco: 'Baixo', tamanho: '890 KB', data: 'Há 2h' },
                    ].map((doc, idx) => (
                      <div key={idx} className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                        doc.risco === 'Alto' ? 'border-red-200 bg-red-50/30' :
                        doc.risco === 'Médio' ? 'border-yellow-200 bg-yellow-50/30' :
                        'border-slate-200 hover:border-violet-300'
                      }`}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-violet-600 flex-shrink-0" />
                              <p className="font-semibold text-slate-800 truncate">{doc.nome}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs px-2 py-0.5 bg-violet-100 text-violet-700 rounded font-medium">{doc.tipo}</span>
                              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{doc.classe}</span>
                              <span className="text-xs text-slate-500">{doc.tamanho}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-sm font-bold text-green-600">{doc.confianca}%</span>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              doc.risco === 'Alto' ? 'bg-red-100 text-red-700' :
                              doc.risco === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>Risco {doc.risco}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-slate-500">{doc.data}</span>
                            {doc.pendencias > 0 && (
                              <span className="text-amber-600 font-medium">{doc.pendencias} pendência(s)</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Ver Análise</button>
                            <button className="text-xs px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors">Histórico</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Painel Lateral */}
              <div className="space-y-4">
                {/* Categorias Detectadas */}
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Classificações por Categoria</h3>
                  <div className="space-y-2">
                    {[
                      { cat: 'Termos de Referência', qtd: 1245, cor: 'bg-violet-500' },
                      { cat: 'Pareceres Jurídicos', qtd: 892, cor: 'bg-blue-500' },
                      { cat: 'Prestação de Contas', qtd: 756, cor: 'bg-emerald-500' },
                      { cat: 'Estudos Técnicos', qtd: 534, cor: 'bg-amber-500' },
                      { cat: 'Contratos/Convênios', qtd: 423, cor: 'bg-pink-500' },
                      { cat: 'Outros', qtd: 312, cor: 'bg-slate-400' },
                    ].map((cat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${cat.cor}`}></div>
                        <span className="flex-1 text-xs text-slate-700">{cat.cat}</span>
                        <span className="text-xs font-semibold text-slate-600">{cat.qtd}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Processamento em Lote */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Processamento em Lote
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-slate-700">Lote #2026-047</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Processando</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-full animate-pulse" style={{ width: '67%' }}></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">134 de 200 documentos</p>
                    </div>
                    <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      + Novo Lote
                    </button>
                  </div>
                </div>

                {/* Configurações de IA */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Configurações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">Confiança mínima</span>
                      <span className="text-xs font-semibold text-violet-600">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">Revisão automática</span>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Ativo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">Alertas de risco</span>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Ativo</span>
                    </div>
                    <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium mt-2">
                      Configurações Avançadas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analise' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-violet-600" />
                  Análise de Conteúdo com NLP
                </h3>

                {/* Área de Análise */}
                <div className="mb-6">
                  <textarea
                    className="w-full h-32 p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                    placeholder="Cole o texto do documento aqui para análise de conteúdo, extração de entidades e identificação de cláusulas..."
                  ></textarea>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => { setAnalyzing(true); setTimeout(() => setAnalyzing(false), 2000); }}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <Brain className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
                      {analyzing ? 'Analisando...' : 'Analisar Texto'}
                    </button>
                    <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                      Carregar Documento
                    </button>
                  </div>
                </div>

                {/* Resultados da Análise */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700">Resultados da Última Análise</h4>

                  {/* Entidades Extraídas */}
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-3">Entidades Identificadas</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { tipo: 'Pessoa', valor: 'João da Silva', cor: 'bg-blue-100 text-blue-700' },
                        { tipo: 'Organização', valor: 'Secretaria de Esportes', cor: 'bg-green-100 text-green-700' },
                        { tipo: 'Data', valor: '15/03/2026', cor: 'bg-purple-100 text-purple-700' },
                        { tipo: 'Valor', valor: 'R$ 150.000,00', cor: 'bg-emerald-100 text-emerald-700' },
                        { tipo: 'Local', valor: 'São José dos Campos', cor: 'bg-amber-100 text-amber-700' },
                        { tipo: 'Contrato', valor: 'CT-2026-015', cor: 'bg-pink-100 text-pink-700' },
                      ].map((ent, idx) => (
                        <span key={idx} className={`text-xs px-2 py-1 rounded-full font-medium ${ent.cor}`}>
                          {ent.tipo}: {ent.valor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cláusulas Identificadas */}
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-3">Cláusulas Identificadas</p>
                    <div className="space-y-2">
                      {[
                        { clausula: 'Cláusula de Vigência', status: 'Conforme', ref: 'Art. 92, Lei 14.133/21' },
                        { clausula: 'Cláusula de Pagamento', status: 'Conforme', ref: 'Art. 141, Lei 14.133/21' },
                        { clausula: 'Cláusula de Garantia', status: 'Atenção', ref: 'Art. 96, Lei 14.133/21' },
                        { clausula: 'Cláusula de Rescisão', status: 'Conforme', ref: 'Art. 137, Lei 14.133/21' },
                      ].map((cl, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-slate-100">
                          <div>
                            <span className="text-xs font-medium text-slate-700">{cl.clausula}</span>
                            <span className="text-xs text-slate-500 ml-2">({cl.ref})</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            cl.status === 'Conforme' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>{cl.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Painel Lateral */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Modelos de NLP Ativos</h3>
                  <div className="space-y-2">
                    {[
                      { modelo: 'Extração de Entidades', versao: 'v3.2', status: 'Online' },
                      { modelo: 'Classificação Documental', versao: 'v2.8', status: 'Online' },
                      { modelo: 'Análise de Sentimento', versao: 'v1.5', status: 'Online' },
                      { modelo: 'Detecção de Anomalias', versao: 'v2.1', status: 'Online' },
                    ].map((mod, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-violet-100">
                        <div>
                          <p className="text-xs font-medium text-slate-700">{mod.modelo}</p>
                          <p className="text-xs text-slate-500">{mod.versao}</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">{mod.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Estatísticas de Análise</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Entidades extraídas', valor: '12.456' },
                      { label: 'Cláusulas analisadas', valor: '8.921' },
                      { label: 'Inconsistências detectadas', valor: '234' },
                      { label: 'Tempo médio de análise', valor: '1.8s' },
                    ].map((stat, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">{stat.label}</span>
                        <span className="text-xs font-bold text-slate-800">{stat.valor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'riscos' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertIcon className="w-5 h-5 text-red-600" />
                  Alertas de Risco Detectados
                </h3>
                <div className="space-y-4">
                  {[
                    { doc: 'Relatorio_Prestacao_Contas_Q4.xlsx', risco: 'Alto', tipo: 'Inconsistência Financeira', desc: 'Divergência de R$ 45.000 entre valores declarados e comprovantes', recomendacao: 'Solicitar documentação complementar e realizar auditoria detalhada', data: 'Há 32 min' },
                    { doc: 'Contrato_Manutencao_Quadras.pdf', risco: 'Alto', tipo: 'Cláusula Ausente', desc: 'Ausência de cláusula de reajuste obrigatória conforme Lei 14.133/21', recomendacao: 'Incluir aditivo com cláusula de reajuste antes da assinatura', data: 'Há 1h' },
                    { doc: 'Parecer_Juridico_Convenio_015.pdf', risco: 'Médio', tipo: 'Prazo Irregular', desc: 'Prazo de vigência excede o limite permitido para o tipo de convênio', recomendacao: 'Revisar prazo e adequar conforme normativa vigente', data: 'Há 2h' },
                    { doc: 'TR_Aquisicao_Uniformes.docx', risco: 'Médio', tipo: 'Especificação Incompleta', desc: 'Falta detalhamento de especificações técnicas obrigatórias', recomendacao: 'Complementar especificações conforme modelo padrão', data: 'Há 3h' },
                    { doc: 'Edital_Pregao_012.pdf', risco: 'Baixo', tipo: 'Formatação', desc: 'Inconsistência na numeração de itens do edital', recomendacao: 'Revisar numeração antes da publicação', data: 'Há 5h' },
                  ].map((alerta, idx) => (
                    <div key={idx} className={`p-4 border rounded-lg ${
                      alerta.risco === 'Alto' ? 'border-red-300 bg-red-50' :
                      alerta.risco === 'Médio' ? 'border-yellow-300 bg-yellow-50' :
                      'border-slate-200 bg-slate-50'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <AlertIcon className={`w-5 h-5 ${
                            alerta.risco === 'Alto' ? 'text-red-600' :
                            alerta.risco === 'Médio' ? 'text-yellow-600' :
                            'text-slate-500'
                          }`} />
                          <span className="font-semibold text-slate-800">{alerta.tipo}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          alerta.risco === 'Alto' ? 'bg-red-200 text-red-800' :
                          alerta.risco === 'Médio' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>Risco {alerta.risco}</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-1">{alerta.doc}</p>
                      <p className="text-sm text-slate-700 mb-2">{alerta.desc}</p>
                      <div className="p-2 bg-white/70 rounded border border-slate-200 mb-3">
                        <p className="text-xs text-slate-600"><strong>Recomendação:</strong> {alerta.recomendacao}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">{alerta.data}</span>
                        <div className="flex gap-2">
                          <button className="text-xs px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors">Ignorar</button>
                          <button className="text-xs px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors">Resolver</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Painel Lateral */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Resumo de Riscos</h3>
                  <div className="space-y-3">
                    {[
                      { nivel: 'Alto', qtd: 12, cor: 'bg-red-500' },
                      { nivel: 'Médio', qtd: 23, cor: 'bg-yellow-500' },
                      { nivel: 'Baixo', qtd: 12, cor: 'bg-green-500' },
                    ].map((r, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${r.cor}`}></div>
                        <span className="flex-1 text-sm text-slate-700">{r.nivel}</span>
                        <span className="text-sm font-bold text-slate-800">{r.qtd}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Tipos de Risco Mais Comuns</h3>
                  <div className="space-y-2">
                    {[
                      { tipo: 'Inconsistência Financeira', qtd: 18 },
                      { tipo: 'Cláusula Ausente', qtd: 12 },
                      { tipo: 'Prazo Irregular', qtd: 9 },
                      { tipo: 'Documentação Incompleta', qtd: 8 },
                    ].map((t, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-violet-100">
                        <span className="text-xs text-slate-700">{t.tipo}</span>
                        <span className="text-xs font-semibold text-violet-600">{t.qtd}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <button className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    Exportar Relatório de Riscos
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'treinamento' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-violet-600" />
                    Treinamento e Melhoria Contínua
                  </h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Melhore a acurácia dos modelos fornecendo feedback sobre classificações e corrigindo erros detectados.
                  </p>

                  {/* Documentos para Revisão */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-700">Classificações para Revisão Humana</h4>
                    {[
                      { doc: 'Documento_Misto_023.pdf', classeSugerida: 'Termo de Referência', confianca: 72, alternativas: ['ETP', 'Parecer Técnico'] },
                      { doc: 'Anexo_Tecnico_Edital.pdf', classeSugerida: 'Especificação Técnica', confianca: 68, alternativas: ['Termo de Referência', 'Memorial Descritivo'] },
                      { doc: 'Relatorio_Atividades.docx', classeSugerida: 'Relatório de Execução', confianca: 75, alternativas: ['Prestação de Contas', 'Relatório Técnico'] },
                    ].map((rev, idx) => (
                      <div key={idx} className="p-4 border border-amber-200 bg-amber-50/50 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium text-slate-800">{rev.doc}</p>
                            <p className="text-xs text-slate-500 mt-1">Confiança: {rev.confianca}% (abaixo do limiar)</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">Classificação sugerida: <strong>{rev.classeSugerida}</strong></p>
                        <div className="flex gap-2 flex-wrap mb-3">
                          <button className="text-xs px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                            Confirmar
                          </button>
                          {rev.alternativas.map((alt, i) => (
                            <button key={i} className="text-xs px-3 py-1.5 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">
                              {alt}
                            </button>
                          ))}
                          <button className="text-xs px-3 py-1.5 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">
                            Outra...
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Métricas de Treinamento */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Evolução dos Modelos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { modelo: 'Classificação Documental', acuracia: 96.8, anterior: 94.2 },
                      { modelo: 'Extração de Entidades', acuracia: 94.5, anterior: 92.1 },
                      { modelo: 'Detecção de Riscos', acuracia: 91.2, anterior: 88.7 },
                      { modelo: 'Análise de Conformidade', acuracia: 89.8, anterior: 86.3 },
                    ].map((m, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm font-medium text-slate-700 mb-2">{m.modelo}</p>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-green-600">{m.acuracia}%</span>
                          <span className="text-xs text-green-600 mb-1">↑ {(m.acuracia - m.anterior).toFixed(1)}%</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Anterior: {m.anterior}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Painel Lateral */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Estatísticas de Treinamento</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Revisões realizadas', valor: '2.456' },
                      { label: 'Correções aplicadas', valor: '892' },
                      { label: 'Melhoria média', valor: '+3.2%' },
                      { label: 'Última atualização', valor: '19/01/2026' },
                    ].map((stat, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">{stat.label}</span>
                        <span className="text-xs font-bold text-slate-800">{stat.valor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Modelos Atualizados
                  </h3>
                  <div className="space-y-2">
                    {[
                      { modelo: 'Classificador v3.2', data: '19/01/2026' },
                      { modelo: 'Extrator NER v2.8', data: '15/01/2026' },
                      { modelo: 'Detector Riscos v2.1', data: '10/01/2026' },
                    ].map((mod, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-green-100">
                        <span className="text-xs text-slate-700">{mod.modelo}</span>
                        <span className="text-xs text-slate-500">{mod.data}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Ações</h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium">
                      Iniciar Retreinamento
                    </button>
                    <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                      Importar Dataset
                    </button>
                    <button className="w-full px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                      Exportar Métricas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    // Módulo Aplicativo Móvel e Inteligência Territorial - TR 6.10
    // App Android/iOS, offline, geolocalização, mapas interativos, formulários digitais
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
      central: { title: 'Módulo Central da Plataforma Digital', icon: Server, content: <CentralContent /> },
      planejamento: { title: 'Módulo de Planejamento e Formalização', icon: Target, content: <PlanejamentoContent /> },
      execucao: { title: 'Módulo de Execução e Monitoramento', icon: TrendingUp, content: <ExecucaoContent /> },
      bolsistas: { title: 'Módulo de Gestão de Bolsistas', icon: GraduationCap, content: <BolsistasContent /> },
      almoxarifado: { title: 'Módulo de Gestão de Almoxarifado', icon: Package, content: <AlmoxarifadoContent /> },
      financeiro: { title: 'Módulo Financeiro e Prestação de Contas', icon: Wallet, content: <FinanceiroContent /> },
      fiscalizacao: { title: 'Módulo de Fiscalização e Auditoria', icon: Shield, content: <FiscalizacaoContent /> },
      indicadores: { title: 'Módulo de Indicadores e Inteligência Analítica', icon: BarChart3, content: <IndicadoresContent /> },
      governanca: { title: 'Módulo de Governança e Transparência', icon: Lock, content: <GovernancaContent /> },
      territorial: { title: 'Módulo Aplicativo Móvel e Inteligência Territorial', icon: Map, content: <TerritorialContent /> },
      inteligencia_artificial: { title: 'Módulo de IA para Triagem Documental', icon: Brain, content: <IAContent /> },
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
            className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
              <div>
                <span className="font-bold text-white text-lg tracking-tight">Menu</span>
                <p className="text-blue-100 text-xs font-medium">SIGCOP</p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <div className="space-y-2 px-4">
                {/* Modules Section */}
                <div className="pb-3">
                  <div className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
                    Módulos
                  </div>
                </div>

                {/* Module Items */}
                {quickServices.map((service, index) => {
                   return (
                     <button
                       key={service.id}
                       onClick={() => { setCurrentPage(pageMap[index]); setIsSidebarOpen(false); }}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                         currentPage === pageMap[index]
                           ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white shadow-lg shadow-blue-500/10 border border-blue-400/30'
                           : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
                       }`}
                     >
                       <div className={`p-2 rounded-lg transition-all duration-200 ${
                         currentPage === pageMap[index]
                           ? 'bg-blue-500/30'
                           : 'bg-slate-700/50 group-hover:bg-blue-500/20'
                       }`}>
                         <service.icon className={`w-4 h-4 transition-all duration-200 ${
                           currentPage === pageMap[index] ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-400'
                         }`} />
                       </div>
                       <div className="flex-1 text-left">
                         <div className="font-semibold text-sm">{service.title}</div>
                         <div className="text-xs text-slate-400 mt-0.5">{service.desc}</div>
                       </div>
                       {currentPage === pageMap[index] && (
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                       )}
                     </button>
                   );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-t from-slate-900 to-transparent border-t border-slate-700/50">
              <button
                onClick={signOut}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span>Encerrar Sessão</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-gradient-to-r from-white via-blue-50 to-white/95 backdrop-blur-xl shadow-lg border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 -ml-2 hover:bg-blue-100/60 rounded-lg text-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 group"
              >
                <Menu className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
              </button>

              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-all">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent leading-tight tracking-tight">SIGCOP</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{user?.organization || 'Sistema de Gestão'}</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 sm:text-sm font-medium shadow-sm hover:shadow-md"
                  placeholder="Buscar módulos ou serviços..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2.5 text-slate-600 hover:bg-blue-100/60 rounded-lg transition-all duration-200 group">
                <Search className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
              </button>

              <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 bg-white hover:bg-blue-50 transition-all duration-200 rounded-full border border-slate-200 shadow-md hover:shadow-lg cursor-pointer group">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-1.5 rounded-full group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                  <User className="w-4 h-4 text-blue-700" />
                </div>
                <div className="pr-1">
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