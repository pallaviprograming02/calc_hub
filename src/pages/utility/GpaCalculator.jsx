import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatNumber } from '../../utils/formatNumber';

const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
const POINTS = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0 };

export default function GpaCalculator() {
    const [courses, setCourses] = useState([{ name: 'Course 1', grade: 'A', credits: '3' }]);
    const [result, setResult] = useState(null);

    const addCourse = () => setCourses(c => [...c, { name: `Course ${c.length + 1}`, grade: 'B', credits: '3' }]);
    const removeCourse = i => setCourses(c => c.filter((_, idx) => idx !== i));
    const updateCourse = (i, field, val) => setCourses(c => c.map((row, idx) => idx === i ? { ...row, [field]: val } : row));

    const calculate = () => {
        const valid = courses.filter(c => parseFloat(c.credits) > 0);
        if (!valid.length) return;
        const totalCredits = valid.reduce((s, c) => s + parseFloat(c.credits), 0);
        const totalPoints = valid.reduce((s, c) => s + POINTS[c.grade] * parseFloat(c.credits), 0);
        const gpa = totalPoints / totalCredits;
        setResult({ gpa, totalCredits, totalPoints });
    };

    const gpaColor = gpa => gpa >= 3.7 ? '#22c55e' : gpa >= 3.0 ? '#3b82f6' : gpa >= 2.0 ? '#f59e0b' : '#ef4444';

    return (
        <CalculatorLayout title="GPA Calculator" category="utility" resultText={result ? `GPA: ${formatNumber(result.gpa, 2)} / 4.00` : ''}
            description="Calculate weighted GPA from course grades and credit hours."
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {courses.map((c, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center' }}>
                        <input value={c.name} onChange={e => updateCourse(i, 'name', e.target.value)} placeholder="Course name" style={{ padding: '9px 12px', borderRadius: 8, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 14 }} />
                        <select value={c.grade} onChange={e => updateCourse(i, 'grade', e.target.value)} style={{ padding: '9px 10px', borderRadius: 8, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 14 }}>
                            {GRADES.map(g => <option key={g} value={g}>{g} ({POINTS[g].toFixed(1)})</option>)}
                        </select>
                        <input type="number" value={c.credits} onChange={e => updateCourse(i, 'credits', e.target.value)} placeholder="Credits" style={{ width: 70, padding: '9px 10px', textAlign: 'center', borderRadius: 8, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'var(--font-mono)' }} />
                        <button onClick={() => removeCourse(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>
            <button onClick={addCourse} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1.5px dashed var(--border-color)', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13, marginBottom: 20 }}>
                <Plus size={14} /> Add Course
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#6366f1', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate GPA</button>
                <button onClick={() => { setCourses([{ name: 'Course 1', grade: 'A', credits: '3' }]); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <div style={{ textAlign: 'center', padding: '20px', background: `${gpaColor(result.gpa)}15`, border: `1.5px solid ${gpaColor(result.gpa)}40`, borderRadius: 14, gridColumn: '1/-1' }}>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Your GPA</div>
                        <div style={{ fontSize: 52, fontWeight: 900, color: gpaColor(result.gpa), fontFamily: 'var(--font-mono)', lineHeight: 1, margin: '6px 0' }}>{formatNumber(result.gpa, 2)}</div>
                        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>out of 4.00 &nbsp;|&nbsp; {result.totalCredits} total credits</div>
                    </div>
                </div>
            )}
        </CalculatorLayout>
    );
}
