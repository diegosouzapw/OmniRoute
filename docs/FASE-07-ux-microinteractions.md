# FASE 07 — UX e Microinterações

> **Prioridade:** 🟡 Moderado  
> **Estimativa de Complexidade:** Média (4–6 dias)  
> **Dimensões do Relatório:** D5 (Fluxos Ausentes), D6 (UX e Microinterações)  
> **Dependências:** FASE-05 (componentes decompostos facilitam adição de a11y e empty states)

---

## Objetivo

Elevar a qualidade da experiência do usuário no dashboard com sistema de notificações global, acessibilidade, breadcrumbs, empty states, e fluxo de recuperação de senha.

---

## Escopo Detalhado

### 7.1 — Sistema de Toasts/Notifications Global

**Origem no relatório:** D5 — Feedback de Ações Centralizado (🟡 Moderado)

#### Especificação Técnica

- **Criar** Zustand store `src/store/notificationStore.js`:
  ```javascript
  export const useNotificationStore = create((set) => ({
    notifications: [],
    addNotification: (notification) =>
      set((s) => ({
        notifications: [...s.notifications, { id: Date.now(), ...notification }],
      })),
    removeNotification: (id) =>
      set((s) => ({
        notifications: s.notifications.filter((n) => n.id !== id),
      })),
  }));
  ```
- **Criar** componente `src/shared/components/NotificationToast.js`:
  - Tipos: `success`, `error`, `warning`, `info`.
  - Auto-dismiss após 5s (configurável).
  - Animação de entrada/saída (slide + fade).
  - Posicionamento: top-right, stack vertical.
  - Ação de dismiss manual (botão X).
- **Integrar** no layout root do dashboard.
- **Refatorar** ≥ 5 call sites que usam feedback ad-hoc para usar o notification system.

#### Critérios de Aceite

- [ ] Toasts renderizam sobre o conteúdo sem afetar layout.
- [ ] Tipos visuais distintos (cores/ícones por tipo).
- [ ] Auto-dismiss funciona.
- [ ] ≥ 5 ações do dashboard usam o sistema centralizado.

---

### 7.2 — Auditoria de Acessibilidade (a11y)

**Origem no relatório:** D6 — Acessibilidade Insuficiente (🟡 Moderado)

#### Especificação Técnica

- **Executar** auditoria com `axe-core` ou `pa11y-ci`:
  - Dashboard Home
  - Providers page
  - Settings page
  - Login page
- **Corrigir** achados críticos:
  - Adicionar `role="dialog"` e `aria-modal="true"` em todos os modais.
  - Implementar focus trap em `OAuthModal.js` e `ProxyConfigModal.js`.
  - Adicionar `aria-label` em botões com ícone sem texto.
  - Garantir contraste mínimo 4.5:1 (WCAG AA).
- **Adicionar** hook `useFocusTrap.js` em `src/shared/hooks/`.
- **Integrar** `axe-core` como teste e2e de acessibilidade.

#### Critérios de Aceite

- [ ] Zero violações críticas de axe-core nas 4 páginas auditadas.
- [ ] Todos os modais com `role="dialog"` e focus trap.
- [ ] Navegação por teclado funciona em todas as páginas do dashboard.
- [ ] Teste e2e de a11y integrado no CI.

---

### 7.3 — Breadcrumbs no Dashboard

**Origem no relatório:** D6 — Breadcrumbs Ausentes (🟡 Moderado)

#### Especificação Técnica

- **Criar** componente `src/shared/components/Breadcrumbs.js`:
  - Gerar breadcrumbs automaticamente a partir do pathname.
  - Mapeamento de paths para labels amigáveis:
    ```javascript
    const PATH_LABELS = {
      dashboard: "Dashboard",
      providers: "Provedores",
      settings: "Configurações",
      usage: "Uso",
      combos: "Combos",
      tools: "Ferramentas",
      translator: "Tradutor",
      profile: "Perfil",
    };
    ```
  - Links clicáveis para cada nível.
  - Último item não clicável (página atual).
