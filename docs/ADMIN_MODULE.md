# SmartSpend Admin Panel — Documentacion Funcional

## Descripcion General

Panel de administracion interno para gestionar los usuarios y suscripciones de la app SmartSpend. Permite visualizar todos los usuarios registrados (autenticados y anonimos), monitorear el estado de sus suscripciones y regalar acceso Pro.

**URL**: `/admin`
**Acceso**: Solo usuarios con email registrado en la variable de entorno `ADMIN_ALLOWED_EMAILS`.

---

## Acceso y Autenticacion

### Login

**Ruta**: `/admin/login`

1. El administrador ingresa su email y contrasena de Supabase
2. El sistema valida las credenciales contra Supabase Auth
3. Verifica que el email este en la lista de emails autorizados
4. Verifica el estado de MFA (ver seccion 2FA abajo)
5. Redirige segun el resultado: `/admin/mfa-enroll`, `/admin/mfa-verify` o `/admin/users`

**Seguridad**:
- Si el usuario no esta autenticado, cualquier ruta `/admin/*` redirige a `/admin/login`
- Si ya esta logueado y tiene MFA resuelto, visitar `/admin/login` redirige a `/admin/users`
- Las sesiones expiradas o tokens invalidos se tratan como no autenticados

### Autenticacion de Dos Factores (2FA / MFA)

El panel admin requiere autenticacion TOTP obligatoria usando Supabase MFA. Cada administrador debe configurar una app de autenticacion (Google Authenticator, Authy, etc.).

#### Primer Login (Enrollment)

**Ruta**: `/admin/mfa-enroll`

1. Despues del login con email/contrasena, si el usuario no tiene 2FA configurado, se redirige a la pagina de enrollment
2. Se muestra un codigo QR para escanear con la app de autenticacion
3. Tambien se muestra la clave secreta para ingreso manual (con boton de copiar)
4. El usuario ingresa el codigo de 6 digitos generado por la app
5. Si es correcto, el factor TOTP queda activo y el dispositivo se registra como confiable
6. Redirige a `/admin/users`

#### Login Subsiguiente (Verificacion)

**Ruta**: `/admin/mfa-verify`

1. Si el usuario ya tiene 2FA configurado y el dispositivo NO es confiable, se redirige a verificacion
2. Se muestra un campo para ingresar el codigo de 6 digitos
3. Si es correcto, el dispositivo se registra como confiable y redirige a `/admin/users`
4. Si el codigo es incorrecto, se muestra error y se limpia el campo para reintentar

#### Dispositivo Confiable

Despues de una verificacion MFA exitosa, se establece una cookie firmada (`admin_mfa_trusted`) que marca el dispositivo como confiable por **30 dias**.

- **Cookie**: `admin_mfa_trusted`
- **Duracion**: 30 dias
- **Firma**: HMAC-SHA256 con `SUPABASE_SERVICE_ROLE_KEY`
- **Validacion**: userId + timestamp + firma criptografica
- **Seguridad**: HttpOnly, Secure (produccion), SameSite=Lax

Si el dispositivo es confiable, el login salta la verificacion OTP y entra directo al panel.

Para forzar la verificacion OTP nuevamente, eliminar la cookie `admin_mfa_trusted` desde DevTools del navegador.

#### Flujo Completo

```
Login (email + contrasena)
├── Sin MFA configurado → /admin/mfa-enroll (QR + verificar codigo)
├── Con MFA + dispositivo confiable → /admin/users (directo)
└── Con MFA + dispositivo NO confiable → /admin/mfa-verify (ingresar OTP)
```

#### Enforcement en Middleware

El middleware verifica el nivel AAL (Authenticator Assurance Level) de Supabase en cada request:
- `aal1` con factor verificado → redirige a `/admin/mfa-verify`
- `aal2` o cookie confiable → permite acceso
- Sin factores MFA → redirige a `/admin/mfa-enroll`

### Logout

- Boton "Cerrar sesion" en el sidebar
- Cierra la sesion de Supabase y redirige a `/admin/login`
- La cookie de dispositivo confiable se mantiene (no se borra en logout)

---

## Paginas del Panel

### 1. Usuarios (`/admin/users`)

Vista principal del panel. Muestra todos los usuarios de la app SmartSpend.

#### Tarjetas de Resumen (KPIs)

| Metrica | Descripcion |
|---------|-------------|
| **Total usuarios** | Cantidad total de usuarios en Supabase Auth |
| **Autenticados** | Usuarios que se registraron con email (Google/Apple OAuth) |
| **Anonimos** | Usuarios que usan la app sin registrarse |
| **Pro activos** | Usuarios con suscripcion activa (status = "active") |

