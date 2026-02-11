import { useState } from 'react';
import { GitBranch, History, Settings } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PageHeader } from '../shared/RequisitoTag';

const versoes = [
  { id: 1, documento: 'TR-2026/0042 — Equipamentos Esportivos', versao: 'v3.2', autor: 'Ana Costa', data: '10/02/2026 14:28', tamanho: '2.4 MB', tipo: 'Edição de conteúdo' },
  { id: 2, documento: 'TR-2026/0042 — Equipamentos Esportivos', versao: 'v3.1', autor: 'Maria Santos', data: '09/02/2026 16:45', tamanho: '2.3 MB', tipo: 'Correção de valores' },
  { id: 3, documento: 'TR-2026/0042 — Equipamentos Esportivos', versao: 'v3.0', autor: 'Ana Costa', data: '08/02/2026 10:20', tamanho: '2.1 MB', tipo: 'Revisão completa' },
  { id: 4, documento: 'Contrato CT-2026-005', versao: 'v2.0', autor: 'João Silva', data: '07/02/2026 09:15', tamanho: '1.8 MB', tipo: 'Aditivo de prazo' },
  { id: 5, documento: 'Contrato CT-2026-005', versao: 'v1.0', autor: 'João Silva', data: '15/01/2026 11:30', tamanho: '1.5 MB', tipo: 'Versão original' },
  { id: 6, documento: 'ETP-2026/0038', versao: 'v1.1', autor: 'Ana Costa', data: '06/02/2026 14:00', tamanho: '890 KB', tipo: 'Atualização de preços' },
  { id: 7, documento: 'ETP-2026/0038', versao: 'v1.0', autor: 'Maria Santos', data: '01/02/2026 09:00', tamanho: '850 KB', tipo: 'Versão original' },
];

export function M07Versionamento() {
  const [modoVersionamento, setModoVersionamento] = useState('automatico');
  const [retencao, setRetencao] = useState('todas');
  const [maxVersoes, setMaxVersoes] = useState('50');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuração de Versionamento"
        subtitle="Controle de versões de documentos, política de retenção e recuperação de versões anteriores"
        requisitos={['6.1.8', '6.1.15']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Versões Armazenadas" value={versoes.length} icon={GitBranch} color="blue" />
        <StatsCard label="Documentos Versionados" value={3} icon={History} color="emerald" />
        <StatsCard label="Espaço Utilizado" value="12.8 MB" icon={Settings} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuração */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-500" /> Regras
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Modo de Versionamento</label>
              <div className="space-y-2">
                {[
                  { value: 'automatico', label: 'Automático', desc: 'Nova versão a cada edição salva' },
                  { value: 'manual', label: 'Manual', desc: 'Usuário decide quando versionar' },
                ].map((opt) => (
                  <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    modoVersionamento === opt.value ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="modo"
                      value={opt.value}
                      checked={modoVersionamento === opt.value}
                      onChange={(e) => setModoVersionamento(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Política de Retenção</label>
              <select
                value={retencao}
                onChange={(e) => setRetencao(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="todas">Manter todas as versões</option>
                <option value="ultimas">Manter últimas N versões</option>
              </select>
            </div>
            {retencao === 'ultimas' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Máximo de Versões</label>
                <input
                  type="number"
                  value={maxVersoes}
                  onChange={(e) => setMaxVersoes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            )}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
              Salvar Configurações
            </button>
          </div>
        </div>

        {/* Histórico de Versões */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" /> Histórico de Versões Recentes
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {versoes.map((v) => (
              <div key={v.id} className="px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg mt-0.5">
                      <GitBranch className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{v.documento}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded font-semibold">{v.versao}</span>
                        <span className="text-xs text-slate-400">por {v.autor}</span>
                        <span className="text-xs text-slate-400">{v.data}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{v.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{v.tamanho}</span>
                    <StatusBadge label={v.versao.startsWith('v1.0') || v.versao.startsWith('v2.0') || v.versao.startsWith('v3.0') ? 'Major' : 'Minor'} variant={v.versao.endsWith('.0') ? 'info' : 'neutral'} dot={false} />
                    <button className="text-xs text-blue-600 hover:underline">Restaurar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
