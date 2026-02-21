import { useState, useCallback } from 'react';
import * as math from 'mathjs';
import { Delete } from 'lucide-react';
import CalculatorLayout from '../../layouts/CalculatorLayout';

const SCI_BTNS = [
    ['sin', 'cos', 'tan', 'log'],
    ['asin', 'acos', 'atan', 'ln'],
    ['x²', 'x³', '√', '∛'],
    ['π', 'e', '!', '(', ')'],
    ['7', '8', '9', '÷', 'C'],
    ['4', '5', '6', '×', '⌫'],
    ['1', '2', '3', '−', 'Ans'],
    ['0', '.', 'EXP', '+', '='],
];

export default function ScientificCalculator() {
    const [expr, setExpr] = useState('');
    const [result, setResult] = useState('');
    const [ans, setAns] = useState(0);
    const [error, setError] = useState('');

    const append = (v) => setExpr(e => e + v);

    const handleBtn = useCallback((btn) => {
        setError('');
        const map = { 'sin': 'sin(', 'cos': 'cos(', 'tan': 'tan(', 'asin': 'asin(', 'acos': 'acos(', 'atan': 'atan(', 'log': 'log10(', 'ln': 'log(', 'x²': '^2', 'x³': '^3', '√': 'sqrt(', '∛': 'cbrt(', 'π': 'pi', 'e': 'e', '!': '!', '÷': '/', '×': '*', '−': '-', 'EXP': '*10^' };
        if (btn === 'C') { setExpr(''); setResult(''); return; }
        if (btn === '⌫') { setExpr(e => e.slice(0, -1)); return; }
        if (btn === 'Ans') { append(ans.toString()); return; }
        if (btn === '=') {
            try {
                const scope = { pi: Math.PI, e: Math.E };
                const val = math.evaluate(expr, scope);
                const res = typeof val === 'number' ? parseFloat(val.toFixed(10)).toString() : val.toString();
                setResult(res);
                setAns(parseFloat(res) || 0);
            } catch {
                setError('Invalid expression');
            }
            return;
        }
        append(map[btn] ?? btn);
    }, [expr, ans]);

    return (
        <CalculatorLayout title="Scientific Calculator" category="math" resultText={result}
            description="Advanced calculator with trig, log, exponents, and more."
            formulaSection={<p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Uses <strong>degrees</strong> for trig functions (sin, cos, tan). Use <em>asin</em>, <em>acos</em>, <em>atan</em> for inverse functions. <strong>Ans</strong> recalls the last result.</p>}
        >
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: '16px 18px', marginBottom: 16, border: '1.5px solid var(--border-color)', minHeight: 80 }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all', minHeight: 20 }}>{expr || '0'}</div>
                {error ? <div style={{ fontSize: 20, color: '#ef4444', fontWeight: 600, marginTop: 8 }}>{error}</div>
                    : <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#3355ff', marginTop: 6 }}>{result}</div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {SCI_BTNS.flat().map((btn, i) => {
                    const isOp = ['÷', '×', '−', '+'].includes(btn);
                    const isEq = btn === '=';
                    const isFunc = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'x²', 'x³', '√', '∛'].includes(btn);
                    return (
                        <button key={i} onClick={() => handleBtn(btn)} style={{
                            padding: '12px 4px', fontSize: isFunc ? 12 : 15, fontWeight: 600,
                            borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                            background: isEq ? '#3355ff' : isOp ? '#3355ff18' : isFunc ? '#7c3aed18' : 'var(--bg-secondary)',
                            color: isEq ? '#fff' : isOp ? '#3355ff' : isFunc ? '#7c3aed' : 'var(--text-primary)',
                            transition: 'all 0.12s',
                        }}>
                            {btn}
                        </button>
                    );
                })}
            </div>
        </CalculatorLayout>
    );
}
