Claude, preciso que você reestruture completamente o meu frontend mantendo toda a arquitetura, pastas, arquivos, componentes e lógica base, mas adaptando o template atual para um novo sistema, com novo nome, novos módulos e novo propósito, utilizando como referência a tabela que vou descrever abaixo.

O código atual é apenas um template, e eu quero usá-lo como base, mas preciso que você substitua:

nome do sistema,

nomes de telas,

nomes de módulos,

textos padrões,

descrições,

itens da sidebar,

seções do dashboard,

SEM alterar:

estrutura,

rotas internas,

organização do projeto,

arquitetura geral,

fluxo técnico.

Você deve apenas adaptar tudo para o novo sistema.

🏷 1. Novo nome do sistema

Use este nome como nome oficial do sistema:

👉 SIG-CONVÊNIOS — Sistema Integrado de Gestão de Contratos, Convênios e Fiscalização

Esse nome deve substituir totalmente o nome do template, em:

título do site

tela de login

navbar

sidebar

dashboard

metadados (head)

configurações gerais

📦 2. Módulos oficiais que devem substituir os atuais (COPIE EXATAMENTE)

Os módulos do template NÃO podem continuar.
Substitua TODOS pelos módulos da tabela abaixo:

1. Módulo Central de Administração Contratual

Função: Gerenciar o ciclo completo dos contratos e convênios.

2. Módulo de Cadastro e Classificação

Função: Padronizar e classificar contratos e convênios por tipo, objeto, fonte e unidade gestora.

3. Módulo de Planejamento e Formalização

Função: Apoiar a elaboração de minutas, termos de referência, pareceres e tramitação.

4. Módulo de Execução e Monitoramento

Função: Acompanhar entregas, metas, cronogramas e obrigações contratuais.

5. Módulo Financeiro e Prestação de Contas

Função: Controlar repasses, saldos, pagamentos e gerar relatórios financeiros.

6. Módulo de Aditivos e Reprogramações

Função: Gerenciar alterações contratuais (prazo, valor, objeto) e reprogramações.

7. Módulo de Fiscalização e Auditoria

Função: Registrar fiscalizações, visitas técnicas, pareceres e evidências de conformidade.

8. Módulo de Comunicação e Notificações

Função: Automatizar notificações, ofícios, alertas e comunicações com convenentes e gestores.

9. Módulo de Indicadores e Inteligência Analítica

Função: Gerar dashboards, KPIs e relatórios estratégicos por contrato, área ou convenente.

10. Módulo de Governança e Transparência

Função: Publicar dados no portal da transparência, garantir rastreabilidade e conformidade com normas regulatórias.

11. Módulo Aplicativo Móvel e Inteligência Territorial

Função: Permitir registros de campo com geolocalização, evidências multimídia e visualização em mapas interativos.

12. Módulo de Inteligência Artificial para Triagem Documental

Função: Classificação automática de documentos, sugestão de pendências e apoio à fiscalização.

👉 Todos os componentes do template que listam módulos devem ser substituídos por estes.

🧠 3. Regras importantes para a adaptação

Você deve:

✔️ Manter a estrutura do projeto

Nada de mudar rotas, arquivos ou arquitetura.
Somente substituir conteúdo e adaptar UI.

✔️ Adaptar sidebar, dashboard, cards e telas internas

Todos devem refletir os novos módulos.

✔️ Atualizar ícones, textos e labels

Texto do template → substituir pelo texto do sistema real.

✔️ Ajustar navegação

Itens da sidebar devem ser renomeados para esses 12 módulos.

✔️ Manter responsividade e componentes existentes

Não quero recriar tudo, apenas refatorar para encaixar o novo sistema.

🔐 4. Integração com Supabase (Use essas variáveis reais)

Configure corretamente o Supabase com os seguintes valores:

VITE_SUPABASE_URL=https://ghckqjdnwkynwvnkdkfi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoY2txamRud2t5bnd2bmtka2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODEzNzAsImV4cCI6MjA3OTI1NzM3MH0.otB0gHcI9rVDAF1cFzzVUXJul_qVt3PO7h2rM-9-8Nc


Garanta:

login funcione,

autenticação funcione,

persistência funcione,

logout funcione,

carregamento condicional funcione.


O nome do sistema é SIGCOPI
--------------------


Atue como Tech Lead, UX/UI, Arquiteta de Software, e Especialista em Sistemas de Gestão Governamental, preenchendo cada módulo com o que ele DEVE e PRECISA conter dentro da plataforma.

Os módulos são exatamente estes (copie sem alterar):

1. Módulo Central de Administração Contratual

Função: Gerenciar o ciclo completo dos contratos e convênios.

2. Módulo de Cadastro e Classificação

Função: Padronizar e classificar contratos e convênios por tipo, objeto, fonte e unidade gestora.

3. Módulo de Planejamento e Formalização

Função: Apoiar a elaboração de minutas, termos de referência, pareceres e tramitação.

4. Módulo de Execução e Monitoramento

Função: Acompanhar entregas, metas, cronogramas e obrigações contratuais.

5. Módulo Financeiro e Prestação de Contas

Função: Controlar repasses, saldos, pagamentos e gerar relatórios financeiros.

6. Módulo de Aditivos e Reprogramações

Função: Gerenciar alterações contratuais (prazo, valor, objeto) e reprogramações.

7. Módulo de Fiscalização e Auditoria

Função: Registrar fiscalizações, visitas técnicas, pareceres e evidências de conformidade.

8. Módulo de Comunicação e Notificações

Função: Automatizar notificações, ofícios, alertas e comunicações com convenentes e gestores.

9. Módulo de Indicadores e Inteligência Analítica

Função: Gerar dashboards, KPIs e relatórios estratégicos por contrato, área ou convenente.

10. Módulo de Governança e Transparência

Função: Publicar dados no portal da transparência, garantir rastreabilidade e conformidade com normas regulatórias.

11. Módulo Aplicativo Móvel e Inteligência Territorial

Função: Permitir registros de campo com geolocalização, evidências multimídia e visualização em mapas interativos.

12. Módulo de Inteligência Artificial para Triagem Documental

Função: Classificação automática de documentos, sugestão de pendências, inconsistências ou riscos e apoio à fiscalização.



Implemente da forma que ao clicar neles apareca como se ja estive funcionando.

