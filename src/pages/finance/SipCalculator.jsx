import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function SipCalculator() {
    const [monthly, setMonthly] = useState('5000'); const [rate, setRate] = useState('12'); const [years, setYears] = useState('10');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const m = parseFloat(monthly), r = parseFloat(rate) / 1200, n = parseInt(years) * 12;
        if ([m, r].some(isNaN) || isNaN(n)) return;
        const fv = m * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const invested = m * n;
        const chartData = [];
        for (let y = 1; y <= parseInt(years); y++) {
            const mn = y * 12, val = m * ((Math.pow(1 + r, mn) - 1) / r) * (1 + r);
            chartData.push({ year: y, Value: +val.toFixed(2), Invested: m * mn });
        }
        setResult({ fv, invested, gain: fv - invested, chartData });
    };

    return (
        <CalculatorLayout title="SIP Calculator" category="finance" resultText={result ? `Corpus: ₹${formatNumber(result.fv)}` : ''}
            description="Calculate Systematic Investment Plan growth with interactive area chart."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>FV = P × ((1+r)ⁿ − 1) / r × (1+r) &nbsp; where r = monthly rate, n = total months</p>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Monthly SIP (₹)', monthly, setMonthly, '5000'], ['Expected Return (%)', rate, setRate, '12'], ['Investment Period (yrs)', years, setYears, '10']].map(([l, v, s, ph]) => (
                    <div key={l}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} /></div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setMonthly(''); setRate(''); setYears(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (<>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 20, marginBottom: 20 }}>
                    {[['Total Invested', `₹${formatNumber(result.invested)}`, '#3355ff'], ['Gains', `₹${formatNumber(result.gain)}`, '#d97706'], ['Corpus', `₹${formatNumber(result.fv)}`, '#059669']].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '14px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Wealth Growth Over Time</div>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={result.chartData} margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                        <defs>
                            <linearGradient id="gVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#059669" stopOpacity={0.3} /><stop offset="95%" stopColor="#059669" stopOpacity={0} /></linearGradient>
                            <linearGradient id="gInv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3355ff" stopOpacity={0.2} /><stop offset="95%" stopColor="#3355ff" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={v => `₹${formatNumber(v)}`} />
                        <Area type="monotone" dataKey="Invested" stroke="#3355ff" fill="url(#gInv)" strokeWidth={2} />
                        <Area type="monotone" dataKey="Value" stroke="#059669" fill="url(#gVal)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </>)}
        </CalculatorLayout>
    );
}
