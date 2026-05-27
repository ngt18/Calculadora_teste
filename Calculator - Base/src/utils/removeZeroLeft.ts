export function removeZeroLeft(number: string) {
  if (number.length === 1) return number;
  return number[0] === "0" ? number.slice(1) : number;
}
