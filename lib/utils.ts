// Utility function to get the correct asset path
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Return the path with leading slash
  return `/${cleanPath}`
}