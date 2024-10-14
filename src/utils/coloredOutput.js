export const colors = {
  green: 32,
  red: 31,
  yellow: 33,
  magenta: 35
}


export const coloredOutput = (text, color) => {
  return `\x1b[${color}m${text}\x1b[0m\n`;
}