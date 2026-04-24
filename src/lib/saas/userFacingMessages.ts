type ValidationPayload = {
  message?: string;
  details?: Array<{
    field?: string;
    message?: string;
  }>;
};

function normalizeText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value instanceof Error) return value.message.trim();
  if (value === null || value === undefined) return "";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function lower(value: unknown): string {
  return normalizeText(value).toLowerCase();
}

export function summarizeValidationError(
  payload: ValidationPayload | undefined,
  fallbackMessage: string
): string {
  if (!payload?.details?.length) return fallbackMessage;

  const first = payload.details[0];
  const field = normalizeText(first?.field);
  const fieldLabel =
    field === "email"
      ? "email"
      : field === "name"
        ? "nome"
        : field === "password"
          ? "senha"
          : field === "planId"
            ? "plano"
            : field === "tokenCredits"
              ? "creditos"
              : "dados";

  const issue = lower(first?.message);
  if (issue.includes("email")) {
    return "Revise o email informado e tente novamente.";
  }
  if (field === "password" || issue.includes("6")) {
    return "Defina uma senha com pelo menos 6 caracteres para continuar.";
  }
  if (issue.includes("required") || issue.includes("obrigat")) {
    return `Preencha o campo de ${fieldLabel} para continuar.`;
  }

  return fallbackMessage;
}

export function friendlyPortalLoginError(message: unknown): string {
  const text = lower(message);

  if (text.includes("cliente nao encontrado")) {
    return "Nao encontramos uma conta com esse email. Revise o endereco informado ou faca seu cadastro.";
  }
  if (text.includes("invalidos") || text.includes("invalido")) {
    return "Nao conseguimos entrar com esse email e senha. Revise os dados ou redefina o acesso com o administrador.";
  }
  if (text.includes("sem senha") || text.includes("password")) {
    return "Esta conta ainda nao tem senha configurada para o portal. Peça ao administrador para cadastrar ou redefinir sua senha.";
  }

  return "Nao foi possivel entrar no portal agora. Tente novamente em instantes.";
}

export function friendlyPortalSessionError(message: unknown): string {
  const text = lower(message);

  if (text.includes("sem sessao")) {
    return "Sua sessao nao esta ativa no momento. Entre novamente para continuar.";
  }
  if (text.includes("sessao invalida")) {
    return "Sua sessao expirou por seguranca. Entre novamente para continuar.";
  }
  if (text.includes("api key ou email invalido")) {
    return "Nao foi possivel validar sua sessao. Entre novamente para recarregar os dados da conta.";
  }

  return "Nao foi possivel carregar a area do cliente agora. Tente novamente em instantes.";
}

export function friendlyCheckoutStartError(message: unknown): string {
  const text = lower(message);

  if (text.includes("nome e email")) {
    return "Informe nome e email para preparar sua assinatura.";
  }
  if (text.includes("preparar o cadastro")) {
    return "Nao conseguimos preparar seu cadastro agora. Tente novamente em instantes.";
  }
  if (text.includes("plano nao encontrado")) {
    return "O plano selecionado nao foi encontrado ou nao esta mais disponivel.";
  }
  if (text.includes("mercado pago ainda nao foi configurado")) {
    return "O checkout esta indisponivel neste ambiente porque o Mercado Pago ainda nao foi configurado.";
  }
  if (text.includes("access_token")) {
    return "O checkout ainda nao esta habilitado neste ambiente. Configure o Mercado Pago e tente novamente.";
  }
  if (text.includes("payer")) {
    return "Nao foi possivel montar os dados do pagamento. Revise os dados do cliente e tente novamente.";
  }

  return "Nao foi possivel iniciar o checkout agora. Tente novamente em instantes.";
}

