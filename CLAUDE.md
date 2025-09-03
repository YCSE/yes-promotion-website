# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js static website project for YES Promotion with the following key characteristics:
- **Framework**: Next.js with React
- **Type**: Static website (SSG - Static Site Generation)
- **Design Source**: Figma designs via MCP integration
- **Testing**: End-to-end testing with Playwright MCP

## Project Setup Commands

```bash
# Initialize Next.js project (if not already initialized)
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install dependencies
npm install

# Development server
npm run dev

# Build static site
npm run build
npm run export  # For static export if using pages router

# Production preview
npm run start

# Linting and formatting
npm run lint
npm run lint:fix
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
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── public/               # Static assets
├── tests/                # Playwright E2E tests
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
└── DESIGN_SYSTEM_RULES.md # Design detailed description
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

## Build Configuration

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // For static export
  images: {
    unoptimized: true  // For static export compatibility
  },
}
```

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured in tsconfig.json
- Type checking on build

## Testing Best Practices

1. Always use `browser_snapshot` before interacting with elements
2. Use exact `ref` values from snapshots for element targeting
3. Include proper `element` descriptions for clarity
4. Test critical user flows first
5. Verify responsive design with `browser_resize`

## Common Tasks

### Adding a New Page
1. Create new file in `app/` directory
2. Export default React component
3. Add metadata for SEO
4. Test with Playwright MCP

### Converting Figma Design
1. Get node ID from Figma URL or selection
2. Use `get_code` with React framework specified
3. Adapt generated code to project structure
4. Apply project-specific styling patterns

### Running E2E Tests
1. Start development server: `npm run dev`
2. Use Playwright MCP tools to navigate and test
3. Capture screenshots for visual regression
4. Check console for errors