#### Busqueda y Filtros

- **Busqueda**: Por email o ID de usuario (debounce de 400ms)
- **Filtros**: Todos / Autenticados / Anonimos

#### Tabla de Usuarios

**Columnas principales** (visibles en desktop):

| Columna | Descripcion |
|---------|-------------|
| **Email** | Email del usuario o "Anonimo" si no tiene. ID parcial debajo |
| **Tipo** | Badge: "Autenticado" (azul) o "Anonimo" (gris) |
| **Ultima sync** | Tiempo relativo desde la ultima sincronizacion (ej: "hace 2h") |
| **Suscripcion** | Badge con plan + estado (ej: "Mensual - Activa", "Free") |
| **Acciones** | Boton "Regalar Pro" |

**Drill-down** (al hacer clic en una fila se expande):

| Campo | Descripcion |
|-------|-------------|
| **Transacciones** | Cantidad total de transacciones registradas por el usuario |
| **Fecha de registro** | Fecha de creacion de la cuenta en Supabase Auth |
| **Ultima sincronizacion** | Fecha y hora exacta del ultimo sync con el servidor |
| **Nombre** | Nombre completo (de metadata de OAuth, si aplica) |
| **ID** | UUID completo del usuario |

**Responsive**:
- **Mobile** (< 1024px): Tarjetas compactas con tap para expandir + boton "Regalar Pro" dentro
- **Desktop** (>= 1024px): Tabla completa con todas las columnas

**Ordenamiento**: Siempre por ultima sincronizacion (mas reciente primero). Usuarios sin sync aparecen al final.

**Paginacion**: 20 usuarios por pagina con navegacion anterior/siguiente.

---

### 2. Suscripciones (`/admin/subscriptions`)

Vista de todas las suscripciones registradas en la tabla `user_subscriptions`.

#### Tarjeta de Resumen

- **Total suscripciones**: Cantidad total segun el filtro aplicado

#### Filtros por Estado

| Filtro | Descripcion |
|--------|-------------|
| **Todas** | Sin filtro |
| **Activas** | `status = "active"` |
| **Expiradas** | `status = "expired"` |
| **Canceladas** | `status = "cancelled"` |
| **Trial** | `status = "trial"` |

#### Tabla de Suscripciones

| Columna | Descripcion |
|---------|-------------|
| **Usuario** | Email o "Anonimo", con ID parcial |
| **Plan** | Mensual / Anual / Vitalicio |
| **Estado** | Badge coloreado segun status |
| **Comprado** | Fecha de compra |
| **Expira** | Fecha de expiracion o "Nunca" (vitalicio, verde) |
| **Entorno** | PRODUCTION (azul) o SANDBOX (naranja) |

**Responsive**: Cards en mobile, tabla en desktop.

**Paginacion**: 20 registros por pagina.

---

### 3. Regalar Pro (Modal)

Accesible desde el boton "Regalar Pro" en la tabla de usuarios.

#### Flujo

1. Se abre un modal centrado con la informacion del usuario
2. Si el usuario ya tiene una suscripcion activa, se muestra un aviso amarillo
3. El admin selecciona la duracion del regalo:

| Opcion | Producto | Duracion | Expiracion |
|--------|----------|----------|------------|
| **1 Mes** | `co.smartspend.monthly` | 30 dias | Fecha actual + 30 dias |
| **1 Ano** | `co.smartspend.annual` | 365 dias | Fecha actual + 365 dias |
| **Vitalicio** | `co.smartspend.lifetime` | Permanente | Nunca expira (`null`) |

4. Al confirmar:
   - Se crea/actualiza la suscripcion en `user_subscriptions` (upsert por `user_id`)
   - Se registra el evento en `revenuecat_events` como `ADMIN_GIFT`
   - Se muestra mensaje de exito con checkmark animado
   - El modal se cierra automaticamente despues de 1.5 segundos
   - La tabla se refresca para mostrar el nuevo estado

#### Datos de la Suscripcion Creada

```
status:          "active"
period_type:     "normal"
environment:     "PRODUCTION"
store:           "ADMIN_GIFT"
entitlement_ids: ["pro"]
```

---

## Arquitectura Tecnica

### Flujo de Datos

```
Browser → Middleware (auth check) → Page (SSR) → Client Component → API Route → Supabase
```

### Clientes de Supabase

