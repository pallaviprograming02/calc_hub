import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function MarginCalculator() {
    const [cost, setCost] = useState(''); const [revenue, setRevenue] = useState('');
    const [result, setResult] = useState(null);
    const calculate = () => {
        const c = parseFloat(cost), r = parseFloat(revenue);
        if (isNaN(c) || isNaN(r) || r === 0) return;
        const profit = r - c, margin = (profit / r) * 100, markup = (profit / c) * 100;
        setResult({ profit, margin, markup, c, r });
    };
    return (
        <CalculatorLayout title="Margin Calculator" category="finance" resultText={result ? `Margin: ${formatNumber(result.margin, 2)}%, Markup: ${formatNumber(result.markup, 2)}%` : ''}
            description="Calculate gross profit margin and markup percentage from cost and revenue."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>Gross Margin</strong> = (Revenue − Cost) / Revenue × 100</p>
                <p><strong>Markup</strong> = (Revenue − Cost) / Cost × 100</p>
            </div>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Cost Price (₹)', cost, setCost], ['Selling Price / Revenue (₹)', revenue, setRevenue]].map(([l, v, s]) => (
                    <div key={l}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} /></div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setCost(''); setRevenue(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {[['Gross Profit', `₹${formatNumber(result.profit)}`, '#059669'], ['Profit Margin', `${formatNumber(result.margin, 2)}%`, '#3355ff'], ['Markup %', `${formatNumber(result.markup, 2)}%`, '#d97706']].map(([l, v, c]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '14px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                    </div>
                ))}
            </div>}
        </CalculatorLayout>
    );
}
