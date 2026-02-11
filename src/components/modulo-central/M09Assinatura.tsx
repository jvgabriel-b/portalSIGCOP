import { useState } from 'react';
import { Fingerprint, ShieldCheck, FileCheck, Plus, Clock } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PageHeader } from '../shared/RequisitoTag';

const provedores = [
  { id: 1, nome: 'Certisign', status: 'Ativo', certificados: ['A1', 'A3'], ultimaValidacao: '10/02/2026 08:00' },
  { id: 2, nome: 'Serasa Experian', status: 'Ativo', certificados: ['A1', 'A3'], ultimaValidacao: '10/02/2026 08:00' },
  { id: 3, nome: 'AC SOLUTI', status: 'Ativo', certificados: ['A1'], ultimaValidacao: '10/02/2026 08:00' },
  { id: 4, nome: 'VALID Certificadora', status: 'Inativo', certificados: ['A3'], ultimaValidacao: '01/01/2026 08:00' },
];

const politicas = [
  { id: 1, tipoDocumento: 'Contrato', exigeAssinatura: true, assinantes: 'Gestor + Secretário', prazo: '5 dias' },
  { id: 2, tipoDocumento: 'Termo Aditivo', exigeAssinatura: true, assinantes: 'Gestor + Secretário', prazo: '3 dias' },
  { id: 3, tipoDocumento: 'Convênio', exigeAssinatura: true, assinantes: 'Gestor + Secretário + Convenente', prazo: '10 dias' },
  { id: 4, tipoDocumento: 'Termo de Referência', exigeAssinatura: true, assinantes: 'Analista + Gestor', prazo: '3 dias' },
  { id: 5, tipoDocumento: 'Relatório de Visita', exigeAssinatura: false, assinantes: '-', prazo: '-' },
  { id: 6, tipoDocumento: 'Nota Fiscal', exigeAssinatura: false, assinantes: '-', prazo: '-' },
];

const logAssinaturas = [
  { id: 1, documento: 'CT-2026-005', assinante: 'João Silva', tipo: 'A3', data: '10/02/2026 14:15', status: 'Válida', verificacao: 'ICP-Brasil' },
  { id: 2, documento: 'CT-2026-005', assinante: 'Secretário Municipal', tipo: 'A3', data: '10/02/2026 13:30', status: 'Válida', verificacao: 'ICP-Brasil' },
  { id: 3, documento: 'TR-2026/0042', assinante: 'Ana Costa', tipo: 'A1', data: '09/02/2026 16:00', status: 'Válida', verificacao: 'ICP-Brasil' },
  { id: 4, documento: 'TR-2026/0042', assinante: 'Maria Santos', tipo: 'A3', data: '09/02/2026 11:20', status: 'Válida', verificacao: 'ICP-Brasil' },
  { id: 5, documento: 'CV-2026-003', assinante: 'Gestor SEQV', tipo: 'A3', data: '08/02/2026 10:45', status: 'Expirada', verificacao: 'Certificado vencido' },
];

export function M09Assinatura() {
  const [abaAtiva, setAbaAtiva] = useState<'provedores' | 'politicas' | 'log'>('provedores');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assinatura Digital ICP-Brasil"
        subtitle="Provedores certificados, políticas de assinatura, certificados A1/A3 e log de assinaturas"
        requisitos={['6.1.5', '6.1.23']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Provedores Ativos" value={provedores.filter((p) => p.status === 'Ativo').length} icon={Fingerprint} color="blue" />
        <StatsCard label="Docs c/ Assinatura" value={4} icon={FileCheck} color="emerald" />
        <StatsCard label="Assinaturas no Mês" value={logAssinaturas.length} icon={ShieldCheck} color="purple" />
        <StatsCard label="Certificados Aceitos" value="A1, A3" icon={Fingerprint} color="cyan" />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200">
          {[
            { id: 'provedores', label: 'Provedores ICP-Brasil', icon: Fingerprint },
            { id: 'politicas', label: 'Políticas de Assinatura', icon: ShieldCheck },
            { id: 'log', label: 'Log de Assinaturas', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAbaAtiva(tab.id as typeof abaAtiva)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                abaAtiva === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {abaAtiva === 'provedores' && (
            <div>
              <div className="flex justify-end mb-4">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" /> Novo Provedor
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provedores.map((p) => (
                  <div key={p.id} className={`rounded-xl border p-5 ${p.status === 'Ativo' ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2.5 rounded-lg">
                          <Fingerprint className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{p.nome}</p>
                          <p className="text-xs text-slate-400">Última validação: {p.ultimaValidacao}</p>
                        </div>
                      </div>
                      <StatusBadge label={p.status} variant={p.status === 'Ativo' ? 'success' : 'danger'} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Certificados:</span>
                      {p.certificados.map((c) => (
                        <span key={c} className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full font-medium">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === 'politicas' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tipo de Documento</th>
                    <th className="px-4 py-3 font-semibold">Exige Assinatura</th>
                    <th className="px-4 py-3 font-semibold">Assinantes</th>
                    <th className="px-4 py-3 font-semibold">Prazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {politicas.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-800">{p.tipoDocumento}</td>
                      <td className="px-4 py-3">
                        <StatusBadge label={p.exigeAssinatura ? 'Obrigatória' : 'Não exige'} variant={p.exigeAssinatura ? 'warning' : 'neutral'} />
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{p.assinantes}</td>
                      <td className="px-4 py-3 text-slate-600">{p.prazo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {abaAtiva === 'log' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Documento</th>
                    <th className="px-4 py-3 font-semibold">Assinante</th>
                    <th className="px-4 py-3 font-semibold">Tipo</th>
                    <th className="px-4 py-3 font-semibold">Data</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Verificação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logAssinaturas.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{l.documento}</td>
                      <td className="px-4 py-3 text-slate-800">{l.assinante}</td>
                      <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full font-medium">{l.tipo}</span></td>
                      <td className="px-4 py-3 text-xs text-slate-500">{l.data}</td>
                      <td className="px-4 py-3">
                        <StatusBadge label={l.status} variant={l.status === 'Válida' ? 'success' : 'danger'} />
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{l.verificacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
