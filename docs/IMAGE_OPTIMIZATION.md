# Image Optimization Guide

## Current Status

The project is currently configured with `images: { unoptimized: true }` in `next.config.ts` because it's deployed on Heroku, which doesn't support Next.js Image Optimization API.

**Current images:**
- Only SVG icons in `/public` (Next.js defaults)
- No raster images (PNG/JPG) to optimize yet

## Future Optimization Options

### Option A: Migrate to Vercel/Netlify (Recommended)

If you migrate to Vercel or Netlify, you can use built-in Next.js Image Optimization:

1. Remove `unoptimized: true` from `next.config.ts`:
   ```typescript
   images: {
     // unoptimized: true, // Remove this line
     formats: ['image/avif', 'image/webp'],
     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
   }
   ```

2. Use Next.js `<Image>` component:
   ```tsx
   import Image from 'next/image';

   <Image
     src="/hero-image.jpg"
     alt="Description"
     width={1200}
     height={630}
     priority // For above-the-fold images
   />
   ```

**Benefits:**
- Automatic format conversion (WebP/AVIF)
- Responsive image sizes
- Lazy loading by default
- ~30-50% file size reduction

**Cost:**
- Vercel Free: 1,000 optimizations/month
- Vercel Pro: $20/month (unlimited)

---

### Option B: Use Cloudinary (For Heroku)

If staying on Heroku, integrate Cloudinary for image optimization:

1. Install dependencies:
   ```bash
   npm install cloudinary @cloudinary/url-gen @cloudinary/react
   ```

2. Sign up for Cloudinary (free tier: 25GB/month)

3. Add environment variables to `.env.local`:
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Configure custom image loader in `next.config.ts`:
   ```typescript
   images: {
     loader: 'custom',
     loaderFile: './src/lib/cloudinary-loader.ts',
   }
   ```

5. Create `src/lib/cloudinary-loader.ts`:
   ```typescript
   export default function cloudinaryLoader({ src, width, quality }) {
     const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
     return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${src}`;
   }
   ```

6. Use with Next.js `<Image>` component (works seamlessly)

**Benefits:**
- Works with Heroku
- Automatic format conversion
- CDN delivery
- Transformations on-the-fly

**Cost:**
- Free tier: 25 credits/month (enough for small sites)
- Paid: Starting at $89/month

---

### Option C: Use imgix

Similar to Cloudinary, with slightly different pricing:

1. Install: `npm install @imgix/js-core`
2. Configure custom loader
3. Use with Next.js `<Image>` component

**Cost:**
- Free tier: 1,000 master images
- Paid: Starting at $60/month

---

## When to Optimize Images

Implement image optimization when:
- [ ] Adding app screenshots to landing page
- [ ] Adding marketing assets (hero images, feature illustrations)
- [ ] Adding user-uploaded content (profile pictures, etc.)
- [ ] Bundle size exceeds 500 kB for images
- [ ] Lighthouse Performance score drops below 85

## Best Practices

1. **Use modern formats:**
   - WebP for photos (30% smaller than JPEG)
   - AVIF when browser support increases (50% smaller than JPEG)
   - SVG for icons and logos (already doing this ✅)

2. **Specify dimensions:**
   ```tsx
   <Image
     src="/image.jpg"
     width={1200}
     height={630}
     alt="Description"
   />
   ```

3. **Prioritize above-the-fold images:**
   ```tsx
   <Image
     src="/hero.jpg"
     priority // Prevents lazy loading
     alt="Hero"
   />
   ```

4. **Use appropriate sizes:**
   - Hero images: 1920x1080 max
   - Thumbnails: 400x400 max
   - Icons: 128x128 max (or use SVG)

5. **Compress before uploading:**
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target: < 100 KB per image

## Current Recommendation

**No action needed yet** - The project doesn't have raster images to optimize. Keep using SVGs for icons (which are already optimal).

When you add raster images in the future:
- **Best option:** Migrate to Vercel (easiest, free tier available)
- **Alternative:** Use Cloudinary (if staying on Heroku)

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Cloudinary Next.js Integration](https://cloudinary.com/documentation/next_integration)
- [imgix Next.js Plugin](https://docs.imgix.com/setup/serving-images/serving-images-in-next-js)
- [Vercel Image Optimization Pricing](https://vercel.com/docs/image-optimization)
