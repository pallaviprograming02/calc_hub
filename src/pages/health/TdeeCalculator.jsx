import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

const ACTIVITY = [
    { value: 1.2, label: 'Sedentary', desc: 'Desk job, no exercise' },
    { value: 1.375, label: 'Lightly Active', desc: '1–3 days/week' },
    { value: 1.55, label: 'Moderately Active', desc: '3–5 days/week' },
    { value: 1.725, label: 'Very Active', desc: '6–7 days/week' },
    { value: 1.9, label: 'Super Active', desc: 'Physical job + daily training' },
];

export default function TdeeCalculator() {
    const [weight, setWeight] = useState(''); const [height, setHeight] = useState('');
    const [age, setAge] = useState(''); const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState(1.55);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age);
        if ([w, h, a].some(isNaN)) return;
        const bmr = gender === 'male'
            ? (10 * w) + (6.25 * h) - (5 * a) + 5
            : (10 * w) + (6.25 * h) - (5 * a) - 161;
        const tdee = bmr * activity;
        setResult({ bmr, tdee, actLabel: ACTIVITY.find(a => a.value === activity)?.label });
    };

    return (
        <CalculatorLayout title="TDEE Calculator" category="health" resultText={result ? `TDEE: ${formatNumber(result.tdee, 0)} kcal/day` : ''}
            description="Total Daily Energy Expenditure — how many calories you burn per day based on your lifestyle."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>TDEE = BMR × Activity Multiplier &nbsp; (uses Mifflin-St Jeor for BMR)</p>}
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
                {[['Weight (kg)', weight, setWeight], ['Height (cm)', height, setHeight], ['Age', age, setAge]].map(([l, v, s]) => (
                    <div key={l}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type="number" value={v} onChange={e => s(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>Activity Level</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {ACTIVITY.map(a => (
                        <button key={a.value} onClick={() => setActivity(a.value)} style={{
                            padding: '8px 14px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', textAlign: 'left', flex: '1 1 auto', minWidth: 140,
                            borderColor: activity === a.value ? '#e11d48' : 'var(--border-color)',
                            background: activity === a.value ? '#e11d4812' : 'var(--bg-secondary)',
                        }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: activity === a.value ? '#e11d48' : 'var(--text-primary)' }}>{a.label}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.desc}</div>
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#e11d48', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate TDEE</button>
                <button onClick={() => { setWeight(''); setHeight(''); setAge(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    {[['BMR (Base)', result.bmr, '#3355ff'], ['TDEE (' + result.actLabel + ')', result.tdee, '#e11d48']].map(([l, v, c]) => (
                        <div key={l} style={{ textAlign: 'center', padding: '20px', background: `${c}10`, border: `1.5px solid ${c}30`, borderRadius: 14 }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                            <div style={{ fontSize: 36, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 6 }}>{formatNumber(v, 0)}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>kcal / day</div>
                        </div>
                    ))}
                </div>
            )}
        </CalculatorLayout>
    );
}
