// Formats a date in locale format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
