# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js static website project for YES Promotion with the following key characteristics:
- **Framework**: Next.js 14 with React 18, TypeScript, and Tailwind CSS
- **Type**: Static website (SSG - Static Site Generation) with `output: 'export'`
- **Design Source**: Figma designs via MCP integration
- **Testing**: End-to-end testing with Playwright MCP
- **Blog System**: Automated content generation with Gemini AI
- **Deployment**: GitHub Pages via GitHub Actions

## Development Commands

```bash
# Development server (port 3000)
npm run dev

# Build static site for deployment
npm run build

# Preview production build locally
npm run start

# Linting
npm run lint

# Generate blog post (runs daily via GitHub Action)
node blog-generation-system.js
```

## Playwright MCP Testing

### Key Playwright MCP Tools

1. **Navigation & Control**
   - `browser_navigate` - Navigate to URLs
   - `browser_snapshot` - Capture accessibility snapshot (preferred over screenshots for analysis)
   - `browser_close` - Close browser page
   - `browser_tabs` - Manage browser tabs

2. **Page Interaction**
   - `browser_click` - Click elements (single/double/right-click)
   - `browser_type` - Type text into elements
   - `browser_fill_form` - Fill multiple form fields
   - `browser_select_option` - Select dropdown options
   - `browser_file_upload` - Upload files

3. **Verification**
   - `browser_take_screenshot` - Take screenshots for visual verification
   - `browser_console_messages` - Check console messages
   - `browser_network_requests` - Monitor network requests
   - `browser_wait_for` - Wait for text/elements/time

4. **Advanced**
   - `browser_evaluate` - Execute JavaScript on page
   - `browser_handle_dialog` - Handle dialogs/alerts

### Testing Workflow

```bash
# Before running tests, ensure browser is installed
# Use browser_install tool if needed

# Typical test flow:
1. browser_navigate to test URL
2. browser_snapshot to analyze page structure
3. Interact with elements using browser_click, browser_type
4. Verify results with browser_snapshot or browser_take_screenshot
5. Check console/network with browser_console_messages, browser_network_requests
```

## Figma Integration

Use Figma MCP tools to convert designs to code:

1. **Get Design Code**
   - `mcp__figma-dev-mode-mcp-server__get_code` - Generate UI code from Figma node
   - Provide `clientFrameworks: "react"` and `clientLanguages: "typescript,javascript,html,css"`

2. **Get Design Assets**
   - `mcp__figma-dev-mode-mcp-server__get_image` - Export images from designs
   - `mcp__figma-dev-mode-mcp-server__get_variable_defs` - Get design tokens/variables

3. **Design System**
   - `mcp__figma-dev-mode-mcp-server__create_design_system_rules` - Generate design system rules

## Project Structure

```
yes-promotion-website/
├── app/                    # Next.js app directory (App Router)
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page with all sections
│   ├── globals.css        # Global styles and Tailwind imports
│   └── blog/              # Blog section
│       ├── page.tsx       # Blog listing page
│       └── [slug]/        # Dynamic blog post pages
├── components/            # React components
│   ├── Hero.tsx          # Hero section with infinite scroll
│   ├── Section2-5.tsx    # Main landing page sections
│   ├── Footer.tsx        # Footer with fixed CTA bar
│   └── BlogSection.tsx   # Blog preview on homepage
├── content/posts/         # Markdown blog posts
├── lib/                   # Utility functions
│   ├── utils.ts          # Asset path helpers
│   ├── posts.ts          # Blog post utilities
│   └── config.ts         # Site configuration
├── public/               # Static assets and images
├── .github/workflows/    # GitHub Actions
│   ├── deploy.yml        # Deploy to GitHub Pages
│   └── generate-blog-post.yml # Daily blog generation
├── blog-generation-system.js # AI blog generator
├── next.config.js        # Next.js static export config
├── tailwind.config.js    # Tailwind configuration
└── DESIGN_SYSTEM_RULES.md # Comprehensive design system
```

## Development Workflow

1. **Design to Code**
   - Get Figma design using `get_code` or `get_image` tools
   - Convert to React components with TypeScript
   - Apply Tailwind CSS for styling
   - @DESIGN_SYSTEM_RULES.md includes the design base rule.

2. **Static Site Generation**
   - Use `getStaticProps` for data fetching at build time
   - Implement `generateStaticParams` for dynamic routes in app directory
   - Optimize images with Next.js Image component

3. **Testing**
   - Write E2E tests using Playwright MCP tools
   - Test on multiple viewports with `browser_resize`
   - Verify both desktop and mobile layouts

## High-Level Architecture

### Static Site Generation
The site uses Next.js 14's App Router with static export configuration. All pages are pre-rendered at build time.

### Blog System Architecture
1. **Content Storage**: Markdown files in `content/posts/` with gray-matter frontmatter
2. **Generation**: `blog-generation-system.js` uses Gemini AI to create daily posts
3. **Rendering**: Dynamic routing with `[slug]` pages, SSG at build time
4. **Automation**: GitHub Actions runs generation daily and deploys changes

### Component Patterns
- Server Components by default (no `'use client'` unless needed)
- Client Components only for interactivity (modals, accordions, animations)
- Image optimization with Next.js Image component
- Responsive design with Tailwind breakpoints (mobile-first)

### Asset Management
- Production path handling via `getAssetPath()` utility
- Images organized by section in `/public/images/`
- Unoptimized images for static export compatibility

### Key Configuration Files

**next.config.js**
```javascript
output: 'export'         // Static HTML export
images.unoptimized: true // Required for static export
trailingSlash: true      // GitHub Pages compatibility
```

**TypeScript (tsconfig.json)**
- Strict mode enabled
- Path alias: `@/*` maps to root directory
- Target: ES5 for compatibility

## Testing Best Practices

1. Always use `browser_snapshot` before interacting with elements
2. Use exact `ref` values from snapshots for element targeting
3. Include proper `element` descriptions for clarity
4. Test critical user flows first
5. Verify responsive design with `browser_resize`

## GitHub Actions Workflows

### Deploy Workflow (.github/workflows/deploy.yml)
- Triggers on push to main branch
- Builds static site and deploys to GitHub Pages
- Runs on Node.js 18

### Blog Generation Workflow (.github/workflows/generate-blog-post.yml)
- Runs daily at 09:00 UTC (6:00 PM KST)
- Can be manually triggered
- Generates new blog post using Gemini AI
- Commits and pushes changes automatically
- Uses repository secrets for API keys

## Important Implementation Notes

### Blog Generation System
- 70 predefined topics in Korean with English slugs
- Structured content with examples and exercises
- SEO-optimized metadata generation
- Automatic sitemap and RSS feed updates

### Design System Integration
- Refer to DESIGN_SYSTEM_RULES.md for comprehensive styling guidelines
- Component-specific patterns documented in detail
- Responsive breakpoints: mobile (default), md (768px), lg (1024px)
- Color system: YES blue (#3E86D9), navy (#1A1F3A), grays

### Performance Considerations
- Lazy load below-fold content
- Use CSS transforms for animations (GPU acceleration)
- Minimize client-side JavaScript
- Static generation for all pages
