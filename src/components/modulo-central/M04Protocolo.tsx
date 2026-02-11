import { useState } from 'react';
import { Hash, RefreshCw, Eye } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PageHeader } from '../shared/RequisitoTag';

export function M04Protocolo() {
  const [formato, setFormato] = useState('PROC-AAAA/NNNN');
  const [prefixo, setPrefixo] = useState('PROC');
  const [separador, setSeparador] = useState('-');
  const [sequencial, setSequencial] = useState('anual');

  const anoAtual = new Date().getFullYear();
  const preview = formato
    .replace('PROC', prefixo)
    .replace('AAAA', String(anoAtual))
    .replace('NNNN', '0042');

  const regrasAbertura = [
    { tipo: 'Contrato', quemPodeProtocolar: 'Gestor, Analista', status: 'Ativo' },
    { tipo: 'Convênio', quemPodeProtocolar: 'Gestor', status: 'Ativo' },
    { tipo: 'Planejamento', quemPodeProtocolar: 'Gestor, Analista', status: 'Ativo' },
    { tipo: 'Fiscalização', quemPodeProtocolar: 'Fiscal, Gestor', status: 'Ativo' },
    { tipo: 'Bolsa Esportiva', quemPodeProtocolar: 'Analista, Gestor', status: 'Ativo' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Protocolo Eletrônico"
        subtitle="Configuração de numeração automática e regras de abertura por tipo de processo"
        requisitos={['1.1.20']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Protocolos em 2026" value={42} icon={Hash} color="blue" />
        <StatsCard label="Último Número" value={preview} icon={Hash} color="emerald" />
        <StatsCard label="Tipos Habilitados" value={5} icon={Hash} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuração de Formato */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Hash className="w-4 h-4 text-slate-500" /> Formato de Numeração
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Prefixo</label>
              <input
                type="text"
                value={prefixo}
                onChange={(e) => setPrefixo(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                maxLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Separador</label>
              <select
                value={separador}
                onChange={(e) => setSeparador(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="-">Hífen ( - )</option>
                <option value="/">Barra ( / )</option>
                <option value=".">Ponto ( . )</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sequencial</label>
              <select
                value={sequencial}
                onChange={(e) => setSequencial(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="anual">Reinicia por ano</option>
                <option value="contínuo">Contínuo (nunca reinicia)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Formato Padrão</label>
              <input
                type="text"
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
              />
              <p className="text-xs text-slate-400 mt-1">Use: PROC=prefixo, AAAA=ano, NNNN=sequencial</p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-500" /> Preview
              </h3>
            </div>
            <div className="p-5">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <p className="text-xs text-blue-600 font-medium mb-2">Próximo número gerado:</p>
                <p className="text-3xl font-bold text-blue-800 font-mono">{preview}</p>
                <p className="text-xs text-blue-500 mt-2">Sequencial {sequencial === 'anual' ? `reinicia em ${anoAtual + 1}` : 'contínuo'}</p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Formato</span>
                  <span className="font-mono text-slate-700">{formato}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Prefixo</span>
                  <span className="font-semibold">{prefixo}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Tipo de Sequencial</span>
                  <span className="font-semibold capitalize">{sequencial}</span>
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 w-full justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition-colors">
            <RefreshCw className="w-4 h-4" /> Salvar Configurações
          </button>
        </div>
      </div>

      {/* Regras de Abertura */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-800">Regras de Abertura por Tipo de Processo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 font-semibold">Tipo de Processo</th>
                <th className="px-5 py-3 font-semibold">Quem Pode Protocolar</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regrasAbertura.map((regra) => (
                <tr key={regra.tipo} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-medium text-slate-800">{regra.tipo}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {regra.quemPodeProtocolar.split(', ').map((p) => (
                        <span key={p} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge label={regra.status} variant="success" />
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
