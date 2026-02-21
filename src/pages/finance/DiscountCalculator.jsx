import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function DiscountCalculator() {
    const [price, setPrice] = useState(''); const [disc, setDisc] = useState('');
    const [result, setResult] = useState(null);
    const calculate = () => {
        const p = parseFloat(price), d = parseFloat(disc);
        if (isNaN(p) || isNaN(d)) return;
        const savings = p * (d / 100);
        setResult({ savings, final: p - savings, p, d });
    };
    return (
        <CalculatorLayout title="Discount Calculator" category="finance" resultText={result ? `Final: ₹${formatNumber(result.final)}, Save: ₹${formatNumber(result.savings)}` : ''}
            description="Find the final price and savings amount from any discount percentage."
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Original Price (₹)', price, setPrice], ['Discount (%)', disc, setDisc]].map(([l, v, s]) => (
                    <div key={l}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} /></div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setPrice(''); setDisc(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['You Save', `₹${formatNumber(result.savings)}`, '#d97706'], ['Final Price', `₹${formatNumber(result.final)}`, '#059669']].map(([l, v, c]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '16px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 6 }}>{v}</div>
                    </div>
                ))}
            </div>}
        </CalculatorLayout>
    );
}
