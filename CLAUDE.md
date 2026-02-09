# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Related Repositories

**SmartSpend Mobile App (React + Capacitor)**:
- **Path**: `/Users/mac/Documents/development/budgetapp`
- **Stack**: React 19, TypeScript, Vite, Capacitor (iOS/Android), Tailwind CSS, Zustand
- **Database**: Supabase (auth, user_state, subscriptions)
- **Key directories**:
  - `src/components/` — Reusable UI components
  - `src/features/` — Feature modules (budget, onboarding, etc.)
  - `src/state/` — Zustand store (budget.store.ts)
  - `src/services/` — Storage, cloud sync, pending sync
  - `src/types/` — TypeScript types (Transaction, BudgetState)
  - `src/hooks/` — Custom React hooks
  - `supabase/` — Database migrations and config
  - `docs/` — Architecture and feature documentation
- **Has its own `CLAUDE.md`** with full documentation of architecture, design guidelines, and conventions

When the user asks about "la app", "the app", "SmartSpend app", mockup screens, or app features/UI, look in that path for reference code and design patterns.

---

## Build & Development Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Run ESLint
```

## Architecture Overview

This is a **multilingual landing page** for SmartSpend (a mobile budget tracking app) built with Next.js 15 App Router, TypeScript, and Tailwind CSS 4.

### Key Architectural Patterns

**Internationalization (i18n)**
- 4 supported locales: `es` (default), `en`, `pt`, `fr`
- File-based routing: `/[locale]/page.tsx` pattern
- Translation files in `/messages/*.json`
- Context-based i18n: `I18nProvider` wraps all localized routes
- Use `useI18n()` hook to access `t()` function and `locale` state
- Dynamic schema validation: Zod schemas are created with translated error messages via factory functions (see `createContactSchema`)

**Routing Structure**
```
app/
├── layout.tsx                  # Root layout (minimal, no i18n)
├── page.tsx                    # Redirects to /es
└── [locale]/
    ├── layout.tsx              # I18nProvider + ThemeProvider
    ├── page.tsx                # Landing page (Hero, Features, Privacy, Footer sections)
    ├── contacto/page.tsx       # Contact page
    └── privacy-policy/page.tsx # Privacy policy page
```

**API Routes**
- `/api/contact` - Contact form endpoint with Resend email service
  - Includes rate limiting (3 requests per 15 minutes per IP)
  - Honeypot spam protection (`website` field)
  - Graceful degradation: If Resend fails (domain not verified), logs submission and returns fallback response
  - GET endpoint for health check

**Component Organization**
- `/components/sections/` - Landing page sections (hero, features, privacy, footer)
- `/components/app-screens/` - Mockup screens of the mobile app
- `/components/` - Reusable UI components (header, contact form, locale switcher, etc.)

**State Management**
- No global state library (Next.js server components + client state)
- Client-side: React Context for i18n (`I18nProvider`)
- Theme: `next-themes` with ThemeProvider (dark/light/system)

**Form Handling Pattern**
- React Hook Form + Zod validation via `@hookform/resolvers/zod`
- Translation-aware schemas: Use factory functions that accept `t()` to create schemas with localized error messages
- Example: `createContactSchema(t)` in `lib/contact-schema.ts`
- Re-create schema when locale changes using `useMemo(() => createContactSchema(t), [t])`

### Environment Variables

Optional (for contact form email functionality):
- `RESEND_API_KEY` - Resend API key for sending emails
- `FALLBACK_EMAIL` - Email address to receive contact form submissions (default: support@jotatech.org)

### Deployment Configuration

**Vercel** (Production)
- Auto-deploy on push to `main` branch
- Custom domain: `smartspend.jotatech.org`
- DNS: Cloudflare CNAME → Vercel (proxy disabled / DNS only)
- Vercel Analytics enabled (`@vercel/analytics/next`)
- Framework preset: Next.js (auto-detected)
- Static APK served from `public/app-release.apk` (Android download)

### Key Dependencies

- **Next.js 15** - App Router with React 19 Server Components
- **TypeScript 5** - Strict type checking
- **Tailwind CSS 4** - Utility-first CSS (uses `@tailwindcss/postcss`)
- **Framer Motion** - Animation library (used in contact form, sections)
- **React Hook Form** - Form state management
- **Zod 4** - Schema validation (uses `.issues` not `.errors` on ZodError)
- **Resend** - Transactional email service
- **Lucide React** - Icon library
- **Recharts** - Chart library (for mockup screens)
- **@supabase/ssr** - Supabase server-side auth (cookie-based sessions)
- **@supabase/supabase-js** - Supabase client SDK (admin panel)

---

## Admin Module

### Overview

Internal admin panel at `/admin` for managing SmartSpend app users, viewing subscriptions, and gifting Pro access. Connects to the **production Supabase** database (same as the mobile app). Protected by email whitelist — only emails in `ADMIN_ALLOWED_EMAILS` can access.

### Authentication Flow

1. User navigates to `/admin` → middleware checks session
2. No valid session → redirect to `/admin/login`
3. Login form → `POST /api/admin/auth/login` → `signInWithPassword()`
4. API verifies email is in `ADMIN_ALLOWED_EMAILS` → sets session cookies
5. Redirect to `/admin/users`
6. Already logged-in admin visiting `/admin/login` → auto-redirect to `/admin/users`

**Key**: Two Supabase clients are used:
- **Anon client** (`server.ts`): Cookie-based auth for session management (uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **Admin client** (`admin.ts`): Service role key to bypass RLS and access `auth.users` (uses `SUPABASE_SERVICE_ROLE_KEY`, server-only)

### Middleware Protection (`middleware.ts`)

```
/admin/login     → Allow without auth (if already admin, redirect to /admin/users)
/admin/*         → Require valid session + email in ADMIN_ALLOWED_EMAILS
/api/admin/*     → Session refresh only (no redirects, APIs validate auth internally)
```

**Matcher**: `["/", "/admin", "/admin/:path*", "/api/admin/:path*"]`

**CRITICAL**: `/admin` exact path MUST be in the matcher separately — `/admin/:path*` does NOT match the exact `/admin` route.

**Session handling**: `updateSession()` in `src/lib/supabase/middleware.ts` checks `getUser()` error field. Auth errors (expired token, invalid session) are treated as `user: null` → redirect to login.

### Directory Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx                 # Sidebar + header layout, noindex
│   │   ├── page.tsx                   # Redirects to /admin/users
│   │   ├── login/
│   │   │   ├── layout.tsx             # Dark theme, no sidebar
│   │   │   └── page.tsx               # Glassmorphism login form
│   │   ├── users/
│   │   │   └── page.tsx               # UsersTable component
│   │   └── subscriptions/
│   │       └── page.tsx               # SubscriptionsTable component
│   └── api/admin/
│       ├── auth/
│       │   ├── login/route.ts         # POST - signInWithPassword + email check
│       │   └── logout/route.ts        # POST - signOut
│       ├── users/route.ts             # GET - paginated users with filters
│       └── subscriptions/
│           ├── route.ts               # GET - paginated subscriptions
│           └── gift/route.ts          # POST - upsert gift subscription
├── lib/
│   ├── supabase/
│   │   ├── server.ts                  # createSupabaseServerClient() - SSR cookie auth
│   │   ├── admin.ts                   # createAdminClient() - service role, bypasses RLS
│   │   └── middleware.ts              # updateSession() - refresh tokens in middleware
│   └── admin/
│       ├── types.ts                   # AdminUser, AdminSubscription, PaginatedResponse, constants
│       └── schemas.ts                 # Zod schemas: giftSubscriptionSchema, loginSchema
└── components/admin/
    ├── sidebar.tsx                    # Navigation + logout, mobile overlay
    ├── admin-header.tsx               # Page title + theme toggle
    ├── stats-cards.tsx                # 4 KPI cards (total, auth, anon, pro)
    ├── users-table.tsx                # Users list, search, filter, expand, gift
    ├── subscriptions-table.tsx        # Subscriptions list, status filter
    └── gift-modal.tsx                 # Gift Pro modal (monthly/annual/lifetime)
```

### API Endpoints

#### `GET /api/admin/users`

**Params**: `page`, `limit`, `search`, `filter` (all | authenticated | anonymous)

**Performance strategy** (optimized for <1000 users):
1. Fetch ALL auth users in one call (`perPage: 1000`)
2. Parallel fetch: `user_subscriptions` (full) + `user_state` (only `user_id, updated_at` — NO heavy JSON)
3. Filter + sort by `last_sync` DESC (nulls last) in memory
4. Paginate
5. Fetch `state.transactions` count ONLY for the 20 users on current page

**Returns**: `PaginatedResponse<AdminUser>`

#### `GET /api/admin/subscriptions`

**Params**: `page`, `limit`, `status` (all | active | trial | expired | cancelled)

**Strategy**: Query `user_subscriptions` with status filter, then `Promise.all` to fetch user emails via `getUserById()` in parallel.

**Returns**: `PaginatedResponse<AdminSubscription>`

#### `POST /api/admin/subscriptions/gift`

**Body**: `{ userId: string, duration: "monthly" | "annual" | "lifetime" }`

**Logic**:
- Validates with Zod, verifies user exists
- Calculates `expires_at`: +30d (monthly), +365d (annual), `null` (lifetime)
- **Upserts** to `user_subscriptions` (`onConflict: 'user_id'`)
- Logs to `revenuecat_events` with `event_type: "ADMIN_GIFT"` for audit

**Product IDs**: `co.smartspend.monthly`, `co.smartspend.annual`, `co.smartspend.lifetime`

### Types & Constants (`src/lib/admin/types.ts`)

```typescript
AdminUser {
  id, email, is_anonymous, created_at, last_sign_in_at,
  subscription: AdminSubscription | null,
  total_transactions: number | null,
  last_sync: string | null,
  full_name: string | null
}

AdminSubscription {
  id, user_id, product_id, status, period_type,
  purchased_at, expires_at, environment,
  user_email?: string | null  // enriched field
}

GiftDuration = "monthly" | "annual" | "lifetime"
PRODUCT_MAP  // duration → product_id
STATUS_LABELS // status → Spanish label
PLAN_LABELS   // product_id → Spanish label
DURATION_LABELS // duration → Spanish label
```

### UI Patterns

**Responsive layout**: Cards on mobile (`lg:hidden`), tables on desktop (`hidden lg:block`).

**Users table features**:
- Debounced search (400ms) by email or user ID
- Filter tabs: Todos / Autenticados / Anonimos
- Expandable rows: tap to show transaction count, registration date, last sync datetime, name, full ID
- Gift Pro button per user

**Color scheme**:
- Active subscription: emerald badge
- Trial: amber badge
- Expired: red badge
- Free: gray badge
- Anonymous user: gray badge ("Anon")
- Authenticated user: blue badge ("Auth")
- PRODUCTION env: blue badge
- SANDBOX env: orange badge

**Login page**: Glassmorphism design — dark bg (`#060810`), radial gradients, floating blobs with `float-slow` animation, glass card with `backdrop-filter: blur(20px) saturate(180%)`, gradient border shine, floating labels on inputs, glow button.

### Environment Variables (Admin-specific)

```bash
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Public anon key (for cookie-based auth)
SUPABASE_SERVICE_ROLE_KEY         # Private service role key (server-only, bypasses RLS)
ADMIN_ALLOWED_EMAILS              # Comma-separated admin emails (case-insensitive)
```

### Database Tables Used

- `auth.users` — Supabase Auth (via admin API: `listUsers`, `getUserById`)
- `user_state` — App state JSON per user (`user_id`, `state`, `updated_at`)
- `user_subscriptions` — Subscription records (`user_id`, `product_id`, `status`, `expires_at`)
- `revenuecat_events` — Audit log (gift operations logged as `ADMIN_GIFT`)

### Security

- **Double validation**: Middleware checks auth + API routes re-verify independently
- **Service role key**: Never exposed to client, only in server-side API routes
- **No indexing**: All admin pages have `robots: { index: false, follow: false }`
- **Email whitelist**: `ADMIN_ALLOWED_EMAILS` env var, case-insensitive comparison
- **Audit trail**: Gift subscriptions logged to `revenuecat_events`
- **Session errors**: Expired/invalid tokens treated as unauthenticated → redirect to login

### Common Pitfalls

- **Zod 4**: Use `error.issues[0]` not `error.errors[0]` — property name changed from v3
- **Middleware matcher**: `/admin/:path*` does NOT match exact `/admin` — must add `/admin` separately
- **`listUsers` pagination**: Max `perPage: 1000`. If >1000 users, needs loop with batching
- **`user_state.state` column**: Contains full transaction array JSON — NEVER fetch for all users, only for current page
- **Subscriptions N+1**: Always use `Promise.all` for `getUserById` calls, never sequential loop

---

### Translation System Details

**Adding New Translations**
1. Add keys to all files in `/messages/*.json`
2. Use dot notation for nested keys: `t("contact.fields.name.label")`
3. For schemas with validation: Create factory function that accepts `t()` parameter

**Common Translation Patterns**
```typescript
// Simple translation
const title = t("hero.title");

// With type safety for object returns
const label = t("contact.fields.name.label") as string;

// In Zod schemas (factory pattern)
export function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, { message: t("contact.errors.name.min") }),
    // ...
  });
}

// Usage in component
const contactSchema = useMemo(() => createContactSchema(t), [t]);
```

### Contact Form Flow

1. Client submits form → POST `/api/contact`
2. Server validates + checks rate limit
3. Attempts to send email via Resend
4. **If Resend fails** (domain not verified):
   - Logs submission to console
   - Returns `503` with `fallback: true`
   - Client shows amber "fallback" success state
5. **If successful**: Returns `200`, client shows green success state

### Dark Mode

- Uses `next-themes` with `class` strategy
- Theme attribute: `class="dark"` applied to `<html>`
- System theme detection enabled by default
- No transition on theme change (`disableTransitionOnChange: false`)

### Styling Guidelines

**Tailwind Conventions**
- Use dark mode variants: `dark:bg-[#1a1d26]`, `dark:text-gray-300`
- Consistent spacing: `space-y-6`, `gap-3`, `px-4`, `py-3`
- Border radius: `rounded-xl` for cards/inputs, `rounded-2xl` for large buttons
- Focus states: `focus:border-[#18B7B0] focus:ring-[#18B7B0]/20 focus:ring-4`
- Primary brand color: `#18B7B0` (teal)

**Animation Patterns (Framer Motion)**
```typescript
// Fade in with scale
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}

// Slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Validation error
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
```

### Common Development Tasks

**Adding a New Locale**
1. Add locale to `src/i18n/config.ts` (`locales` array)
2. Create `/messages/{locale}.json` with all translation keys
3. Next.js will automatically generate route at `/{locale}/`

**Modifying Contact Form**
1. Update schema in `lib/contact-schema.ts`
2. Add translation keys to all `/messages/*.json` files
3. Update form UI in `components/contact-form.tsx`
4. Update API handler in `app/api/contact/route.ts` if needed

**Adding a New Section to Landing Page**
1. Create component in `components/sections/`
2. Import and add to `app/[locale]/page.tsx`
3. Add translations to all `/messages/*.json` files
