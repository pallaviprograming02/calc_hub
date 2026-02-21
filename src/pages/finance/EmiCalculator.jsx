import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function EmiCalculator() {
    const [P, setP] = useState('500000'); const [R, setR] = useState('8'); const [N, setN] = useState('60');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const p = parseFloat(P), r = parseFloat(R) / 1200, n = parseInt(N);
        if (isNaN(p) || isNaN(r) || isNaN(n) || n === 0) return;
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalAmt = emi * n;
        const totalInt = totalAmt - p;
        // Build amortization schedule (monthly)
        let bal = p; const sched = [];
        for (let i = 1; i <= n; i++) {
            const int = bal * r;
            const prin = emi - int;
            bal -= prin;
            sched.push({ month: i, emi: +emi.toFixed(2), principal: +prin.toFixed(2), interest: +int.toFixed(2), balance: +Math.max(0, bal).toFixed(2) });
        }
        setResult({ emi, totalAmt, totalInt, P: p, sched });
    };

    const chartData = result ? result.sched.filter((_, i) => i % Math.max(1, Math.floor(result.sched.length / 12)) === 0).map(s => ({ name: `M${s.month}`, Principal: s.principal, Interest: s.interest })) : [];

    const resStr = result ? `EMI: ₹${formatNumber(result.emi)}/mo | Total: ₹${formatNumber(result.totalAmt)} | Interest: ₹${formatNumber(result.totalInt)}` : '';

    return (
        <CalculatorLayout title="EMI Calculator" category="finance" resultText={resStr}
            description="Calculate monthly EMI with amortization schedule and interest breakdown chart."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1) &nbsp; where r = monthly rate = Annual%/1200</p>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Principal (₹)', P, setP, 'e.g. 500000'], ['Annual Rate (%)', R, setR, 'e.g. 8'], ['Tenure (months)', N, setN, 'e.g. 60']].map(([l, v, s, ph]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate EMI</button>
                <button onClick={() => { setP(''); setR(''); setN(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (<>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
                    {[['Monthly EMI', `₹${formatNumber(result.emi)}`, '#059669'], ['Total Amount', `₹${formatNumber(result.totalAmt)}`, '#3355ff'], ['Total Interest', `₹${formatNumber(result.totalInt)}`, '#d97706']].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '16px 10px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 6 }}>{v}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Principal vs Interest Breakdown</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip formatter={v => `₹${formatNumber(v)}`} />
                            <Bar dataKey="Principal" fill="#059669" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="Interest" fill="#d97706" radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <details style={{ cursor: 'pointer' }}>
                    <summary style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', padding: '8px 0', userSelect: 'none' }}>Amortization Schedule ({result.sched.length} months)</summary>
                    <div style={{ overflowX: 'auto', marginTop: 8 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                            <thead><tr>{['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => <th key={h} style={{ padding: '8px 10px', textAlign: 'right', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
                            <tbody>{result.sched.map(s => <tr key={s.month} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                {[s.month, formatNumber(s.emi), formatNumber(s.principal), formatNumber(s.interest), formatNumber(s.balance)].map((v, i) => <td key={i} style={{ padding: '7px 10px', textAlign: 'right', color: 'var(--text-primary)' }}>{i === 0 ? v : `₹${v}`}</td>)}
                            </tr>)}</tbody>
                        </table>
                    </div>
                </details>
            </>)}
        </CalculatorLayout>
    );
}
