import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import CalculatorLayout from '../../layouts/CalculatorLayout';

export default function RandomNumber() {
    const [min, setMin] = useState('1'); const [max, setMax] = useState('100');
    const [count, setCount] = useState('1'); const [unique, setUnique] = useState(false);
    const [numbers, setNumbers] = useState([]);

    const generate = () => {
        const lo = parseInt(min), hi = parseInt(max), n = Math.min(parseInt(count), 100);
        if (isNaN(lo) || isNaN(hi) || lo >= hi) return;
        const pool = [];
        for (let i = lo; i <= hi; i++) pool.push(i);
        const res = [];
        for (let i = 0; i < n; i++) {
            if (unique && pool.length === 0) break;
            if (unique) {
                const idx = Math.floor(Math.random() * pool.length);
                res.push(pool.splice(idx, 1)[0]);
            } else {
                res.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
            }
        }
        setNumbers(res);
    };

    return (
        <CalculatorLayout title="Random Number Generator" category="math" resultText={numbers.join(', ')}
            description="Generate random numbers within a custom range with optional unique values."
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Min', min, setMin], ['Max', max, setMax], ['Count', count, setCount]].map(([l, v, s]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, cursor: 'pointer' }}>
                <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} style={{ width: 16, height: 16 }} />
                No repetition (unique values only)
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={generate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <RefreshCw size={16} /> Generate
                </button>
                <button onClick={() => setNumbers([])} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Clear</button>
            </div>
            {numbers.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
                        {numbers.map((n, i) => (
                            <span key={i} style={{ padding: '8px 16px', borderRadius: 8, background: '#3355ff15', color: '#3355ff', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700 }}>{n}</span>
                        ))}
                    </div>
                </div>
            )}
        </CalculatorLayout>
    );
}
