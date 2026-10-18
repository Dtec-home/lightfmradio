const REMOTE_IMAGE_HOST = 'app.lightfmradio.org';

export function getSafeImageSource(source?: string | null) {
  if (!source) return null;

  if (source.startsWith('/')) return source;

  try {
    const url = new URL(source);
    if (url.protocol !== 'https:' || url.hostname !== REMOTE_IMAGE_HOST) return null;
    return url.toString();
  } catch {
    return null;
  }
}
