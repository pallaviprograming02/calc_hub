import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function ExponentCalculator() {
    const [base, setBase] = useState(''); const [exp, setExp] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const b = parseFloat(base), e = parseFloat(exp);
        if (isNaN(b) || isNaN(e)) return;
        setResult(Math.pow(b, e));
    };

    return (
        <CalculatorLayout title="Exponent Calculator" category="math"
            resultText={result !== null ? formatNumber(result, 8) : ''}
            description="Compute base raised to any power with step-by-step solution."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}><strong>Result</strong> = base<sup>exponent</sup>. Negative exponents: b⁻ⁿ = 1/bⁿ. Fractional exponents: b^(1/n) = nth root of b.</p>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end', marginBottom: 20 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Base</label>
                    <input type="number" value={base} onChange={e => setBase(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 16, fontFamily: 'var(--font-mono)' }} />
                </div>
                <div style={{ textAlign: 'center', paddingBottom: 4 }}>
                    <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-muted)' }}>^</span>
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Exponent</label>
                    <input type="number" value={exp} onChange={e => setExp(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 16, fontFamily: 'var(--font-mono)' }} />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setBase(''); setExp(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result !== null && (
                <div style={{ marginTop: 20, background: '#3355ff10', border: '1.5px solid #3355ff30', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{base}<sup style={{ fontSize: 10 }}>{exp}</sup> =</div>
                    <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#3355ff' }}>{formatNumber(result, 8)}</div>
                </div>
            )}
        </CalculatorLayout>
    );
}
