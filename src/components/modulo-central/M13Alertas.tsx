import { useState } from 'react';
import { Bell, Plus, Clock, FileText, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import { DataTable, type Column } from '../shared/DataTable';
import { FormModal, type FieldConfig } from '../shared/FormModal';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PageHeader } from '../shared/RequisitoTag';

interface RegraAlerta {
  id: number;
  evento: string;
  eventoIcone: string;
  antecedencia: string;
  canais: string[];
  destinatarios: string;
  status: 'Ativa' | 'Inativa';
  disparos30d: number;
}

const mockRegras: RegraAlerta[] = [
  { id: 1, evento: 'Prazo de contrato vencendo', eventoIcone: 'prazo', antecedencia: '15 dias', canais: ['E-mail', 'Sistema'], destinatarios: 'Gestor', status: 'Ativa', disparos30d: 12 },
  { id: 2, evento: 'SLA de tramitação excedido', eventoIcone: 'sla', antecedencia: '0 dias (imediato)', canais: ['E-mail', 'Push', 'Sistema'], destinatarios: 'Gestor + Analista', status: 'Ativa', disparos30d: 8 },
  { id: 3, evento: 'Documento pendente de assinatura', eventoIcone: 'documento', antecedencia: '3 dias', canais: ['E-mail', 'Sistema'], destinatarios: 'Assinante', status: 'Ativa', disparos30d: 15 },
  { id: 4, evento: 'Tramitação recebida', eventoIcone: 'tramitacao', antecedencia: 'Imediato', canais: ['Push', 'Sistema'], destinatarios: 'Destinatário', status: 'Ativa', disparos30d: 42 },
  { id: 5, evento: 'Prazo de prestação de contas', eventoIcone: 'prazo', antecedencia: '30 dias', canais: ['E-mail', 'Sistema'], destinatarios: 'Gestor + Financeiro', status: 'Ativa', disparos30d: 3 },
  { id: 6, evento: 'Falha de integração com API', eventoIcone: 'sla', antecedencia: 'Imediato', canais: ['E-mail'], destinatarios: 'Administrador', status: 'Ativa', disparos30d: 2 },
  { id: 7, evento: 'Certificado digital expirando', eventoIcone: 'documento', antecedencia: '30 dias', canais: ['E-mail', 'Sistema'], destinatarios: 'Administrador', status: 'Inativa', disparos30d: 0 },
];

const eventoIcones: Record<string, typeof Clock> = {
  prazo: Clock,
  sla: AlertTriangle,
  documento: FileText,
  tramitacao: ArrowRightLeft,
};

const formFields: FieldConfig[] = [
  { key: 'evento', label: 'Evento Gatilho', type: 'select', required: true, options: [
    { value: 'prazo_vencendo', label: 'Prazo vencendo' },
    { value: 'documento_pendente', label: 'Documento pendente' },
    { value: 'tramitacao_recebida', label: 'Tramitação recebida' },
    { value: 'sla_excedido', label: 'SLA excedido' },
  ]},
  { key: 'antecedencia', label: 'Antecedência', placeholder: 'Ex: 15 dias', required: true },
  { key: 'destinatarios', label: 'Destinatários', placeholder: 'Ex: Gestor, Analista', required: true },
];

export function M13Alertas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const columns: Column<RegraAlerta>[] = [
    { key: 'evento', header: 'Evento Gatilho', render: (row) => {
      const Icon = eventoIcones[row.eventoIcone] || Bell;
      return (
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-slate-500" />
          <span className="font-medium text-slate-800 text-sm">{row.evento}</span>
        </div>
      );
    }},
    { key: 'antecedencia', header: 'Antecedência', render: (row) => (
      <span className="text-sm">{row.antecedencia}</span>
    )},
    { key: 'canais', header: 'Canais', render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.canais.map((c) => (
          <span key={c} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            c === 'E-mail' ? 'bg-blue-50 text-blue-700' :
            c === 'Push' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-600'
          }`}>{c}</span>
        ))}
      </div>
    )},
    { key: 'destinatarios', header: 'Destinatários', render: (row) => (
      <span className="text-xs text-slate-600">{row.destinatarios}</span>
    )},
    { key: 'disparos30d', header: 'Disparos (30d)', render: (row) => (
      <span className="font-semibold text-slate-700">{row.disparos30d}</span>
    )},
    { key: 'status', header: 'Status', render: (row) => (
      <StatusBadge label={row.status} variant={row.status === 'Ativa' ? 'success' : 'danger'} />
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuração de Alertas"
        subtitle="Regras de notificação automática por e-mail, push e sistema para eventos críticos"
        requisitos={['6.1.25']}
      >
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Nova Regra
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Regras Ativas" value={mockRegras.filter((r) => r.status === 'Ativa').length} icon={Bell} color="blue" />
        <StatsCard label="Disparos no Mês" value={mockRegras.reduce((s, r) => s + r.disparos30d, 0)} icon={Bell} color="emerald" />
        <StatsCard label="Canais Configurados" value={3} icon={Bell} color="purple" />
        <StatsCard label="Eventos Monitorados" value={4} icon={Bell} color="amber" />
      </div>

      {/* Eventos disponíveis */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-blue-800 mb-2">Eventos Disponíveis para Alertas</p>
        <div className="flex flex-wrap gap-2">
          {['Prazo vencendo', 'Documento pendente', 'Tramitação recebida', 'SLA excedido', 'Falha de integração', 'Certificado expirando'].map((evt) => (
            <span key={evt} className="text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-full font-medium">{evt}</span>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockRegras}
        actions={[
          { label: 'Editar', onClick: () => {} },
          { label: 'Testar Disparo', onClick: () => {} },
          { label: 'Desativar', onClick: () => {}, className: 'text-red-600' },
        ]}
      />

      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setFormValues({}); }}
        title="Nova Regra de Alerta"
        fields={formFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setModalOpen(false); setFormValues({}); }}
      />
    </div>
  );
}
