import { useState, useEffect } from 'react';
import { ArrowLeftRight, RefreshCw } from 'lucide-react';
import CalculatorLayout from '../../layouts/CalculatorLayout';

const POPULAR = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SGD', 'AED', 'SAR', 'HKD', 'NZD', 'KWD'];

export default function CurrencyConverter() {
    const [rates, setRates] = useState(null);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('INR');
    const [amount, setAmount] = useState('1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

    const fetchRates = async () => {
        setLoading(true); setError('');
        try {
            const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await res.json();
            setRates(data.rates);
            setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleString());
        } catch {
            setError('Could not fetch live rates. Using fallback approximate rates.');
            setRates({ USD: 1, EUR: 0.93, GBP: 0.79, INR: 83.5, JPY: 149, AUD: 1.55, CAD: 1.36, CHF: 0.89, CNY: 7.2, SGD: 1.35, AED: 3.67, SAR: 3.75, HKD: 7.82, NZD: 1.63, KWD: 0.31 });
        }
        setLoading(false);
    };

    useEffect(() => { fetchRates(); }, []);

    const result = rates && !isNaN(parseFloat(amount))
        ? (parseFloat(amount) * rates[to] / rates[from]).toFixed(4)
        : '';

    const currencies = rates ? POPULAR.filter(c => rates[c]) : POPULAR;
    const sel = { width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 };

    return (
        <CalculatorLayout title="Currency Converter" category="conversions" resultText={result ? `${amount} ${from} = ${result} ${to}` : ''}
            description="Live exchange rates for 150+ world currencies powered by ExchangeRate-API."
        >
            {loading && <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)' }}>Loading live rates…</div>}
            {error && <div style={{ marginBottom: 14, padding: '10px 14px', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, fontSize: 13, color: '#92400e' }}>{error}</div>}
            {rates && (<>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14, alignItems: 'end', marginBottom: 20 }}>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>From</label>
                        <select value={from} onChange={e => setFrom(e.target.value)} style={sel}>{currencies.map(c => <option key={c} value={c}>{c}</option>)}</select>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ ...sel, marginTop: 10, fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)' }} />
                    </div>
                    <button onClick={() => { const t = from; setFrom(to); setTo(t); }} style={{ marginBottom: 2, padding: '12px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}><ArrowLeftRight size={18} /></button>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>To</label>
                        <select value={to} onChange={e => setTo(e.target.value)} style={sel}>{currencies.map(c => <option key={c} value={c}>{c}</option>)}</select>
                        <div style={{ ...sel, marginTop: 10, fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#d97706', background: '#d9770610', border: '1.5px solid #d97706' }}>{result || '…'}</div>
                    </div>
                </div>
                {result && <div style={{ padding: '14px 18px', background: 'var(--bg-secondary)', borderRadius: 10, border: '1.5px solid var(--border-color)', marginBottom: 14 }}>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>1 {from}</strong><span style={{ color: 'var(--text-muted)' }}> = </span><strong style={{ fontFamily: 'var(--font-mono)', color: '#d97706' }}>{(rates[to] / rates[from]).toFixed(4)} {to}</strong>
                </div>}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                    {lastUpdated && <span>Updated: {lastUpdated}</span>}
                    <button onClick={fetchRates} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12 }}><RefreshCw size={12} /> Refresh</button>
                </div>
            </>)}
        </CalculatorLayout>
    );
}
