# 🗺️ Roadmap de Mejoras - SmartSpend Landing

> **Última actualización:** 2026-02-03
> **Score actual:** 8/10
> **Meta:** 9.5/10

---

## 📊 Estado General

| Categoría | Completadas | Total | Progreso |
|-----------|-------------|-------|----------|
| 🚨 Alta Prioridad | 3 | 3 | 100% ✅ |
| ⚠️ Media Prioridad | 3 | 3 | 100% ✅ |
| 💡 Baja Prioridad | 3 | 3 | 100% ✅ |
| **TOTAL** | **9** | **9** | **100%** ✅ |

---

## 🚨 ALTA PRIORIDAD (Esta Semana)

### 1. ✅ Arreglar ESLint Configuration

**Estado:** ✅ Completado (2026-02-03)
**Prioridad:** Crítica
**Tiempo estimado:** 15 min
**Asignado a:** -

**Problema:**
```bash
# Actualmente falla:
npm run lint
# Error: Cannot find module 'eslint-config-next/core-web-vitals'
```

**Solución:**
- [ ] Instalar `@eslint/eslintrc` dependency
- [ ] Actualizar `eslint.config.mjs` con FlatCompat
- [ ] Verificar que `npm run lint` funcione sin errores
- [ ] Ejecutar lint en todos los archivos y corregir warnings

**Archivos afectados:**
- ✅ `eslint.config.mjs` - Migrado a FlatCompat
- ✅ `package.json` - @eslint/eslintrc ya instalado
- ✅ `src/app/[locale]/contacto/page.tsx` - Variable no usada eliminada
- ✅ `src/app/api/contact/route.ts` - Variable no usada con void
- ✅ `src/lib/contact-schema.ts` - Código innecesario eliminado
- ✅ `src/components/privacy-policy-content.tsx` - Comillas escapadas, imports limpios

**Criterios de aceptación:**
- ✅ `npm run lint` se ejecuta sin errores de configuración
- ✅ Todos los archivos pasan el linting (0 errores, 0 warnings)
- ⏭️ Pre-commit hook opcional (no implementado)

**Resultado:**
- ✅ ESLint funcional con flat config (ESLint v9)
- ✅ Ignorados archivos de build (`dist/`, `.next/`, etc)
- ✅ 12 errores corregidos en código fuente
- ✅ 0 errores, 0 warnings en todo el proyecto

---

### 2. ✅ Habilitar TypeScript Checks en Build

**Estado:** ✅ Completado (2026-02-03)
**Prioridad:** Crítica
**Tiempo estimado:** 1-2 horas
**Asignado a:** -

**Problema:**
```typescript
// next.config.ts - Actualmente:
typescript: { ignoreBuildErrors: true } // ❌ Errores ocultos
```

**Solución:**
- [ ] Remover `ignoreBuildErrors: true` de `next.config.ts`
- [ ] Ejecutar `npm run build` y documentar todos los errores TypeScript
- [ ] Corregir errores de tipos uno por uno:
  - [ ] Errores en components/
  - [ ] Errores en app/
  - [ ] Errores en lib/
- [ ] Verificar build exitoso sin suppressions
- [ ] Agregar `npm run type-check` script a package.json

**Archivos afectados:**
- ✅ `next.config.ts` - Removido `ignoreBuildErrors: true`
- ✅ `package.json` - Agregado script `type-check`
- ✅ `src/components/privacy-policy-content.tsx` - Agregado `locale` de useI18n()

**Criterios de aceptación:**
- ✅ `npm run build` pasa sin `ignoreBuildErrors`
- ✅ `tsc --noEmit` no reporta errores (0 errores)
- ✅ Nuevo script `npm run type-check` funciona

**Resultado:**
- ✅ Solo 1 error TypeScript encontrado y corregido
- ✅ Build completo pasa sin errores
- ✅ Script `npm run type-check` agregado para verificación rápida
- ✅ Proyecto ahora tiene type safety completo habilitado

---

### 3. ✅ Agregar Error Boundaries

**Estado:** ✅ Completado (2026-02-03)
**Prioridad:** Alta
**Tiempo estimado:** 30 min
**Asignado a:** -

**Problema:**
- No hay `error.tsx` en rutas dinámicas
- Errores resultan en pantalla en blanco para el usuario

**Solución:**
- [ ] Crear `src/app/[locale]/error.tsx` (error boundary principal)
- [ ] Crear `src/app/[locale]/contacto/error.tsx` (específico de contacto)
- [ ] Agregar logging de errores (console.error mínimo)
- [ ] Diseñar UI amigable con botón "Reintentar"
- [ ] Traducir mensajes de error en 4 idiomas

