import { useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Copy, Share2, Printer, CheckCircle2, ChevronRight } from 'lucide-react';
import { copyToClipboard } from '../utils/copyToClipboard';
import { shareUrl } from '../utils/shareUrl';
import { getCategoryById, CALCULATORS } from '../config/calculators';

export default function CalculatorLayout({ title, description, category, resultText, children, formulaSection }) {
    const [copied, setCopied] = useState(false);
    const [shared, setShared] = useState(false);
    const location = useLocation();
    const cat = getCategoryById(category);
    const calc = CALCULATORS.find(c => c.path === location.pathname);

    const handleCopy = useCallback(async () => {
        if (resultText) {
            await copyToClipboard(resultText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [resultText]);

    const handleShare = useCallback(async () => {
        await shareUrl(title, description, window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
    }, [title, description]);

    return (
        <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px 48px' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: 20 }}>
                <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                <ChevronRight size={13} />
                <Link to={`/${category}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    {cat?.label || category}
                </Link>
                <ChevronRight size={13} />
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</span>
            </nav>

            {/* Title */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 8 }}>
                    {cat?.icon && (
                        <div style={{
                            width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                            background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}10)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: cat.color,
                        }}>
                            <cat.icon size={20} />
                        </div>
                    )}
                    <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                        {title}
                    </h1>
                </div>
                {description && (
                    <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginLeft: 52 }}>
                        {description}
                    </p>
                )}
            </div>

            {/* Calculator panel */}
            <div style={{
                background: 'var(--bg-card)', border: '1.5px solid var(--border-color)',
                borderRadius: '16px', padding: '28px', marginBottom: 20,
                boxShadow: 'var(--shadow-md)',
            }}>
                {children}
            </div>

            {/* Action buttons */}
            {resultText && (
                <div className="no-print" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: 20 }}>
                    <button
                        onClick={handleCopy}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px',
                            borderRadius: '10px', border: '1.5px solid var(--border-color)',
                            background: copied ? '#ecfdf5' : 'var(--bg-secondary)',
                            color: copied ? '#059669' : 'var(--text-secondary)',
                            cursor: 'pointer', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
                        }}
                    >
                        {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                        {copied ? 'Copied!' : 'Copy Result'}
                    </button>
                    <button
                        onClick={handleShare}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px',
                            borderRadius: '10px', border: '1.5px solid var(--border-color)',
                            background: shared ? '#eff6ff' : 'var(--bg-secondary)',
                            color: shared ? '#3355ff' : 'var(--text-secondary)',
                            cursor: 'pointer', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
                        }}
                    >
                        <Share2 size={15} />
                        {shared ? 'Link Copied!' : 'Share'}
                    </button>
                    <button
                        onClick={() => window.print()}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px',
                            borderRadius: '10px', border: '1.5px solid var(--border-color)',
                            background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                            cursor: 'pointer', fontSize: '14px', fontWeight: 500,
                        }}
                    >
                        <Printer size={15} />
                        Print
                    </button>
                </div>
            )}

            {/* Formula / explanation section */}
            {formulaSection && (
                <div style={{
                    background: 'var(--bg-secondary)', border: '1.5px solid var(--border-color)',
                    borderRadius: '14px', padding: '22px',
                }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
                        Formula & Explanation
                    </h2>
                    {formulaSection}
                </div>
            )}
        </div>
    );
}
