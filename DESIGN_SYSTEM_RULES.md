# Design System Rules for YES Promotion Website

This document provides comprehensive guidelines for integrating Figma designs using the Model Context Protocol (MCP) into the YES Promotion website codebase.

## Design System Structure

### 1. Token Definitions

#### Colors
**Location:** `/tailwind.config.js`
```javascript
colors: {
  'yes-blue': '#0066FF',
  'yes-navy': '#1A1F3A',
  'yes-gray': '#F8F9FA',
}
```

**Usage Pattern:**
- Primary brand color: `yes-blue` (#0066FF)
- Dark backgrounds: `yes-navy` (#1A1F3A)
- Light backgrounds: `yes-gray` (#F8F9FA)
- Text colors: `text-black`, `text-white`, `text-white/90` (with opacity)

#### Typography
**Font Families:**
- Primary (Korean): `'Noto Sans KR', sans-serif` - weights: 400, 500, 700, 800
- Accent (English): `'Figtree', sans-serif` - weight: 800
- Custom: `'Pretendard', sans-serif` (configured but not yet used)

**Font Sizes & Line Heights:**
```css
/* Hero Section */
text-[70px] leading-[85px] tracking-[-2.1px]  /* Main heading */
text-[50px] leading-[60px] tracking-[-1.5px]  /* Section heading */
text-[30px] leading-[40px] tracking-[-0.9px]  /* Subheading */
text-[20px] leading-[32px]                     /* Body large */
text-[18px] leading-[32px] tracking-[-0.54px]  /* Body medium */
text-[16px]                                    /* Body small */
```

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
'use client'  // For client-side components

import { ComponentDependencies } from 'react'
import Image from 'next/image'

const ComponentName = () => {
  // Logic and state
  
  return (
    <section className="tailwind-classes">
      {/* Component content */}
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

**Image Optimization:**
- Using Next.js `Image` component for automatic optimization
- Priority loading for above-fold images: `priority` prop
- Responsive sizing with `width`, `height`, and `className`

**Asset Types:**
- Images: `.png`, `.jpg`, `.svg`
- Videos: `.mp4` (with autoPlay, loop, muted attributes)

**Usage Pattern:**
```tsx
import Image from 'next/image'

<Image 
  src="/images/section3/icon.png"  // Public path
  alt="Description"
  width={110}
  height={110}
  className="w-full h-full object-contain"
  priority  // For critical images
/>
```

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
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { 
    @apply text-black bg-white;
    font-family: 'Noto Sans KR', sans-serif;
  }
}
```

**Responsive Design:**
- Mobile-first approach with Tailwind breakpoints
- Grid system: `grid grid-cols-2`, `grid-cols-3`
- Flexbox layouts: `flex flex-col`, `flex items-center`

**Animation Patterns:**
- CSS animations via `requestAnimationFrame` for smooth performance
- Hover states: `hover:bg-gray-100 transition-colors`
- Will-change optimization: `style={{ willChange: 'transform' }}`

### 7. Project Structure

```
yes-promotion-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page entry
│   └── globals.css        # Global styles & Tailwind
├── components/            # Reusable React components
│   ├── Hero.tsx          # Hero section with animation
│   ├── Section2.tsx      # Feature sections
│   ├── Section3.tsx      # Multi-part sections
│   ├── Section4.tsx      # Content sections
│   └── Footer.tsx        # Site footer
├── public/
│   └── images/           # Static assets
│       ├── section2/     # Section-specific images
│       ├── section3/     # Section-specific images
│       └── section3-2/   # Subsection assets
├── scripts/              # Build/utility scripts
├── .playwright-mcp/      # Playwright testing
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript config
├── next.config.js        # Next.js config
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
     clientLanguages: "typescript,javascript,html,css"
   })
   ```

3. **Adapt Generated Code:**
   - Replace inline styles with Tailwind classes
   - Use Next.js Image component for images
   - Apply consistent spacing tokens
   - Ensure TypeScript typing

### Component Creation Pattern

```tsx
'use client'  // Only if client-side features needed

import Image from 'next/image'

interface ComponentProps {
  // Define props with TypeScript
}

const NewComponent = ({ props }: ComponentProps) => {
  // Component-specific logic
  
  return (
    <section className="relative w-full py-[200px]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Content following existing patterns */}
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

This document should be continuously updated as the design system evolves and new patterns emerge.