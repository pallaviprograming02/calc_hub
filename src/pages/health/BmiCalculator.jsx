import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

const BMI_RANGES = [
    { label: 'Underweight', min: 0, max: 18.5, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Normal', min: 18.5, max: 25, color: '#22c55e', bg: '#f0fdf4' },
    { label: 'Overweight', min: 25, max: 30, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Obese', min: 30, max: 50, color: '#ef4444', bg: '#fef2f2' },
];

export default function BmiCalculator() {
    const [height, setHeight] = useState(''); const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('metric');
    const [result, setResult] = useState(null);

    const calculate = () => {
        let bmi;
        if (unit === 'metric') {
            const h = parseFloat(height) / 100, w = parseFloat(weight);
            if (isNaN(h) || isNaN(w) || h === 0) return;
            bmi = w / (h * h);
        } else {
            const h = parseFloat(height), w = parseFloat(weight);
            if (isNaN(h) || isNaN(w) || h === 0) return;
            bmi = (703 * w) / (h * h);
        }
        const category = BMI_RANGES.find(r => bmi >= r.min && bmi < r.max) || BMI_RANGES[3];
        setResult({ bmi, category });
    };

    const rangeMax = 40;
    const pct = result ? Math.min((result.bmi / rangeMax) * 100, 100) : 0;

    return (
        <CalculatorLayout title="BMI Calculator" category="health" resultText={result ? `BMI: ${formatNumber(result.bmi, 1)} (${result.category.label})` : ''}
            description="Calculate Body Mass Index with a visual healthy range indicator."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>Metric:</strong> BMI = Weight(kg) / Height(m)²</p>
                <p><strong>Imperial:</strong> BMI = 703 × Weight(lbs) / Height(in)²</p>
            </div>}
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['metric', 'Metric (kg/cm)'], ['imperial', 'Imperial (lb/in)']].map(([v, l]) => (
                    <button key={v} onClick={() => { setUnit(v); setResult(null); }} style={{
                        padding: '8px 16px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer',
                        borderColor: unit === v ? '#e11d48' : 'var(--border-color)',
                        background: unit === v ? '#e11d4815' : 'var(--bg-secondary)',
                        color: unit === v ? '#e11d48' : 'var(--text-secondary)', fontWeight: 600, fontSize: 13,
                    }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                        Height ({unit === 'metric' ? 'cm' : 'inches'})
                    </label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={unit === 'metric' ? '175' : '69'}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                        Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === 'metric' ? '70' : '154'}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#e11d48', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate BMI</button>
                <button onClick={() => { setHeight(''); setWeight(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>

            {result && (
                <div style={{ marginTop: 20 }}>
                    {/* BMI value */}
                    <div style={{ textAlign: 'center', padding: '20px', background: `${result.category.color}12`, border: `1.5px solid ${result.category.color}40`, borderRadius: 14, marginBottom: 16 }}>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Your BMI</div>
                        <div style={{ fontSize: 52, fontWeight: 900, color: result.category.color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{formatNumber(result.bmi, 1)}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: result.category.color, marginTop: 6 }}>{result.category.label}</div>
                    </div>

                    {/* Visual range bar */}
                    <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>BMI Range Indicator</div>
                        <div style={{ position: 'relative', borderRadius: 99, overflow: 'hidden', height: 14 }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                {BMI_RANGES.map(r => <div key={r.label} style={{ flex: r.max - r.min, background: r.color, opacity: 0.7 }} />)}
                            </div>
                            {/* Marker */}
                            <div style={{
                                position: 'absolute', top: -2, bottom: -2, left: `${pct}%`,
                                width: 4, background: '#0f172a', borderRadius: 2,
                                transform: 'translateX(-50%)',
                                boxShadow: '0 0 0 2px white',
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                            {BMI_RANGES.map(r => (
                                <div key={r.label} style={{ textAlign: 'center', flex: 1 }}>
                                    <div style={{ fontSize: 10, color: r.color, fontWeight: 700 }}>{r.label}</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.min}–{r.max === 50 ? '40+' : r.max}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </CalculatorLayout>
    );
}
