import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function PaintCalculator() {
    const [len, setLen] = useState(''); const [wid, setWid] = useState(''); const [ceilingH, setCeilingH] = useState('');
    const [doors, setDoors] = useState('0'); const [windows, setWindows] = useState('0');
    const [coats, setCoats] = useState('2'); const [coverage, setCoverage] = useState('12');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const l = parseFloat(len), w = parseFloat(wid), h = parseFloat(ceilingH);
        const d = parseInt(doors) || 0, win = parseInt(windows) || 0;
        const c = parseInt(coats), cov = parseFloat(coverage);
        if ([l, w, h].some(isNaN)) return;
        const wallArea = 2 * (l + w) * h;
        const deductArea = (d * 2) + (win * 1.5); // avg door 2m², window 1.5m²
        const netArea = Math.max(0, wallArea - deductArea);
        const litres = (netArea * c) / cov;
        const ceilingArea = l * w;
        setResult({ wallArea, netArea, litres, ceilingArea });
    };

    return (
        <CalculatorLayout title="Paint Calculator" category="construction" resultText={result ? `${formatNumber(result.litres, 1)} litres needed` : ''}
            description="Calculate paint required for a room based on wall area, doors, windows, and coats."
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Room Length (m)', len, setLen], ['Room Width (m)', wid, setWid], ['Ceiling Height (m)', ceilingH, setCeilingH], ['No. of Doors', doors, setDoors], ['No. of Windows', windows, setWindows]].map(([l, v, s]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Coats', coats, setCoats], ['Coverage (m²/litre)', coverage, setCoverage]].map(([l, v, s]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setLen(''); setWid(''); setCeilingH(''); setDoors('0'); setWindows('0'); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[['Total Wall Area', `${formatNumber(result.wallArea, 1)} m²`, '#3355ff'], ['Net Paintable Area', `${formatNumber(result.netArea, 1)} m²`, '#059669'], ['Paint Needed', `${formatNumber(result.litres, 1)} L`, '#7c3aed']].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '14px 8px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 12 }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{v}</div>
                        </div>
                    ))}
                </div>
            )}
        </CalculatorLayout>
    );
}