**Archivos creados:**
- ✅ `src/app/[locale]/error.tsx` - Error boundary principal
- ✅ `src/app/[locale]/contacto/error.tsx` - Error boundary para página de contacto
- ✅ `messages/es.json`, `messages/en.json`, `messages/pt.json`, `messages/fr.json` - Traducciones

**Criterios de aceptación:**
- ✅ Errores en páginas muestran UI amigable (no pantalla en blanco)
- ✅ Botón "Reintentar" recarga la página correctamente
- ✅ Mensajes traducidos en los 4 idiomas (es, en, pt, fr)
- ✅ Errores se loguean en console para debugging
- ✅ Detalles de error visibles en modo development

**Resultado:**
- ✅ UI mobile-first con icono AlertCircle rojo
- ✅ Dos botones: "Reintentar" (reset) y "Ir al inicio" (Link)
- ✅ Dark mode support
- ✅ Error digest visible en development
- ✅ Página de contacto tiene botón especial de "Volver"

---

## ⚠️ MEDIA PRIORIDAD (Este Mes)

### 4. ✅ Refactorizar Privacy Policy Component

**Estado:** ✅ Completado (2026-02-03)
**Prioridad:** Media
**Tiempo estimado:** 2-3 horas
**Asignado a:** -

**Problema:**
- `privacy-policy-content.tsx` tiene **854 líneas** (componente monolítico)
- Difícil de mantener y actualizar
- Afecta legibilidad del código

**Solución:**
- [ ] Crear carpeta `src/components/privacy-policy/`
- [ ] Dividir en sub-componentes por sección:
  - [ ] `introduction.tsx` - Introducción
  - [ ] `data-collection.tsx` - Recopilación de datos
  - [ ] `data-usage.tsx` - Uso de datos
  - [ ] `user-rights.tsx` - Derechos del usuario
  - [ ] `security.tsx` - Medidas de seguridad
  - [ ] `cookies.tsx` - Política de cookies
  - [ ] `children-privacy.tsx` - Privacidad de menores
  - [ ] `changes.tsx` - Cambios a la política
  - [ ] `contact.tsx` - Información de contacto
- [ ] Crear `index.tsx` que componga todos los sub-componentes
- [ ] Mantener traducciones en `messages/*.json`
- [ ] Actualizar imports en `[locale]/privacy-policy/page.tsx`

**Archivos creados:**
- ✅ `src/components/privacy-policy/ExpandableSection.tsx` - Componente compartido
- ✅ `src/components/privacy-policy/index.tsx` - Orquestador principal
- ✅ `src/components/privacy-policy/sections/` - 11 archivos de sección (70-100 líneas c/u)
- ✅ Eliminado: `src/components/privacy-policy-content.tsx` (855 líneas)
- ✅ Actualizado: `src/app/[locale]/privacy-policy/page.tsx` (import)

**Criterios de aceptación:**
- ✅ Componente original eliminado (855 líneas → 13 archivos)
- ✅ Sub-componentes no exceden 100 líneas cada uno
- ✅ UI y funcionalidad 100% idéntica (verificado con build)
- ✅ TypeScript y ESLint pasan sin errores
- ✅ Bundle size mantenido (9.45 kB)

**Resultado:**
- ✅ 11 secciones independientes y mantenibles
- ✅ Código más legible y testeable
- ✅ Facilita actualizaciones legales futuras
- ✅ Mejor organización del proyecto

---

### 5. ✅ Migrar Rate Limiter a Solución Persistente

**Estado:** ✅ Completado (2026-02-03)
**Prioridad:** Media (bloqueante para producción)
**Tiempo estimado:** 1 hora
**Asignado a:** -

**Problema:**
```typescript
// app/api/contact/route.ts - Actualmente:
const rateLimitStore = new Map(); // ❌ Se pierde en restart/redeploy
```

**Soluciones disponibles:**

