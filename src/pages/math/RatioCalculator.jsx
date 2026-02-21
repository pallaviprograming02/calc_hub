import { useState } from 'react';
import { gcd } from '../../utils/mathHelpers';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function RatioCalculator() {
    const [a, setA] = useState(''); const [b, setB] = useState('');
    const [scale, setScale] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const av = parseFloat(a), bv = parseFloat(b);
        if (isNaN(av) || isNaN(bv) || bv === 0) return;
        const g = gcd(Math.round(av * 1000), Math.round(bv * 1000));
        const sA = Math.round(av * 1000) / g;
        const sB = Math.round(bv * 1000) / g;
        const sv = parseFloat(scale);
        const scaled = !isNaN(sv) && sv > 0 ? { a: (sA / sB) * sv, b: sv } : null;
        setResult({ sA, sB, av, bv, scaled });
    };

    return (
        <CalculatorLayout title="Ratio Calculator" category="math"
            resultText={result ? `${result.sA}:${result.sB}` : ''}
            description="Simplify ratios and scale them to any value."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Divide both sides by their GCF (Greatest Common Factor) to simplify. To scale: multiply both sides by a constant.</p>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end', marginBottom: 20 }}>
                {[{ label: 'A', val: a, set: setA }, { label: 'B', val: b, set: setB }].map((f, i) => (
                    <div key={i}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Value {f.label}</label>
                        <input type="number" value={f.val} onChange={e => f.set(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 16, fontFamily: 'var(--font-mono)' }} />
                    </div>
                )).flatMap((el, i) => i === 0 ? [el, <div key="colon" style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-muted)', paddingBottom: 4, textAlign: 'center' }}>:</div>] : [el])}
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Scale to (optional — set B to this value)</label>
                <input type="number" value={scale} onChange={e => setScale(e.target.value)} placeholder="e.g. 100" style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Simplify</button>
                <button onClick={() => { setA(''); setB(''); setScale(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, background: '#3355ff10', border: '1.5px solid #3355ff30', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Simplified Ratio</div>
                    <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#3355ff' }}>{result.sA} : {result.sB}</div>
                    {result.scaled && <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 10 }}>Scaled → <strong>{formatNumber(result.scaled.a)} : {formatNumber(result.scaled.b)}</strong></div>}
                </div>
            )}
        </CalculatorLayout>
    );
}
