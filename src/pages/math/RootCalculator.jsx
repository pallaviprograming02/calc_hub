import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function RootCalculator() {
    const [num, setNum] = useState(''); const [nth, setNth] = useState('2');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const n = parseFloat(num), d = parseFloat(nth);
        if (isNaN(n) || isNaN(d) || d === 0) return;
        setResult(Math.pow(n, 1 / d));
    };

    return (
        <CalculatorLayout title="Root Calculator" category="math"
            resultText={result !== null ? formatNumber(result, 8) : ''}
            description="Calculate square root, cube root, or any nth root of a number."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}><strong>nth root of x</strong> = x^(1/n). For square root, n=2. For cube root, n=3.</p>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Number (x)</label>
                    <input type="number" value={num} onChange={e => setNum(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 16, fontFamily: 'var(--font-mono)' }} />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Root (n)</label>
                    <select value={nth} onChange={e => setNth(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }}>
                        <option value="2">2 (Square Root √)</option>
                        <option value="3">3 (Cube Root ∛)</option>
                        <option value="4">4th Root</option>
                        <option value="5">5th Root</option>
                        <option value="custom">Custom</option>
                    </select>
                    {nth === 'custom' && <input type="number" placeholder="Enter n" style={{ width: '100%', marginTop: 8, padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} onChange={e => setNth(e.target.value)} />}
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setNum(''); setNth('2'); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result !== null && (
                <div style={{ marginTop: 20, background: '#3355ff10', border: '1.5px solid #3355ff30', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{nth === '2' ? '√' : `${nth}th root of`} {num} =</div>
                    <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#3355ff' }}>{formatNumber(result, 8)}</div>
                </div>
            )}
        </CalculatorLayout>
    );
}
