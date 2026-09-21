# OmniRoute — Design System & Visual Identity (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/DESIGN_SYSTEM.md) · 🇪🇹 [am](../../../am/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇦 [ar](../../../ar/docs/architecture/DESIGN_SYSTEM.md) · 🇦🇿 [az](../../../az/docs/architecture/DESIGN_SYSTEM.md) · 🇧🇬 [bg](../../../bg/docs/architecture/DESIGN_SYSTEM.md) · 🇧🇩 [bn](../../../bn/docs/architecture/DESIGN_SYSTEM.md) · 🇨🇿 [cs](../../../cs/docs/architecture/DESIGN_SYSTEM.md) · 🇩🇰 [da](../../../da/docs/architecture/DESIGN_SYSTEM.md) · 🇩🇪 [de](../../../de/docs/architecture/DESIGN_SYSTEM.md) · 🇬🇷 [el](../../../el/docs/architecture/DESIGN_SYSTEM.md) · 🇪🇪 [et](../../../et/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇷 [fa](../../../fa/docs/architecture/DESIGN_SYSTEM.md) · 🇫🇮 [fi](../../../fi/docs/architecture/DESIGN_SYSTEM.md) · 🇫🇷 [fr](../../../fr/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇪 [ga](../../../ga/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [gu](../../../gu/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇬 [ha](../../../ha/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇱 [he](../../../he/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [hi](../../../hi/docs/architecture/DESIGN_SYSTEM.md) · 🇭🇷 [hr](../../../hr/docs/architecture/DESIGN_SYSTEM.md) · 🇭🇺 [hu](../../../hu/docs/architecture/DESIGN_SYSTEM.md) · 🇦🇲 [hy](../../../hy/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇩 [id](../../../id/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇬 [ig](../../../ig/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇹 [it](../../../it/docs/architecture/DESIGN_SYSTEM.md) · 🇯🇵 [ja](../../../ja/docs/architecture/DESIGN_SYSTEM.md) · 🇬🇪 [ka](../../../ka/docs/architecture/DESIGN_SYSTEM.md) · 🇰🇭 [km](../../../km/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [kn](../../../kn/docs/architecture/DESIGN_SYSTEM.md) · 🇰🇷 [ko](../../../ko/docs/architecture/DESIGN_SYSTEM.md) · 🇱🇹 [lt](../../../lt/docs/architecture/DESIGN_SYSTEM.md) · 🇱🇻 [lv](../../../lv/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [ml](../../../ml/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [mr](../../../mr/docs/architecture/DESIGN_SYSTEM.md) · 🇲🇾 [ms](../../../ms/docs/architecture/DESIGN_SYSTEM.md) · 🇲🇹 [mt](../../../mt/docs/architecture/DESIGN_SYSTEM.md) · 🇲🇲 [my](../../../my/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇵 [ne](../../../ne/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇱 [nl](../../../nl/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇴 [no](../../../no/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [or](../../../or/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [pa](../../../pa/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇭 [phi](../../../phi/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇱 [pl](../../../pl/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇹 [pt](../../../pt/docs/architecture/DESIGN_SYSTEM.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/DESIGN_SYSTEM.md) · 🇷🇴 [ro](../../../ro/docs/architecture/DESIGN_SYSTEM.md) · 🇷🇺 [ru](../../../ru/docs/architecture/DESIGN_SYSTEM.md) · 🇱🇰 [si](../../../si/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇰 [sk](../../../sk/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇮 [sl](../../../sl/docs/architecture/DESIGN_SYSTEM.md) · 🇷🇸 [sr](../../../sr/docs/architecture/DESIGN_SYSTEM.md) · 🇸🇪 [sv](../../../sv/docs/architecture/DESIGN_SYSTEM.md) · 🇰🇪 [sw](../../../sw/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [ta](../../../ta/docs/architecture/DESIGN_SYSTEM.md) · 🇮🇳 [te](../../../te/docs/architecture/DESIGN_SYSTEM.md) · 🇹🇭 [th](../../../th/docs/architecture/DESIGN_SYSTEM.md) · 🇹🇷 [tr](../../../tr/docs/architecture/DESIGN_SYSTEM.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/DESIGN_SYSTEM.md) · 🇵🇰 [ur](../../../ur/docs/architecture/DESIGN_SYSTEM.md) · 🇺🇿 [uz](../../../uz/docs/architecture/DESIGN_SYSTEM.md) · 🇻🇳 [vi](../../../vi/docs/architecture/DESIGN_SYSTEM.md) · 🇳🇬 [yo](../../../yo/docs/architecture/DESIGN_SYSTEM.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/DESIGN_SYSTEM.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/DESIGN_SYSTEM.md)

