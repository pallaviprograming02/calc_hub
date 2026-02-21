import { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import CalculatorLayout from '../layouts/CalculatorLayout';

export default function ConverterPage({ title, category, units, convert, description, formulaSection }) {
    const [fromVal, setFromVal] = useState('1');
    const [fromUnit, setFromUnit] = useState(units[0].value);
    const [toUnit, setToUnit] = useState(units[1].value);
    const [result, setResult] = useState('');

    useEffect(() => {
        const v = parseFloat(fromVal);
        if (!isNaN(v)) {
            const res = convert(v, fromUnit, toUnit);
            setResult(isFinite(res) ? parseFloat(res.toFixed(10)).toString() : '—');
        } else { setResult(''); }
    }, [fromVal, fromUnit, toUnit]);

    const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };

    const selectStyle = {
        width: '100%', padding: '10px 14px', borderRadius: 9,
        border: '1.5px solid var(--border-color)',
        background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15,
    };
    const inputStyle = {
        width: '100%', padding: '12px 14px', borderRadius: 9,
        border: '1.5px solid var(--border-color)',
        background: 'var(--bg-secondary)', color: 'var(--text-primary)',
        fontSize: 20, fontFamily: 'var(--font-mono)', fontWeight: 700,
    };

    return (
        <CalculatorLayout title={title} category={category} description={description} resultText={result ? `${fromVal} ${fromUnit} = ${result} ${toUnit}` : ''} formulaSection={formulaSection}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14, alignItems: 'end' }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>From</label>
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} style={selectStyle}>
                        {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                    </select>
                    <input type="number" value={fromVal} onChange={e => setFromVal(e.target.value)} style={{ ...inputStyle, marginTop: 10 }} />
                </div>
                <button onClick={swap} style={{ marginBottom: 2, padding: '12px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <ArrowLeftRight size={18} />
                </button>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>To</label>
                    <select value={toUnit} onChange={e => setToUnit(e.target.value)} style={selectStyle}>
                        {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                    </select>
                    <div style={{ ...inputStyle, marginTop: 10, border: '1.5px solid #d97706', color: '#d97706', background: '#d9770610' }}>
                        {result || '…'}
                    </div>
                </div>
            </div>
            {result && (
                <div style={{ marginTop: 20, padding: '14px 18px', background: 'var(--bg-secondary)', borderRadius: 10, border: '1.5px solid var(--border-color)', fontSize: 15, color: 'var(--text-primary)' }}>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{fromVal} {fromUnit}</strong>
                    <span style={{ color: 'var(--text-muted)' }}> = </span>
                    <strong style={{ fontFamily: 'var(--font-mono)', color: '#d97706' }}>{result} {toUnit}</strong>
                </div>
            )}
        </CalculatorLayout>
    );
}
