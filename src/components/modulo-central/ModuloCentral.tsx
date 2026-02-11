import { useState } from 'react';
import {
  Users, ShieldCheck, ClipboardList, Hash, ArrowRightLeft,
  FolderTree, GitBranch, Upload, Fingerprint,
  Workflow, Activity, ShieldAlert, Bell,
  Plug, Settings, BarChart3, FileText, Link2,
} from 'lucide-react';
import { AdminLayout, type SidebarGroup } from '../shared/AdminLayout';
import { M01Usuarios } from './M01Usuarios';
import { M02Perfis } from './M02Perfis';
import { M03TiposProcesso } from './M03TiposProcesso';
import { M04Protocolo } from './M04Protocolo';
import { M05Tramitacao } from './M05Tramitacao';
import { M06Classificacao } from './M06Classificacao';
import { M07Versionamento } from './M07Versionamento';
import { M08Digitalizacao } from './M08Digitalizacao';
import { M09Assinatura } from './M09Assinatura';
import { M10Workflows } from './M10Workflows';
import { M11Monitoramento } from './M11Monitoramento';
import { M12Auditoria } from './M12Auditoria';
import { M13Alertas } from './M13Alertas';
import { M14Integracoes } from './M14Integracoes';
import { M15Parametrizacao } from './M15Parametrizacao';
import { M16Relatorios } from './M16Relatorios';

type CentralPage =
  | 'usuarios' | 'perfis'
  | 'tipos-processo' | 'protocolo' | 'tramitacao'
  | 'classificacao' | 'versionamento' | 'digitalizacao' | 'assinatura'
  | 'workflows' | 'monitoramento'
  | 'auditoria' | 'alertas'
  | 'integracoes' | 'parametrizacao' | 'relatorios';

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Usuários e Acessos',
    icon: Users,
    items: [
      { id: 'usuarios', label: 'Lista de Usuários', icon: Users },
      { id: 'perfis', label: 'Perfis e Permissões', icon: ShieldCheck },
    ],
  },
  {
    label: 'Processos',
    icon: ClipboardList,
    items: [
      { id: 'tipos-processo', label: 'Tipos de Processo', icon: ClipboardList },
      { id: 'protocolo', label: 'Protocolo Eletrônico', icon: Hash },
      { id: 'tramitacao', label: 'Regras de Tramitação', icon: ArrowRightLeft },
    ],
  },
  {
    label: 'Gestão Documental',
    icon: FileText,
    items: [
      { id: 'classificacao', label: 'Classificação', icon: FolderTree },
      { id: 'versionamento', label: 'Versionamento', icon: GitBranch },
      { id: 'digitalizacao', label: 'Digitalização e Upload', icon: Upload },
      { id: 'assinatura', label: 'Assinatura Digital', icon: Fingerprint },
    ],
  },
  {
    label: 'Workflows',
    icon: Workflow,
    items: [
      { id: 'workflows', label: 'Editor de Workflows', icon: Workflow },
      { id: 'monitoramento', label: 'Monitoramento', icon: Activity },
    ],
  },
  {
    label: 'Auditoria e Segurança',
    icon: ShieldAlert,
    items: [
      { id: 'auditoria', label: 'Trilha de Auditoria', icon: ShieldAlert },
      { id: 'alertas', label: 'Alertas e Notificações', icon: Bell },
    ],
  },
  {
    label: 'Integrações',
    icon: Link2,
    items: [
      { id: 'integracoes', label: 'APIs e Integrações', icon: Plug },
      { id: 'parametrizacao', label: 'Parametrização Geral', icon: Settings },
      { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    ],
  },
];

const pageLabels: Record<CentralPage, { group: string; label: string }> = {
  usuarios: { group: 'Usuários e Acessos', label: 'Lista de Usuários' },
  perfis: { group: 'Usuários e Acessos', label: 'Perfis e Permissões' },
  'tipos-processo': { group: 'Processos', label: 'Tipos de Processo' },
  protocolo: { group: 'Processos', label: 'Protocolo Eletrônico' },
  tramitacao: { group: 'Processos', label: 'Regras de Tramitação' },
  classificacao: { group: 'Gestão Documental', label: 'Classificação' },
  versionamento: { group: 'Gestão Documental', label: 'Versionamento' },
  digitalizacao: { group: 'Gestão Documental', label: 'Digitalização e Upload' },
  assinatura: { group: 'Gestão Documental', label: 'Assinatura Digital' },
  workflows: { group: 'Workflows', label: 'Editor de Workflows' },
  monitoramento: { group: 'Workflows', label: 'Monitoramento' },
  auditoria: { group: 'Auditoria e Segurança', label: 'Trilha de Auditoria' },
  alertas: { group: 'Auditoria e Segurança', label: 'Alertas e Notificações' },
  integracoes: { group: 'Integrações', label: 'APIs e Integrações' },
  parametrizacao: { group: 'Integrações', label: 'Parametrização Geral' },
  relatorios: { group: 'Integrações', label: 'Relatórios' },
};

const pageComponents: Record<CentralPage, React.ReactNode> = {
  usuarios: <M01Usuarios />,
  perfis: <M02Perfis />,
  'tipos-processo': <M03TiposProcesso />,
  protocolo: <M04Protocolo />,
  tramitacao: <M05Tramitacao />,
  classificacao: <M06Classificacao />,
  versionamento: <M07Versionamento />,
  digitalizacao: <M08Digitalizacao />,
  assinatura: <M09Assinatura />,
  workflows: <M10Workflows />,
  monitoramento: <M11Monitoramento />,
  auditoria: <M12Auditoria />,
  alertas: <M13Alertas />,
  integracoes: <M14Integracoes />,
  parametrizacao: <M15Parametrizacao />,
  relatorios: <M16Relatorios />,
};

interface ModuloCentralProps {
  onBack: () => void;
}

export function ModuloCentral({ onBack }: ModuloCentralProps) {
  const [activePage, setActivePage] = useState<CentralPage>('usuarios');

  const currentLabel = pageLabels[activePage];
  const breadcrumb = ['Módulo Central', currentLabel.group, currentLabel.label];

  return (
    <AdminLayout
      title="Módulo Central"
      subtitle="Administração da Plataforma"
      sidebarGroups={sidebarGroups}
      activePage={activePage}
      onPageChange={(page) => setActivePage(page as CentralPage)}
      onBack={onBack}
      breadcrumb={breadcrumb}
    >
      {pageComponents[activePage]}
    </AdminLayout>
  );
}
