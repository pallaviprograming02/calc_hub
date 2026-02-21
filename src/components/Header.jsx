import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, Search, Sun, Moon, X, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { searchCalculators } from '../config/calculators';

export default function Header({ sidebarOpen, setSidebarOpen }) {
    const { theme, toggleTheme } = useTheme();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const val = e.target.value;
        setQuery(val);
        setResults(val.trim() ? searchCalculators(val).slice(0, 8) : []);
    };

    const handleSelect = (path) => {
        setQuery('');
        setResults([]);
        navigate(path);
    };

    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 50,
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
        }}>
            <div style={{
                maxWidth: '1600px', margin: '0 auto',
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '12px 20px',
            }}>
                {/* Hamburger */}
                <button
                    onClick={() => setSidebarOpen(o => !o)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '6px', borderRadius: '8px' }}
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: '10px',
                        background: 'linear-gradient(135deg, #3355ff, #7c3aed)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Calculator size={20} color="white" />
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                        SmartCalc<span style={{ color: '#3355ff' }}> Hub</span>
                    </span>
                </Link>

                {/* Search */}
                <div style={{ flex: 1, position: 'relative', maxWidth: '480px' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search calculators..."
                        style={{
                            width: '100%', padding: '9px 12px 9px 36px',
                            borderRadius: '10px', border: '1.5px solid var(--border-color)',
                            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                            fontSize: '14px', outline: 'none', transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = '#3355ff'}
                        onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; setTimeout(() => setResults([]), 200); }}
                    />
                    {results.length > 0 && (
                        <div style={{
                            position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 100,
                            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                            borderRadius: '12px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
                        }}>
                            {results.map(c => (
                                <button
                                    key={c.id}
                                    onMouseDown={() => handleSelect(c.path)}
                                    style={{
                                        display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)',
                                        fontSize: '14px', transition: 'background 0.15s',
                                        borderBottom: '1px solid var(--border-color)',
                                    }}
                                    onMouseEnter={e => e.target.style.background = 'var(--bg-secondary)'}
                                    onMouseLeave={e => e.target.style.background = 'none'}
                                >
                                    <div style={{ fontWeight: 500 }}>{c.name}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>{c.description.slice(0, 60)}…</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dark mode toggle */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle dark mode"
                    style={{
                        background: 'var(--bg-secondary)', border: '1.5px solid var(--border-color)',
                        borderRadius: '10px', padding: '8px 12px', cursor: 'pointer',
                        color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px',
                        fontSize: '13px', fontWeight: 500, transition: 'all 0.2s',
                    }}
                >
                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    <span style={{ display: 'none' }} className="sm:block">{theme === 'light' ? 'Dark' : 'Light'}</span>
                </button>
            </div>
        </header>
    );
}
