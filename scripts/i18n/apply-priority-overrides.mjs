#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");

const MESSAGE_OVERRIDES = {
  es: {
    "common.disabled": "Deshabilitado",
    "common.model": "Modelo",
    "common.account": "Cuenta",
    "common.time": "Hora",
    "common.columns": "Columnas",
    "common.newest": "Más reciente",
    "common.oldest": "Más antiguo",
    "common.yes": "Sí",
    "sidebar.combos": "Combos",
    "sidebar.docs": "Documentación",
    "sidebar.apiManager": "Gestor de API",
    "header.providerDescription": "Gestiona tus conexiones de proveedores de IA",
    "header.combos": "Combos",
    "header.comboDescription": "Combinaciones de modelos con fallback",
    "header.analytics": "Analíticas",
    "header.anthropicCompatible": "Compatible con Anthropic",
    "home.quickStartDesc":
      "Empieza en 4 pasos. Conecta proveedores, enruta modelos y monitorea todo.",
    "home.fullDocs": "Documentación completa",
    "home.step1Desc":
      "Ve a <endpoint>Endpoint</endpoint> -> Claves registradas. Genera una clave por entorno.",
    "home.step2Desc":
      "Agrega cuentas en <providers>Proveedores</providers>. Soporta OAuth, API Key y planes gratuitos.",
    "home.step3Title": "3. Configura tu cliente",
    "home.step3Desc": "Configura la URL base como {url} en tu IDE o cliente API.",
    "home.step4Desc":
      "Supervisa tokens, costos y errores en <logs>Registros</logs> y <analytics>Analíticas</analytics>.",
    "home.requestsShort": "{count} reqs",
    "auth.unifiedProxy": "Proxy de API de IA unificado",
    "auth.unifiedAiApiProxy": "Proxy de API de IA unificado",
    "auth.runOnboardingWizard":
      "Ejecuta el asistente de onboarding para configurar tu contraseña y conectar tu primer proveedor de IA.",
    "auth.stopServer": "Detén el servidor OmniRoute",
    "auth.copyUrlManual": "Copia la URL de la barra de direcciones y pégala en la aplicación.",
    "auth.methodManualDescription":
      "Elimina la contraseña de la base de datos y configura una nueva al iniciar:",
    "auth.setPasswordInYour": "Define una nueva contraseña en tu",
    "auth.restartServerWithNewPassword": "Reinicia el servidor; usará la nueva contraseña",
  },
  fr: {
    "sidebar.docs": "Documentation",
    "header.providerDescription": "Gérez vos connexions aux fournisseurs d'IA",
    "header.comboDescription": "Combinaisons de modèles avec bascule de secours",
    "header.analytics": "Analytique",
    "header.anthropicCompatible": "Compatible Anthropic",
    "home.quickStartDesc":
      "Démarrez en 4 étapes. Connectez des fournisseurs, routez les modèles et surveillez tout.",
    "home.fullDocs": "Documentation complète",
    "home.step1Desc":
      "Allez dans <endpoint>Endpoint</endpoint> -> Clés enregistrées. Générez une clé par environnement.",
    "home.step2Title": "2. Connecter des fournisseurs",
    "home.step2Desc":
      "Ajoutez des comptes dans <providers>Providers</providers>. Prend en charge OAuth, API Key et paliers gratuits.",
    "home.step3Title": "3. Configurer votre client",
    "home.step3Desc": "Définissez l'URL de base sur {url} dans votre IDE ou client API.",
    "home.step4Desc":
      "Suivez les tokens, les coûts et les erreurs dans <logs>Journaux des requêtes</logs> et <analytics>Analytique</analytics>.",
    "home.requestsShort": "{count} reqs",
    "auth.runOnboardingWizard":
      "Exécutez l'assistant d'onboarding pour configurer votre mot de passe et connecter votre premier fournisseur d'IA.",
    "auth.copyUrlManual": "Copiez l'URL depuis la barre d'adresse et collez-la dans l'application.",
    "auth.newPasswordPlaceholder": "votre_nouveau_mot_de_passe",
  },
  de: {
    "sidebar.dashboard": "Dashboard",
    "header.analytics": "Analysen",
    "header.anthropicCompatible": "Anthropic-kompatibel",
    "home.step1Desc":
      "Gehen Sie zu <endpoint>Endpoint</endpoint> -> Registrierte Schlüssel. Erstellen Sie einen Schlüssel pro Umgebung.",
    "home.step2Desc":
      "Fügen Sie Konten unter <providers>Providers</providers> hinzu. Unterstützt OAuth, API Key und kostenlose Stufen.",
    "home.step3Title": "3. Client konfigurieren",
    "home.step4Desc":
      "Verfolgen Sie Tokens, Kosten und Fehler in <logs>Anfrageprotokollen</logs> und <analytics>Analysen</analytics>.",
    "home.requestsShort": "{count} Anfr.",
    "auth.unifiedProxy": "Einheitlicher KI-API-Proxy",
    "auth.unifiedAiApiProxy": "Einheitlicher KI-API-Proxy",
    "auth.setPasswordInYour": "Legen Sie ein neues Passwort in Ihrer",
    "auth.newPasswordPlaceholder": "ihr_neues_passwort",
    "auth.copyUrlManual":
      "Kopieren Sie die URL aus der Adressleiste und fügen Sie sie in die Anwendung ein.",
  },
  ja: {
    "common.disabled": "無効",
    "common.columns": "列",
    "common.newest": "新しい順",
    "common.oldest": "古い順",
    "header.providerDescription": "AI プロバイダー接続を管理します",
    "header.comboDescription": "フォールバック付きのモデルコンボ",
    "header.analytics": "アナリティクス",
    "header.settingsDescription": "設定を管理します",
    "header.anthropicCompatible": "Anthropic 互換",
    "home.quickStartDesc":
      "4 ステップでセットアップ完了。プロバイダー接続、モデルルーティング、監視まで一括で行えます。",
    "home.fullDocs": "完全版ドキュメント",
    "home.step1Desc":
      "<endpoint>Endpoint</endpoint> -> Registered Keys に移動し、環境ごとに 1 つのキーを作成します。",
    "home.step2Title": "2. プロバイダーを接続",
    "home.step2Desc":
      "<providers>Providers</providers> でアカウントを追加します。OAuth、API Key、無料枠に対応しています。",
    "home.step3Title": "3. クライアントを設定",
    "home.step3Desc": "IDE または API クライアントの Base URL を {url} に設定します。",
    "home.step4Desc":
      "<logs>リクエストログ</logs> と <analytics>アナリティクス</analytics> でトークン・コスト・エラーを追跡します。",
    "home.requestsShort": "{count} 件",
    "auth.runOnboardingWizard":
      "オンボーディングウィザードを実行して、パスワード設定と最初の AI プロバイダー接続を行います。",
    "auth.stopServer": "OmniRoute サーバーを停止",
    "auth.copyUrlManual": "アドレスバーの URL をコピーしてアプリケーションに貼り付けてください。",
    "auth.methodManualDescription":
      "データベースからパスワードを削除し、起動時に新しいパスワードを設定します:",
    "auth.setPasswordInYour": "次のファイルで新しいパスワードを設定してください",
    "auth.newPasswordPlaceholder": "あなたの新しいパスワード",
    "auth.restartServerWithNewPassword": "サーバーを再起動すると新しいパスワードが適用されます",
  },
  ar: {
    "common.disabled": "غير مفعّل",
    "sidebar.providers": "المزوّدون",
    "sidebar.apiManager": "مدير API",
    "header.providers": "المزوّدون",
    "header.providerDescription": "إدارة اتصالات مزوّدي الذكاء الاصطناعي",
    "header.comboDescription": "مجموعات نماذج مع التبديل الاحتياطي",
    "header.anthropicCompatible": "متوافق مع Anthropic",
    "home.quickStartDesc": "ابدأ خلال 4 خطوات: وصّل المزوّدين، فعّل توجيه النماذج، وراقب كل شيء.",
    "home.fullDocs": "التوثيق الكامل",
    "home.step1Desc":
      "انتقل إلى <endpoint>Endpoint</endpoint> -> Registered Keys. أنشئ مفتاحًا واحدًا لكل بيئة.",
    "home.step2Desc":
      "أضف الحسابات في <providers>Providers</providers>. يدعم OAuth وAPI Key والخطط المجانية.",
    "home.step3Title": "3. اضبط عميلك",
    "home.step3Desc": "عيّن عنوان Base URL إلى {url} في IDE أو عميل API لديك.",
    "home.step4Desc":
      "تتبّع الرموز والتكلفة والأخطاء في <logs>سجلات الطلبات</logs> و<analytics>التحليلات</analytics>.",
    "home.requestsShort": "{count} طلب",
    "auth.unifiedProxy": "وكيل API موحّد للذكاء الاصطناعي",
    "auth.unifiedAiApiProxy": "وكيل API موحّد للذكاء الاصطناعي",
    "auth.copyUrlManual": "انسخ عنوان URL من شريط العنوان والصقه داخل التطبيق.",
    "auth.setPasswordInYour": "عيّن كلمة مرور جديدة في ملف",
    "auth.newPasswordPlaceholder": "كلمة_مرور_جديدة",
    "auth.restartServerWithNewPassword": "أعد تشغيل الخادم وسيتم استخدام كلمة المرور الجديدة",
  },
};

