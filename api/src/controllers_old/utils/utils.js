export function validateDescriptors(validatorFn, descriptors) {
  const allErrors = descriptors
    .map((descriptor, index) => {
      const errors = validatorFn(descriptor);
      return errors ? `${index}: ${errors}` : null;
    })
    .filter((x) => x != null);
  return allErrors.length ? allErrors.join('\n') : null;
}
