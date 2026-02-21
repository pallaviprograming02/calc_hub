// Format numbers with locale-aware commas
export const formatNumber = (n, decimals = 2) => {
    if (isNaN(n) || !isFinite(n)) return '—';
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    }).format(n);
};

export const formatCurrency = (n, currency = 'INR') => {
    if (isNaN(n) || !isFinite(n)) return '—';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(n);
};