const README_PREFIX_OVERRIDES = {
  "README.es.md": "🌐 **Disponible en:**",
  "README.fr.md": "🌐 **Disponible en :**",
  "README.de.md": "🌐 **Verfügbar in:**",
  "README.ja.md": "🌐 **対応言語:**",
  "README.ar.md": "🌐 **متوفر باللغات:**",
};

const README_NAV_OVERRIDES = {
  "README.ja.md":
    "[🌐 ウェブサイト](https://omniroute.online) • [🚀 クイックスタート](#-クイックスタート) • [💡 主な機能](#-主な機能) • [📖 ドキュメント](#-ドキュメント) • [💰 料金](#-価格の概要) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)",
  "README.ar.md":
    "[🌐 الموقع](https://omniroute.online) • [🚀 البداية السريعة](#-بداية-سريعة) • [💡 الميزات](#-الميزات-الرئيسية) • [📖 التوثيق](#-التوثيق) • [💰 الأسعار](#-لمحة-سريعة-عن-الأسعار) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)",
};

function setByPath(target, pathStr, value) {
  const tokens = pathStr.split(".");
  let current = target;
  for (let i = 0; i < tokens.length - 1; i += 1) {
    current = current[tokens[i]];
  }
  current[tokens[tokens.length - 1]] = value;
}

