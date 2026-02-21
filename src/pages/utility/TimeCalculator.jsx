import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';

export default function TimeCalculator() {
    const [mode, setMode] = useState('add');
    const [h1, setH1] = useState(''); const [m1, setM1] = useState(''); const [s1, setS1] = useState('');
    const [h2, setH2] = useState(''); const [m2, setM2] = useState(''); const [s2, setS2] = useState('');
    const [result, setResult] = useState(null);

    const toSec = (h, m, s) => (parseFloat(h) || 0) * 3600 + (parseFloat(m) || 0) * 60 + (parseFloat(s) || 0);
    const fromSec = sec => {
        const neg = sec < 0; sec = Math.abs(sec);
        const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = Math.floor(sec % 60);
        return { h, m, s, neg };
    };

    const calculate = () => {
        const t1 = toSec(h1, m1, s1), t2 = toSec(h2, m2, s2);
        const raw = mode === 'add' ? t1 + t2 : t1 - t2;
        setResult(fromSec(raw));
    };

    const pad = v => String(v).padStart(2, '0');
    const timeInput = (label, h, m, s, sh, sm, ss) => (
        <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{label}</div>
            <div style={{ display: 'flex', gap: 6 }}>
                {[['HH', h, sh], ['MM', m, sm], ['SS', s, ss]].map(([pl, v, sv]) => (
                    <input key={pl} type="number" placeholder={pl} value={v} onChange={e => sv(e.target.value)}
                        style={{ flex: 1, padding: '10px 6px', textAlign: 'center', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 18, fontFamily: 'var(--font-mono)', fontWeight: 700 }} />
                ))}
            </div>
        </div>
    );

    return (
        <CalculatorLayout title="Time Calculator" category="utility" resultText={result ? `${result.neg ? '-' : ''}${pad(result.h)}:${pad(result.m)}:${pad(result.s)}` : ''}
            description="Add or subtract two time values (hours, minutes, seconds)."
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['add', '+ Add'], ['sub', '− Subtract']].map(([v, l]) => (
                    <button key={v} onClick={() => setMode(v)} style={{
                        padding: '8px 16px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                        borderColor: mode === v ? '#6366f1' : 'var(--border-color)',
                        background: mode === v ? '#6366f115' : 'var(--bg-secondary)',
                        color: mode === v ? '#6366f1' : 'var(--text-secondary)',
                    }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                {timeInput('Time 1', h1, m1, s1, setH1, setM1, setS1)}
                {timeInput('Time 2', h2, m2, s2, setH2, setM2, setS2)}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#6366f1', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setH1(''); setM1(''); setS1(''); setH2(''); setM2(''); setS2(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, textAlign: 'center', padding: '24px', background: '#6366f110', border: '1.5px solid #6366f130', borderRadius: 14 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Result</div>
                    <div style={{ fontSize: 44, fontWeight: 900, color: result.neg ? '#ef4444' : '#6366f1', fontFamily: 'var(--font-mono)' }}>
                        {result.neg ? '−' : ''}{pad(result.h)}:{pad(result.m)}:{pad(result.s)}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
                        = {result.h}h {result.m}m {result.s}s &nbsp;|&nbsp; {(result.h + result.m / 60 + result.s / 3600).toFixed(3)} hours
                    </div>
                </div>
            )}
        </CalculatorLayout>
    );
}
