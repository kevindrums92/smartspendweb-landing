# Analytics Implementation Guide

## Current Status

**Analytics:** Not implemented yet (by user choice)

When you're ready to track user behavior and measure conversions, follow this guide to implement analytics.

---

## Option A: Google Analytics 4 (Recommended)

### Benefits
- ✅ Free tier (unlimited events)
- ✅ Most comprehensive analytics platform
- ✅ Integration with Google Ads, Search Console
- ✅ Event tracking, funnels, user flows
- ✅ AI-powered insights

### Implementation Steps

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create new property → Choose "GA4"
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Install Google Analytics**
   ```bash
   npm install @next/third-parties
   ```

3. **Add to Root Layout**

   Edit `src/app/layout.tsx`:
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>{children}</body>
         <GoogleAnalytics gaId="G-XXXXXXXXXX" />
       </html>
     )
   }
   ```

4. **Add Environment Variable**

   `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   `.env.example`:
   ```bash
   # Google Analytics 4 Measurement ID (optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

5. **Track Custom Events**

   Create `src/lib/analytics.ts`:
   ```typescript
   export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

   // Track page views
   export const pageview = (url: string) => {
     window.gtag('config', GA_MEASUREMENT_ID!, {
       page_path: url,
     });
   };

   // Track custom events
   type GtagEvent = {
     action: string;
     category: string;
     label?: string;
     value?: number;
   };

   export const event = ({ action, category, label, value }: GtagEvent) => {
     window.gtag('event', action, {
       event_category: category,
       event_label: label,
       value: value,
     });
   };
   ```

6. **Track Events in Contact Form**

   In `src/components/contact-form.tsx`, add:
   ```typescript
   import * as analytics from '@/lib/analytics';

   // After successful submission:
   analytics.event({
     action: 'contact_form_submit',
     category: 'engagement',
     label: 'contact_page',
   });
   ```

7. **Track Locale Changes**

   In `src/components/locale-switcher.tsx`:
   ```typescript
   analytics.event({
     action: 'locale_change',
     category: 'engagement',
     label: newLocale,
   });
   ```

### Key Events to Track

- `page_view` (automatic)
- `contact_form_view`
- `contact_form_submit_success`
- `contact_form_submit_error`
- `locale_change`
- `theme_toggle`
- `privacy_policy_view`
- `download_button_click` (when app is available)

### Setup Goals & Conversions

In GA4 dashboard:
1. Go to Admin → Events → Mark as conversion:
   - `contact_form_submit_success` ✓
   - `download_button_click` ✓

---

## Option B: Plausible Analytics (Privacy-Focused)

### Benefits
- ✅ GDPR compliant by design
- ✅ No cookies, no personal data collection
- ✅ Lightweight script (~1 KB vs 45 KB for GA)
- ✅ Simple, beautiful dashboard
- ✅ No need for cookie consent banner

### Drawbacks
- ❌ Paid service (€9/month for 10K monthly pageviews)
- ❌ Less detailed than GA4
- ❌ No integration with ads platforms

### Implementation Steps

1. **Sign Up for Plausible**
   - Go to [Plausible.io](https://plausible.io/)
   - Create account and add your domain

2. **Install Plausible**
   ```bash
   npm install next-plausible
   ```

3. **Add to Root Layout**

   Edit `src/app/layout.tsx`:
   ```typescript
   import PlausibleProvider from 'next-plausible'

   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <PlausibleProvider domain="smartspend.app" />
         </head>
         <body>{children}</body>
       </html>
     )
   }
   ```

4. **Track Custom Events**

   Create `src/lib/plausible.ts`:
   ```typescript
   declare global {
     interface Window {
       plausible?: (event: string, options?: { props: Record<string, string | number> }) => void;
     }
   }

   export const trackEvent = (eventName: string, props?: Record<string, string | number>) => {
     if (typeof window !== 'undefined' && window.plausible) {
       window.plausible(eventName, { props });
     }
   };
   ```

5. **Use in Components**
   ```typescript
   import { trackEvent } from '@/lib/plausible';

   // Track event
   trackEvent('Contact Form Submit', { locale: 'es' });
   ```

### Key Events to Track

- `pageview` (automatic)
- `Contact Form Submit`
- `Locale Change`
- `Theme Toggle`
- `Download Click`

### Cost Estimate

- 10K pageviews/month: €9/month
- 100K pageviews/month: €19/month
- 200K pageviews/month: €29/month

---

## Option C: Mixpanel (Product Analytics)

### Benefits
- ✅ User-centric analytics
- ✅ Funnels, retention, cohorts
- ✅ A/B testing capabilities
- ✅ Free tier (100K events/month)

### When to Use

Choose Mixpanel when you need:
- User journey analysis
- Conversion funnels
- Retention tracking
- Product experimentation

### Implementation

1. **Sign Up for Mixpanel**
   - Go to [Mixpanel.com](https://mixpanel.com/)
   - Get your Project Token

2. **Install Mixpanel**
   ```bash
   npm install mixpanel-browser
   ```

3. **Initialize**

   Create `src/lib/mixpanel.ts`:
   ```typescript
   import mixpanel from 'mixpanel-browser';

   const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

   if (MIXPANEL_TOKEN) {
     mixpanel.init(MIXPANEL_TOKEN, {
       debug: process.env.NODE_ENV === 'development',
       track_pageview: true,
       persistence: 'localStorage',
     });
   }

   export default mixpanel;
   ```

4. **Track Events**
   ```typescript
   import mixpanel from '@/lib/mixpanel';

   mixpanel.track('Contact Form Submit', {
     locale: 'es',
     subject: 'support',
   });
   ```

---

## Comparison Matrix

| Feature | Google Analytics 4 | Plausible | Mixpanel |
|---------|-------------------|-----------|----------|
| **Price** | Free | €9+/month | Free (100K events) |
| **Privacy** | ❌ Cookies, tracks users | ✅ No cookies, GDPR | ⚠️ Cookies optional |
| **Ease of Use** | ⚠️ Complex | ✅ Very simple | ⚠️ Moderate |
| **Event Tracking** | ✅ Unlimited | ✅ Unlimited | ✅ 100K/month free |
| **Real-time** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Funnels** | ✅ Yes | ❌ No | ✅ Advanced |
| **User Profiles** | ⚠️ Limited | ❌ No | ✅ Advanced |
| **Integrations** | ✅ Google ecosystem | ⚠️ Limited | ✅ Many |
| **Page Load Impact** | ⚠️ ~45 KB | ✅ ~1 KB | ⚠️ ~40 KB |

---

## Recommendation

### For Most Projects
**→ Google Analytics 4**
- Free, powerful, familiar
- Best for SEO and marketing analytics
- Most comprehensive feature set

### For Privacy-Conscious Projects
**→ Plausible**
- No cookie consent needed
- Lightweight and fast
- Clean, simple dashboard

### For Product Teams
**→ Mixpanel**
- User-centric analytics
- Advanced funnels and retention
- Great for SaaS products

---

## GDPR Compliance

If you implement analytics, you may need a cookie consent banner:

### Cookie Consent Solutions

1. **CookieYes** (free tier available)
2. **Osano** (enterprise)
3. **Custom implementation with react-cookie-consent**

### Implementation

```bash
npm install react-cookie-consent
```

```tsx
import CookieConsent from "react-cookie-consent";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        onAccept={() => {
          // Initialize analytics here
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}
```

---

## Testing Your Analytics

After implementation, test with:

1. **GA4 DebugView**:
   - Enable debug mode: `https://yoursite.com/?debug_mode=true`
   - Check DebugView in GA4 dashboard

2. **Browser Console**:
   ```javascript
   // Check if gtag is loaded
   typeof gtag !== 'undefined'

   // Manually trigger event
   gtag('event', 'test_event', { test: 'value' });
   ```

3. **Real User Monitoring**:
   - Use actual browsers (not dev mode)
   - Check events appear in dashboard (5-10 min delay)

---

## Resources

- [Next.js Analytics Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Plausible Next.js Integration](https://plausible.io/docs/proxy/guides/nextjs)
- [Mixpanel JavaScript SDK](https://developer.mixpanel.com/docs/javascript)
- [GDPR Compliance Checklist](https://gdpr.eu/checklist/)

---

## Status

**Current Implementation:** None (ready to implement when needed)

**Next Steps:**
1. Choose analytics solution based on needs
2. Follow implementation guide above
3. Add cookie consent banner if using GA4/Mixpanel
4. Test tracking in development
5. Deploy and monitor events in production