async function applyMessageOverrides() {
  for (const [locale, overrides] of Object.entries(MESSAGE_OVERRIDES)) {
    const file = path.join(MESSAGES_DIR, `${locale}.json`);
    const data = JSON.parse(await fs.readFile(file, "utf8"));

    for (const [key, value] of Object.entries(overrides)) {
      setByPath(data, key, value);
    }

    await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  }
}

function replaceLineByPrefix(content, prefix, replacement) {
  const lines = content.split("\n");
  const idx = lines.findIndex((line) => line.startsWith(prefix));
  if (idx >= 0) {
    lines[idx] = replacement;
  }
  return lines.join("\n");
}

function removeEnglishPortugueseAnchorLine(content) {
  const lines = content.split("\n");
  const filtered = lines.filter(
    (line) =>
      !line.includes(
        "**[English](#-omniroute--the-free-ai-gateway)** | **[Português (BR)](#-omniroute--gateway-de-ia-gratuito)**"
      )
  );
  return filtered.join("\n");
}

function removeBrazilianAppendixSection(content) {
  const marker = "\n## 🇧🇷 OmniRoute";
  const idx = content.indexOf(marker);
  if (idx === -1) {
    return content;
  }
  return content.slice(0, idx).trimEnd() + "\n";
}

async function applyReadmeOverrides() {
  for (const [fileName, localizedPrefix] of Object.entries(README_PREFIX_OVERRIDES)) {
    const filePath = path.join(ROOT, fileName);
    let content = await fs.readFile(filePath, "utf8");

    content = content.replace("🌐 **Available in:**", localizedPrefix);

    if (README_NAV_OVERRIDES[fileName]) {
      content = replaceLineByPrefix(content, "[🌐 Website]", README_NAV_OVERRIDES[fileName]);
      content = removeEnglishPortugueseAnchorLine(content);
      content = removeBrazilianAppendixSection(content);
    }

    await fs.writeFile(filePath, content, "utf8");
  }
}

async function main() {
  await applyMessageOverrides();
  await applyReadmeOverrides();
  console.log("priority overrides applied");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
