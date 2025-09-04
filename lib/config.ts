export const config = {
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
}

export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${config.basePath}/${cleanPath}`
}