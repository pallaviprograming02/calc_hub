import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';

export default function LogCalculator() {
    const [num, setNum] = useState(''); const [base, setBase] = useState('10');
    const [result, setResult] = useState(null); const [steps, setSteps] = useState([]);

    const calculate = () => {
        const n = parseFloat(num), b = base === 'e' ? Math.E : parseFloat(base);
        if (isNaN(n) || n <= 0) return;
        let res, label, s;
        if (base === 'e') { res = Math.log(n); label = 'ln'; s = [`ln(${n})`, `= log base e of ${n}`, `= ${res.toFixed(10)}`]; }
        else { res = Math.log(n) / Math.log(b); label = `log${b}`; s = [`log${b}(${n})`, `= ln(${n}) / ln(${b})`, `= ${Math.log(n).toFixed(6)} / ${Math.log(b).toFixed(6)}`, `= ${res.toFixed(10)}`]; }
        setResult(res); setSteps(s);
    };

    return (
        <CalculatorLayout title="Log Calculator" category="math" resultText={result !== null ? result.toFixed(8) : ''}
            description="Calculate logarithms for any base including natural log (ln) and log base 10."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>log_b(x)</strong> = ln(x) / ln(b) &nbsp;(change of base formula)</p>
                <p><strong>ln(x)</strong> = log base e ≈ 2.71828…</p>
                <p><strong>log10(x)</strong> = log base 10</p>
            </div>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Number (x)</label>
                    <input type="number" value={num} onChange={e => setNum(e.target.value)} min="0.0001" style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Base</label>
                    <select value={base} onChange={e => setBase(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }}>
                        <option value="10">10 (log₁₀)</option>
                        <option value="e">e (ln)</option>
                        <option value="2">2 (log₂)</option>
                    </select>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setNum(''); setResult(null); setSteps([]); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result !== null && (
                <div style={{ marginTop: 20, background: '#3355ff10', border: '1.5px solid #3355ff30', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Result</div>
                    <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#3355ff' }}>{result.toFixed(8)}</div>
                    <div style={{ marginTop: 10 }}>{steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', padding: '3px 0', borderTop: i > 0 ? '1px solid var(--border-color)' : 'none' }}>{s}</div>)}</div>
                </div>
            )}
        </CalculatorLayout>
    );
}
