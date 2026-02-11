import { useState } from 'react';
import { Upload, FileText, ScanLine, Settings, Check, X as XIcon } from 'lucide-react';
import { StatsCard } from '../shared/StatsCard';
import { StatusBadge } from '../shared/StatusBadge';
import { PageHeader } from '../shared/RequisitoTag';

interface FormatoConfig {
  extensao: string;
  nome: string;
  ativo: boolean;
  maxMB: number;
}

const formatosIniciais: FormatoConfig[] = [
  { extensao: 'PDF', nome: 'Portable Document Format', ativo: true, maxMB: 50 },
  { extensao: 'JPG', nome: 'JPEG Image', ativo: true, maxMB: 10 },
  { extensao: 'PNG', nome: 'Portable Network Graphics', ativo: true, maxMB: 10 },
  { extensao: 'DOCX', nome: 'Microsoft Word', ativo: true, maxMB: 25 },
  { extensao: 'XLSX', nome: 'Microsoft Excel', ativo: true, maxMB: 25 },
  { extensao: 'ODP', nome: 'OpenDocument Presentation', ativo: false, maxMB: 30 },
  { extensao: 'ODT', nome: 'OpenDocument Text', ativo: false, maxMB: 25 },
];

export function M08Digitalizacao() {
  const [formatos, setFormatos] = useState(formatosIniciais);
  const [ocrAtivo, setOcrAtivo] = useState(true);
  const [indexacaoAuto, setIndexacaoAuto] = useState(true);
  const [tamanhoMaxGlobal, setTamanhoMaxGlobal] = useState('50');

  const toggleFormato = (ext: string) => {
    setFormatos((prev) =>
      prev.map((f) => f.extensao === ext ? { ...f, ativo: !f.ativo } : f)
    );
  };

  const ativos = formatos.filter((f) => f.ativo).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Digitalização e Upload"
        subtitle="Configuração de formatos aceitos, OCR automático, indexação e armazenamento de documentos"
        requisitos={['6.1.21', '6.1.26']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Formatos Aceitos" value={ativos} icon={FileText} color="blue" />
        <StatsCard label="Tamanho Máx." value={`${tamanhoMaxGlobal} MB`} icon={Upload} color="emerald" />
        <StatsCard label="OCR" value={ocrAtivo ? 'Ativo' : 'Inativo'} icon={ScanLine} color={ocrAtivo ? 'purple' : 'slate'} />
        <StatsCard label="Docs Digitalizados" value={342} icon={FileText} color="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formatos Aceitos */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" /> Formatos Aceitos
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {formatos.map((f) => (
              <div key={f.extensao} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFormato(f.extensao)}
                    className={`w-8 h-5 rounded-full transition-colors relative ${f.ativo ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${f.ativo ? 'left-3.5' : 'left-0.5'}`} />
                  </button>
                  <div>
                    <span className="font-mono text-sm font-semibold text-slate-800">.{f.extensao.toLowerCase()}</span>
                    <span className="text-xs text-slate-400 ml-2">{f.nome}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">Máx: {f.maxMB} MB</span>
                  {f.ativo ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XIcon className="w-4 h-4 text-slate-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configurações */}
        <div className="space-y-6">
          {/* OCR */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <ScanLine className="w-4 h-4 text-slate-500" /> Configuração de OCR
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">OCR Automático</p>
                  <p className="text-xs text-slate-500">Reconhecimento óptico de caracteres em documentos digitalizados</p>
                </div>
                <button
                  onClick={() => setOcrAtivo(!ocrAtivo)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${ocrAtivo ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${ocrAtivo ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              {ocrAtivo && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge label="Motor: Tesseract 5.0" variant="info" dot={false} />
                    <StatusBadge label="PT-BR + EN" variant="neutral" dot={false} />
                  </div>
                  <p className="text-xs text-blue-700">O OCR extrai texto de imagens e PDFs escaneados, permitindo busca full-text nos documentos.</p>
                </div>
              )}
            </div>
          </div>

          {/* Indexação */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-500" /> Indexação e Limites
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">Indexação Automática</p>
                  <p className="text-xs text-slate-500">Metadados extraídos automaticamente ao fazer upload</p>
                </div>
                <button
                  onClick={() => setIndexacaoAuto(!indexacaoAuto)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${indexacaoAuto ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${indexacaoAuto ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tamanho Máximo Global (MB)</label>
                <input
                  type="number"
                  value={tamanhoMaxGlobal}
                  onChange={(e) => setTamanhoMaxGlobal(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
