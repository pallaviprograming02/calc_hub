import { useState, useCallback } from 'react';
import { Delete } from 'lucide-react';
import CalculatorLayout from '../../layouts/CalculatorLayout';

const BUTTONS = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '='],
];

export default function BasicCalculator() {
    const [display, setDisplay] = useState('0');
    const [prev, setPrev] = useState(null);
    const [op, setOp] = useState(null);
    const [reset, setReset] = useState(false);
    const [resultText, setResultText] = useState('');

    const handleBtn = useCallback((btn) => {
        if (btn === 'C') { setDisplay('0'); setPrev(null); setOp(null); setReset(false); setResultText(''); return; }

        if ('0123456789.'.includes(btn)) {
            setDisplay(d => {
                const base = (reset || d === '0') ? '' : d;
                if (btn === '.' && base.includes('.')) return d;
                return (base + btn) || '0';
            });
            setReset(false);
            return;
        }

        if (btn === '⌫') { setDisplay(d => d.length > 1 ? d.slice(0, -1) : '0'); return; }
        if (btn === '±') { setDisplay(d => String(-parseFloat(d))); return; }
        if (btn === '%') { setDisplay(d => String(parseFloat(d) / 100)); return; }

        const opMap = { '÷': '/', '×': '*', '−': '-', '+': '+' };
        if (opMap[btn]) {
            setPrev(parseFloat(display));
            setOp(opMap[btn]);
            setReset(true);
            return;
        }

        if (btn === '=' && prev !== null) {
            const cur = parseFloat(display);
            let result;
            switch (op) {
                case '+': result = prev + cur; break;
                case '-': result = prev - cur; break;
                case '*': result = prev * cur; break;
                case '/': result = cur === 0 ? 'Error' : prev / cur; break;
                default: result = cur;
            }
            const res = typeof result === 'number' ? parseFloat(result.toFixed(10)).toString() : result;
            setDisplay(res);
            setResultText(res);
            setPrev(null); setOp(null); setReset(true);
        }
    }, [display, prev, op]);

    const btnStyle = (btn) => {
        const isOp = ['÷', '×', '−', '+'].includes(btn);
        const isEq = btn === '=';
        const isClear = btn === 'C';
        return {
            width: '100%', padding: '18px 10px',
            fontSize: btn === '0' ? 20 : 18, fontWeight: 600, fontFamily: 'var(--font-mono)',
            borderRadius: 12, border: 'none', cursor: 'pointer',
            background: isEq ? '#3355ff' : isOp ? '#3355ff18' : isClear ? '#ef444418' : 'var(--bg-secondary)',
            color: isEq ? '#fff' : isOp ? '#3355ff' : isClear ? '#ef4444' : 'var(--text-primary)',
            transition: 'all 0.12s',
            boxShadow: isEq ? '0 4px 12px #3355ff40' : 'none',
        };
    };

    return (
        <CalculatorLayout title="Basic Calculator" category="math" resultText={resultText}
            description="Standard 4-function calculator for everyday arithmetic."
        >
            {/* Display */}
            <div style={{
                background: 'var(--bg-secondary)', borderRadius: 12, padding: '20px 20px 16px',
                marginBottom: 16, textAlign: 'right', border: '1.5px solid var(--border-color)',
            }}>
                {op && <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                    {prev} {op}
                </div>}
                <div style={{ fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', letterSpacing: '-1px', wordBreak: 'break-all' }}>
                    {display}
                </div>
            </div>
            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {BUTTONS.flat().map((btn, i) => (
                    <button key={i} onClick={() => handleBtn(btn)} style={{ ...btnStyle(btn), gridColumn: btn === '0' ? 'span 2' : undefined }}>
                        {btn}
                    </button>
                ))}
            </div>
        </CalculatorLayout>
    );
}
