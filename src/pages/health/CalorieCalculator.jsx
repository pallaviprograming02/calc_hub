import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

const ACTIVITY = [
    { value: 1.2, label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 1.375, label: 'Lightly active', desc: '1–3 days/week' },
    { value: 1.55, label: 'Moderately active', desc: '3–5 days/week' },
    { value: 1.725, label: 'Very active', desc: '6–7 days/week' },
    { value: 1.9, label: 'Super active', desc: 'Physical job + training' },
];

export default function CalorieCalculator() {
    const [weight, setWeight] = useState(''); const [height, setHeight] = useState('');
    const [age, setAge] = useState(''); const [gender, setGender] = useState('male');
    const [goal, setGoal] = useState('maintain'); const [activity, setActivity] = useState(1.55);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age);
        if ([w, h, a].some(isNaN)) return;
        const bmr = gender === 'male'
            ? (10 * w) + (6.25 * h) - (5 * a) + 5
            : (10 * w) + (6.25 * h) - (5 * a) - 161;
        const tdee = bmr * activity;
        const goals = { lose: tdee - 500, maintain: tdee, gain: tdee + 500 };
        setResult({ bmr, tdee, goals });
    };

    return (
        <CalculatorLayout title="Calorie Calculator" category="health" resultText={result ? `Daily Calories: ${formatNumber(result.goals[goal], 0)} kcal` : ''}
            description="Calculate daily calorie intake based on your goal and activity level (Mifflin-St Jeor)."
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
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>Activity Level</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {ACTIVITY.map(a => (
                        <button key={a.value} onClick={() => setActivity(a.value)} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px',
                            borderRadius: 8, border: '1.5px solid', cursor: 'pointer', textAlign: 'left',
                            borderColor: activity === a.value ? '#e11d48' : 'var(--border-color)',
                            background: activity === a.value ? '#e11d4808' : 'var(--bg-secondary)',
                        }}>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: activity === a.value ? '#e11d48' : 'var(--text-primary)' }}>{a.label}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.desc}</div>
                            </div>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid', borderColor: activity === a.value ? '#e11d48' : 'var(--text-muted)', background: activity === a.value ? '#e11d48' : 'transparent', flexShrink: 0 }} />
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['lose', 'Lose Weight'], ['maintain', 'Maintain'], ['gain', 'Gain Weight']].map(([v, l]) => (
                    <button key={v} onClick={() => setGoal(v)} style={{
                        flex: 1, padding: '8px', borderRadius: 8, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                        borderColor: goal === v ? '#e11d48' : 'var(--border-color)',
                        background: goal === v ? '#e11d4815' : 'var(--bg-secondary)',
                        color: goal === v ? '#e11d48' : 'var(--text-secondary)',
                    }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#e11d48', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setWeight(''); setHeight(''); setAge(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {[['Lose Weight', result.goals.lose, '#3b82f6'], ['Maintain', result.goals.maintain, '#22c55e'], ['Gain Weight', result.goals.gain, '#f59e0b']].map(([l, v, c]) => (
                            <div key={l} style={{ textAlign: 'center', padding: '14px 8px', background: `${c}10`, border: `1.5px solid ${c}${goal === l.toLowerCase().replace(' ', '') ? '60' : '25'}`, borderRadius: 12, outline: goal === l.toLowerCase().replace(' ', '') ? `2px solid ${c}` : 'none', outlineOffset: 2 }}>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{formatNumber(v, 0)}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>kcal/day</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 12, padding: '12px 14px', background: 'var(--bg-secondary)', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--text-secondary)' }}>
                        BMR: <strong>{formatNumber(result.bmr, 0)} kcal</strong> &nbsp;|&nbsp; TDEE: <strong>{formatNumber(result.tdee, 0)} kcal</strong>
                    </div>
                </div>
            )}
        </CalculatorLayout>
    );
}