---

> **Estado:** referencia — la estandarización descrita aquí está **implementada** (fases 1–6: fondo de cuadrícula, primitivas, centralización de colores de estado, token monoespaciado, migración de tokens de DataTable, focus-ring → accent, primitivas Checkbox/Textarea, `cn()` → tailwind-merge, cuadrícula en todas las pantallas independientes, contenedor de contenido fluido para 4K, superficies opacas de tablas de datos). Este documento es la descripción canónica de los tokens de diseño, los componentes y las convenciones del dashboard; la estructura por fases que aparece a continuación se conserva como justificación de cada decisión.
> **Alcance:** el dashboard de OmniRoute (`src/`) y el sitio de marketing (`_mono_repo/omnirouteSite/`) comparten **una única identidad visual**: el mismo fondo de cuadrícula tipo papel milimetrado (32px), los mismos tokens de color y componentes estandarizados.
>
> Notas prácticas para los responsables de mantenimiento:
>
> - Varios valores hexadecimales codificados directamente que aún permanecen son **intencionales** (terminal de consola siempre oscuro, trazos SVG de ReactFlow) y **NO** deben sustituirse por tokens.
> - Una cuadrícula "más grande" en una instancia en ejecución se debe a una compilación obsoleta, no al código: el tamaño de la cuadrícula es de 32px, idéntico al del sitio.
> - Los valores `--table-*` del tema oscuro son idénticos byte por byte a los valores rgba codificados directamente antes de la migración; el tema claro se corrigió (tenía un error que lo mantenía siempre oscuro debido a fallbacks de `var()` sin efecto).

---

## 1. Propósito

El sitio de marketing (`viral.omniroute.online`, `why.omniroute.online`, `omniroute.online`) y el dashboard del producto deben parecer **un único producto**. El sitio ya tomó prestada su paleta del dashboard; su `css/tokens.css` incluso dice _"La paleta refleja la del dashboard de OmniRoute (src/app/globals.css)"_. Por tanto, ambos ya están alineados aproximadamente en un 80 % en cuanto al color. Lo que falta en el dashboard:

1. El **fondo de cuadrícula tipo papel milimetrado** que el sitio utiliza en todas las páginas.
2. Algunos **tokens de diseño compartidos** que el sitio tiene, pero de los que carece el dashboard (escala de radios, gradiente de marca, `surface-2`, fuente monoespaciada).
3. **Coherencia a nivel de componentes**: varios componentes del dashboard eluden los tokens del tema mediante valores hex/rgba codificados directamente.

Este documento contiene el análisis y el plan.

---

## 2. Principios

- **Única fuente de verdad = `src/app/globals.css`.** El sitio refleja el dashboard, nunca al revés. Los nuevos tokens se incorporan primero a `globals.css`.
- **Tokens, nunca valores literales.** Los componentes consumen tokens semánticos (`bg-surface`, `text-primary`, `border-border`), nunca valores `#hex` sin procesar.
- **Sutil, no estridente.** La cuadrícula es un fondo tenue situado detrás del contenido; nunca debe reducir el contraste del texto ni competir visualmente con la interfaz.
- **Adaptado al tema.** Todo funciona tanto en `.dark` (la apariencia distintiva del producto) como en el tema claro.
- **Despliegue quirúrgico.** Primero se publican la cuadrícula y los tokens (bajo riesgo, gran visibilidad); después se limpian los componentes en varias fases.

---

## 3. Estado actual: qué está ya alineado y qué no

### 3.1 Colores: ya unificados ✅

Todos los colores de marca y las superficies ya coinciden con el sitio **por valor** (solo difieren los nombres; el dashboard usa el prefijo `--color-`). Verificado en `src/app/globals.css:30-128`:

