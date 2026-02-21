import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function FuelCostCalculator() {
    const [dist, setDist] = useState(''); const [eff, setEff] = useState(''); const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('km');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const d = parseFloat(dist), e = parseFloat(eff), p = parseFloat(price);
        if ([d, e, p].some(isNaN) || e === 0) return;
        const fuelUsed = d / e;
        const cost = fuelUsed * p;
        const per100 = unit === 'km' ? (fuelUsed / d) * 100 : null;
        setResult({ fuelUsed, cost, per100 });
    };

    return (
        <CalculatorLayout title="Fuel Cost Calculator" category="utility" resultText={result ? `Cost: ₹${formatNumber(result.cost, 2)} | Fuel: ${formatNumber(result.fuelUsed, 2)} L` : ''}
            description="Calculate fuel cost and consumption for any trip distance and vehicle efficiency."
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['km', 'Kilometers'], ['mi', 'Miles']].map(([v, l]) => (
                    <button key={v} onClick={() => setUnit(v)} style={{
                        padding: '8px 16px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                        borderColor: unit === v ? '#6366f1' : 'var(--border-color)',
                        background: unit === v ? '#6366f115' : 'var(--bg-secondary)',
                        color: unit === v ? '#6366f1' : 'var(--text-secondary)',
                    }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[
                    [`Distance (${unit})`, dist, setDist, 'e.g. 300'],
                    [`Fuel Efficiency (${unit}/L)`, eff, setEff, 'e.g. 15'],
                    ['Fuel Price (₹/litre)', price, setPrice, 'e.g. 105'],
                ].map(([l, v, s, ph]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#6366f1', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate Cost</button>
                <button onClick={() => { setDist(''); setEff(''); setPrice(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: `repeat(${result.per100 ? 3 : 2}, 1fr)`, gap: 12 }}>
                    {[
                        ['Fuel Used', `${formatNumber(result.fuelUsed, 2)} L`, '#3355ff'],
                        ['Total Cost', `₹${formatNumber(result.cost, 2)}`, '#059669'],
                        ...(result.per100 ? [['L/100km', `${formatNumber(result.per100, 2)}`, '#d97706']] : []),
                    ].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '16px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 24, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                        </div>
                    ))}
                </div>
            )}
        </CalculatorLayout>
    );
}
