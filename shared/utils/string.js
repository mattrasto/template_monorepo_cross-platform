export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(string) {
  return string
    .split(' ')
    .map(capitalizeFirst)
    .join(' ');
}

export function maybeArrayToString(arrayOrString) {
  return typeof arrayOrString === 'string'
    ? arrayOrString
    : arrayOrString.join(', ');
}
