export function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0, n = bytes;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  const precision = (n < 10 && i > 0) ? 1 : 0;
  return `${n.toFixed(precision)} ${units[i]}`;
}

export function isImageFile(file) {
  if (!file) return false;
  const isImageMime = file.type && file.type.startsWith('image/');
  const isImageExt = /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name || '');
  return isImageMime || isImageExt;
}
