# Design System Rules for YES Promotion Website

This document provides comprehensive design guidelines and component-specific patterns for the YES Promotion website, ensuring consistency across all implementations.

## Table of Contents
1. [Core Design Tokens](#core-design-tokens)
2. [Typography System](#typography-system)
3. [Color System](#color-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Design Patterns](#component-design-patterns)
6. [Responsive Design Strategy](#responsive-design-strategy)
7. [Animation & Interactions](#animation--interactions)
8. [Asset Management](#asset-management)
9. [Development Guidelines](#development-guidelines)

## Core Design Tokens

### 1. Brand Identity
- **Primary Brand:** YES (예스)
- **Brand Personality:** Professional, Approachable, Innovative
- **Visual Language:** Clean, Modern, Trustworthy

### 2. Design Principles
- **Clarity First:** Content should be immediately understandable
- **Consistent Hierarchy:** Clear visual progression through sections
- **Subtle Interactions:** Smooth transitions without distraction
- **Mobile-First Responsive:** Optimized for all device sizes

## Typography System

### Font Family
```css
font-family: "Asta Sans", sans-serif;
```

### Font Weights
- `font-light` (300): Body text, descriptions, testimonials
- `font-normal` (400): Regular text (rarely used)
- `font-medium` (500): Card content emphasis
- `font-bold` (700): Headings, buttons, CTAs
- `font-extrabold` (800): Brand emphasis (YES logo text)

### Typography Scale

#### Hero Section
```scss
// Desktop (lg)
.hero-heading {
  font-size: 70px;
  line-height: 85px;
  letter-spacing: -2.1px;
  font-weight: 700;
}

// Tablet (md)
.hero-heading-md {
  font-size: 50px;
  line-height: 60px;
  letter-spacing: -1.5px;
}

// Mobile
.hero-heading-sm {
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -1px;
}
```

#### Section Headings
```scss
// Primary Section Title
.section-title {
  // Desktop
  font-size: 50px;
  line-height: 60px;
  letter-spacing: -1.5px;
  font-weight: 800; // extrabold
  
  // Tablet
  @media (max-width: 1024px) {
    font-size: 40px;
    line-height: 50px;
    letter-spacing: -1.2px;
  }
  
  // Mobile
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 36px;
    letter-spacing: -0.8px;
  }
}

// Subsection Title
.subsection-title {
  // Desktop
  font-size: 30px;
  line-height: 40px;
  letter-spacing: -0.9px;
  font-weight: 700;
  
  // Tablet
  @media (max-width: 1024px) {
    font-size: 25px;
    line-height: 34px;
    letter-spacing: -0.75px;
  }
  
  // Mobile
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.6px;
  }
}
```

#### Body Text
```scss
// Large Body (Buttons, Important Text)
.body-large {
  font-size: 20px;
  line-height: 32px;
  font-weight: 700;
}

// Medium Body (Cards, Descriptions)
.body-medium {
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.54px;
  font-weight: 300; // light
}

// Small Body (Captions, Secondary Info)
.body-small {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.48px;
  font-weight: 300;
}

// Mobile Body
.body-mobile {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.42px;
  font-weight: 300;
}
```

## Color System

### Primary Colors
```scss
$yes-blue: #4B52AE;    // Primary brand color
$yes-navy: #1A1F3A;    // Dark backgrounds, section bg
$yes-gray: #F8F9FA;    // Light backgrounds
```

### Extended Palette
```scss
// Text Colors
$text-primary: #000000;        // Main text
$text-secondary: #666666;      // Secondary text
$text-light: #999999;          // Disabled/placeholder
$text-white: #FFFFFF;          // Inverted text
$text-white-90: rgba(255, 255, 255, 0.9);  // Slightly transparent white

// Accent Colors
$accent-purple: #868BC7;       // Feature labels in dark sections
$accent-blue: #4B52AE;         // Interactive elements, links

// Background Colors
$bg-white: #FFFFFF;            // Default background
$bg-dark: #1A1F3A;            // Dark sections
$bg-black: #000000;           // Footer background
$bg-gray-light: #F8F9FA;      // Alternate sections

// UI Colors
$border-white: #FFFFFF;       // White borders
$border-gray: #E5E5E5;        // Dividers
$shadow-default: 0 8px 24px rgba(0, 0, 0, 0.08);  // Card shadows
```

### Color Usage Patterns
- **Hero Section:** White background, black text, yes-blue for brand
- **Section 2:** White background, gray-700 text in bubbles
- **Section 3:** Dark navy background, white text, purple accents
- **Section 4:** Image overlay with white text
- **Section 5:** White background, black primary text, gray secondary
- **Footer:** Black background, white text, gray legal text

## Spacing & Layout

### Container System
```scss
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px; // Mobile: 16px, Tablet: 24px, Desktop: 24px
}
```

### Section Spacing
```scss
// Desktop
.section-padding {
  padding-top: 200px;
  padding-bottom: 200px;
}

// Tablet
.section-padding-md {
  padding-top: 150px;
  padding-bottom: 150px;
}

// Mobile
.section-padding-sm {
  padding-top: 80px;
  padding-bottom: 80px;
}
```

### Component Gaps
```scss
// Feature Grids
.feature-gap-lg: 80px;  // Desktop
.feature-gap-md: 56px;  // Tablet
.feature-gap-sm: 40px;  // Mobile

// Content Spacing
.content-gap-lg: 100px;  // Major sections
.content-gap-md: 70px;   // Subsections
.content-gap-sm: 40px;   // Elements
```

## Component Design Patterns

### 1. Hero Component
```typescript
// Structure
<section className="relative w-full h-[600px] md:h-[900px] overflow-hidden bg-white">
  <div className="flex flex-col items-center justify-start pt-[80px] md:pt-[200px]">
    // Title with brand emphasis
    <h1>말하게 되는 영어</h1>
    <p>진짜 시작은 <span className="font-extrabold text-yes-blue">YES</span></p>
    // Infinite scroll animation
  </div>
</section>

// Key Design Elements:
- Infinite horizontal scroll animation (0.5px/frame)
- Fixed width images (2150px) for seamless loop
- Brand color emphasis on "YES"
- Responsive height adjustment
```

### 2. Section2 - Speech Bubbles
```typescript
// Desktop Layout (Hidden on mobile/tablet)
<div className="relative h-[539px] w-full max-w-[1030px]">
  // Absolutely positioned bubbles
  {speechBubbles.map(bubble => (
    <div className="absolute bg-white rounded-[20px] px-8 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
         style={{ top: bubble.top, left: bubble.left, width: '340px', height: '150px' }}>
  ))}
</div>

// Mobile Layout - Alternating Two Columns
<div className="grid grid-cols-2 gap-0">
  // Left column (indices 0,2,4)
  <div className="flex flex-col gap-2">
    // z-index: 1, 3, 5 (sequential increase)
  </div>
  // Right column (indices 1,3,5) 
  <div className="flex flex-col gap-2 mt-[50px] -ml-5">
    // z-index: 2, 4, 6 (sequential increase)
    // Offset down for staggered effect
  </div>
</div>

// Key Design Elements:
- Fixed positioning on desktop
- Staggered two-column layout on mobile
- Sequential z-index for layering (1-6)
- Overlap effect with negative margins
- Hover scale animation
```

### 3. Section3 - Dark Feature Section
```typescript
// Background & Theme
className="bg-[#1A1F3A] text-white"

// Two-part structure:
// Part 1: Feature Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
  // Icon + Title + Subtitle + Description
  // Purple accent for labels (#868BC7)
</div>

// Part 2: TIA Introduction
<div className="flex flex-col items-center">
  // Video showcase in white frame
  // Three-column feature list
  // CTA button with border
</div>

// Key Design Elements:
- Dark navy background for contrast
- White text with 90% opacity for descriptions
- Purple accent color for feature labels
- Video in rounded white container
- Ghost button style (border only)
```

### 4. Section4 - Testimonial Overlay
```typescript
// Full-width image background
<div className="absolute inset-0">
  <Image fill className="object-cover" />
</div>

// Centered text overlay
<div className="relative z-10 text-center text-white">
  // Testimonial quote
  // Attribution
</div>

// Key Design Elements:
- Full-bleed background image
- White text overlay
- Light font weight for elegance
- Minimal height for impact
```

### 5. Section5 - Level Test & FAQ
```typescript
// Three-part structure:
// 1. Title
// 2. Phone mockup + Features
<div className="flex flex-col lg:flex-row gap-[100px]">
  // Phone mockup (fixed aspect ratio)
  // Feature list with icons
</div>

// 3. Expandable FAQ
<div className="max-w-[1080px] mx-auto">
  {faqs.map(faq => (
    // Accordion with smooth height animation
    // Color change on active (#4B52AE)
  ))}
</div>

// Key Design Elements:
- Phone mockup maintains aspect ratio
- Feature icons at 100x100px
- FAQ with smooth expand animation
- Active state color change
- Divider lines between FAQs
```

### 6. Footer - Two-layer Design
```typescript
// Fixed Bottom Bar
<div className="fixed bottom-0 left-0 right-0 bg-[#4b52ae] z-50">
  // Full-width CTA button
  // GO badge element
</div>

// Main Footer
<footer className="bg-black py-[120px] pb-[190px]">
  // Brand message
  // App store buttons with icons
</footer>

// Key Design Elements:
- Sticky CTA bar at bottom
- Black background for premium feel
- Ghost button style for app stores
- Extra padding bottom for fixed bar
- Smooth scroll to footer on CTA click
```

## Responsive Design Strategy

### Breakpoints
```scss
// Mobile First Approach
$mobile: 0px;        // Default
$tablet: 768px;      // md:
$desktop: 1024px;    // lg:
$wide: 1440px;       // xl:
```

### Responsive Patterns

#### Typography Scaling
```scss
// Desktop -> Tablet -> Mobile
// Example: Section Title
text-[50px] -> text-[40px] -> text-[28px]
leading-[60px] -> leading-[50px] -> leading-[36px]
tracking-[-1.5px] -> tracking-[-1.2px] -> tracking-[-0.8px]
```

#### Spacing Adaptation
```scss
// Section Padding
py-[200px] -> py-[150px] -> py-[80px]

// Component Gaps
gap-20 -> gap-14 -> gap-10

// Margins
mb-[100px] -> mb-[80px] -> mb-[50px]
```

#### Layout Changes
- **Hero:** Height 900px -> 600px
- **Features:** 2 columns -> 1 column
- **Speech Bubbles:** Absolute -> Grid layout
- **Footer:** Row -> Column layout

## Animation & Interactions

### Hover States
```scss
// Scale Animation
.hover-scale {
  transform: scale(1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

// Color Transitions
.hover-button {
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: $yes-navy;
  }
}
```

### Scroll Animations
```javascript
// Infinite Scroll (Hero)
const animate = () => {
  position -= 0.5; // Speed
  if (position <= -2150) {
    position = 0; // Reset
  }
  element.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
};

// Smooth Scroll
element.scrollIntoView({ behavior: 'smooth' });
```

### Transitions
```scss
// FAQ Accordion
.accordion-content {
  max-height: 0;
  opacity: 0;
  transition: all 500ms ease-in-out;
  
  &.open {
    max-height: 250px;
    opacity: 1;
  }
}
```

## Asset Management

### Image Organization
```
/public/images/
├── thumbnail_PC.png       # Hero banner
├── section2/
│   └── D1.png            # Question icon
├── section3/
│   ├── A1.png           # Feature icons
│   ├── A2.png
│   ├── A3.png
│   └── A5.png
├── section3-2/
│   ├── list2-1.png      # TIA feature icons
│   ├── list2-2.png
│   ├── list2-3.png
│   └── tia.mp4          # TIA demo video
├── section4/
│   └── section4.png     # Testimonial bg
├── frame4/
│   ├── img 3.png        # Phone mockup
│   ├── C1.png           # Level test icons
│   ├── C2.png
│   └── C3.png
└── icons/
    ├── apple.svg        # App store icon
    └── google.svg       # Play store icon
```

### Image Guidelines
- Use Next.js Image component for optimization
- Priority loading for above-fold images
- Maintain aspect ratios for consistency
- Use getAssetPath() helper for production paths

### Icon Specifications
- Standard size: 110x110px
- Mobile size: 70x70px
- Format: PNG with transparency
- Consistent visual weight

## Development Guidelines

### Component Architecture
```typescript
// Standard Component Pattern
'use client'  // Only if needed for interactivity

import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const ComponentName = () => {
  // State and hooks (if client component)
  
  return (
    <section className="relative w-full py-[200px] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="section-title">
          Title
        </h2>
        {/* Component content */}
      </div>
    </section>
  )
}

export default ComponentName
```

### Tailwind Class Organization
1. **Layout:** `relative`, `flex`, `grid`
2. **Sizing:** `w-full`, `h-[100px]`, `max-w-[1280px]`
3. **Spacing:** `px-6`, `py-[200px]`, `gap-20`
4. **Typography:** `text-[50px]`, `font-bold`, `leading-[60px]`
5. **Colors:** `text-black`, `bg-white`
6. **Effects:** `shadow-lg`, `rounded-[20px]`
7. **Animations:** `hover:scale-105`, `transition-transform`

### Mobile-First Implementation
```scss
// Start with mobile styles
className="text-[28px] md:text-[40px] lg:text-[50px]"

// Progressive enhancement
className="grid grid-cols-1 md:grid-cols-2"

// Conditional rendering
className="hidden lg:block"  // Desktop only
className="md:hidden"        // Mobile only
```

### Performance Optimization
- Use `'use client'` only when necessary
- Implement lazy loading for below-fold content
- Optimize images with proper sizing
- Minimize re-renders with proper state management
- Use CSS transforms for animations (GPU acceleration)

### Accessibility Standards
- Semantic HTML structure
- Proper heading hierarchy (h1 -> h2 -> h3)
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)

## Component-Specific Styles Reference

### Hero Component
- Height: 600px (mobile) / 900px (desktop)
- Title size: 32px -> 50px -> 70px
- Infinite scroll speed: 0.5px per frame
- Image width: 2150px fixed

### Section2 (Speech Bubbles)
- Desktop: Absolute positioning, 340x150px bubbles
- Mobile: Two-column grid with overlap
- Shadow: 0 8px 24px rgba(0,0,0,0.08)
- Border radius: 20px
- Padding: Mobile (px-3 py-4), Desktop (px-8 py-6)

### Section3 (Features)
- Background: #1A1F3A
- Text: White primary, #868BC7 accent
- Icon size: 70px -> 90px -> 110px
- Video container: 360x632px with white frame
- Button: Border-2, rounded-100px, hover effect

### Section4 (Testimonial)
- Height: 400px -> 450px -> 516px
- Full-width background image
- Centered text overlay
- Light font weight throughout

### Section5 (Level Test)
- Phone mockup: 300x607px
- Icon size: 100x100px
- FAQ max-height animation: 250px
- Active FAQ color: #4B52AE

### Footer
- Fixed bar height: py-4 -> py-5 -> py-6
- Main footer padding: 120px top, 190px bottom
- App store buttons: 260px width
- Border: 2px white

## Version History
- v2.0.0 - Complete redesign with component-specific patterns
- v1.0.0 - Initial design system

---

This document should be continuously updated as the design system evolves and new patterns emerge.