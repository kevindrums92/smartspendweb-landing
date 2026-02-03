# Domain Verification Guide for Resend Email Service

## Overview

The contact form uses [Resend](https://resend.com) as the email service provider. To send emails from the `jotatech.org` domain, the domain must be verified in the Resend dashboard.

## Current Status

**⚠️ Domain Not Verified**

The domain `jotatech.org` is currently not verified in Resend, which causes a 403 error when attempting to send emails. The application has been updated with graceful degradation to handle this situation.

## How to Verify the Domain

### Step 1: Access Resend Dashboard

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Log in with your Resend account
3. Click "Add Domain" or "Verify Domain"

### Step 2: Add Domain

1. Enter `jotatech.org` as the domain name
2. Select the appropriate region (recommended: US East)
3. Click "Add"

### Step 3: Configure DNS Records

Resend will provide DNS records that need to be added to your domain's DNS configuration. These typically include:

#### Required DNS Records

| Type | Host/Name | Value/Points to | TTL |
|------|-----------|-----------------|-----|
| TXT | `_resend` | `resend-verify=YOUR_VERIFICATION_TOKEN` | Auto |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine;` | Auto |
| MX | `@` | `feedback-smtp.us-east-1.amazonses.com` | Auto |
| TXT | `@` | `v=spf1 include:amazonses.com ~all` | Auto |
| CNAME | `resend._domainkey` | `YOUR_DKIM_VALUE` | Auto |

> **Note:** The exact values will be provided by Resend when you add the domain. Copy them exactly as shown.

### Step 4: Update DNS Configuration

#### Option A: Using Your Domain Registrar

1. Log in to your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare)
2. Navigate to DNS management
3. Add the records provided by Resend
4. Save changes

#### Option B: Using Cloudflare (Recommended)

If using Cloudflare:
1. Log in to Cloudflare dashboard
2. Select the `jotatech.org` domain
3. Go to DNS → Records
4. Add the records provided by Resend
5. Make sure proxy status is "DNS only" (gray cloud) for all email-related records

### Step 5: Verify in Resend

1. Return to [https://resend.com/domains](https://resend.com/domains)
2. Click "Verify" next to your domain
3. Wait for verification (can take up to 24 hours, usually within minutes)

## Current Implementation

### Graceful Degradation

The application now includes graceful degradation for when the domain is not verified:

1. **API Level** ([`src/app/api/contact/route.ts`](../src/app/api/contact/route.ts)):
   - Detects domain verification errors (403 status code)
   - Logs contact form submissions for manual processing
   - Returns a `fallback: true` flag with user-friendly message

2. **UI Level** ([`src/components/contact-form.tsx`](../src/components/contact-form.tsx)):
   - Shows a fallback success state when email service is unavailable
   - Displays informative message to users
   - Allows users to submit another message

3. **Internationalization**:
   - Fallback messages added to all language files:
     - [`messages/en.json`](../messages/en.json)
     - [`messages/es.json`](../messages/es.json)
     - [`messages/fr.json`](../messages/fr.json)
     - [`messages/pt.json`](../messages/pt.json)

### Environment Variables

The following environment variables are used:

```env
# Resend API Key
RESEND_API_KEY=re_BPVAXtAp_8wqHaz5GC4Fh4Gm8uvcW7RQd

# Fallback email for notifications
FALLBACK_EMAIL=support@jotatech.org
```

## Testing After Verification

Once the domain is verified:

1. Test the contact form submission
2. Check that emails are received at `support@jotatech.org`
3. Verify the "from" address shows as `contact@jotatech.org`

## Troubleshooting

### Domain Verification Pending

If verification is taking longer than expected:
- Verify DNS records are correctly entered
- Check for typos in record values
- Ensure no conflicting records exist
- Wait up to 24 hours for DNS propagation

### Emails Still Not Sending

If emails fail after verification:
1. Check Resend dashboard for domain status
2. Verify API key is correct in `.env.local`
3. Check server logs for error details
4. Ensure sender email matches verified domain

## Security Considerations

- The API key is stored in environment variables
- Rate limiting is implemented (3 submissions per 15 minutes per IP)
- Honeypot field protects against spam bots
- Input validation prevents malicious submissions

## Support

For issues with Resend:
- Documentation: https://resend.com/docs
- Support: https://resend.com/support
- Status: https://status.resend.com
