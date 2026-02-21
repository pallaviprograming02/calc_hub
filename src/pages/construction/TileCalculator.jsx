import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function TileCalculator() {
    const [rLen, setRLen] = useState(''); const [rWid, setRWid] = useState('');
    const [tLen, setTLen] = useState(''); const [tWid, setTWid] = useState('');
    const [waste, setWaste] = useState('10');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const rl = parseFloat(rLen), rw = parseFloat(rWid), tl = parseFloat(tLen), tw = parseFloat(tWid), w = parseFloat(waste);
        if ([rl, rw, tl, tw].some(isNaN)) return;
        const roomArea = rl * rw;
        const tileArea = (tl / 100) * (tw / 100);
        const base = Math.ceil(roomArea / tileArea);
        const withWaste = Math.ceil(base * (1 + w / 100));
        setResult({ roomArea, tileArea, base, withWaste });
    };

    return (
        <CalculatorLayout title="Tile Calculator" category="construction" resultText={result ? `${result.withWaste} tiles needed` : ''}
            description="Calculate number of tiles needed for any room, including wastage percentage."
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Room Size</div>
                    {[['Length (m)', rLen, setRLen], ['Width (m)', rWid, setRWid]].map(([l, v, s]) => (
                        <div key={l} style={{ marginBottom: 10 }}>
                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                            <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                        </div>
                    ))}
                </div>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Tile Size (cm)</div>
                    {[['Length (cm)', tLen, setTLen], ['Width (cm)', tWid, setTWid]].map(([l, v, s]) => (
                        <div key={l} style={{ marginBottom: 10 }}>
                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                            <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Wastage / Breakage (%)</label>
                <input type="number" value={waste} onChange={e => setWaste(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setRLen(''); setRWid(''); setTLen(''); setTWid(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[['Room Area', `${formatNumber(result.roomArea, 2)} m²`, '#3355ff'], ['Base Tiles', result.base, '#059669'], [`With ${waste}% Waste`, result.withWaste, '#7c3aed']].map(([l, v, c]) => (
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
