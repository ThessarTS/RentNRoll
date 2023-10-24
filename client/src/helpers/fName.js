export const truncateName = (name) => {
  const maxLength = 18;
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + "...";
  }
  return name;
};
