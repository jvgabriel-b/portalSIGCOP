import { useState } from 'react';
import { ShieldCheck, Plus, ChevronRight, Lock, Unlock, Eye, Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { FormModal, type FieldConfig } from '../shared/FormModal';
import { PageHeader } from '../shared/RequisitoTag';

interface Perfil {
  id: string;
  nome: string;
  descricao: string;
  usuarios: number;
  cor: string;
  nivel: 'Crítico' | 'Alto' | 'Médio' | 'Básico';
}

const mockPerfis: Perfil[] = [
  { id: 'admin', nome: 'Administrador', descricao: 'Acesso total ao sistema, gerenciamento de configurações e usuários', usuarios: 1, cor: 'bg-red-500', nivel: 'Crítico' },
  { id: 'gestor', nome: 'Gestor', descricao: 'Visualiza tudo, aprova processos, não configura sistema', usuarios: 2, cor: 'bg-blue-500', nivel: 'Alto' },
  { id: 'analista', nome: 'Analista', descricao: 'Cria e edita processos e documentos, não aprova', usuarios: 2, cor: 'bg-emerald-500', nivel: 'Médio' },
  { id: 'fiscal', nome: 'Fiscal', descricao: 'Acesso a fiscalização e campo, registra visitas', usuarios: 2, cor: 'bg-amber-500', nivel: 'Médio' },
  { id: 'cidadao', nome: 'Cidadão', descricao: 'Portal público, inscrições em programas esportivos', usuarios: 1, cor: 'bg-slate-500', nivel: 'Básico' },
];

const modulos = [
  'Central', 'Planejamento', 'Execução', 'Bolsistas', 'Almoxarifado',
  'Financeiro', 'Fiscalização', 'Indicadores', 'Governança', 'Territorial', 'IA',
];

const permissoes = [
  { key: 'Visualizar', icon: Eye, color: 'text-blue-500' },
  { key: 'Criar', icon: Plus, color: 'text-emerald-500' },
  { key: 'Editar', icon: Pencil, color: 'text-amber-500' },
  { key: 'Excluir', icon: Trash2, color: 'text-red-500' },
  { key: 'Aprovar', icon: CheckCircle2, color: 'text-purple-500' },
];

const initialMatriz: Record<string, Record<string, boolean[]>> = {
  admin: Object.fromEntries(modulos.map((m) => [m, [true, true, true, true, true]])),
  gestor: Object.fromEntries(modulos.map((m) => [m, [true, true, true, false, true]])),
  analista: Object.fromEntries(modulos.map((m) => [m, [true, true, true, false, false]])),
  fiscal: {
    Central: [true, false, false, false, false],
    Planejamento: [true, false, false, false, false],
    'Execução': [true, true, true, false, false],
    Bolsistas: [true, false, false, false, false],
    Almoxarifado: [true, true, false, false, false],
    Financeiro: [true, false, false, false, false],
    'Fiscalização': [true, true, true, false, true],
    Indicadores: [true, false, false, false, false],
    'Governança': [true, false, false, false, false],
    Territorial: [true, true, true, false, false],
    IA: [true, false, false, false, false],
  },
  cidadao: Object.fromEntries(modulos.map((m) => [m, [true, false, false, false, false]])),
};

const nivelColors: Record<string, string> = {
  'Crítico': 'bg-red-50 text-red-700 border-red-200',
  'Alto': 'bg-orange-50 text-orange-700 border-orange-200',
  'Médio': 'bg-blue-50 text-blue-700 border-blue-200',
  'Básico': 'bg-slate-50 text-slate-600 border-slate-200',
};

const perfilFormFields: FieldConfig[] = [
  { key: 'nome', label: 'Nome do Perfil', required: true, placeholder: 'Ex: Coordenador' },
  { key: 'descricao', label: 'Descrição', type: 'textarea', required: true, placeholder: 'Descreva as responsabilidades deste perfil...' },
  { key: 'nivel', label: 'Nível de Acesso', type: 'select', required: true, options: [
    { value: 'Crítico', label: 'Crítico' },
    { value: 'Alto', label: 'Alto' },
    { value: 'Médio', label: 'Médio' },
    { value: 'Básico', label: 'Básico' },
  ]},
];

export function M02Perfis() {
  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null);
  const [matrizPermissoes, setMatrizPermissoes] = useState(initialMatriz);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const perfil = selectedPerfil ? mockPerfis.find((p) => p.id === selectedPerfil) : null;

  const totalPermissoes = perfil
    ? Object.values(matrizPermissoes[perfil.id] || {}).flat().filter(Boolean).length
    : 0;
  const totalPossivel = modulos.length * permissoes.length;

  const togglePermissao = (perfilId: string, modulo: string, permIdx: number) => {
    setMatrizPermissoes((prev) => {
      const next = { ...prev };
      const perfilMatrix = { ...next[perfilId] };
      const row = [...(perfilMatrix[modulo] || [false, false, false, false, false])];
      row[permIdx] = !row[permIdx];
      perfilMatrix[modulo] = row;
      next[perfilId] = perfilMatrix;
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Perfis e Permissões"
        subtitle="Gestão de perfis de acesso e matriz de permissões por módulo"
        requisitos={['1.1.4', '1.1.12', '6.1.1']}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm border border-white/50"
        >
          <Plus className="w-4 h-4" /> Novo Perfil
        </button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Perfis Ativos" value={mockPerfis.length} icon={ShieldCheck} color="blue" />
        <StatsCard label="Total de Usuários" value={mockPerfis.reduce((s, p) => s + p.usuarios, 0)} icon={ShieldCheck} color="emerald" />
        <StatsCard label="Módulos Protegidos" value={modulos.length} icon={Lock} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Perfis */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <h3 className="font-semibold text-slate-800">Perfis do Sistema</h3>
            <p className="text-xs text-slate-500 mt-0.5">Selecione para ver permissões</p>
          </div>
          <div className="divide-y divide-slate-100">
            {mockPerfis.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPerfil(p.id)}
                className={`w-full text-left px-5 py-4 hover:bg-slate-50 transition-all duration-200 flex items-center gap-3 ${
                  selectedPerfil === p.id ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'border-l-4 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${p.cor} flex items-center justify-center shadow-sm`}>
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800 text-sm">{p.nome}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${nivelColors[p.nivel]}`}>
                      {p.nivel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{p.descricao}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{p.usuarios}</span>
                  <ChevronRight className={`w-4 h-4 transition-colors ${selectedPerfil === p.id ? 'text-blue-500' : 'text-slate-300'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Matriz de Permissões */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">
                {perfil ? `Permissões: ${perfil.nome}` : 'Selecione um perfil'}
              </h3>
              {perfil && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {totalPermissoes} de {totalPossivel} permissões ativas ({Math.round((totalPermissoes / totalPossivel) * 100)}%) — Clique para alterar
                </p>
              )}
            </div>
            {perfil && (
              <div className="flex items-center gap-1.5">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${(totalPermissoes / totalPossivel) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          {perfil ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Módulo</th>
                    {permissoes.map((p) => (
                      <th key={p.key} className="px-3 py-3 text-center font-semibold">
                        <div className="flex flex-col items-center gap-1">
                          <p.icon className={`w-3.5 h-3.5 ${p.color}`} />
                          <span>{p.key}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {modulos.map((mod, modIdx) => (
                    <tr key={mod} className={`hover:bg-slate-50/50 ${modIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      <td className="px-4 py-3 font-medium text-slate-700">{mod}</td>
                      {(matrizPermissoes[perfil.id]?.[mod] || [false, false, false, false, false]).map((val, idx) => (
                        <td key={idx} className="px-3 py-3 text-center">
                          <button
                            onClick={() => togglePermissao(perfil.id, mod, idx)}
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border-2 transition-all duration-150 cursor-pointer ${
                              val
                                ? 'bg-emerald-50 border-emerald-400 hover:border-emerald-500 hover:bg-emerald-100'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100'
                            }`}
                          >
                            {val ? (
                              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-slate-300" />
                            )}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <ShieldCheck className="w-12 h-12 text-slate-200 mb-3" />
              <p className="text-sm font-medium">Selecione um perfil</p>
              <p className="text-xs text-slate-400 mt-1">Clique em um perfil à esquerda para visualizar suas permissões</p>
            </div>
          )}
        </div>
      </div>

      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setFormValues({}); }}
        title="Novo Perfil de Acesso"
        fields={perfilFormFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setModalOpen(false); setFormValues({}); }}
      />
    </div>
  );
}