| Concepto                           | Token del sitio (`tokens.css`)              | Token del dashboard (`globals.css`) | Coincidencia    |
| ---------------------------------- | ------------------------------------------- | ----------------------------------- | --------------- |
| primario                           | `--primary #e54d5e`                         | `--color-primary #e54d5e`           | ✅              |
| primario al pasar el cursor        | `--primary-hover #c93d4e`                   | `--color-primary-hover #c93d4e`     | ✅              |
| acento                             | `--accent #6366f1`                          | `--color-accent #6366f1`            | ✅              |
| acento 2                           | `--accent-2 #8b5cf6`                        | `--color-accent-hover #8b5cf6`      | ✅ (renombrado) |
| acento 3                           | `--accent-3 #a855f7`                        | `--color-accent-light #a855f7`      | ✅ (renombrado) |
| éxito / advertencia / error        | `#22c55e / #f59e0b / #ef4444`               | idéntico                            | ✅              |
| luces de tráfico                   | `#ff5f56 / #ffbd2e / #27c93f`               | idéntico                            | ✅              |
| fondo / superficie / borde oscuros | `#0b0e14 / #161b22 / rgba(255,255,255,.08)` | idéntico                            | ✅              |
| fondo / superficie / texto claros  | `#f9f9fb / #fff / #1a1a2e`                  | idéntico                            | ✅              |

**Conclusión:** no hay que realizar ninguna migración de colores. La identidad ya es compartida; la estamos _terminando_, no reconstruyendo.

### 3.2 Carencias: lo que le falta al dashboard

| Brecha                    | El sitio tiene                                                                           | Dashboard                                                               | Acción                  |
| ------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------- |
| **Fondo de cuadrícula**   | Papel milimetrado con `body::before`, `--grid-line`, `--grid-size 32px`, `--section-alt` | **✅ añadido (Fase 1)**                                                 | **Parte A**             |
| **Escala de radios**      | `--radius 14px`, `--radius-sm 9px`                                                       | `--radius 14px` añadido; `-sm` y reasignación de componentes pendientes | **Parte B / Fase 2**    |
| **Gradiente de marca**    | `--grad-brand 135deg primary→accent-3`                                                   | **✅ token añadido (Fase 1)**; se utiliza en la Fase 2                  | **Parte B**             |
| **Superficie anidada**    | `--surface-2 #1c2230`                                                                    | **✅ añadido (Fase 1)**                                                 | **Parte B**             |
| **Fuente monoespaciada**  | `--font-mono` (pila ui-monospace)                                                        | pendiente (Fase 4, junto con los consumidores)                          | **Parte B**             |
| **`text-muted` (oscuro)** | `#8b8b9e`                                                                                | `#a1a1aa` (zinc-400)                                                    | conciliar — **Parte B** |

### 3.3 Mecánica de temas (para no romper nada)

- **Tailwind v4, CSS-first** (sin `tailwind.config.*`). Los tokens se definen en `:root`/`.dark` y se exponen a las utilidades mediante `@theme inline` (`globals.css:130-179`).
- **Modo oscuro mediante la clase `.dark`** en `<html>` (`@custom-variant dark` en `globals.css:22`), alternado por un store de Zustand personalizado (`src/store/themeStore.ts`), tema predeterminado = `system` (`src/shared/constants/appConfig.ts:11`). En cambio, el sitio utiliza `html[data-theme="light"]` — **los mecanismos difieren, pero nunca interactúan** (orígenes separados), por lo que no hay conflicto. Conservamos el mecanismo `.dark` del dashboard.
- **Existe una sobrescritura de `primary` en tiempo de ejecución** (`themeStore.ts:85-97`, preajustes en `COLOR_THEMES`): los usuarios pueden sustituir `--color-primary`. Cualquier token nuevo (gradiente, etc.) que haga referencia a `--color-primary` hereda esas sobrescrituras automáticamente. ✅
- **Nombres de radio reservados de Tailwind v4:** `--radius-sm/md/lg/...` sirven de base para las utilidades `rounded-*`. Redefinirlos cambia retroactivamente cada `rounded-*` existente (por ejemplo, `rounded-sm` se utiliza en 12 archivos). Por ello, el valor de radio pequeño y la reasignación de componentes se posponen deliberadamente hasta la Fase 2, en la que los consumidores cambian conjuntamente.

---

## 4. Parte A — El fondo de cuadrícula de papel milimetrado (solicitud principal) — IMPLEMENTADO (Fase 1)

### 4.1 Qué es

