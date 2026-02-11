import { useState } from 'react';
import { FolderTree, ChevronRight, ChevronDown, Plus, FileText } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { FormModal, type FieldConfig } from '../shared/FormModal';
import { PageHeader } from '../shared/RequisitoTag';

interface TreeNode {
  id: string;
  nome: string;
  tipo: 'categoria' | 'subcategoria' | 'documento';
  metadados?: string[];
  formatos?: string[];
  retencao?: string;
  children?: TreeNode[];
}

const arvoreClassificacao: TreeNode[] = [
  {
    id: 'contratos', nome: 'Contratos e Convênios', tipo: 'categoria',
    children: [
      {
        id: 'contratos-servico', nome: 'Contratos de Serviço', tipo: 'subcategoria',
        children: [
          { id: 'termo-contrato', nome: 'Termo de Contrato', tipo: 'documento', metadados: ['Número', 'Objeto', 'Vigência', 'Valor'], formatos: ['PDF', 'DOCX'], retencao: '10 anos' },
          { id: 'aditivo', nome: 'Termo Aditivo', tipo: 'documento', metadados: ['Nº Contrato Original', 'Tipo Aditivo', 'Valor'], formatos: ['PDF'], retencao: '10 anos' },
        ],
      },
      {
        id: 'convenios', nome: 'Convênios', tipo: 'subcategoria',
        children: [
          { id: 'termo-convenio', nome: 'Termo de Convênio', tipo: 'documento', metadados: ['Convenente', 'Objeto', 'Vigência', 'Valor'], formatos: ['PDF', 'DOCX'], retencao: '10 anos' },
          { id: 'plano-trabalho', nome: 'Plano de Trabalho', tipo: 'documento', metadados: ['Programa', 'Metas', 'Cronograma'], formatos: ['PDF', 'XLSX'], retencao: '10 anos' },
        ],
      },
    ],
  },
  {
    id: 'planejamento', nome: 'Documentos de Planejamento', tipo: 'categoria',
    children: [
      {
        id: 'estudos', nome: 'Estudos Técnicos', tipo: 'subcategoria',
        children: [
          { id: 'dod', nome: 'DOD - Documento de Oficialização de Demanda', tipo: 'documento', metadados: ['Requisitante', 'Objeto', 'Justificativa'], formatos: ['PDF', 'DOCX'], retencao: '5 anos' },
          { id: 'etp', nome: 'ETP - Estudo Técnico Preliminar', tipo: 'documento', metadados: ['Objeto', 'Análise de Mercado', 'Solução'], formatos: ['PDF', 'DOCX'], retencao: '5 anos' },
          { id: 'tr', nome: 'Termo de Referência', tipo: 'documento', metadados: ['Objeto', 'Especificações', 'Valor Estimado'], formatos: ['PDF', 'DOCX'], retencao: '10 anos' },
        ],
      },
    ],
  },
  {
    id: 'financeiro', nome: 'Documentos Financeiros', tipo: 'categoria',
    children: [
      {
        id: 'prestacao', nome: 'Prestação de Contas', tipo: 'subcategoria',
        children: [
          { id: 'relatorio-execucao', nome: 'Relatório de Execução', tipo: 'documento', metadados: ['Período', 'Programa', 'Valores'], formatos: ['PDF', 'XLSX'], retencao: '10 anos' },
          { id: 'nota-fiscal', nome: 'Nota Fiscal', tipo: 'documento', metadados: ['Número NF', 'CNPJ', 'Valor'], formatos: ['PDF', 'JPG', 'PNG'], retencao: '10 anos' },
        ],
      },
    ],
  },
  {
    id: 'fiscalizacao', nome: 'Documentos de Fiscalização', tipo: 'categoria',
    children: [
      {
        id: 'visitas', nome: 'Visitas Técnicas', tipo: 'subcategoria',
        children: [
          { id: 'relatorio-visita', nome: 'Relatório de Visita', tipo: 'documento', metadados: ['Local', 'Data', 'Fiscal', 'Ocorrências'], formatos: ['PDF'], retencao: '5 anos' },
          { id: 'parecer-tecnico', nome: 'Parecer Técnico', tipo: 'documento', metadados: ['Processo', 'Resultado', 'Recomendações'], formatos: ['PDF'], retencao: '10 anos' },
        ],
      },
    ],
  },
];

