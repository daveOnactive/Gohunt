export function convertToTime(timestamp: Date | string) {
  if(!timestamp) return ''
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const formattedTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${amPm}`;

  return formattedTime;
}