La receta exacta del sitio (`_mono_repo/omnirouteSite/css/base.css`): un **pseudo-elemento fijo que ocupa todo el viewport** y dibuja dos gradientes de líneas de 1px, situado con `z-index:-1` detrás de todo el contenido.

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
}
```

**Por qué funciona aunque `body` tenga un `background-color` opaco:** un `::before` con `z-index:-1` se dibuja _encima_ del fondo propio del elemento, pero _debajo_ de su contenido dentro del flujo. Por tanto, `--color-bg` es el relleno base, la cuadrícula se superpone y la aplicación se renderiza encima de ella.

### 4.2 Precedente existente en el código base

`src/app/landing/page.tsx:16-26` **ya implementa esta misma cuadrícula por página**, pero con líneas **rojas** (`#E54D5E`, opacidad `0.06`) cada **50px**, además de orbes animados. Por tanto, el patrón ya está validado en el producto; este trabajo lo convierte en un fondo de pantalla **global y adaptado al tema**.

### 4.3 Tokens añadidos (en `globals.css`)

```css
:root {
  /* claro — opacidad de la cuadrícula aumentada respecto al 0.045 del sitio para que el fondo
     sea realmente visible en el panel denso (las tarjetas y el armazón cubren la mayor parte del viewport) */
  --grid-line: rgba(0, 0, 0, 0.07);
  --grid-size: 32px;
  --section-alt: rgba(0, 0, 0, 0.022);
}
.dark {
  /* oscuro — aumentada respecto a 0.035 por el mismo motivo */
  --grid-line: rgba(255, 255, 255, 0.06);
  --section-alt: rgba(255, 255, 255, 0.018);
}
```

### 4.4 El único bloqueo — eliminado

La cuadrícula es global por diseño (cubre el panel, `auth`/`login`, las páginas de error —todas las rutas— a la vez). Exactamente **un** elemento la ocultaba dentro del panel:

- `src/shared/components/layouts/DashboardLayout.tsx` — el contenedor exterior dibujaba un `bg-bg` opaco. Todo lo que hay debajo ya es transparente (`<main>`, el contenedor de desplazamiento y el contenedor interior `max-w-7xl`), por lo que **eliminar `bg-bg`** permite que la cuadrícula del body se muestre a través del área de contenido (el `--color-bg` del body sigue siendo el relleno base).

  ```diff
  - <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-bg">
  + <div className="flex h-dvh min-h-0 w-full overflow-hidden">
  ```

### 4.5 Interacción con el armazón (barra lateral / encabezado)

- `Header` (`Header.tsx:207`, `bg-bg`) y `Sidebar` (`Sidebar.tsx:430`, `bg-sidebar`) permanecen **opacos** → la cuadrícula se muestra **solo en el área de contenido**, enmarcada por un armazón sólido. Es la opción predeterminada más discreta y coincide con la forma en que el sitio separa el armazón del lienzo (decisión D3 = sólido).

### 4.6 Páginas de inicio de sesión / autenticación / error

Estas se renderizan directamente bajo `<body>` (sin el armazón del panel), por lo que la cuadrícula global debería aparecer detrás de ellas automáticamente. **Fase 5 — COMPLETADA:** los contenedores independientes de pantalla completa eran, de hecho, opacos (`min-h-screen … bg-bg`, donde `bg-bg` es el mismo relleno sólido que `<body>`), lo que ocultaba la cuadrícula en todas las pantallas ajenas al panel, no solo en la de inicio de sesión. Ahora todos son transparentes para que el fondo compartido se muestre a través de ellos: `login`, `forgot-password`, `callback`, `maintenance`, `offline`, `status`, `terms`, `privacy`, `onboarding` y `ErrorPageScaffold` (cubre `400`/`401`). Esto completa **D4** (ampliada de solo inicio de sesión a todas las pantallas independientes). Protegido mediante `tests/unit/design-grid-background.test.ts`.

### 4.7 Página de destino

`landing/page.tsx` conserva su fondo animado más elaborado (orbes + viñeta): su propia presentación de marketing (decisión D5 = dejar tal cual).

---

## 5. Parte B — Unificación de tokens

La Fase 1 añade los tokens de identidad inertes y sin colisiones (`--surface-2`/`--color-surface-2`, `--grad-brand`, `--radius`). La Fase 2 integra la escala de radios en Tailwind y redirige los componentes; la Fase 4 añade `--font-mono` junto con sus consumidores.