function TreeItem({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [expanded, setExpanded] = useState(level < 2);

  const hasChildren = node.children && node.children.length > 0;
  const bgColors = { categoria: 'bg-blue-500', subcategoria: 'bg-purple-500', documento: 'bg-emerald-500' };

  return (
    <div>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left ${level === 0 ? 'font-semibold' : ''}`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
        <span className={`w-2 h-2 rounded-full ${bgColors[node.tipo]} flex-shrink-0`} />
        <span className="text-sm text-slate-700">{node.nome}</span>
        {node.tipo === 'documento' && (
          <span className="text-xs text-slate-400 ml-auto">{node.retencao}</span>
        )}
      </button>
      {node.tipo === 'documento' && expanded && (
        <div className="ml-12 mr-4 mb-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-2" style={{ marginLeft: `${level * 20 + 48}px` }}>
          <div className="flex flex-wrap gap-1">
            <span className="text-slate-500 font-medium">Metadados:</span>
            {node.metadados?.map((m) => (
              <span key={m} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{m}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="text-slate-500 font-medium">Formatos:</span>
            {node.formatos?.map((f) => (
              <span key={f} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded">{f}</span>
            ))}
          </div>
          <div>
            <span className="text-slate-500 font-medium">Retenção:</span>{' '}
            <span className="text-slate-700">{node.retencao}</span>
          </div>
        </div>
      )}
      {hasChildren && expanded && node.children?.map((child) => (
        <TreeItem key={child.id} node={child} level={level + 1} />
      ))}
    </div>
  );
}

const classificacaoFormFields: FieldConfig[] = [
  { key: 'nome', label: 'Nome', required: true, placeholder: 'Ex: Contratos de Fornecimento' },
  { key: 'tipo', label: 'Tipo', type: 'select', required: true, options: [
    { value: 'categoria', label: 'Categoria' },
    { value: 'subcategoria', label: 'Subcategoria' },
    { value: 'documento', label: 'Tipo Documental' },
  ]},
  { key: 'retencao', label: 'Tempo de Retenção', type: 'select', options: [
    { value: '5 anos', label: '5 anos' },
    { value: '10 anos', label: '10 anos' },
    { value: '20 anos', label: '20 anos' },
    { value: 'Permanente', label: 'Permanente' },
  ]},
  { key: 'metadados', label: 'Metadados (separados por vírgula)', placeholder: 'Ex: Número, Objeto, Vigência, Valor' },
];

export function M06Classificacao() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  return (
    <div className="space-y-6">
      <PageHeader
        title="Classificação Documental"
        subtitle="Árvore de classificação hierárquica, metadados e políticas de retenção"
        requisitos={['1.1.27', '1.1.30']}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm border border-white/50"
        >
          <Plus className="w-4 h-4" /> Nova Classificação
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Categorias" value={4} icon={FolderTree} color="blue" />
        <StatsCard label="Tipos Documentais" value={8} icon={FileText} color="emerald" />
        <StatsCard label="Metadados Buscáveis" value={24} icon={FolderTree} color="purple" />
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Categoria</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Subcategoria</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Tipo Documental</span>
      </div>

      {/* Tree */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="divide-y divide-slate-100">
          {arvoreClassificacao.map((node) => (
            <TreeItem key={node.id} node={node} />
          ))}
        </div>
      </div>

      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setFormValues({}); }}
        title="Nova Classificação Documental"
        fields={classificacaoFormFields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onSubmit={() => { setModalOpen(false); setFormValues({}); }}
      />
    </div>
  );
}