- **Integrar** no layout do dashboard (abaixo do header ou acima do conteúdo).

#### Critérios de Aceite

- [ ] Breadcrumbs renderizam em todas as páginas do dashboard.
- [ ] Cada nível é clicável (exceto o atual).
- [ ] Labels são amigáveis (não slugs).
- [ ] Responsividade: truncamento em telas pequenas.

---

### 7.4 — Empty States Guiados

**Origem no relatório:** D6 — Loading States e Empty States (🟡 Moderado)

#### Especificação Técnica

- **Criar** componente `src/shared/components/EmptyState.js`:
  - Props: `icon`, `title`, `description`, `actionLabel`, `onAction`.
  - Design: Ícone centrado, texto descritivo, CTA (call to action).
- **Implementar** empty states nas seções:
  1. **Providers** — "Nenhum provider conectado. Conecte seu primeiro provider."
  2. **Combos** — "Nenhum combo criado. Crie um combo para agrupar modelos."
  3. **Usage** — "Nenhum uso registrado ainda. Faça sua primeira requisição."
  4. **Request Logger** — "Nenhum request logado. Ative logging nas configurações."
- **Substituir** listas vazias por empty states.

#### Critérios de Aceite

- [ ] Todas as 4 seções mostram empty states em vez de listas vazias.
- [ ] Empty states incluem CTA relevante.
- [ ] Design consistente com o tema do dashboard.

---

### 7.5 — Fluxo de Recuperação de Senha

**Origem no relatório:** D5 — Fluxo de Recuperação de Senha (🟡 Moderado)

#### Especificação Técnica

- **Implementar** reset de senha via CLI:
  ```bash
  npx omniroute reset-password
  # Prompts for new password, updates DB directly
  ```
- **Criar** endpoint `/api/auth/reset-password` com token temporário (opcional, para uso via link interno).
- **Documentar** o processo de reset no README e na página de login como texto de ajuda.

#### Critérios de Aceite

- [ ] CLI permite resetar senha sem acesso ao dashboard.
- [ ] Processo documentado no README.
- [ ] Página de login mostra texto explicativo sobre recuperação.

---

### 7.6 — Teste de Responsividade

**Origem no relatório:** D6 — Responsividade (🟢 Menor)

#### Especificação Técnica

- **Criar** testes Playwright para viewport < 768px.
- **Verificar** páginas: Login, Dashboard, Providers, Settings.
- **Corrigir** overflow, truncamento, e usabilidade em mobile.

#### Critérios de Aceite

- [ ] Testes de responsividade passam em viewport 375px e 768px.
- [ ] Nenhum overflow horizontal em telas < 768px.
- [ ] Sidebar colapsável em mobile.

---

## Pré-Requisitos

- FASE-05 (componentes decompostos são mais fáceis de auditar e modificar).
- Dashboard funcional para testes visuais.

## Entregáveis

1. Sistema de toasts com Zustand store.
2. Auditoria a11y com correções.
3. Componente Breadcrumbs.
4. Empty states em 4 seções.
5. Reset de senha via CLI.
6. Testes de responsividade.

## Critérios de Conclusão da Fase

- [ ] Sistema de toasts funcional e integrado.
- [ ] Zero violações críticas de a11y.
- [ ] Breadcrumbs operacionais.
- [ ] Empty states implementados.

## Riscos Identificados

| Risco                                     | Probabilidade | Impacto | Mitigação                              |
| ----------------------------------------- | ------------- | ------- | -------------------------------------- |
| Focus trap interfere com UX               | Média         | Médio   | Testes manuais de cada modal           |
| Breadcrumbs incorretos em rotas dinâmicas | Baixa         | Baixo   | Mapeamento explícito de todas as rotas |
| CLI de reset requer acesso ao servidor    | Inevitável    | Baixo   | Documentar alternativas (acesso ao DB) |
