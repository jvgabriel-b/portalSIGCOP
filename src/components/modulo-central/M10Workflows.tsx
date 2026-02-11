import { useState } from 'react';
import { Workflow, Plus, Play, Pause, FileText, CheckCircle, AlertTriangle, Bell, Circle } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PageHeader } from '../shared/RequisitoTag';

interface WorkflowItem {
  id: string;
  nome: string;
  status: 'Ativo' | 'Rascunho' | 'Inativo';
  etapas: number;
  processosVinculados: number;
  ultimaEdicao: string;
}

const mockWorkflows: WorkflowItem[] = [
  { id: 'wf-contrato', nome: 'Fluxo Contratual', status: 'Ativo', etapas: 6, processosVinculados: 45, ultimaEdicao: '10/02/2026' },
  { id: 'wf-convenio', nome: 'Fluxo Convênio', status: 'Ativo', etapas: 8, processosVinculados: 23, ultimaEdicao: '08/02/2026' },
  { id: 'wf-planejamento', nome: 'Fluxo Planejamento', status: 'Ativo', etapas: 5, processosVinculados: 67, ultimaEdicao: '05/02/2026' },
  { id: 'wf-fiscalizacao', nome: 'Fluxo Fiscalização', status: 'Ativo', etapas: 4, processosVinculados: 38, ultimaEdicao: '03/02/2026' },
  { id: 'wf-beneficio', nome: 'Fluxo Benefício', status: 'Ativo', etapas: 5, processosVinculados: 120, ultimaEdicao: '01/02/2026' },
  { id: 'wf-aditivo', nome: 'Fluxo Aditivo', status: 'Rascunho', etapas: 4, processosVinculados: 0, ultimaEdicao: '28/01/2026' },
];

interface Etapa {
  id: string;
  tipo: 'inicio' | 'etapa' | 'condicao' | 'aprovacao' | 'notificacao' | 'fim';
  nome: string;
  responsavel: string;
  prazo: string;
}

const fluxoContratualEtapas: Etapa[] = [
  { id: '1', tipo: 'inicio', nome: 'Início do Processo', responsavel: 'Sistema', prazo: '-' },
  { id: '2', tipo: 'etapa', nome: 'Elaboração do TR', responsavel: 'Analista', prazo: '10 dias' },
  { id: '3', tipo: 'aprovacao', nome: 'Aprovação Técnica', responsavel: 'Gestor', prazo: '5 dias' },
  { id: '4', tipo: 'condicao', nome: 'Valor > R$100k?', responsavel: 'Sistema', prazo: '-' },
  { id: '5', tipo: 'aprovacao', nome: 'Análise Jurídica', responsavel: 'Jurídico', prazo: '10 dias' },
  { id: '6', tipo: 'notificacao', nome: 'Notificar Secretário', responsavel: 'Sistema', prazo: '-' },
  { id: '7', tipo: 'aprovacao', nome: 'Assinatura', responsavel: 'Secretário', prazo: '5 dias' },
  { id: '8', tipo: 'fim', nome: 'Processo Concluído', responsavel: 'Sistema', prazo: '-' },
];

const tipoConfig: Record<string, { bg: string; border: string; icon: typeof Play }> = {
  inicio: { bg: 'bg-emerald-50', border: 'border-emerald-300', icon: Play },
  etapa: { bg: 'bg-blue-50', border: 'border-blue-300', icon: FileText },
  condicao: { bg: 'bg-amber-50', border: 'border-amber-300', icon: AlertTriangle },
  aprovacao: { bg: 'bg-purple-50', border: 'border-purple-300', icon: CheckCircle },
  notificacao: { bg: 'bg-cyan-50', border: 'border-cyan-300', icon: Bell },
  fim: { bg: 'bg-slate-50', border: 'border-slate-300', icon: Circle },
};

export function M10Workflows() {
  const [selectedWf, setSelectedWf] = useState<string | null>('wf-contrato');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Editor de Workflows"
        subtitle="Criação visual de fluxos de trabalho configuráveis com etapas, condições e aprovações"
        requisitos={['6.1.10']}
      >
        <button className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Novo Workflow
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Workflows Ativos" value={mockWorkflows.filter((w) => w.status === 'Ativo').length} icon={Workflow} color="blue" />
        <StatsCard label="Total de Etapas" value={mockWorkflows.reduce((s, w) => s + w.etapas, 0)} icon={Workflow} color="emerald" />
        <StatsCard label="Processos Vinculados" value={mockWorkflows.reduce((s, w) => s + w.processosVinculados, 0)} icon={Workflow} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Workflows */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800">Workflows</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {mockWorkflows.map((wf) => (
              <button
                key={wf.id}
                onClick={() => setSelectedWf(wf.id)}
                className={`w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors ${
                  selectedWf === wf.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-slate-800 text-sm">{wf.nome}</p>
                  <StatusBadge
                    label={wf.status}
                    variant={wf.status === 'Ativo' ? 'success' : wf.status === 'Rascunho' ? 'warning' : 'danger'}
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{wf.etapas} etapas</span>
                  <span>{wf.processosVinculados} processos</span>
                  <span>{wf.ultimaEdicao}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Visual */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">
              {selectedWf ? mockWorkflows.find((w) => w.id === selectedWf)?.nome : 'Selecione um workflow'}
            </h3>
            {selectedWf && (
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">Salvar como Template</button>
                <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Editar Etapas</button>
              </div>
            )}
          </div>
          {selectedWf === 'wf-contrato' ? (
            <div className="p-6">
              {/* Legenda */}
              <div className="flex flex-wrap gap-3 mb-6 text-xs">
                {Object.entries(tipoConfig).map(([tipo, config]) => {
                  const Icon = config.icon;
                  return (
                    <span key={tipo} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${config.border} ${config.bg}`}>
                      <Icon className="w-3 h-3" /> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </span>
                  );
                })}
              </div>
              {/* Flow Visualization */}
              <div className="space-y-3">
                {fluxoContratualEtapas.map((etapa, idx) => {
                  const config = tipoConfig[etapa.tipo];
                  const Icon = config.icon;
                  return (
                    <div key={etapa.id}>
                      <div className={`flex items-center gap-4 p-4 rounded-xl border-2 ${config.border} ${config.bg} transition-all hover:shadow-md`}>
                        <div className="flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-sm">{etapa.nome}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                            <span>Responsável: {etapa.responsavel}</span>
                            {etapa.prazo !== '-' && <span>Prazo: {etapa.prazo}</span>}
                          </div>
                        </div>
                        <span className="text-xs font-mono text-slate-400">#{etapa.id}</span>
                      </div>
                      {idx < fluxoContratualEtapas.length - 1 && (
                        <div className="flex justify-center py-1">
                          <div className="w-0.5 h-4 bg-slate-300" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
              {selectedWf ? 'Clique em "Editar Etapas" para configurar este workflow' : 'Selecione um workflow à esquerda'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
