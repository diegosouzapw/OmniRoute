# Subscription-first routing (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dos nuevos ids `auto/*`: `auto/subscription` y `auto/thrifty`. Ambos son opt-in al ser
> solicitados: nada se enruta a través de ellos a menos que quien realiza la llamada solicite el id por su nombre, y no
> cambia ningún pool, estrategia ni valor predeterminado existente.

## Por qué existe esto

OmniRoute ya responde dos preguntas sobre costes, pero ninguna es la que se hacen la mayoría de los operadores.

| Mecanismo existente                                      | Responde                                            |
| -------------------------------------------------------- | --------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "¿está este modelo catalogado como gratuito?"       |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "¿puede esta conexión llegar a facturarme?"         |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "¿está esta conexión cerca de su límite?"           |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "limitar el gasto, degradar a la opción más barata" |

Todos los mecanismos exclusivos para opciones gratuitas **fallan de forma cerrada**: un pool gratuito agotado es un pool vacío, nunca
un salto a una opción de pago; y todos los mecanismos del lado de pago ignoran los niveles. Ninguno responde:

> "Usa la cuota que ya pago. Cuando se agote, detente o sube un escalón cada vez
> pasando por las opciones de pago más baratas, y vuelve en cuanto se restablezca."

## La facturación es una propiedad de la conexión, no del modelo

`classifyTier()` (`open-sse/services/tierResolver.ts`) utiliza `(provider, model)` como clave y devuelve
`free | cheap | premium` a partir de los precios del catálogo. Sin embargo, que una solicitud cueste dinero adicional
depende de **qué conexión la atienda**: el mismo modelo está incluido en el plan mediante una conexión OAuth de Claude Code
y se factura por token mediante una conexión con clave de API.

`provider_connections.auth_type` no es un indicador fiable en ninguna dirección: existen conexiones OAuth
por consumo y conexiones con clave de API incluidas en un plan (un token de puesto de Copilot no es una
clave de API por consumo). Por tanto, la clase de facturación procede de un **catálogo seleccionado manualmente**,
`open-sse/config/connectionBillingCatalog.ts`, configurado manualmente según las condiciones publicadas de cada proveedor:
el mismo patrón que `FreeModelBudget.hardStopGuaranteed` ya estableció para los modelos gratuitos.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Orden de resolución (`autoCombo/connectionBilling.ts`): el centinela sintético sin autenticación →
`keyless`; una entrada de catálogo que coincida con el proveedor **y** `authType`; una entrada para todo el proveedor;
en caso contrario, `unknown`. **Lo que no está catalogado no es gratuito**: `unknown` se trata como `metered`
en todas partes, por lo que un proveedor añadido mañana comienza fuera del escalón de suscripción y debe
catalogarse deliberadamente.

## El modelo de escalones

Cinco escalones en orden ascendente. Se diferencian en algo más que el precio: cada uno tiene su **propia**
señal de agotamiento, por lo que esto no es simplemente una ordenación.

| #   | Escalón        | Pertenencia                                          | Se agota cuando                            |
| --- | -------------- | ---------------------------------------------------- | ------------------------------------------ |
| 0   | `subscription` | `billing: "subscription"` seleccionado manualmente   | ventana de cuota en el límite o por debajo |
| 1   | `keyless`      | la ruta sintética sin autenticación                  | enfriamiento de la conexión / disyuntor    |
| 2   | `free`         | conexión por consumo, `classifyTier() === "free"`    | asignación gratuita agotada                |
| 3   | `cheap`        | conexión por consumo, `classifyTier() === "cheap"`   | presupuesto por escalón consumido          |
| 4   | `premium`      | conexión por consumo, `classifyTier() === "premium"` | presupuesto por escalón consumido          |

Los escalones 0-2 se agotan por **cuota**, algo observable y de lo que ya se realiza un seguimiento. Los escalones 3-4 no tienen
cuota —una conexión de pago presta servicio indefinidamente—, por lo que su única señal de agotamiento razonable es un
**presupuesto** por escalón. Sin él, "ascender cuando se agote el nivel barato" no tiene ningún desencadenante.

## `auto/subscription` — cierre seguro

Pool = solo el nivel 0, restringido a conexiones cuyo exceso esté documentado como `hard-stop`, cada una verificada en vivo para confirmar que dispone de margen de cuota. Se excluye todo lo ambiguo: un proveedor no seleccionado, una lectura de cuota no verificable, una lectura obsoleta o un exceso que se contabilice como uso de pago.

Un pool vacío es la respuesta **prevista**, no un defecto: la ruta existente del llamador para pools vacíos lo convierte en un error claro, en lugar de recurrir silenciosamente a una alternativa facturable. Esa es toda la garantía del id.

`keyless` deliberadamente **no** cumple los requisitos: esta agrupación significa «el plan por el que pago», por lo que un backend sin autenticación no corresponde aquí. Utiliza `auto/thrifty` (o `auto/best-free`) para eso.

### Seguridad de las conexiones

