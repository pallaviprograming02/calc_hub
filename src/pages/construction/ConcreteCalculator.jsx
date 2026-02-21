import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function ConcreteCalculator() {
    const [len, setLen] = useState(''); const [wid, setWid] = useState(''); const [depth, setDepth] = useState(''); const [unit, setUnit] = useState('m');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const l = parseFloat(len), w = parseFloat(wid), d = parseFloat(depth);
        if ([l, w, d].some(isNaN)) return;
        const factor = unit === 'ft' ? 0.0283168 : 1; // convert ft³ to m³
        const vol_m3 = l * w * d * factor;
        const vol_yd3 = vol_m3 * 1.30795;
        const bags50 = vol_m3 * 48; // approx bags of 50kg concrete
        setResult({ vol_m3, vol_yd3, bags50 });
    };

    return (
        <CalculatorLayout title="Concrete Calculator" category="construction" resultText={result ? `${formatNumber(result.vol_m3, 3)} m³` : ''}
            description="Calculate concrete volume needed from slab dimensions."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Volume = Length × Width × Depth. Approximately 48 bags of 50kg concrete per m³.</p>}
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['m', 'Meters (m)'], ['ft', 'Feet (ft)']].map(([v, l]) => (
                    <button key={v} onClick={() => setUnit(v)} style={{
                        padding: '8px 16px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                        borderColor: unit === v ? '#7c3aed' : 'var(--border-color)',
                        background: unit === v ? '#7c3aed15' : 'var(--bg-secondary)',
                        color: unit === v ? '#7c3aed' : 'var(--text-secondary)',
                    }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Length', len, setLen], ['Width', wid, setWid], ['Depth/Thickness', depth, setDepth]].map(([l, v, s]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l} ({unit})</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setLen(''); setWid(''); setDepth(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                    {[['Volume (m³)', formatNumber(result.vol_m3, 3), '#7c3aed'], ['Volume (yd³)', formatNumber(result.vol_yd3, 3), '#3355ff'], ['50kg Bags (est.)', Math.ceil(result.bags50), '#d97706']].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '14px 8px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                        </div>
                    ))}
                </div>
            )}
        </CalculatorLayout>
    );
}
