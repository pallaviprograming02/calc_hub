import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

export default function BodyFatCalculator() {
    const [gender, setGender] = useState('male');
    const [neck, setNeck] = useState(''); const [waist, setWaist] = useState('');
    const [hip, setHip] = useState(''); const [height, setHeight] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const n = parseFloat(neck), w = parseFloat(waist), h = parseFloat(height);
        if ([n, w, h].some(isNaN)) return;
        let bf;
        if (gender === 'male') {
            bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
        } else {
            const hip_ = parseFloat(hip);
            if (isNaN(hip_)) return;
            bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hip_ - n) + 0.22100 * Math.log10(h)) - 450;
        }

        const category = gender === 'male'
            ? bf < 6 ? 'Essential Fat' : bf < 14 ? 'Athlete' : bf < 18 ? 'Fitness' : bf < 25 ? 'Average' : 'Obese'
            : bf < 14 ? 'Essential Fat' : bf < 21 ? 'Athlete' : bf < 25 ? 'Fitness' : bf < 32 ? 'Average' : 'Obese';

        setResult({ bf, category });
    };

    return (
        <CalculatorLayout title="Body Fat Calculator" category="health" resultText={result ? `Body Fat: ${formatNumber(result.bf, 1)}% (${result.category})` : ''}
            description="Calculate body fat percentage using the US Navy circumference method."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>US Navy method uses neck, waist (and hip for women), and height measurements in cm. All measurements at narrowest/widest points.</p>}
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['male', '♂ Male'], ['female', '♀ Female']].map(([v, l]) => (
                    <button key={v} onClick={() => { setGender(v); setResult(null); }} style={{
                        padding: '8px 20px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                        borderColor: gender === v ? '#e11d48' : 'var(--border-color)',
                        background: gender === v ? '#e11d4815' : 'var(--bg-secondary)',
                        color: gender === v ? '#e11d48' : 'var(--text-secondary)',
                    }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[
                    ['Neck circumference (cm)', neck, setNeck],
                    ['Waist circumference (cm)', waist, setWaist],
                    ...(gender === 'female' ? [['Hip circumference (cm)', hip, setHip]] : []),
                    ['Height (cm)', height, setHeight],
                ].map(([l, v, s]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#e11d48', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setNeck(''); setWaist(''); setHip(''); setHeight(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, textAlign: 'center', padding: '24px', background: '#e11d4810', border: '1.5px solid #e11d4830', borderRadius: 14 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Body Fat Percentage</div>
                    <div style={{ fontSize: 52, fontWeight: 900, color: '#e11d48', fontFamily: 'var(--font-mono)', lineHeight: 1, margin: '8px 0 4px' }}>{formatNumber(result.bf, 1)}%</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#e11d48' }}>{result.category}</div>
                </div>
            )}
        </CalculatorLayout>
    );
}
