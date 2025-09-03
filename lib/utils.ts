// Utility function to get the correct asset path for GitHub Pages deployment
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // In production (GitHub Pages), prepend the basePath
  if (process.env.NODE_ENV === 'production') {
    return `/yes-promotion-website/${cleanPath}`
  }
  
  // In development, use the path as is
  return `/${cleanPath}`
}