| Cliente | Archivo | Clave | Uso |
|---------|---------|-------|-----|
| **SSR Client** | `lib/supabase/server.ts` | Anon Key | Autenticacion basada en cookies |
| **Admin Client** | `lib/supabase/admin.ts` | Service Role Key | Acceso directo a datos (bypass RLS) |
| **Middleware Client** | `lib/supabase/middleware.ts` | Anon Key | Refresh de sesion en middleware |

### Tablas de Supabase Utilizadas

| Tabla | Tipo | Uso en Admin |
|-------|------|--------------|
| `auth.users` | Auth API | Listar usuarios, obtener emails |
| `user_state` | Public | Ultima sincronizacion, conteo de transacciones |
| `user_subscriptions` | Public | Estado de suscripcion, upsert para regalos |
| `revenuecat_events` | Public | Audit log de regalos (evento `ADMIN_GIFT`) |

### Optimizaciones de Rendimiento

#### API de Usuarios
- **Un solo round-trip**: Fetch de todos los usuarios con `perPage: 1000` (en vez de batches de 100)
- **Query ligero**: Solo `user_id + updated_at` de `user_state` (sin descargar el JSON de transacciones)
- **Fetches paralelos**: `user_subscriptions` y `user_state` se consultan simultaneamente
- **Conteo lazy**: Las transacciones se cuentan solo para los 20 usuarios de la pagina actual

#### API de Suscripciones
- **Parallel fetch**: `getUserById()` para todos los user_ids en paralelo (`Promise.all`), no secuencial

### Codigos de Estado (Badges)

| Status | Color | Label |
|--------|-------|-------|
| `active` | Verde (emerald) | Activa |
| `trial` | Amarillo (amber) | Trial |
| `expired` | Rojo (red) | Expirada |
| `cancelled` | Gris (gray) | Cancelada |
| Sin suscripcion | Gris claro | Free |

### Formato de Fechas

- **Locale**: `es-CO` (Espanol - Colombia)
- **Fecha corta**: "15 ene 2024"
- **Fecha + hora**: "15 ene 2024, 10:30"
- **Relativo**: "hace 5m", "hace 2h", "hace 3d" (para ultima sync)

---

## Configuracion

### Variables de Entorno Requeridas

```bash
# Supabase (produccion)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Admin
ADMIN_ALLOWED_EMAILS=admin1@email.com,admin2@email.com
```

### Agregar un Nuevo Admin

1. El usuario debe tener una cuenta en Supabase Auth (creada via la app o directamente)
2. Agregar su email a `ADMIN_ALLOWED_EMAILS` (separado por coma)
3. Redesplegar la aplicacion (o reiniciar el servidor de desarrollo)

### Agregar una Nueva Pagina al Admin

1. Crear `src/app/admin/{nueva-pagina}/page.tsx`
2. Agregar item de navegacion en `src/components/admin/sidebar.tsx` (array `navItems`)
3. Agregar titulo en `src/components/admin/admin-header.tsx` (objeto `pageTitles`)
4. Si necesita API: crear `src/app/api/admin/{endpoint}/route.ts`
5. El middleware ya protege todas las rutas `/admin/*` automaticamente

---

## Seguridad

- **Doble validacion**: Middleware + API routes verifican autenticacion independientemente
- **2FA obligatorio**: TOTP via Supabase MFA, requerido para todos los administradores
- **Dispositivo confiable**: Cookie HMAC-SHA256 firmada, valida 30 dias, Edge runtime compatible
- **Service Role Key**: Solo en servidor, nunca expuesta al cliente
- **No indexacion**: Todas las paginas admin tienen `robots: { index: false }`
- **Whitelist por email**: Comparacion case-insensitive
- **Audit trail**: Operaciones de regalo logueadas en `revenuecat_events`
- **Sesiones expiradas**: Tokens invalidos redirigen a login inmediatamente

### Archivos de Seguridad

| Archivo | Descripcion |
|---------|-------------|
| `src/middleware.ts` | Proteccion de rutas: auth + email whitelist + MFA enforcement |
| `src/lib/supabase/middleware.ts` | Refresh de sesion + nivel AAL |
| `src/lib/admin/trusted-device.ts` | Cookie de dispositivo confiable (HMAC-SHA256, Web Crypto API) |
| `src/app/api/admin/auth/mfa/enroll/route.ts` | Enrollment TOTP (genera QR + secreto) |
| `src/app/api/admin/auth/mfa/verify/route.ts` | Challenge + verificacion TOTP + cookie confiable |
| `src/app/api/admin/auth/mfa/factors/route.ts` | Lista factores TOTP verificados |
