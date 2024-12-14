export const formatCurrency = (amount: number, locale: string = 'INR') => {
  const currencySymbols: { [key: string]: string } = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'AUD': 'A$',
    'GBP': '£'
  };

  const formattedNumber = new Intl.NumberFormat('en-IN').format(amount);
  return `${currencySymbols[locale] || ''}${formattedNumber}`;
}; 