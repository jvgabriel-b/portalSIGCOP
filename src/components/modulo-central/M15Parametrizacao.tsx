import { useState } from 'react';
import { Building2, Calendar, Settings, Plus, ShieldCheck } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { FormModal, type FieldConfig } from '../shared/FormModal';
import { PageHeader } from '../shared/RequisitoTag';

const unidadeFormFields: FieldConfig[] = [
  { key: 'nome', label: 'Nome da Unidade', required: true, placeholder: 'Ex: Departamento de Compras' },
  { key: 'sigla', label: 'Sigla', required: true, placeholder: 'Ex: DC' },
  { key: 'tipo', label: 'Tipo', type: 'select', required: true, options: [
    { value: 'Secretaria', label: 'Secretaria' },
    { value: 'Departamento', label: 'Departamento' },
    { value: 'Setor', label: 'Setor' },
  ]},
  { key: 'responsavel', label: 'Responsável', required: true, placeholder: 'Nome do responsável' },
];

const feriadoFormFields: FieldConfig[] = [
  { key: 'data', label: 'Data', required: true, placeholder: 'DD/MM/AAAA' },
  { key: 'nome', label: 'Nome do Feriado', required: true, placeholder: 'Ex: Dia da Consciência Negra' },
  { key: 'tipo', label: 'Tipo', type: 'select', required: true, options: [
    { value: 'Nacional', label: 'Nacional' },
    { value: 'Municipal', label: 'Municipal' },
    { value: 'Ponto Facultativo', label: 'Ponto Facultativo' },
  ]},
];

const unidades = [
  { id: 1, nome: 'Secretaria de Esportes e Qualidade de Vida', sigla: 'SEQV', tipo: 'Secretaria', responsavel: 'Secretário Municipal', status: 'Ativo' },
  { id: 2, nome: 'Departamento de Esportes', sigla: 'DE', tipo: 'Departamento', responsavel: 'Maria Santos', status: 'Ativo' },
  { id: 3, nome: 'Departamento de Qualidade de Vida', sigla: 'DQV', tipo: 'Departamento', responsavel: 'Ana Costa', status: 'Ativo' },
  { id: 4, nome: 'Setor de Licitações e Contratos', sigla: 'SLC', tipo: 'Setor', responsavel: 'João Silva', status: 'Ativo' },
  { id: 5, nome: 'Setor Financeiro', sigla: 'SF', tipo: 'Setor', responsavel: 'Fernanda Oliveira', status: 'Ativo' },
  { id: 6, nome: 'Setor de Fiscalização', sigla: 'SFISC', tipo: 'Setor', responsavel: 'Pedro Lima', status: 'Ativo' },
];

const feriados = [
  { data: '01/01/2026', nome: 'Confraternização Universal', tipo: 'Nacional' },
  { data: '16/02/2026', nome: 'Carnaval', tipo: 'Ponto Facultativo' },
  { data: '17/02/2026', nome: 'Carnaval', tipo: 'Ponto Facultativo' },
  { data: '03/04/2026', nome: 'Sexta-feira Santa', tipo: 'Nacional' },
  { data: '21/04/2026', nome: 'Tiradentes', tipo: 'Nacional' },
  { data: '01/05/2026', nome: 'Dia do Trabalho', tipo: 'Nacional' },
  { data: '04/06/2026', nome: 'Corpus Christi', tipo: 'Ponto Facultativo' },
  { data: '19/03/2026', nome: 'Aniversário de São José dos Campos', tipo: 'Municipal' },
  { data: '07/09/2026', nome: 'Independência do Brasil', tipo: 'Nacional' },
  { data: '12/10/2026', nome: 'Nossa Senhora Aparecida', tipo: 'Nacional' },
  { data: '02/11/2026', nome: 'Finados', tipo: 'Nacional' },
  { data: '15/11/2026', nome: 'Proclamação da República', tipo: 'Nacional' },
  { data: '25/12/2026', nome: 'Natal', tipo: 'Nacional' },
];

