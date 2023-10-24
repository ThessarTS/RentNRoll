export const fPrice = (price) => {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
