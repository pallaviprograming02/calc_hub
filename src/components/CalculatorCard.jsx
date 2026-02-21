import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryById } from '../config/calculators';

export default function CalculatorCard({ calculator }) {
    const cat = getCategoryById(calculator.category);
    const Icon = cat?.icon;

    return (
        <Link
            to={calculator.path}
            style={{ textDecoration: 'none' }}
        >
            <div
                style={{
                    background: 'var(--bg-card)',
                    border: '1.5px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = cat?.color || '#3355ff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${cat?.color || '#3355ff'}25`;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {/* Subtle background glow */}
                <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 80, height: 80, borderRadius: '50%',
                    background: `radial-gradient(circle, ${cat?.color}18, transparent 70%)`,
                    transform: 'translate(20px, -20px)',
                }} />

                {/* Icon */}
                <div style={{
                    width: 42, height: 42, borderRadius: '11px',
                    background: cat ? `${cat.color}15` : 'var(--bg-tertiary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: cat?.color || 'var(--text-secondary)',
                    flexShrink: 0,
                }}>
                    {Icon && <Icon size={20} />}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, lineHeight: '1.3' }}>
                        {calculator.name}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {calculator.description.slice(0, 75)}{calculator.description.length > 75 ? '…' : ''}
                    </div>
                </div>

                {/* Category badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: 600, padding: '3px 8px',
                        borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em',
                        background: cat ? `${cat.color}15` : 'var(--bg-tertiary)',
                        color: cat?.color || 'var(--text-muted)',
                    }}>
                        {cat?.label}
                    </span>
                    <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
            </div>
        </Link>
    );
}
