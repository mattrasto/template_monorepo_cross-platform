// Basic validation for emails
// TODO: Use Trumail or another API for better verification
export const validateEmail = (rawEmail) => {
  if (
    !rawEmail ||
    !rawEmail.includes('@') ||
    !rawEmail.includes('.') ||
    rawEmail < 7
  ) {
    return false;
  }
  return true;
};

export const nonEmptyString = (value) => {
  if (value === null) return 'cannot be null';
  if (value.length === 0) return 'must not be empty';
  return null;
};

export const isNumber = (value) => {
  return nonEmptyString(value) || Number.isNaN(Number(value))
    ? 'must be a number'
    : null;
};
