import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CATEGORIES, getCalculatorsByCategory } from '../config/calculators';

export default function Sidebar({ open }) {
    const location = useLocation();
    const [expanded, setExpanded] = useState(() => {
        // auto-expand the active category
        const match = CATEGORIES.find(c =>
            getCalculatorsByCategory(c.id).some(calc => location.pathname.startsWith('/' + c.id))
        );
        return match ? { [match.id]: true } : {};
    });

    const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

    if (!open) return null;

    return (
        <aside style={{
            width: 260, flexShrink: 0,
            background: 'var(--bg-card)',
            borderRight: '1px solid var(--border-color)',
            height: 'calc(100vh - 60px)',
            position: 'sticky', top: 60,
            overflowY: 'auto', padding: '12px 0',
        }}>
            <div style={{ padding: '0 12px 8px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Categories
            </div>
            {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const calcs = getCalculatorsByCategory(cat.id);
                const isExpanded = expanded[cat.id];
                const isActive = calcs.some(c => location.pathname === c.path);

                return (
                    <div key={cat.id}>
                        <button
                            onClick={() => toggle(cat.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                width: '100%', padding: '9px 16px', background: 'none', border: 'none',
                                cursor: 'pointer', color: isActive ? cat.color : 'var(--text-secondary)',
                                fontWeight: isActive ? 600 : 500, fontSize: '14px', textAlign: 'left',
                                borderRadius: '8px', margin: '1px 6px', transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'var(--bg-secondary)')}
                            onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'none')}
                        >
                            <span style={{
                                width: 28, height: 28, borderRadius: '8px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                background: isActive ? cat.color + '20' : 'var(--bg-tertiary)',
                                color: isActive ? cat.color : 'var(--text-muted)',
                                flexShrink: 0,
                            }}>
                                <Icon size={15} />
                            </span>
                            <span style={{ flex: 1 }}>{cat.label}</span>
                            <span style={{ color: 'var(--text-muted)' }}>
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </span>
                        </button>

                        {isExpanded && (
                            <div style={{ paddingLeft: '16px' }}>
                                {calcs.map(calc => {
                                    const active = location.pathname === calc.path;
                                    return (
                                        <Link
                                            key={calc.id}
                                            to={calc.path}
                                            style={{
                                                display: 'block', padding: '7px 16px 7px 24px',
                                                fontSize: '13px', textDecoration: 'none',
                                                color: active ? cat.color : 'var(--text-secondary)',
                                                fontWeight: active ? 600 : 400,
                                                borderLeft: `2px solid ${active ? cat.color : 'transparent'}`,
                                                marginLeft: 8, borderRadius: '0 6px 6px 0',
                                                background: active ? cat.color + '10' : 'none',
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            {calc.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </aside>
    );
}
