import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function CompoundInterest() {
    const [P, setP] = useState('10000'); const [R, setR] = useState('8'); const [T, setT] = useState('10'); const [freq, setFreq] = useState('12');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const p = parseFloat(P), r = parseFloat(R) / 100, t = parseInt(T), n = parseInt(freq);
        if ([p, r, t, n].some(isNaN)) return;
        const A = p * Math.pow(1 + r / n, n * t);
        const chartData = Array.from({ length: t + 1 }, (_, y) => ({ year: y, value: parseFloat((p * Math.pow(1 + r / n, n * y)).toFixed(2)) }));
        setResult({ A, CI: A - p, P: p, chartData });
    };

    const freqOpts = [['1', 'Annually'], ['4', 'Quarterly'], ['12', 'Monthly'], ['365', 'Daily']];

    return (
        <CalculatorLayout title="Compound Interest Calculator" category="finance" resultText={result ? `Amount: ₹${formatNumber(result.A, 2)}` : ''}
            description="Calculate compound interest with growth curve visualization."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>A = P × (1 + r/n)^(n×t) &nbsp; where n = compounding frequency per year</p>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
                {[['Principal (₹)', P, setP, '10000'], ['Annual Rate (%)', R, setR, '8'], ['Time (years)', T, setT, '10']].map(([l, v, s, ph]) => (
                    <div key={l}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} /></div>
                ))}
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>Compounding Frequency</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {freqOpts.map(([v, l]) => <button key={v} onClick={() => setFreq(v)} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid', borderColor: freq === v ? '#3355ff' : 'var(--border-color)', background: freq === v ? '#3355ff15' : 'var(--bg-secondary)', color: freq === v ? '#3355ff' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{l}</button>)}
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setP(''); setR(''); setT(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (<>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 20, marginBottom: 20 }}>
                    {[['Principal', `₹${formatNumber(result.P)}`, '#475569'], ['CI Earned', `₹${formatNumber(result.CI)}`, '#d97706'], ['Final Amount', `₹${formatNumber(result.A)}`, '#059669']].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '14px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Growth Over Time</div>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={result.chartData} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} label={{ value: 'Years', position: 'insideBottom', offset: -2, fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={v => `₹${formatNumber(v)}`} />
                        <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2.5} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </>)}
        </CalculatorLayout>
    );
}
