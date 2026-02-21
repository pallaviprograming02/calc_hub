import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function LoanCalculator() {
    const [P, setP] = useState(''); const [R, setR] = useState(''); const [N, setN] = useState('');
    const [unit, setUnit] = useState('months');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const p = parseFloat(P), r = parseFloat(R) / 1200;
        const n = unit === 'years' ? parseInt(N) * 12 : parseInt(N);
        if ([p, r].some(isNaN) || isNaN(n) || n === 0) return;
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setResult({ emi, total: emi * n, interest: emi * n - p, months: n });
    };

    return (
        <CalculatorLayout title="Loan Calculator" category="finance" resultText={result ? `EMI: ₹${formatNumber(result.emi)}, Interest: ₹${formatNumber(result.interest)}` : ''}
            description="Calculate total interest, monthly payments, and payoff timeline for any loan."
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Loan Amount (₹)', P, setP], ['Annual Interest Rate (%)', R, setR]].map(([l, v, s]) => (
                    <div key={l}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} /></div>
                ))}
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Loan Tenure</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <input type="number" value={N} onChange={e => setN(e.target.value)} style={{ flex: 1, padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                        <select value={unit} onChange={e => setUnit(e.target.value)} style={{ padding: '10px 10px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 14 }}>
                            <option value="months">Months</option><option value="years">Years</option>
                        </select>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setP(''); setR(''); setN(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {[['Monthly EMI', `₹${formatNumber(result.emi)}`, '#059669'], ['Total Interest', `₹${formatNumber(result.interest)}`, '#d97706'], ['Total Payment', `₹${formatNumber(result.total)}`, '#3355ff']].map(([l, v, c]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '14px 10px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                    </div>
                ))}
            </div>}
        </CalculatorLayout>
    );
}
