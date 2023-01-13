export function joinRoute(url: string[]): string {
  return `/${url.join('/')}`;
}
