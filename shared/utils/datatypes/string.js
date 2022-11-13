export const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatPhone = (phone) => {
  if (!phone) return null;
  const rawPhone = phone.replace(/(|)|-/g, '');
  return `(${rawPhone.slice(0, 3)}) ${rawPhone.slice(3, 6)}-${rawPhone.slice(
    6,
    10
  )}`;
};

export const getNameInitials = (fullName) => {
  if (!fullName) return null;
  const rawName = fullName.split(' ');
  return rawName
    .map((nameChunk) => nameChunk[0].toUpperCase())
    .slice(0, 2)
    .join('');
};

export const getFirstLetter = (fullName) => {
  if (!fullName) return null;
  return fullName[0].toUpperCase();
};

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
