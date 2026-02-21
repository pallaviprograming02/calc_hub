import { useState } from 'react';
import { lcmMultiple, gcfMultiple } from '../../utils/mathHelpers';
import CalculatorLayout from '../../layouts/CalculatorLayout';

export default function LcmGcfCalculator() {
    const [input, setInput] = useState('12, 18, 24');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n > 0);
        if (nums.length < 2) return;
        setResult({ nums, lcm: Math.round(lcmMultiple(nums)), gcf: Math.round(gcfMultiple(nums)) });
    };

    return (
        <CalculatorLayout title="LCM & GCF Calculator" category="math"
            resultText={result ? `LCM: ${result.lcm}, GCF: ${result.gcf}` : ''}
            description="Find the Least Common Multiple and Greatest Common Factor of two or more numbers."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>GCF</strong> (Greatest Common Factor) uses the Euclidean algorithm.</p>
                <p><strong>LCM</strong>(a,b) = |a×b| / GCF(a,b). Extended to multiple numbers iteratively.</p>
            </div>}
        >
            <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Enter numbers (comma or space separated)</label>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 12, 18, 24"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 16, fontFamily: 'var(--font-mono)' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setInput(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[['LCM', result.lcm, '#059669'], ['GCF', result.gcf, '#d97706']].map(([label, val, color]) => (
                        <div key={label} style={{ background: `${color}12`, border: `1.5px solid ${color}30`, borderRadius: 12, padding: 20, textAlign: 'center' }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color, marginBottom: 4 }}>{label}</div>
                            <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-mono)', color }}>{val}</div>
                        </div>
                    ))}
                </div>
            )}
        </CalculatorLayout>
    );
}
