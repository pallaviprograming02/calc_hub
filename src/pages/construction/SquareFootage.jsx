import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function SquareFootage() {
    const [shape, setShape] = useState('rectangle');
    const [d, setD] = useState({ l: '', w: '', r: '', b: '', h: '' });
    const [result, setResult] = useState(null);

    const calc = () => {
        const n = k => parseFloat(d[k]);
        let area;
        if (shape === 'rectangle') area = n('l') * n('w');
        else if (shape === 'circle') area = Math.PI * n('r') * n('r');
        else if (shape === 'triangle') area = 0.5 * n('b') * n('h');
        if (!isNaN(area)) setResult({ area, areaSqFt: area * 10.7639 });
    };

    const fields = {
        rectangle: [['Length (m)', 'l'], ['Width (m)', 'w']],
        circle: [['Radius (m)', 'r']],
        triangle: [['Base (m)', 'b'], ['Height (m)', 'h']],
    };

    return (
        <CalculatorLayout title="Square Footage Calculator" category="construction" resultText={result ? `${formatNumber(result.area, 2)} m² (${formatNumber(result.areaSqFt, 2)} ft²)` : ''}
            description="Calculate the area of rectangles, circles, and triangles in m² and ft²."
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {['rectangle', 'circle', 'triangle'].map(s => (
                    <button key={s} onClick={() => { setShape(s); setResult(null); }} style={{
                        padding: '8px 16px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13, textTransform: 'capitalize',
                        borderColor: shape === s ? '#7c3aed' : 'var(--border-color)',
                        background: shape === s ? '#7c3aed15' : 'var(--bg-secondary)',
                        color: shape === s ? '#7c3aed' : 'var(--text-secondary)',
                    }}>{s}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {fields[shape].map(([l, k]) => (
                    <div key={k}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={d[k]} onChange={e => setD(prev => ({ ...prev, [k]: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calc} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setD({ l: '', w: '', r: '', b: '', h: '' }); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[['Square Meters', `${formatNumber(result.area, 2)} m²`, '#7c3aed'], ['Square Feet', `${formatNumber(result.areaSqFt, 2)} ft²`, '#3355ff']].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '20px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 14 }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 28, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 6 }}>{v}</div>
                        </div>
                    ))}
                </div>
            )}
        </CalculatorLayout>
    );
}
