import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function RoiCalculator() {
    const [initial, setInitial] = useState(''); const [final, setFinal] = useState(''); const [years, setYears] = useState('');
    const [result, setResult] = useState(null);
    const calculate = () => {
        const i = parseFloat(initial), f = parseFloat(final), y = parseFloat(years);
        if (isNaN(i) || isNaN(f) || i === 0) return;
        const roi = ((f - i) / i) * 100;
        const annualized = !isNaN(y) && y > 0 ? (Math.pow(f / i, 1 / y) - 1) * 100 : null;
        setResult({ roi, annualized, profit: f - i });
    };
    return (
        <CalculatorLayout title="ROI Calculator" category="finance" resultText={result ? `ROI: ${formatNumber(result.roi, 2)}%` : ''}
            description="Calculate return on investment and annualized ROI for any investment."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>ROI</strong> = (Final − Initial) / Initial × 100</p>
                <p><strong>Annualized ROI</strong> = ((Final/Initial)^(1/years) − 1) × 100</p>
            </div>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Initial Investment (₹)', initial, setInitial], ['Final Value (₹)', final, setFinal], ['Period (years, optional)', years, setYears]].map(([l, v, s]) => (
                    <div key={l}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} /></div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setInitial(''); setFinal(''); setYears(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: `repeat(${result.annualized !== null ? 3 : 2},1fr)`, gap: 12 }}>
                {[['Net Profit', `₹${formatNumber(result.profit)}`, '#059669'], ['ROI', `${formatNumber(result.roi, 2)}%`, result.roi >= 0 ? '#059669' : '#ef4444'],
                ...(result.annualized !== null ? [['Annualized ROI', `${formatNumber(result.annualized, 2)}%`, '#3355ff']] : [])
                ].map(([l, v, c]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '14px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                    </div>
                ))}
            </div>}
        </CalculatorLayout>
    );
}
