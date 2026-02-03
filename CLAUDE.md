# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build (checks disabled for Heroku)
npm run start        # Production server (uses PORT env var for Heroku)
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

**Heroku-specific**
- `heroku-postbuild` script runs `npm run build`
- `start` script uses `$PORT` environment variable
- Build errors/warnings are ignored (see next.config.ts)
- Images are unoptimized (no Image Optimization API)

### Key Dependencies

- **Next.js 15** - App Router with React 19 Server Components
- **TypeScript 5** - Strict type checking
- **Tailwind CSS 4** - Utility-first CSS (uses `@tailwindcss/postcss`)
- **Framer Motion** - Animation library (used in contact form, sections)
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Resend** - Transactional email service
- **Lucide React** - Icon library
- **Recharts** - Chart library (for mockup screens)

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