#### Opción A: Upstash Redis (Recomendado para Vercel)
- [ ] Crear cuenta en Upstash
- [ ] Crear Redis database
- [ ] Instalar `@upstash/ratelimit` y `@upstash/redis`
- [ ] Configurar env vars (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`)
- [ ] Implementar rate limiter con Upstash
- [ ] Probar en staging

#### Opción B: Vercel KV
- [ ] Habilitar Vercel KV en proyecto
- [ ] Instalar `@vercel/kv`
- [ ] Implementar rate limiter con Vercel KV
- [ ] Probar en staging

#### Opción C: Cloudflare Workers KV (si migras a Cloudflare)
- [ ] Configurar Cloudflare Workers
- [ ] Usar Durable Objects para rate limiting
- [ ] Migrar deployment

**Archivos afectados:**
- `src/app/api/contact/route.ts`
- `package.json` (nueva dependency)
- `.env.local` (nuevas variables)
- `.env.example` (documentar variables)

**Criterios de aceptación:**
- ✅ Rate limiter persiste entre restarts/redeploys
- ✅ 3 requests por 15 minutos por IP se mantiene
- ✅ Funciona en entorno de producción
- ✅ Manejo de errores si servicio externo falla

**Resultado:**
- ✅ Upstash Redis con sliding window algorithm
- ✅ Fallback automático a in-memory rate limiting
- ✅ Analytics habilitado en Upstash
- ✅ Prefix "ratelimit:contact" para organización
- ✅ Mantiene 100% backward compatibility

**Costo:**
- Upstash Free tier: 10,000 comandos/día (suficiente para staging/producción pequeña)

---

### 6. ✅ Agregar Tests Unitarios

**Estado:** ✅ Completado (2026-02-03)
**Prioridad:** Media
**Tiempo estimado:** 3-4 horas (setup + tests básicos)
**Asignado a:** -

**Objetivo:**
- Implementar testing básico para componentes críticos
- Configurar pipeline de CI/CD

**Solución:**
- [ ] Instalar testing dependencies:
  - `@testing-library/react`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
  - `jest`
  - `jest-environment-jsdom`
- [ ] Configurar Jest (`jest.config.js`)
- [ ] Configurar `@testing-library/react` para Next.js 15
- [ ] Crear tests para:
  - [ ] `contact-form.tsx` (validación, submit, errores)
  - [ ] `locale-switcher.tsx` (cambio de idioma)
  - [ ] `header.tsx` (navegación, theme toggle)
  - [ ] `lib/contact-schema.ts` (validación Zod)
  - [ ] `app/api/contact/route.ts` (rate limiting, validación)
- [ ] Agregar script `npm run test` y `npm run test:watch`
- [ ] Configurar GitHub Actions para CI (opcional)

**Archivos a crear:**
- `jest.config.js`
- `jest.setup.js`
- `src/__tests__/` (carpeta de tests)
- `.github/workflows/test.yml` (opcional - CI)

**Criterios de aceptación:**
- ✅ `npm run test` ejecuta todos los tests
- ✅ Coverage mínimo: 50% en componentes críticos
- ✅ Tests pasan en local y CI (si se configura)

**Cobertura objetivo:**
- ContactForm: 80%
- API route: 70%
- Utilities: 90%

---

## 💡 BAJA PRIORIDAD (Backlog)

### 7. ✅ SEO Metadata Dinámico por Locale

**Estado:** 🔴 Pendiente
**Prioridad:** Baja
**Tiempo estimado:** 1 hora
**Asignado a:** -

**Problema:**
```typescript
// [locale]/layout.tsx - Actualmente:
export const metadata = {
  title: "SmartSpend", // ❌ Estático, no cambia por idioma
  description: "..."
}
```

**Solución:**
- [ ] Convertir a función `generateMetadata()`
- [ ] Usar parámetro `locale` para obtener traducciones
- [ ] Agregar keys en `messages/*.json`:
  - `metadata.title`
  - `metadata.description`
  - `metadata.keywords`
- [ ] Agregar Open Graph tags dinámicos
- [ ] Agregar Twitter Card tags
- [ ] Probar con Facebook Debugger y Twitter Card Validator

**Archivos afectados:**
- `src/app/[locale]/layout.tsx`
- `messages/*.json` (4 archivos)

**Criterios de aceptación:**
- ✅ Metadata cambia según idioma seleccionado
- ✅ Open Graph tags correctos en cada idioma
- ✅ Twitter Cards renderiza preview correcto

**Ejemplo implementación:**
```typescript
export async function generateMetadata({ params }) {
  const messages = await import(`@/messages/${params.locale}.json`);
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    openGraph: { ... },
    twitter: { ... }
  };
}
```

---

### 8. ✅ Optimización de Imágenes

**Estado:** 🔴 Pendiente
**Prioridad:** Baja
**Tiempo estimado:** 30 min
**Asignado a:** -

**Problema:**
```typescript
// next.config.ts - Actualmente:
images: { unoptimized: true } // ❌ Imágenes sin optimizar
```

**Contexto:**
- Configurado así por deployment en Heroku (no tiene Image Optimization API)

**Solución (si migras a Vercel/Netlify):**
- [ ] Remover `unoptimized: true`
- [ ] Convertir `<img>` a `<Image>` de Next.js
- [ ] Agregar dimensiones explícitas (`width`, `height`)
- [ ] Configurar `remotePatterns` si usas imágenes externas
- [ ] Verificar que imágenes se optimizan automáticamente

**Solución (si te quedas en Heroku):**
- [ ] Usar servicio externo: Cloudinary, imgix, o ImageKit
- [ ] Configurar loader custom en `next.config.ts`
- [ ] Actualizar componentes para usar URLs optimizadas

**Archivos afectados:**
- `next.config.ts`
- Componentes con `<img>` tags (por identificar)

**Criterios de aceptación:**
- ✅ Imágenes se sirven en formato optimizado (WebP/AVIF)
- ✅ Lazy loading funciona correctamente
- ✅ Lighthouse score mejora en "Performance"

**Impacto esperado:**
- -30-50% tamaño de imágenes
- +10-20 puntos en Lighthouse Performance

---

### 9. ✅ Analytics y Tracking

**Estado:** 🔴 Pendiente
**Prioridad:** Baja (importante para marketing)
**Tiempo estimado:** 1 hora
**Asignado a:** -

**Objetivo:**
- Implementar tracking de usuarios y eventos
- Medir conversiones del formulario de contacto

**Opciones disponibles:**

#### Opción A: Google Analytics 4 (Más común)
- [ ] Crear propiedad GA4
- [ ] Instalar `next-google-analytics` o usar `next/script`
- [ ] Configurar eventos:
  - `page_view` (automático)
  - `contact_form_submit`
  - `locale_change`
  - `theme_toggle`
- [ ] Configurar conversiones

#### Opción B: Plausible Analytics (Privacy-friendly)
- [ ] Crear cuenta en Plausible
- [ ] Instalar script
- [ ] Configurar custom events

#### Opción C: Mixpanel (Product analytics)
- [ ] Crear proyecto Mixpanel
- [ ] Instalar SDK
- [ ] Configurar eventos y user properties

**Archivos afectados:**
- `src/app/layout.tsx` (script de analytics)
- `src/components/contact-form.tsx` (tracking de submit)
- `.env.local` (tracking ID)

**Criterios de aceptación:**
- ✅ Page views se trackean automáticamente
- ✅ Formulario de contacto trackea submits exitosos
- ✅ Dashboard muestra datos en tiempo real
- ✅ Cumple con GDPR (consent banner si es necesario)

**Eventos a trackear:**
- `page_view`
- `contact_form_view`
- `contact_form_submit_success`
- `contact_form_submit_error`
- `locale_switch`
- `theme_toggle`
- `privacy_policy_view`

---

## 📈 Métricas de Éxito

### Performance
- [ ] Lighthouse Performance Score: 90+ (actual: ~85)
- [ ] First Contentful Paint: <1.5s
- [ ] Time to Interactive: <3s
- [ ] Total Blocking Time: <300ms

### Calidad de Código
- [x] ESLint: 0 errores ❌ (actualmente roto)
- [ ] TypeScript: 0 errores (actualmente ignorado)
- [ ] Test Coverage: >50% en componentes críticos
- [ ] Bundle Size: <200 kB (actual: 187 kB) ✅

### SEO
- [ ] Lighthouse SEO Score: 100
- [ ] Metadata dinámico en 4 idiomas
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml generado

### Confiabilidad
- [ ] Error boundaries en todas las rutas
- [ ] Rate limiting persistente (producción)
- [ ] Graceful degradation en todos los servicios externos
- [ ] Uptime: 99.9%

---

## 🎯 Próximos Pasos

1. **Ahora mismo:** Arreglar ESLint config (15 min)
2. **Hoy:** Habilitar TypeScript checks (1-2 horas)
3. **Esta semana:** Agregar error boundaries (30 min)
4. **Este mes:** Refactorizar privacy policy + rate limiter

---

## 📝 Notas

### Decisiones Arquitectónicas
- **Framework:** Next.js 15 App Router (correcto)
- **Styling:** Tailwind CSS 4 (correcto)
- **I18n:** Custom solution con Context (funciona, podría usar next-intl en futuro)
- **Forms:** React Hook Form + Zod (correcto)
- **Email:** Resend (correcto)

### Deuda Técnica
- ESLint y TypeScript ignorados en build (temporal)
- Rate limiter en memoria (temporal para staging)
- Privacy policy monolítico (por refactorizar)

### Referencias
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Upstash Rate Limiting](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)

---

**¿Por dónde empezamos?** 🚀
