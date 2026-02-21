import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

const Field = ({ label, value, onChange, placeholder, unit }) => (
    <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{label}{unit && <span style={{ marginLeft: 4, color: 'var(--text-muted)' }}>({unit})</span>}</label>
        <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
    </div>
);

export default function SimpleInterest() {
    const [P, setP] = useState(''); const [R, setR] = useState(''); const [T, setT] = useState('');
    const [result, setResult] = useState(null);
    const calculate = () => {
        const p = parseFloat(P), r = parseFloat(R), t = parseFloat(T);
        if ([p, r, t].some(isNaN)) return;
        const si = (p * r * t) / 100;
        setResult({ SI: si, total: p + si, P: p, R: r, T: t });
    };
    return (
        <CalculatorLayout title="Simple Interest Calculator" category="finance" resultText={result ? `SI: ₹${formatNumber(result.SI)}, Total: ₹${formatNumber(result.total)}` : ''}
            description="Calculate simple interest using SI = P × R × T / 100."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}><strong>SI</strong> = (P × R × T) / 100 &nbsp;|&nbsp; <strong>Amount</strong> = P + SI</p>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                <Field label="Principal" value={P} onChange={setP} unit="₹" placeholder="e.g. 10000" />
                <Field label="Rate" value={R} onChange={setR} unit="% p.a." placeholder="e.g. 8" />
                <Field label="Time" value={T} onChange={setT} unit="years" placeholder="e.g. 2" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setP(''); setR(''); setT(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['Simple Interest', `₹${formatNumber(result.SI)}`, '#059669'], ['Total Amount', `₹${formatNumber(result.total)}`, '#3355ff']].map(([l, v, c]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '16px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 6 }}>{v}</div>
                    </div>
                ))}
            </div>}
        </CalculatorLayout>
    );
}
