-- Deletar módulos antigos
DELETE FROM modules;

-- Inserir 12 novos módulos do SIGCOP
INSERT INTO modules (name, description, icon, display_order, enabled) VALUES
  ('Módulo Central de Administração Contratual', 'Gerenciar o ciclo completo dos contratos e convênios, desde a proposição até o encerramento, com documentação e rastreabilidade completa.', 'Server', 1, true),
  ('Módulo de Cadastro e Classificação', 'Padronizar e classificar contratos e convênios por tipo, objeto, fonte e unidade gestora, garantindo uniformidade e fácil recuperação.', 'FileCheck', 2, true),
  ('Módulo de Planejamento e Formalização', 'Apoiar a elaboração de minutas, termos de referência, pareceres e tramitação processual de contratos e convênios.', 'Target', 3, true),
  ('Módulo de Execução e Monitoramento', 'Acompanhar entregas, metas, cronogramas e obrigações contratuais em tempo real, com alertas e indicadores de desempenho.', 'TrendingUp', 4, true),
  ('Módulo Financeiro e Prestação de Contas', 'Controlar repasses, saldos, pagamentos e gerar relatórios financeiros consolidados para auditoria e transparência.', 'Wallet', 5, true),
  ('Módulo de Aditivos e Reprogramações', 'Gerenciar alterações contratuais de prazo, valor e objeto, mantendo histórico completo de modificações.', 'FileSignature', 6, true),
  ('Módulo de Fiscalização e Auditoria', 'Registrar fiscalizações, visitas técnicas, pareceres e evidências de conformidade com as obrigações contratuais.', 'Shield', 7, true),
  ('Módulo de Comunicação e Notificações', 'Automatizar notificações, ofícios, alertas e comunicações com convenentes, gestores e partes interessadas.', 'Bell', 8, true),
  ('Módulo de Indicadores e Inteligência Analítica', 'Gerar dashboards, KPIs e relatórios estratégicos por contrato, área ou convenente para tomada de decisão.', 'BarChart3', 9, true),
  ('Módulo de Governança e Transparência', 'Publicar dados no portal da transparência, garantir rastreabilidade e conformidade com normas regulatórias.', 'Lock', 10, true),
  ('Módulo Aplicativo Móvel e Inteligência Territorial', 'Permitir registros de campo com geolocalização, evidências multimídia e visualização em mapas interativos.', 'Map', 11, true),
  ('Módulo de Inteligência Artificial para Triagem Documental', 'Classificação automática de documentos, sugestão de pendências e apoio inteligente à fiscalização.', 'Brain', 12, true);
