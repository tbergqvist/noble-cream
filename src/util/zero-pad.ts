export function zeroPad(value: string) {
  if (value && value.length == 1) {
    return "0" + value;
  }
  return value;
}