export function M15Parametrizacao() {
  const [abaAtiva, setAbaAtiva] = useState<'unidades' | 'calendario' | 'configuracoes' | 'lgpd'>('unidades');
  const [unidadeModalOpen, setUnidadeModalOpen] = useState(false);
  const [feriadoModalOpen, setFeriadoModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  return (
    <div className="space-y-6">
      <PageHeader
        title="Parametrização Geral"
        subtitle="Configurações globais da plataforma, unidades organizacionais, calendário e LGPD"
        requisitos={['6.1.11', '6.1.19']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Unidades Cadastradas" value={unidades.length} icon={Building2} color="blue" />
        <StatsCard label="Feriados 2026" value={feriados.length} icon={Calendar} color="purple" />
        <StatsCard label="Configs Ativas" value={8} icon={Settings} color="emerald" />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200">
          {[
            { id: 'unidades', label: 'Unidades Organizacionais', icon: Building2 },
            { id: 'calendario', label: 'Calendário Institucional', icon: Calendar },
            { id: 'configuracoes', label: 'Configurações Globais', icon: Settings },
            { id: 'lgpd', label: 'LGPD e Privacidade', icon: ShieldCheck },
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
          {abaAtiva === 'unidades' && (
            <div>
              <div className="flex justify-end mb-4">
                <button onClick={() => { setFormValues({}); setUnidadeModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" /> Nova Unidade
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Unidade</th>
                      <th className="px-4 py-3 font-semibold">Sigla</th>
                      <th className="px-4 py-3 font-semibold">Tipo</th>
                      <th className="px-4 py-3 font-semibold">Responsável</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {unidades.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-800">{u.nome}</td>
                        <td className="px-4 py-3"><span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{u.sigla}</span></td>
                        <td className="px-4 py-3"><span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{u.tipo}</span></td>
                        <td className="px-4 py-3 text-slate-600">{u.responsavel}</td>
                        <td className="px-4 py-3"><StatusBadge label={u.status} variant="success" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {abaAtiva === 'calendario' && (
            <div>
              <div className="flex justify-end mb-4">
                <button onClick={() => { setFormValues({}); setFeriadoModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" /> Novo Feriado
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Data</th>
                      <th className="px-4 py-3 font-semibold">Feriado</th>
                      <th className="px-4 py-3 font-semibold">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {feriados.map((f, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-mono text-sm text-slate-700">{f.data}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{f.nome}</td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            label={f.tipo}
                            variant={f.tipo === 'Nacional' ? 'info' : f.tipo === 'Municipal' ? 'success' : 'warning'}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {abaAtiva === 'configuracoes' && (
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Instituição</label>
                  <input type="text" defaultValue="Prefeitura Municipal de São José dos Campos" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Secretaria Responsável</label>
                  <input type="text" defaultValue="Secretaria de Esportes e Qualidade de Vida" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail do Sistema</label>
                  <input type="email" defaultValue="sigcop@sjc.sp.gov.br" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fuso Horário</label>
                  <select defaultValue="America/Sao_Paulo" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                    <option value="America/Sao_Paulo">América/São Paulo (UTC-3)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brasão da Instituição</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs">Brasão</div>
                    <button className="text-sm text-blue-600 hover:underline">Alterar imagem</button>
                  </div>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Salvar Configurações
              </button>
            </div>
          )}

          {abaAtiva === 'lgpd' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-800">Conformidade LGPD — Lei 13.709/2018</p>
                    <p className="text-sm text-emerald-700 mt-1">O SIGCOP atende integralmente à Lei Geral de Proteção de Dados Pessoais, garantindo transparência, segurança e direitos dos titulares.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { titulo: 'Consentimento e Base Legal', items: [
                    { label: 'Registro de consentimento por finalidade', ok: true },
                    { label: 'Base legal documentada (art. 7º)', ok: true },
                    { label: 'Política de privacidade publicada', ok: true },
                    { label: 'Termos de uso atualizados', ok: true },
                  ]},
                  { titulo: 'Direitos do Titular', items: [
                    { label: 'Acesso aos dados pessoais', ok: true },
                    { label: 'Correção de dados incompletos', ok: true },
                    { label: 'Eliminação de dados desnecessários', ok: true },
                    { label: 'Portabilidade de dados', ok: true },
                    { label: 'Revogação de consentimento', ok: true },
                  ]},
                  { titulo: 'Segurança e Governança', items: [
                    { label: 'Criptografia em trânsito (TLS 1.3)', ok: true },
                    { label: 'Criptografia em repouso (AES-256)', ok: true },
                    { label: 'Logs de acesso a dados pessoais', ok: true },
                    { label: 'Anonimização/pseudonimização', ok: true },
                    { label: 'Relatório de impacto (RIPD)', ok: true },
                  ]},
                  { titulo: 'Operacional', items: [
                    { label: 'DPO/Encarregado designado', ok: true },
                    { label: 'Canal de atendimento ao titular', ok: true },
                    { label: 'Prazo de resposta: 15 dias', ok: true },
                    { label: 'Inventário de dados pessoais', ok: true },
                    { label: 'Notificação de incidentes (ANPD)', ok: true },
                  ]},
                ].map((grupo) => (
                  <div key={grupo.titulo} className="bg-white rounded-xl border border-slate-200 p-4">
                    <h4 className="font-semibold text-slate-800 text-sm mb-3">{grupo.titulo}</h4>
                    <div className="space-y-2">
                      {grupo.items.map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${item.ok ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                            ✓
                          </div>
                          <span className="text-sm text-slate-700">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 text-center">Última auditoria de conformidade LGPD: 01/02/2026 — Resultado: <span className="text-emerald-600 font-bold">100% conforme</span></p>
              </div>
            </div>
          )}
        </div>
      </div>

      <FormModal
        open={unidadeModalOpen}
        onClose={() => { setUnidadeModalOpen(false); setFormValues({}); }}
        title="Nova Unidade Organizacional"
        fields={unidadeFormFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setUnidadeModalOpen(false); setFormValues({}); }}
      />

      <FormModal
        open={feriadoModalOpen}
        onClose={() => { setFeriadoModalOpen(false); setFormValues({}); }}
        title="Novo Feriado"
        fields={feriadoFormFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setFeriadoModalOpen(false); setFormValues({}); }}
      />
    </div>
  );
}
