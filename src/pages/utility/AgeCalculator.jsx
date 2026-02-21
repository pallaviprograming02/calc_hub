import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';

export default function AgeCalculator() {
    const [dob, setDob] = useState('');
    const [target, setTarget] = useState(new Date().toISOString().split('T')[0]);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const birthDate = new Date(dob);
        const to = new Date(target);
        if (isNaN(birthDate) || isNaN(to) || birthDate > to) return;

        let years = to.getFullYear() - birthDate.getFullYear();
        let months = to.getMonth() - birthDate.getMonth();
        let days = to.getDate() - birthDate.getDate();

        if (days < 0) { months--; const prev = new Date(to.getFullYear(), to.getMonth(), 0); days += prev.getDate(); }
        if (months < 0) { years--; months += 12; }

        const totalDays = Math.floor((to - birthDate) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        const totalHours = totalDays * 24;

        // Next birthday
        const nextBday = new Date(to.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBday <= to) nextBday.setFullYear(to.getFullYear() + 1);
        const daysToNext = Math.floor((nextBday - to) / (1000 * 60 * 60 * 24));

        setResult({ years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext });
    };

    return (
        <CalculatorLayout title="Age Calculator" category="utility" resultText={result ? `${result.years} years, ${result.months} months, ${result.days} days` : ''}
            description="Calculate exact age and time statistics from any birth date to any target date."
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Date of Birth</label>
                    <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Age at Date (default: today)</label>
                    <input type="date" value={target} onChange={e => setTarget(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#6366f1', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate Age</button>
                <button onClick={() => { setDob(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20 }}>
                    <div style={{ textAlign: 'center', padding: '20px', background: '#6366f110', border: '1.5px solid #6366f130', borderRadius: 14, marginBottom: 16 }}>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>Your Age</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#6366f1', fontFamily: 'var(--font-mono)' }}>
                            {result.years}<span style={{ fontSize: 14, marginLeft: 4, fontWeight: 500 }}>yrs</span>
                            {' '}{result.months}<span style={{ fontSize: 14, marginLeft: 4, fontWeight: 500 }}>mo</span>
                            {' '}{result.days}<span style={{ fontSize: 14, marginLeft: 4, fontWeight: 500 }}>days</span>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                            ['Total Days', result.totalDays.toLocaleString()],
                            ['Total Weeks', result.totalWeeks.toLocaleString()],
                            ['Total Months', result.totalMonths.toLocaleString()],
                            ['Total Hours', result.totalHours.toLocaleString()],
                            ['Days to Next Birthday', result.daysToNext, '#e11d48'],
                        ].map(([l, v, c]) => (
                            <div key={l} style={{ padding: '12px 14px', background: 'var(--bg-secondary)', border: '1.5px solid var(--border-color)', borderRadius: 10 }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{l}</div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: c || '#6366f1', fontFamily: 'var(--font-mono)', marginTop: 3 }}>{v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </CalculatorLayout>
    );
}
