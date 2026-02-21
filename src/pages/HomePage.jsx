import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES, CALCULATORS, getCalculatorsByCategory, searchCalculators } from '../config/calculators';
import CalculatorCard from '../components/CalculatorCard';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const displayCalcs = useMemo(() => {
        return query.trim() ? searchCalculators(query) : null;
    }, [query]);

    return (
        <div className="page-enter" style={{ padding: '32px 28px 60px' }}>
            {/* Hero banner */}
            <div style={{
                background: 'linear-gradient(135deg, #3355ff15, #7c3aed15)',
                border: '1.5px solid var(--border-color)',
                borderRadius: '20px', padding: '36px 32px', marginBottom: 36,
                textAlign: 'center',
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#3355ff15', borderRadius: 20, padding: '5px 14px',
                    fontSize: 12, fontWeight: 600, color: '#3355ff', marginBottom: 16, letterSpacing: '0.05em',
                }}>
                    ✦ FREE ONLINE CALCULATORS
                </div>
                <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 12 }}>
                    Every Calculator You'll Ever Need
                </h1>
                <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 28px' }}>
                    40+ free calculators for math, finance, health, conversions & more — all instant, all offline.
                </p>

                {/* Hero search */}
                <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto' }}>
                    <Search size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search any calculator…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '12px 14px 12px 42px',
                            borderRadius: '12px', border: '2px solid var(--border-color)',
                            background: 'var(--bg-card)', color: 'var(--text-primary)',
                            fontSize: '15px', outline: 'none', transition: 'border-color 0.2s',
                            boxShadow: 'var(--shadow-md)',
                        }}
                        onFocus={e => e.target.style.borderColor = '#3355ff'}
                        onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    />
                </div>

                {/* Stats row */}
                {!query && (
                    <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
                        {[['40+', 'Calculators'], ['6', 'Categories'], ['100%', 'Free & Offline']].map(([num, label]) => (
                            <div key={label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#3355ff' }}>{num}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Search results */}
            {displayCalcs ? (
                <div>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
                        {displayCalcs.length} result{displayCalcs.length !== 1 ? 's' : ''} for <strong>"{query}"</strong>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                        {displayCalcs.map(c => <CalculatorCard key={c.id} calculator={c} />)}
                    </div>
                    {displayCalcs.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                            <div style={{ fontSize: 16, fontWeight: 600 }}>No calculators found</div>
                            <div style={{ fontSize: 14, marginTop: 6 }}>Try a different search term</div>
                        </div>
                    )}
                </div>
            ) : (
                /* Category sections */
                CATEGORIES.map(cat => {
                    const calcs = getCalculatorsByCategory(cat.id);
                    const Icon = cat.icon;
                    return (
                        <section key={cat.id} style={{ marginBottom: 44 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 10,
                                    background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}10)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: cat.color,
                                }}>
                                    <Icon size={18} />
                                </div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{cat.label}</h2>
                                <span style={{
                                    fontSize: 12, fontWeight: 600, padding: '2px 10px',
                                    borderRadius: 20, background: `${cat.color}15`, color: cat.color,
                                }}>
                                    {calcs.length}
                                </span>
                                <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                                {calcs.map(c => <CalculatorCard key={c.id} calculator={c} />)}
                            </div>
                        </section>
                    );
                })
            )}
        </div>
    );
}
