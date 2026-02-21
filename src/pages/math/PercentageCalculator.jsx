import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function PercentageCalculator() {
    const [tab, setTab] = useState(0);
    const [a, setA] = useState(''); const [b, setB] = useState('');
    const [result, setResult] = useState(null); const [steps, setSteps] = useState([]);

    const tabs = [
        { label: 'X% of Y', hint: ['Percentage (%)', 'Of Number (Y)'] },
        { label: 'X is % of Y', hint: ['Value (X)', 'Total (Y)'] },
        { label: '% Change', hint: ['Old Value', 'New Value'] },
    ];

    const calculate = () => {
        const x = parseFloat(a), y = parseFloat(b);
        if (isNaN(x) || isNaN(y)) return;
        let res, s = [];
        if (tab === 0) { res = (x / 100) * y; s = [`${x}% of ${y}`, `= (${x} / 100) × ${y}`, `= ${formatNumber(res)}`]; }
        if (tab === 1) { res = (x / y) * 100; s = [`${x} ÷ ${y} × 100`, `= ${formatNumber(res)}%`]; }
        if (tab === 2) { res = ((y - x) / Math.abs(x)) * 100; s = [`Change = ${y} − ${x} = ${y - x}`, `% Change = (${y - x}) / ${Math.abs(x)} × 100`, `= ${formatNumber(res)}%`]; }
        setResult(res); setSteps(s);
    };

    const resultStr = result !== null ? (tab === 0 ? formatNumber(result) : `${formatNumber(result)}%`) : '';

    return (
        <CalculatorLayout title="Percentage Calculator" category="math" resultText={resultStr}
            description="Find percentages, percentage change, and what percent X is of Y."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>X% of Y</strong> = (X / 100) × Y</p>
                <p><strong>X is what % of Y</strong> = (X / Y) × 100</p>
                <p><strong>% Change</strong> = ((New − Old) / |Old|) × 100</p>
            </div>}
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {tabs.map((t, i) => (
                    <button key={i} onClick={() => { setTab(i); setResult(null); setSteps([]); setA(''); setB(''); }} style={{
                        padding: '8px 14px', borderRadius: 8, border: '1.5px solid', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                        borderColor: tab === i ? '#3355ff' : 'var(--border-color)',
                        background: tab === i ? '#3355ff15' : 'var(--bg-secondary)',
                        color: tab === i ? '#3355ff' : 'var(--text-secondary)',
                    }}>{t.label}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[a, b].map((val, i) => (
                    <div key={i}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{tabs[tab].hint[i]}</label>
                        <input type="number" value={i === 0 ? a : b} onChange={e => i === 0 ? setA(e.target.value) : setB(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setA(''); setB(''); setResult(null); setSteps([]); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: 15, cursor: 'pointer' }}>Reset</button>
            </div>
            {result !== null && (
                <div style={{ marginTop: 20, background: 'linear-gradient(135deg, #3355ff12, #7c3aed08)', border: '1.5px solid #3355ff30', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Result</div>
                    <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#3355ff' }}>{resultStr}</div>
                    <div style={{ marginTop: 12 }}>{steps.map((s, i) => <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', padding: '3px 0', borderTop: i > 0 ? '1px solid var(--border-color)' : 'none' }}>{s}</div>)}</div>
                </div>
            )}
        </CalculatorLayout>
    );
}