| Token                      | Motivo                                                                            | Fase                                      |
| -------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------- |
| `--radius` / `--radius-sm` | Una única escala de radios (14/9) en lugar de valores ad hoc 6/8/12               | 1 (valor) / 2 (integración + redirección) |
| `--grad-brand`             | Gradiente de marca para los CTA principales (rojo→violeta), alineado con el sitio | 1 (token) / 2 (Button)                    |
| `--surface-2`              | Paneles anidados / encabezados de tablas / filas insertadas                       | 1                                         |
| `--font-mono`              | Bloques de código, terminal, identificadores y endpoints                          | 4                                         |
| Conciliar `--text-muted`   | Elegir un único valor para sitio↔panel (se recomienda `#a1a1aa`)                  | 2                                         |

**D2 (text-muted):** sitio `#8b8b9e` frente a panel `#a1a1aa`. Se recomienda conservar el **`#a1a1aa` del panel** y actualizar el _sitio_ para que coincida. Cambio cosmético.

---

## 6. Parte C — Estandarización de componentes (Fases 2–4)

Componentes personalizados (sin shadcn/Radix), Tailwind v4, tokens semánticos adoptados **en su mayoría** (195 archivos importan el barrel compartido). El trabajo consiste en eliminar las **vías alternativas**. Ubicación: `src/shared/components/`.

| #   | Elemento                                    | Archivo(s)                                                                                                               | Problema → Objetivo                                                                                                                      | Fase |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| C1  | **Alineación de radios**                    | `Button.tsx:14-18`, `Card.tsx:39`, `Modal.tsx`, `Input.tsx`, `Select.tsx`                                                | mezcla de 6/8/12px → `--radius`/`--radius-sm` (14/9)                                                                                     | 2    |
| C2  | **Gradiente de Button + variante `accent`** | `Button.tsx:5-12`                                                                                                        | el primario es rojo→rojo plano; alinear con `--grad-brand`; añadir la variante `accent` faltante. ~195 importadores — máxima visibilidad | 2    |
| C3  | **Tablas**                                  | `DataTable.tsx:122-176`, `logTableStyles.ts`, `globals.css:405-414`                                                      | valores rgba hardcodeados 100 % en línea + variables inexistentes; migrar a tokens y retirar estilos divergentes                         | 3    |
| C4  | **Centralizar colores de estado**           | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `ProviderCascadeNode.tsx`, `Badge.tsx` + 5 helpers | más de 6 copias de los mismos valores hex → un único módulo basado en `--color-success/warning/error`                                    | 3    |
| C5  | **Borde de Card**                           | `Card.tsx:39`                                                                                                            | `border-white/5` → marca `/8`                                                                                                            | 2    |
| C6  | **Conciliar el anillo de foco** ✅ HECHO    | `--focus-ring` de `globals.css` (accent) frente a `ring-primary/30` de los controles de formulario                       | unificado en **accent (violeta)** para coincidir con el anillo global y diferenciarlo del anillo rojo de error; el error permanece rojo  | 4    |
| C7  | **Añadir `Checkbox` + `Textarea`**          | `<input>`/`<textarea>` sin procesar con `accentColor:#6366f1` en línea                                                   | primitivas basadas en tokens                                                                                                             | 4    |
| C8  | **Barrido de valores hex hardcodeados**     | `ConsoleLogViewer.tsx:240`, `ComboLiveStudio.tsx:306`, puntos de Modal, ~14 archivos de gráficos                         | literales → tokens                                                                                                                       | 4    |
| C9  | **`cn()` → clsx + tailwind-merge**          | `src/shared/utils/cn.ts`                                                                                                 | las clases conflictivas se acumulan; necesario para las sobrescrituras de C1                                                             | 2    |

**Ya alineados con la marca (basados en tokens, solo necesitan el radio):** `Badge`, `Toggle`, `SegmentedControl`, `Input`, `Select`.

---

## 7. Plan de despliegue

