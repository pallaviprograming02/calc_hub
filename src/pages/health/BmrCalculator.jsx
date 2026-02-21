import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function BmrCalculator() {
    const [weight, setWeight] = useState(''); const [height, setHeight] = useState('');
    const [age, setAge] = useState(''); const [gender, setGender] = useState('male');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age);
        if ([w, h, a].some(isNaN)) return;
        // Harris-Benedict
        const hb = gender === 'male'
            ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
            : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
        // Mifflin-St Jeor
        const msj = gender === 'male'
            ? (10 * w) + (6.25 * h) - (5 * a) + 5
            : (10 * w) + (6.25 * h) - (5 * a) - 161;
        setResult({ hb, msj });
    };

    return (
        <CalculatorLayout title="BMR Calculator" category="health" resultText={result ? `HB: ${formatNumber(result.hb, 0)} kcal | MSJ: ${formatNumber(result.msj, 0)} kcal` : ''}
            description="Basal Metabolic Rate using Harris-Benedict & Mifflin-St Jeor formulas."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>Harris-Benedict (Male):</strong> 88.362 + (13.397×W) + (4.799×H) − (5.677×A)</p>
                <p><strong>Harris-Benedict (Female):</strong> 447.593 + (9.247×W) + (3.098×H) − (4.330×A)</p>
                <p><strong>Mifflin-St Jeor (Male):</strong> (10×W) + (6.25×H) − (5×A) + 5</p>
            </div>}
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['male', '♂ Male'], ['female', '♀ Female']].map(([v, l]) => (
                    <button key={v} onClick={() => setGender(v)} style={{
                        padding: '8px 20px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                        borderColor: gender === v ? '#e11d48' : 'var(--border-color)',
                        background: gender === v ? '#e11d4815' : 'var(--bg-secondary)',
                        color: gender === v ? '#e11d48' : 'var(--text-secondary)',
                    }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['Weight (kg)', weight, setWeight], ['Height (cm)', height, setHeight], ['Age (years)', age, setAge]].map(([l, v, s]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#e11d48', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate BMR</button>
                <button onClick={() => { setWeight(''); setHeight(''); setAge(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    {[['Harris-Benedict', result.hb, '#e11d48', 'Classic formula (1919)'], ['Mifflin-St Jeor', result.msj, '#3355ff', 'Modern formula (1990)']].map(([l, v, c, sub]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '20px 12px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 14 }}>
                            <div style={{ fontSize: 11, color: c, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                            <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-mono)', color: c, margin: '8px 0 4px' }}>{formatNumber(v, 0)}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>kcal / day</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>
                        </div>
                    ))}
                </div>
            )}
        </CalculatorLayout>
    );
}
