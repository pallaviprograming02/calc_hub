import { useState } from 'react';
import * as math from 'mathjs';
import CalculatorLayout from '../../layouts/CalculatorLayout';

const emptyGrid = (r, c) => Array.from({ length: r }, () => Array(c).fill(''));

export default function MatrixCalculator() {
    const [size, setSize] = useState(2); // 2x2 to 4x4
    const [tabOp, setTabOp] = useState('add');
    const [mA, setMA] = useState(emptyGrid(2, 2));
    const [mB, setMB] = useState(emptyGrid(2, 2));
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const toNum = g => g.map(r => r.map(v => parseFloat(v) || 0));

    const changeSize = (s) => {
        setSize(s);
        setMA(emptyGrid(s, s)); setMB(emptyGrid(s, s)); setResult(null); setError('');
    };

    const setCell = (mat, row, col, val, setter) => {
        const m = mat.map(r => [...r]);
        m[row][col] = val;
        setter(m);
    };

    const calculate = () => {
        setError('');
        try {
            const a = toNum(mA), b = toNum(mB);
            let res;
            if (tabOp === 'add') res = math.add(a, b);
            if (tabOp === 'mul') res = math.multiply(a, b);
            if (tabOp === 'det') res = math.det(a);
            if (tabOp === 'inv') res = math.inv(a);
            setResult({ val: res, op: tabOp });
        } catch (e) { setError(e.message); }
    };

    const MatGrid = ({ m, setter }) => (
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, background: 'var(--bg-secondary)', borderRadius: 10, padding: 12, border: '1.5px solid var(--border-color)' }}>
            {m.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', gap: 6 }}>
                    {row.map((cell, ci) => (
                        <input key={ci} type="number" value={cell} onChange={e => setCell(m, ri, ci, e.target.value, setter)}
                            style={{ width: 52, height: 48, textAlign: 'center', borderRadius: 7, border: '1.5px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                    ))}
                </div>
            ))}
        </div>
    );

    const showB = ['add', 'mul'].includes(tabOp);

    const formatResult = () => {
        if (!result) return null;
        if (typeof result.val === 'number') return <div style={{ fontSize: 36, fontWeight: 800, color: '#3355ff', fontFamily: 'var(--font-mono)' }}>{result.val.toFixed(6)}</div>;
        return (
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {result.val.map((row, ri) => (
                    <div key={ri} style={{ display: 'flex', gap: 8 }}>
                        {row.map((v, ci) => <span key={ci} style={{ width: 70, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)' }}>{(+v).toFixed(4)}</span>)}
                    </div>
                ))}
            </div>
        );
    };

    const ops = [['add', 'Add (A+B)'], ['mul', 'Multiply (A×B)'], ['det', 'Determinant |A|'], ['inv', 'Inverse A⁻¹']];

    return (
        <CalculatorLayout title="Matrix Calculator" category="math" resultText={result ? JSON.stringify(result.val) : ''}
            description="Add, multiply matrices, find determinants and inverses for 2×2 to 4×4 matrices."
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {[2, 3, 4].map(s => <button key={s} onClick={() => changeSize(s)} style={{ padding: '7px 16px', borderRadius: 8, border: '1.5px solid', borderColor: size === s ? '#3355ff' : 'var(--border-color)', background: size === s ? '#3355ff15' : 'var(--bg-secondary)', color: size === s ? '#3355ff' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{s}×{s}</button>)}
                {ops.map(([v, l]) => <button key={v} onClick={() => setTabOp(v)} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid', borderColor: tabOp === v ? '#7c3aed' : 'var(--border-color)', background: tabOp === v ? '#7c3aed15' : 'var(--bg-secondary)', color: tabOp === v ? '#7c3aed' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: 12 }}>{l}</button>)}
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
                <div><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Matrix A</div><MatGrid m={mA} setter={setMA} /></div>
                {showB && <>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-muted)' }}>{tabOp === 'add' ? '+' : '×'}</div>
                    <div><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Matrix B</div><MatGrid m={mB} setter={setMB} /></div>
                </>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#3355ff', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setMA(emptyGrid(size, size)); setMB(emptyGrid(size, size)); setResult(null); setError(''); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {error && <div style={{ marginTop: 14, padding: 12, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, color: '#dc2626', fontSize: 13 }}>{error}</div>}
            {result && !error && (
                <div style={{ marginTop: 20, background: '#3355ff10', border: '1.5px solid #3355ff30', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Result</div>
                    {formatResult()}
                </div>
            )}
        </CalculatorLayout>
    );
}
