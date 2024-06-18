export function formatDate(value: string) {
  const date = new Date(value);

  if (!date) return '- / - / -';

  return `${date.getDate() || '-'}/${date.getMonth() + 1 || '-'}/${date.getFullYear() || '-'}`
}