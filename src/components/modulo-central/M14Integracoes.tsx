import { useState } from 'react';
import { Plug, RefreshCw, ExternalLink, Clock, AlertCircle, Cloud, Lock, ShieldCheck, Zap, HardDrive, TrendingUp } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PageHeader } from '../shared/RequisitoTag';

interface Integracao {
  id: string;
  nome: string;
  descricao: string;
  status: 'online' | 'parcial' | 'offline';
  ultimaSync: string;
  endpoint: string;
  versaoApi: string;
  chamadas24h: number;
  erros24h: number;
}

const mockIntegracoes: Integracao[] = [
  { id: 'sjv', nome: 'São José Viva', descricao: 'Portal de serviços municipais — dados de cidadãos e programas', status: 'online', ultimaSync: '10/02/2026 14:32', endpoint: 'https://api.sjviva.sjc.sp.gov.br/v2', versaoApi: 'v2.4.1', chamadas24h: 1245, erros24h: 2 },
  { id: 'govbr', nome: 'Gov.br (SSO)', descricao: 'Login Único do Governo Federal — autenticação de usuários', status: 'online', ultimaSync: '10/02/2026 14:30', endpoint: 'https://sso.acesso.gov.br/authorize', versaoApi: 'v1.0', chamadas24h: 342, erros24h: 0 },
  { id: 'sei', nome: 'SEI', descricao: 'Sistema Eletrônico de Informações — protocolo e tramitação', status: 'parcial', ultimaSync: '09/02/2026 08:15', endpoint: 'https://sei.sjc.sp.gov.br/api', versaoApi: 'v4.0.2', chamadas24h: 89, erros24h: 12 },
];

const mockLogs = [
  { id: 1, integracao: 'São José Viva', tipo: 'sucesso', data: '10/02/2026 14:32:00', endpoint: 'GET /cidadaos/search', tempo: '120ms', status: 200 },
  { id: 2, integracao: 'Gov.br', tipo: 'sucesso', data: '10/02/2026 14:30:15', endpoint: 'POST /authorize', tempo: '450ms', status: 200 },
  { id: 3, integracao: 'SEI', tipo: 'erro', data: '10/02/2026 14:25:00', endpoint: 'GET /processos/sync', tempo: '5000ms', status: 504 },
  { id: 4, integracao: 'São José Viva', tipo: 'sucesso', data: '10/02/2026 14:20:00', endpoint: 'POST /programas/inscrever', tempo: '230ms', status: 201 },
  { id: 5, integracao: 'SEI', tipo: 'erro', data: '10/02/2026 14:15:00', endpoint: 'POST /documentos/tramitar', tempo: '5000ms', status: 504 },
  { id: 6, integracao: 'Gov.br', tipo: 'sucesso', data: '10/02/2026 14:10:00', endpoint: 'GET /userinfo', tempo: '180ms', status: 200 },
];

const statusConfig = {
  online: { label: 'Online', variant: 'success' as const },
  parcial: { label: 'Parcial', variant: 'warning' as const },
  offline: { label: 'Offline', variant: 'danger' as const },
};

