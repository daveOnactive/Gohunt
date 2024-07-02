export function formatNumber(value: number, isCurrency?: boolean, currency?: string){
  const number = new Intl.NumberFormat('en-US').format(value);

  if (isCurrency) return `${currency || '₦'} ${number}`;

  return number;
}