- **Fase 1 — Cuadrícula + tokens de identidad (ESTA PR).** Cuadrícula en `globals.css` + tokens `--surface-2`/`--grad-brand`/`--radius`; fondo de pantalla `body::before`; eliminación del bloqueo `bg-bg`; prueba de protección estática. Riesgo bajo, reversible en un solo commit.
- **Fase 2 — Primitivas (C1, C2, C5) — COMPLETADA en esta PR.** Utilidades semánticas de radio `rounded-card` (14px) / `rounded-control` (9px) añadidas mediante `@theme` (nombres personalizados, por lo que las predeterminadas `rounded-sm/md/lg/xl` permanecen intactas, sin un cambio masivo en 400 archivos); Card/Modal → 14px, Button/Input/Select → 9px; Button principal → `--grad-brand` (rojo→violeta) + nueva variante `accent`; bordes de Card → el token `border-border` (0.08). **Aplazado:** `cn()`→tailwind-merge (C9) necesita nuevas dependencias; el barrido de `rounded-lg` ad hoc (326 archivos) se deja tal cual, ya que las primitivas cubren la mayor parte de la superficie.
- **Fase 3 — Colores de estado + tablas (C3, C4) — COMPLETADA en esta PR.** ✅ **C4** (`src/shared/constants/statusColors.ts` — `STATUS_HEX` como fuente única; `flow/edgeStyles.ts` + `TokenHealthBadge` redirigidos, fieles/mismos valores hexadecimales). ✅ Token **`--font-mono`**. ✅ **C3 (DataTable)** — se reemplazaron todos los valores rgba en línea y los fallbacks obsoletos `var(--bg-table-header)` / `var(--text-secondary)` por un conjunto de tokens `--table-*` (`--table-header-bg/-row-zebra/-row-hover/-cell-border/-row-selected`), cuyos **valores oscuros son exactamente iguales a los antiguos rgba codificados de forma fija** (idénticos byte por byte en modo oscuro) y cuyos valores claros corrigen el tema claro, que antes siempre se mostraba oscuro. Borde del encabezado → `--color-border`, texto secundario → `--color-text-muted`. **Requiere una revisión visual antes de fusionarse.** (Sin modificar: `logTableStyles.ts` y las reglas heredadas de Ant `.ant-table`; son independientes y de menor prioridad).
- **Fase 4 — Limpieza (C6, C7, C9 completadas; C8 pendiente).** ✅ **C9** `cn()` → `twMerge(clsx(...))` (clsx + tailwind-merge añadidos como dependencias): ahora el `className` de quien llama _reemplaza_ correctamente una clase conflictiva de una primitiva en lugar de acumularla. ✅ **C7** nuevas primitivas `Checkbox` + `Textarea` (basadas en tokens, exportadas desde el barrel; cambio aditivo: la adopción de los 32 checkboxes sin abstraer / 41 textareas sin abstraer puede realizarse de forma incremental). ✅ **C6** conciliación del anillo de foco: los controles de formulario (`Input`/`Select`/`Textarea`/`Toggle`/`Checkbox`) ahora usan al recibir el foco el anillo de **acento (violeta)**, para coincidir con el `--focus-ring` global y dejar de entrar en conflicto con el anillo rojo de error; el estado de error rojo no cambia. ⏳ **El barrido de valores hexadecimales de C8 NO es una búsqueda y reemplazo a ciegas**: se confirmó que los siguientes casos son _intencionados_ y deben conservarse: `ConsoleLogViewer.tsx:240` (terminal siempre oscuro), popover de `TokenHealthBadge`, trazos SVG de ReactFlow. Migrar únicamente los valores hexadecimales que realmente deban adaptarse al tema.

Cada fase: `npm run lint` + `npm run typecheck:core` + una revisión visual.

---

## 8. Decisiones abiertas (recomendaciones)

