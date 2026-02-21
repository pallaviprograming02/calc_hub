import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function InflationCalculator() {
    const [amount, setAmount] = useState(''); const [rate, setRate] = useState('6'); const [years, setYears] = useState(''); const [mode, setMode] = useState('future');
    const [result, setResult] = useState(null);
    const calculate = () => {
        const a = parseFloat(amount), r = parseFloat(rate) / 100, y = parseInt(years);
        if ([a, r].some(isNaN) || isNaN(y)) return;
        if (mode === 'future') setResult({ val: a * Math.pow(1 + r, y), label: 'Future Value', desc: `₹${formatNumber(a)} today → in ${y} years` });
        else setResult({ val: a / Math.pow(1 + r, y), label: 'Past Value', desc: `₹${formatNumber(a)} today ← ${y} years ago` });
    };
    return (
        <CalculatorLayout title="Inflation Calculator" category="finance" resultText={result ? `${result.label}: ₹${formatNumber(result.val)}` : ''}
            description="Find future or past value of money adjusted for inflation rate."
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['future', 'Future Value'], ['past', 'Past Value']].map(([v, l]) => <button key={v} onClick={() => { setMode(v); setResult(null); }} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid', borderColor: mode === v ? '#059669' : 'var(--border-color)', background: mode === v ? '#05966915' : 'var(--bg-secondary)', color: mode === v ? '#059669' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{l}</button>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Amount (₹)', amount, setAmount], ['Inflation Rate (%)', rate, setRate], ['Years', years, setYears]].map(([l, v, s]) => (
                    <div key={l}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} /></div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setAmount(''); setYears(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && <div style={{ marginTop: 20, background: '#05966910', border: '1.5px solid #05966930', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{result.desc}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{result.label}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#059669', fontFamily: 'var(--font-mono)', marginTop: 8 }}>₹{formatNumber(result.val)}</div>
            </div>}
        </CalculatorLayout>
    );
}
