import { useState } from 'react';
import CalculatorLayout from '../../layouts/CalculatorLayout';
import { formatCurrency } from '../../utils/formatNumber';

export default function GstCalculator() {
    const [amount, setAmount] = useState(''); const [rate, setRate] = useState('18');
    const [mode, setMode] = useState('add');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const a = parseFloat(amount), r = parseFloat(rate);
        if (isNaN(a) || isNaN(r)) return;
        if (mode === 'add') {
            const gst = a * (r / 100);
            setResult({ original: a, gst, total: a + gst, rate: r });
        } else {
            const original = a / (1 + r / 100);
            const gst = a - original;
            setResult({ original, gst, total: a, rate: r });
        }
    };

    const resStr = result ? `Total: ₹${result.total.toFixed(2)}, GST: ₹${result.gst.toFixed(2)}` : '';

    return (
        <CalculatorLayout title="GST Calculator" category="finance" resultText={resStr}
            description="Add or remove GST from any amount with configurable GST rate."
            formulaSection={<div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong>Add GST:</strong> GST Amount = Price × (Rate/100) &nbsp;|&nbsp; Total = Price + GST</p>
                <p><strong>Remove GST:</strong> Original = Total / (1 + Rate/100) &nbsp;|&nbsp; GST = Total − Original</p>
            </div>}
        >
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[['add', 'Add GST'], ['remove', 'Remove GST']].map(([v, l]) => (
                    <button key={v} onClick={() => { setMode(v); setResult(null); }} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid', borderColor: mode === v ? '#059669' : 'var(--border-color)', background: mode === v ? '#05966915' : 'var(--bg-secondary)', color: mode === v ? '#059669' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{l}</button>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 20 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{mode === 'add' ? 'Original Amount (₹)' : 'Total Amount incl. GST (₹)'}</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-mono)' }} />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>GST Rate (%)</label>
                    <select value={rate} onChange={e => setRate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }}>
                        {['5', '12', '18', '28'].map(r => <option key={r} value={r}>{r}%</option>)}
                    </select>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={calculate} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Calculate</button>
                <button onClick={() => { setAmount(''); setResult(null); }} style={{ padding: '12px 20px', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Reset</button>
            </div>
            {result && (
                <div style={{ marginTop: 20, background: '#05966908', border: '1.5px solid #05966930', borderRadius: 12, padding: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
                        {[['Original Price', result.original, '#475569'], ['GST Amount', result.gst, '#d97706'], ['Total Price', result.total, '#059669']].map(([l, v, c]) => (
                            <div key={l} style={{ padding: '12px 8px', background: 'var(--bg-card)', borderRadius: 10, border: '1.5px solid var(--border-color)' }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>{l}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: c, fontFamily: 'var(--font-mono)' }}>₹{v.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </CalculatorLayout>
    );
}