Un candidato no siempre está vinculado a una sola conexión: un candidato lógico contiene una lista de permitidos `allowedConnectionIds`, y la cuenta que se utiliza realmente se elige más tarde, durante el envío, mediante `open-sse/services/combo/autoStrategy.ts`. Por tanto, ambas agrupaciones verifican **cada conexión individualmente** y reducen `allowedConnectionIds` exactamente al subconjunto que sobrevive: nunca a la lista original completa ni a un miembro elegido arbitrariamente. Como `autoStrategy.ts` ya aplica ese array como una lista de permitidos estricta, reescribirlo aquí hace que «verificado» y «utilizado realmente» sean el mismo conjunto por construcción. Este es el mismo invariante, y el mismo razonamiento, que en [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — escalar un nivel cada vez

Pool = todos los niveles, ordenados por índice de nivel, excluyendo los candidatos agotados. El motor `auto` sigue puntuando **dentro** del pool superviviente: la escala determina qué niveles participan y la puntuación decide qué candidato gana dentro de ellos. El orden es estable dentro de cada nivel, por lo que esta capa nunca reordena la clasificación propia del puntuador.

Esta es una capa de ordenación + filtrado, **no** un nuevo despachador: el bucle especulativo de `combo.ts` ya recorre los destinos en orden y pasa al siguiente cuando se produce un fallo, por lo que un agotamiento en tiempo de ejecución que la comprobación previa no haya detectado seguirá escalando al siguiente nivel dentro de la misma solicitud.

Mientras que `auto/subscription` realiza un cierre **seguro**, `auto/thrifty` permanece **abierto**: una conexión incluida en el plan sin una lectura de cuota utilizable se sigue intentando primero. Intentarlo no cuesta nada y, si resulta estar agotada, la continuación tras el fallo alcanza de todos modos el siguiente nivel; en cambio, negarse a intentarlo enviaría la solicitud a un nivel de pago cuando falten datos de telemetría, que es precisamente el resultado que esta agrupación pretende evitar.

## Volver al plan después de un restablecimiento

Deben expirar tres elementos independientes antes de que el enrutamiento vuelva al nivel 0. Corregir solo uno deja la escala atascada en niveles de pago mucho después de que el plan haya recuperado su cuota.

1. **La caché del estado de cuota** — `freeAccessQuota.ts` almacena en caché por `(provider, connection)` con un TTL de 180 s. Una entrada almacenada en caché cuyo propio `resetAt` ya haya pasado describe una ventana que ya no existe, por lo que ahora se considera obsoleta **independientemente de su antigüedad** y fuerza una actualización. Sin esto, un plan cuya cuota se repone a medianoche sigue apareciendo como agotado hasta que el TTL caduque.
2. **El estado propio de la escala** — por diseño, no existe. La elegibilidad de los niveles se vuelve a calcular a partir del estado de cuota en vivo cada vez que se construye el pool; no existe ningún registro persistente de «actualmente en el nivel 3» que pueda sobrevivir a un restablecimiento y bloquear el enrutamiento.
3. **El periodo de espera de la conexión** — el 429 que indica el agotamiento establece `rateLimitedUntil` a partir de un retroceso exponencial que, para una conexión del plan, puede superar el restablecimiento real. `clampCooldownToReset()` (`subscriptionLadder.ts`) reduce un periodo de espera hasta el instante de restablecimiento del servicio de origen y nunca puede ampliarlo. **Está implementado y probado, pero aún no está conectado**: la caché de cuota se invalida en `src/sse/services/auth.ts` _antes_ de escribir cualquier periodo de espera, por lo que `resetAt` debe capturarse antes en esa función; se trata de un cambio en la ruta crítica de resiliencia que debe incluirse en su propio PR revisado. Hasta entonces, la reincorporación espera a que finalice el periodo de espera de la conexión (que ya da preferencia a las indicaciones `Retry-After` del servicio de origen cuando el proveedor las envía).

### Prevención de oscilaciones

Un nivel que acaba de restablecerse solo vuelve a admitirse cuando supera `reentryMinRemainingPercent` (5 de forma predeterminada), mientras que una conexión que ya esté en uso solo tiene que mantenerse por encima de `exitCutoffPercent` (2 de forma predeterminada, coincidiendo con `quotaPreflight.defaultThresholdPercent`). La diferencia es la banda de histéresis: sin ella, una conexión que se mantenga cerca del umbral oscilaría entre niveles en solicitudes consecutivas.

## Configuración

Solo permite ajustes. Deliberadamente **no** existe ningún indicador `enabled`: un interruptor capaz de desactivarlos
haría que `auto/subscription` siguiera ofreciendo silenciosamente el conjunto completo — incluidos los modelos de pago — bajo un
nombre que promete lo contrario.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 desactiva por completo un peldaño
  },
}
```

La restricción por presupuesto permanece inactiva hasta que se conecte un mecanismo de resolución de gastos: si no hay contabilidad disponible, un
peldaño de pago se incluye en el orden, pero nunca se restringe. A partir de v3.8.51, la configuración `rungBudgetUsd` es aceptada por el
esquema, pero todavía NO se aplica; trátela como configuración reservada, no como un límite de gasto activo. El orden de los peldaños, el agotamiento basado en cuotas y el reingreso tras un restablecimiento
funcionan sin ella.

## Composición

`subscription` y `thrifty` son valores de `AutoTier`, por lo que se combinan con todas las categorías:
`auto/coding:thrifty`, `auto/reasoning:subscription`, etc. Los dos identificadores planos
(`auto/subscription`, `auto/thrifty`) se anuncian en `/v1/models` y en el panel de control.

Ninguno de los identificadores pertenece al nivel de pago, por lo que `isPaidTierAutoId()` devuelve `false` para ambos y
`auto/subscription` permanece visible con `hidePaidModels`.

## Dónde se encuentra el código

| Aspecto                                             | Archivo                                             |
| --------------------------------------------------- | --------------------------------------------------- |
| Datos de facturación seleccionados                  | `open-sse/config/connectionBillingCatalog.ts`       |
| Clasificador                                        | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Peldaños, ambas agrupaciones y reingreso            | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Integración en el conjunto de candidatos            | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Obsolescencia de caché sensible a restablecimientos | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Superficie de niveles                               | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Identificadores anunciados                          | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Pruebas                                             | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
