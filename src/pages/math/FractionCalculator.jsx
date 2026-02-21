import { useState } from 'react';
import Fraction from 'fraction.js';
import CalculatorLayout from '../../layouts/CalculatorLayout';

const FInput = ({ label, n, d, onN, onD }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{label}</div>
        <input type="number" value={n} onChange={e => onN(e.target.value)} placeholder="Numerator"
            style={{ width: 90, padding: '9px', textAlign: 'center', borderRadius: 8, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 16, fontFamily: 'var(--font-mono)', display: 'block', margin: '0 auto 4px' }} />
        <div style={{ width: 90, height: 2, background: 'var(--text-primary)', margin: '0 auto 4px' }} />
        <input type="number" value={d} onChange={e => onD(e.target.value)} placeholder="Denominator"
            style={{ width: 90, padding: '9px', textAlign: 'center', borderRadius: 8, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 16, fontFamily: 'var(--font-mono)', display: 'block', margin: '0 auto' }} />
    </div>
);

export default function FractionCalculator() {
    const [n1, setN1] = useState(''); const [d1, setD1] = useState('');
    const [n2, setN2] = useState(''); const [d2, setD2] = useState('');
    const [op, setOp] = useState('+');
    const [result, setResult] = useState(null);

    const calculate = () => {
        try {
            const f1 = new Fraction(parseInt(n1), parseInt(d1));
            const f2 = new Fraction(parseInt(n2), parseInt(d2));
            let res;
            if (op === '+') res = f1.add(f2);
            if (op === '-') res = f1.sub(f2);
            if (op === '×') res = f1.mul(f2);
            if (op === '÷') res = f1.div(f2);
            setResult(res);
        } catch { setResult(null); }
    };

    const resStr = result ? `${result.n}/${result.d}` : '';

    return (
        <CalculatorLayout title="Fraction Calculator" category="math" resultText={resStr}
            description="Add, subtract, multiply, and divide fractions with simplified results."
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
                <FInput label="First Fraction" n={n1} d={d1} onN={setN1} onD={setD1} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['+', '-', '×', '÷'].map(o => (
                        <button key={o} onClick={() => setOp(o)} style={{
                            width: 40, height: 40, borderRadius: 8, border: '1.5px solid',
                            borderColor: op === o ? '#3355ff' : 'var(--border-color)',
                            background: op === o ? '#3355ff' : 'var(--bg-secondary)',
                            color: op === o ? '#fff' : 'var(--text-primary)',
                            fontSize: 20, cursor: 'pointer', fontWeight: 700,
                        }}>{o}</button>
                    ))}
                </div>
                <FInput label="Second Fraction" n={n2} d={d2} onN={setN2} onD={setD2} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setN1(''); setD1(''); setN2(''); setD2(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 15 }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, background: '#3355ff10', border: '1.5px solid #3355ff30', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Result (simplified)</div>
                    <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#3355ff', margin: '8px 0 4px' }}>{result.n}</div>
                    <div style={{ height: 3, width: 60, background: '#3355ff', margin: '0 auto 4px', borderRadius: 2 }} />
                    <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#3355ff' }}>{result.d}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>≈ {(result.n / result.d).toFixed(6)}</div>
                </div>
            )}
        </CalculatorLayout>
    );
}