export function friendlyCheckoutConfirmError(message: unknown): string {
  const text = lower(message);

  if (text.includes("mercado pago nao configurado")) {
    return "Nao conseguimos confirmar o pagamento neste ambiente porque o Mercado Pago ainda nao esta configurado.";
  }
  if (text.includes("pagamento nao encontrado")) {
    return "Nao localizamos esse pagamento. Se voce acabou de pagar, aguarde alguns instantes e tente novamente.";
  }
  if (text.includes("consultar o pagamento")) {
    return "Nao conseguimos consultar o pagamento agora. Aguarde alguns instantes e tente novamente.";
  }

  return "Nao foi possivel confirmar o pagamento agora. Tente novamente em instantes.";
}

export function friendlyMercadoPagoError(message: unknown): string {
  const text = lower(message);

  if (!text) {
    return "Falha ao falar com o Mercado Pago. Tente novamente em instantes.";
  }
  if (text.includes("invalid_token") || text.includes("access token")) {
    return "As credenciais do Mercado Pago estao invalidas ou incompletas neste ambiente.";
  }
  if (text.includes("payer")) {
    return "Os dados do pagador foram recusados pelo Mercado Pago. Revise nome e email e tente novamente.";
  }
  if (text.includes("collector")) {
    return "A conta do Mercado Pago deste ambiente nao esta pronta para receber pagamentos.";
  }
  if (text.includes("topic") || text.includes("payment")) {
    return "O Mercado Pago respondeu com uma falha na consulta do pagamento. Tente novamente em instantes.";
  }

  return (
    normalizeText(message) || "Falha ao falar com o Mercado Pago. Tente novamente em instantes."
  );
}

export function friendlyCheckoutStatusMessage(status: string | null | undefined): string {
  const normalized = (status || "").toLowerCase();

  if (normalized === "approved") {
    return "Pagamento aprovado. Sua conta ja pode ser atualizada com o novo ciclo.";
  }
  if (normalized === "pending" || normalized === "in_process") {
    return "Pagamento em analise. Assim que houver aprovacao, sua conta sera atualizada automaticamente.";
  }
  if (normalized === "rejected") {
    return "Pagamento recusado. Revise o metodo de pagamento e tente novamente.";
  }
  if (normalized === "cancelled" || normalized === "canceled") {
    return "Pagamento cancelado. Voce pode iniciar um novo checkout quando quiser.";
  }
  if (normalized === "expired") {
    return "O checkout expirou antes da confirmacao. Gere um novo pagamento para continuar.";
  }

  return "Status do pagamento atualizado.";
}

export function friendlyCustomerAdminError(message: unknown): string {
  const text = lower(message);

  if (text.includes("unique constraint failed")) {
    return "Ja existe um cliente cadastrado com esses dados principais. Revise email e identificadores antes de salvar.";
  }
  if (text.includes("customer not found")) {
    return "Cliente nao encontrado. Atualize a tela e tente novamente.";
  }

  return "Nao foi possivel concluir a operacao do cliente agora. Tente novamente em instantes.";
}

export function friendlyPlanAdminError(message: unknown): string {
  const text = lower(message);

  if (text.includes("missing plan id")) {
    return "Selecione um plano valido para continuar.";
  }
  if (text.includes("plan not found")) {
    return "Plano nao encontrado. Atualize a tela e tente novamente.";
  }
  if (text.includes("unique constraint failed")) {
    return "Ja existe um plano com esses dados principais. Ajuste o nome ou slug e tente novamente.";
  }

  return "Nao foi possivel concluir a operacao do plano agora. Tente novamente em instantes.";
}

export function friendlyBillingAdminError(): string {
  return "Nao foi possivel carregar os eventos financeiros agora. Tente novamente em instantes.";
}

export function friendlyPublicSignupError(message: unknown): string {
  const text = lower(message);

  if (text.includes("plano indisponivel")) {
    return "O plano selecionado nao esta disponivel neste momento.";
  }
  if (text.includes("unique constraint failed")) {
    return "Ja existe uma conta cadastrada com esse email. Entre no portal ou recupere o acesso.";
  }

  return "Nao foi possivel concluir o cadastro agora. Tente novamente em instantes.";
}