- **D1 — Button principal:** ¿mantener rojo→rojo o cambiar a **rojo→violeta `--grad-brand`**? Recomendación: **rojo→violeta** (Fase 2).
- **D2 — Color de las líneas de la cuadrícula:** **neutro** (estilo del sitio), elegido, frente a rojo de marca. Tamaño: **32px** (reducido aproximadamente un 30 % respecto a los 46px originales tras los comentarios del propietario; las celdas de 46px parecían demasiado grandes en el diseño del panel).
- **D3 — Intensidad visual del chrome:** barra lateral/encabezado **sólidos**, elegido.
- **D4 — Cuadrícula de autenticación/inicio de sesión:** ✅ **COMPLETADA (Fase 5)** — se eliminó el `bg-bg` opaco de cada contenedor independiente a pantalla completa (no solo del inicio de sesión), por lo que la cuadrícula aparece en todas las pantallas. Véase §4.6.
- **D5 — Página de inicio:** dejar la pantalla animada tal cual. Elegido.
- **D6 — Radio 14/9 en todo el producto:** recomendación: sí (Fase 2).
- **D7 — La Fase 1 se publica primero:** elegido.
- **D8 — Ancho del diseño (Fase 5):** el contenedor de contenido del panel estaba limitado a `max-w-7xl` (1280px), lo que lo centraba y dejaba amplios márgenes laterales vacíos en monitores grandes. ✅ **COMPLETADA** — se elevó a un `max-w-[3840px]` fluido (4K real): ahora el contenido sigue el viewport hasta aproximadamente 4K y solo se centra por encima de ese tamaño (`DashboardLayout.tsx`). Las páginas deliberadamente estrechas siguen siéndolo por diseño (`ProviderOnboardingWizard` max-w-5xl, `Rtk`/`CavemanContextPageClient` max-w-6xl).
- **D9 — Tablas de datos opacas (Fase 6):** ahora que el área de contenido del panel es transparente (para que el fondo de cuadrícula sea visible, Fase 5), las tablas de datos cuyo contenedor _no_ era una superficie opaca dejaban ver la cuadrícula a través de sus filas pares transparentes / patrón cebra de baja opacidad. ✅ **COMPLETADA** — todas las tablas sin Card ahora pintan `bg-surface` (o, en el caso de la primitiva `<DataTable>`, `background: var(--color-surface)` en su contenedor de desplazamiento). Corregido en: `DataTable` (primitiva), `ProxyLogger`/`RequestLoggerV2` (el tinte `bg-black/5 dark:bg-black/20` de su `<Card>` prevalecía sobre el `bg-surface` de Card mediante tailwind-merge → aproximadamente un 95 % transparente), `BatchListTab`/`FilesListTab`/`CacheEntriesTab`/`ReasoningCacheTab`/`cache page`/`FreePoolTab`/`ModelMappingTable`/`HeaderTable`, además de las dos «tablas» de cuadrícula CSS de las vistas de caché (`bg-surface/35` → `bg-surface`). Se verificó que las tablas ya incluidas dentro de un `<Card>`/Modal eran opacas y se dejaron deliberadamente intactas (`bg-surface` sería allí una operación redundante). La propia cuadrícula **no necesitó ningún cambio**: el `body::before` del panel es idéntico byte por byte al del sitio (`--grid-size: 32px`); cualquier «cuadrícula más grande» observada en una instancia en ejecución corresponde a una compilación obsoleta anterior a `#4143`, no al código. Protegido mediante `tests/unit/design-grid-background.test.ts` (bloque de la Fase 6).

---

## 9. Fuera de alcance / riesgos

- **Sin cambios en la paleta** — los colores ya coinciden; solo añadimos los tokens que faltan. Riesgo nulo de cambiar los colores del producto.
- **Sin cambios en el motor de temas** — mantener `.dark` + el store de Zustand.
- **El cambio de radios (Fase 2) es amplio** — afecta a todas las tarjetas, botones y campos de entrada; revisar visualmente las pantallas con mucho contenido (tablas, modales) antes de hacer merge.
- **Las tablas (C3)** concentran la mayor cantidad de estilos hardcodeados y la mayor superficie de regresión — aislarlas en su propia PR.

---

## 10. Índice de referencias

| Área                                                  | Ruta                                                                                                                 |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Tokens del dashboard                                  | `src/app/globals.css` (`:root`, `.dark`, `@theme inline`, `body`, `body::before`)                                    |
| Store del tema                                        | `src/store/themeStore.ts`, `src/shared/components/ThemeProvider.tsx`, `src/shared/constants/appConfig.ts:9-11`       |
| Contenedor del panel (la cuadrícula se habilita aquí) | `src/shared/components/layouts/DashboardLayout.tsx`                                                                  |
| Chrome                                                | `src/shared/components/Header.tsx:207`, `src/shared/components/Sidebar.tsx:430`                                      |
| Precedente de la cuadrícula                           | `src/app/landing/page.tsx:16-26`                                                                                     |
| Primitivas                                            | `src/shared/components/{Button,Card,Input,Select,Badge,Modal,Toggle,SegmentedControl,Loading,Tooltip,DataTable}.tsx` |
| Fuentes de colores de estado                          | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `logTableStyles.ts`                            |
| Utilidad `cn`                                         | `src/shared/utils/cn.ts`                                                                                             |
| Prueba de protección de la Fase 1                     | `tests/unit/design-grid-background.test.ts`                                                                          |
| Referencia del sitio                                  | `_mono_repo/omnirouteSite/css/tokens.css`, `css/base.css`                                                            |