export function M14Integracoes() {
  const [selectedApi, setSelectedApi] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'logs'>('cards');

  const selected = selectedApi ? mockIntegracoes.find((i) => i.id === selectedApi) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="APIs REST e Integrações"
        subtitle="Monitoramento de integrações externas, APIs documentadas, criptografia e infraestrutura SaaS"
        requisitos={['6.1.1', '6.1.2', '6.1.6', '6.1.7', '6.1.13', '6.1.14', '6.1.17', '6.1.18']}
      >
        <div className="flex bg-white/20 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'cards' ? 'bg-white text-slate-800 shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            Integrações
          </button>
          <button
            onClick={() => setViewMode('logs')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'logs' ? 'bg-white text-slate-800 shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            Log de Comunicações
          </button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Integrações Online" value={mockIntegracoes.filter((i) => i.status === 'online').length} icon={Plug} color="emerald" />
        <StatsCard label="Chamadas (24h)" value={mockIntegracoes.reduce((s, i) => s + i.chamadas24h, 0)} icon={RefreshCw} color="blue" />
        <StatsCard label="Erros (24h)" value={mockIntegracoes.reduce((s, i) => s + i.erros24h, 0)} icon={AlertCircle} color="rose" />
        <StatsCard label="Disponibilidade" value="99.97%" icon={Plug} color="cyan" trend="SLA 99.9%" trendUp />
      </div>

      {/* Painel de Infraestrutura SaaS — Evidências 6.1.1, 6.1.6, 6.1.7, 6.1.13, 6.1.14, 6.1.18 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-800 to-slate-700">
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">Infraestrutura SaaS em Nuvem</h3>
          <p className="text-slate-300 text-xs mt-0.5">Monitoramento de arquitetura cloud, segurança e conformidade</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Arquitetura', valor: 'SaaS Cloud', tag: '6.1.1', cor: 'bg-blue-50 text-blue-700 border-blue-200', Icon: Cloud },
              { label: 'Criptografia Trânsito', valor: 'TLS 1.3', tag: '6.1.6', cor: 'bg-emerald-50 text-emerald-700 border-emerald-200', Icon: Lock },
              { label: 'Criptografia Repouso', valor: 'AES-256', tag: '6.1.7', cor: 'bg-emerald-50 text-emerald-700 border-emerald-200', Icon: ShieldCheck },
              { label: 'Disponibilidade', valor: '99.97%', tag: '6.1.13', cor: 'bg-purple-50 text-purple-700 border-purple-200', Icon: Zap },
              { label: 'Backup Automático', valor: 'Diário 02:00', tag: '6.1.14', cor: 'bg-amber-50 text-amber-700 border-amber-200', Icon: HardDrive },
              { label: 'Auto-Scaling', valor: 'Ativo (2-8)', tag: '6.1.18', cor: 'bg-cyan-50 text-cyan-700 border-cyan-200', Icon: TrendingUp },
            ].map((item) => (
              <div key={item.tag} className={`rounded-xl border p-3.5 ${item.cor} text-center`}>
                <item.Icon className="w-6 h-6" />
                <p className="text-xs font-semibold mt-2">{item.label}</p>
                <p className="text-sm font-bold mt-0.5">{item.valor}</p>
                <span className="text-[9px] font-mono mt-1.5 inline-block opacity-70">{item.tag}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-3">Uptime — Últimos 30 dias</p>
              <div className="flex gap-0.5">
                {Array.from({ length: 30 }, (_, i) => (
                  <div key={i} className={`flex-1 h-6 rounded-sm ${i === 15 ? 'bg-amber-400' : 'bg-emerald-400'}`} title={`Dia ${i + 1}`} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-400">
                <span>11/Jan</span>
                <span className="text-amber-600 font-semibold">1 incidente (99.94%)</span>
                <span>10/Fev</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-3">Último Backup</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Database Principal</span>
                  <span className="text-xs font-mono text-emerald-600 font-semibold">10/02/2026 02:00 ✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Documentos (S3)</span>
                  <span className="text-xs font-mono text-emerald-600 font-semibold">10/02/2026 02:15 ✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Configurações</span>
                  <span className="text-xs font-mono text-emerald-600 font-semibold">10/02/2026 02:05 ✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Retenção</span>
                  <span className="text-xs font-medium">30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockIntegracoes.map((integ) => {
            const sc = statusConfig[integ.status];
            return (
              <button
                key={integ.id}
                onClick={() => setSelectedApi(selectedApi === integ.id ? null : integ.id)}
                className={`text-left bg-white rounded-xl border shadow-sm p-5 transition-all hover:shadow-md ${
                  selectedApi === integ.id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2.5 rounded-lg">
                      <Plug className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{integ.nome}</p>
                      <p className="text-xs text-slate-400">v{integ.versaoApi}</p>
                    </div>
                  </div>
                  <StatusBadge label={sc.label} variant={sc.variant} />
                </div>
                <p className="text-xs text-slate-500 mb-3">{integ.descricao}</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Última sync</span>
                    <span className="text-slate-600">{integ.ultimaSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Chamadas (24h)</span>
                    <span className="font-semibold text-slate-700">{integ.chamadas24h}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Erros (24h)</span>
                    <span className={`font-semibold ${integ.erros24h > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{integ.erros24h}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Data/Hora</th>
                  <th className="px-5 py-3 font-semibold">Integração</th>
                  <th className="px-5 py-3 font-semibold">Endpoint</th>
                  <th className="px-5 py-3 font-semibold">Tempo</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockLogs.map((log) => (
                  <tr key={log.id} className={`hover:bg-slate-50/50 ${log.tipo === 'erro' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-5 py-3 text-xs font-mono text-slate-500">{log.data}</td>
                    <td className="px-5 py-3 font-medium text-slate-700">{log.integracao}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-600">{log.endpoint}</td>
                    <td className="px-5 py-3 text-xs">
                      <span className={log.tempo === '5000ms' ? 'text-red-600 font-semibold' : 'text-slate-600'}>{log.tempo}</span>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge
                        label={String(log.status)}
                        variant={log.status >= 200 && log.status < 300 ? 'success' : 'danger'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* API Details Panel */}
      {selected && viewMode === 'cards' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Detalhes: {selected.nome}</h3>
            <a href="#" className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
              <ExternalLink className="w-3.5 h-3.5" /> Documentação (Swagger)
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-400 text-xs mb-1">Endpoint</p>
              <p className="font-mono text-xs bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 break-all">{selected.endpoint}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">Versão da API</p>
              <p className="font-mono text-sm font-semibold">{selected.versaoApi}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">Última Sincronização</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm">{selected.ultimaSync}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
