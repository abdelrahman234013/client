export const PriceFormatter = (value: any) => {
  // Format the price using toLocaleString
  const formattedPrice = value.toLocaleString("en-US", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2,
  });

  // Extract the currency symbol from the formatted price
  const currencySymbol = formattedPrice.slice(0, 3);

  // Extract the numeric part of the formatted price
  const numericPart = formattedPrice.slice(3);

  // Concatenate the numeric part and currency code
  const formattedPriceWithCurrency = `${numericPart} ${currencySymbol}`;

  return formattedPriceWithCurrency;
};
