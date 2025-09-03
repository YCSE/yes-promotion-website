# Design System Rules for YES Promotion Website

This document provides comprehensive guidelines for integrating Figma designs using the Model Context Protocol (MCP) into the YES Promotion website codebase.

## Design System Structure

### 1. Token Definitions

#### Colors
**Location:** `/tailwind.config.js`
```javascript
colors: {
  'yes-blue': '#4B52AE',   // Primary brand color (YES brand purple-blue)
  'yes-navy': '#1A1F3A',   // Dark text/backgrounds
  'yes-gray': '#F8F9FA',   // Light backgrounds
}
```

**Additional Colors Used:**
- Black: `#000000` (primary text)
- White: `#FFFFFF` (backgrounds, inverted text)
- Grays: `text-gray-700`, `bg-gray-100` (hover states)
- Shadows: `shadow-[0_8px_24px_rgba(0,0,0,0.08)]` (cards)

**Usage Pattern:**
- Primary brand color: `yes-blue` (#4B52AE) - Used for YES branding
- Dark backgrounds: `yes-navy` (#1A1F3A)
- Light backgrounds: `yes-gray` (#F8F9FA)
- Text colors: `text-black`, `text-white`, `text-white/90` (with opacity)

#### Typography
**Font Families:**
- Primary: `'Asta Sans', sans-serif` - All text content
- Font loading: Via Google Fonts in `globals.css`
- Body text weight: 300 (Light)
- Configuration: Set as default body font with light weight

**Font Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Asta+Sans:wght@300;400;500;600;700;800;900&display=swap');
```

**Font Sizes & Line Heights:**
```css
/* Hero Section */
text-[70px] leading-[85px] tracking-[-2.1px]  /* Main heading */
text-[50px] leading-[60px] tracking-[-1.5px]  /* Section heading */
text-[30px] leading-[40px] tracking-[-0.9px]  /* Subheading */
text-[20px] leading-[32px]                     /* Body large/Buttons */
text-[18px] leading-[28px] tracking-[-0.54px]  /* Body medium/Cards */
text-[16px]                                    /* Body small */
```

**Font Weights:**
- `font-light` (300): Default body text weight
- `font-normal` (400): Regular text
- `font-medium` (500): Body text in cards
- `font-bold` (700): Bold text
- `font-extrabold` (800): Emphasis (especially "YES" branding)

#### Spacing
**Standard Padding/Margins:**
- Section padding: `py-[200px]`
- Container max-width: `max-w-[1280px]`
- Component gaps: `gap-20`, `gap-[110px]`
- Button padding: `px-[60px] py-[25px]`

### 2. Component Library

**Component Architecture:**
- **Framework:** React 18.3.1 with TypeScript
- **Pattern:** Functional components with hooks
- **State Management:** React hooks (useState, useEffect, useRef)
- **Styling:** Tailwind CSS utility classes

**Component Structure:**
```typescript
// Standard component pattern
'use client'  // Only for components with interactivity

import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'  // For production paths

const ComponentName = () => {
  // Hooks for client-side logic (useRef, useEffect, useState)
  
  return (
    <section className="relative w-full py-[200px] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Component content */}
      </div>
    </section>
  )
}

export default ComponentName
```

**Key Components:**
- `Hero.tsx` - Animated hero section with infinite scroll
- `Section2.tsx` - Feature display sections
- `Section3.tsx` - Multi-part feature sections with video
- `Section4.tsx` - Content sections
- `Footer.tsx` - Site footer

### 3. Frameworks & Libraries

**Core Stack:**
- **Framework:** Next.js 14.2.18 (App Router)
- **UI Library:** React 18.3.1
- **Language:** TypeScript 5.7.2
- **Styling:** Tailwind CSS 3.4.1
- **Build Tool:** Next.js built-in (Turbopack/Webpack)

**TypeScript Configuration:**
```json
{
  "strict": true,
  "paths": {
    "@/*": ["./*"]  // Path alias for imports
  }
}
```

### 4. Asset Management

**Asset Storage:**
- Location: `/public/images/`
- Organization: By section/feature
  - `/images/section2/`
  - `/images/section3/`
  - `/images/section3-2/`
  - Main assets: `/images/thumbnail_PC.png`, `/images/mobile-view.png`

**Image Optimization:**
- Using Next.js `Image` component for automatic optimization
- Priority loading for above-fold images: `priority` prop
- Responsive sizing with `width`, `height`, and `className`
- `unoptimized: true` in next.config.js for static export

**Asset Path Helper:**
```tsx
import { getAssetPath } from '@/lib/utils'

// Handles production/dev path differences
<Image 
  src={getAssetPath('images/section3/icon.png')}
  alt="Description"
  width={110}
  height={110}
  className="w-full h-full object-contain"
  priority
/>
```

**Asset Types:**
- Images: `.png`, `.jpg`, `.svg`
- Videos: `.mp4` (with autoPlay, loop, muted attributes)
- Icons: Favicons at `/fav.png`

### 5. Icon System

**Icon Storage:**
- Location: `/public/images/` subdirectories
- Format: PNG and SVG files
- Naming: Descriptive names (e.g., `A1.png`, `icon1.svg`)

**Icon Sizes:**
- Standard: 110x110px
- Responsive: Using Tailwind classes for sizing

**Implementation:**
```tsx
<div className="w-[110px] h-[110px] relative">
  <Image 
    src="/images/section3/icon.png"
    alt="Icon description"
    width={110}
    height={110}
    className="w-full h-full object-contain"
  />
</div>
```

### 6. Styling Approach

**CSS Methodology:**
- **Tailwind CSS** utility-first approach
- Custom CSS in `globals.css` for base styles
- No CSS Modules or Styled Components

**Global Styles:**
```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Asta+Sans:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { 
    scroll-behavior: smooth;
  }
  
  body {
    @apply text-black bg-white;
    font-family: "Asta Sans", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 300; /* Light weight for body text */
  }
}

/* Custom font class */
.asta-sans {
  font-family: "Asta Sans", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 300;
}
```

**Responsive Design:**
- Mobile-first approach with Tailwind breakpoints
- Grid system: `grid grid-cols-2`, `grid-cols-3`
- Flexbox layouts: `flex flex-col`, `flex items-center`

**Animation Patterns:**
- Smooth scroll animations: `requestAnimationFrame` for infinite scrollers
- Hover states: `hover:scale-105 transition-transform`, `hover:bg-gray-100 transition-colors`
- Will-change optimization: `style={{ willChange: 'transform' }}`
- Transitions: `transition-transform`, `transition-colors`

**Example Animation (Infinite Scroll):**
```tsx
useEffect(() => {
  const animate = () => {
    position -= speed;
    if (position <= -imageWidth) {
      position = 0;
    }
    element.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}, [])
```

### 7. Project Structure

```
yes-promotion-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page entry
│   └── globals.css        # Global styles & Tailwind
├── components/            # Reusable React components
│   ├── Hero.tsx          # Hero section with animation
│   ├── Section2.tsx      # Speech bubble questions
│   ├── Section3.tsx      # Multi-part feature sections
│   ├── Section4.tsx      # Content sections
│   ├── Section5.tsx      # Additional content
│   ├── Footer.tsx        # Site footer
│   └── TiaModal.tsx      # Modal component
├── lib/                   # Utility functions
│   ├── utils.ts          # getAssetPath helper
│   └── config.ts         # Configuration helpers
├── public/
│   ├── fav.png           # Favicon
│   └── images/           # Static assets
│       ├── section2/     # D1.png icons
│       ├── section3/     # Feature images
│       └── section3-2/   # Subsection assets
├── scripts/              # Download scripts
│   └── download-images.js
├── out/                  # Static export output
├── .mcp.json             # MCP configuration
├── CLAUDE.md             # AI assistant instructions
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript config
├── next.config.js        # Next.js config (static export)
└── package.json          # Dependencies
```

## Integration Guidelines

### Converting Figma Designs

1. **Extract Design Tokens:**
   ```typescript
   // Use Figma MCP to get variables
   mcp__figma-dev-mode-mcp-server__get_variable_defs
   // Map to Tailwind config colors/spacing
   ```

2. **Generate Component Code:**
   ```typescript
   // Request with proper framework context
   mcp__figma-dev-mode-mcp-server__get_code({
     nodeId: "extracted-from-url",
     clientFrameworks: "react",
     clientLanguages: "typescript,javascript,html,css",
     dirForAssetWrites: "/Users/roy/Documents/Development/yes-promotion-website/public/images"
   })
   ```

3. **Adapt Generated Code:**
   - Replace inline styles with Tailwind classes
   - Use Next.js Image component with `getAssetPath` helper
   - Apply consistent spacing tokens (py-[200px], max-w-[1280px])
   - Ensure TypeScript typing
   - Add 'use client' only if needed for interactivity
   - Use semantic HTML (section, article, etc.)

### Component Creation Pattern

```tsx
'use client'  // Only if client-side features needed

import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

interface ComponentProps {
  // Define props with TypeScript
}

const NewComponent = ({ props }: ComponentProps) => {
  // Hooks only if client component
  
  return (
    <section className="relative w-full py-[200px] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Title pattern */}
        <h2 className="text-[50px] font-extrabold leading-[60px] text-center text-black tracking-[-1.5px] mb-[100px]">
          Section Title
        </h2>
        
        {/* Content with consistent spacing */}
        <div className="flex flex-col gap-20">
          {/* Component content */}
        </div>
      </div>
    </section>
  )
}

export default NewComponent
```

### Best Practices

1. **Consistency:**
   - Follow existing naming conventions
   - Use established spacing/sizing tokens
   - Maintain TypeScript strict mode compliance
   - Always use `yes-blue` (#4B52AE) for brand elements
   - Apply light font weight (300) for body text

2. **Performance:**
   - Use Next.js Image for all images
   - Add `priority` to above-fold images
   - Implement lazy loading for below-fold content

3. **Accessibility:**
   - Always include alt text for images
   - Use semantic HTML elements
   - Maintain proper heading hierarchy

4. **Code Quality:**
   - Keep components focused and single-purpose
   - Extract reusable logic into custom hooks
   - Type all props and state with TypeScript

## Figma to Code Workflow

1. **Analyze Figma Design:**
   - Get node metadata first
   - Extract design tokens/variables
   - Identify component patterns

2. **Generate Initial Code:**
   - Use MCP tools with correct framework context
   - Get both code and assets

3. **Adapt to Project:**
   - Apply Tailwind classes
   - Use project color tokens
   - Follow component patterns

4. **Test Implementation:**
   - Use Playwright MCP for E2E testing
   - Verify responsive behavior
   - Check accessibility

5. **Optimize:**
   - Review performance metrics
   - Optimize images and assets
   - Ensure smooth animations

## Common Patterns

### Section Layout
```tsx
<section className="relative w-full bg-[color] py-[200px]">
  <div className="max-w-[1280px] mx-auto px-6">
    <h2 className="text-[50px] font-extrabold leading-[60px] text-center mb-[100px]">
      Section Title
    </h2>
    {/* Section content */}
  </div>
</section>
```

### Feature Grid
```tsx
<div className="grid grid-cols-2 gap-20">
  {features.map((feature, index) => (
    <div key={index} className="flex flex-col items-center text-center">
      {/* Feature content */}
    </div>
  ))}
</div>
```

### Button Styling
```tsx
<button className="bg-white text-[#1A1F3A] px-[60px] py-[25px] rounded-full text-[20px] font-bold hover:bg-gray-100 transition-colors">
  Button Text
</button>
```

### Card/Speech Bubble Pattern
```tsx
<div className="absolute bg-white rounded-[20px] px-8 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform"
     style={{
       top: `${position.top}px`,
       left: `${position.left}px`,
       width: '340px',
       height: '150px',
     }}>
  <p className="text-[18px] leading-[28px] text-gray-700 font-medium whitespace-pre-line text-center flex items-center justify-center h-full tracking-[-0.54px]">
    {content}
  </p>
</div>
```

### Metadata Configuration
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://ycse.github.io'),
  title: 'YES - 말하게 되는 영어, 진짜 시작',
  description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
  icons: {
    icon: '/yes-promotion-website/fav.png',
    apple: '/yes-promotion-website/fav.png',
  },
  openGraph: {
    title: 'YES - 말하게 되는 영어, 진짜 시작',
    description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
    images: ['/yes-promotion-website/images/thumbnail_PC.png'],
  },
}
```

## Key Implementation Notes

### Brand Guidelines
- **Primary Brand Color:** `#4B52AE` (yes-blue) - MUST be used for all YES branding
- **Typography:** Asta Sans font family
- **Body Text Weight:** Always use font-weight 300 (light) for body text
- **Logo/Brand Text:** Use font-extrabold (800) for "YES" text

### Static Site Generation
- Project configured for static export: `output: 'export'` in next.config.js
- Production deployment to GitHub Pages with basePath
- Images unoptimized for static compatibility
- Use `getAssetPath` helper for all asset references

### Client vs Server Components
- Default to server components (no 'use client')
- Add 'use client' only for:
  - Interactive elements (onClick, onChange)
  - Browser APIs (window, document)
  - Hooks requiring client-side (useEffect, useState)
  - Animations using requestAnimationFrame

### TypeScript Strictness
- Strict mode enabled
- All components must have proper typing
- Use interface definitions for props
- Path alias `@/*` configured for clean imports

### Testing with Playwright MCP
- Use `browser_snapshot` for structure analysis
- Test responsive layouts with `browser_resize`
- Verify animations and interactions
- Check console for errors with `browser_console_messages`

### Production Considerations
- GitHub Pages deployment with `/yes-promotion-website` base path
- All assets must use relative paths via helpers
- Metadata includes production URLs
- Trailing slashes enabled for proper routing

This document should be continuously updated as the design system evolves and new patterns emerge.