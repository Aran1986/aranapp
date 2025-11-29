import { useGlobal } from './GlobalState'

export default function Header() {
  const { theme, setTheme } = useGlobal()

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 30px',
      gap: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '1px'
      }}>
        🌐 AranApp
      </div>

      <div style={{ flex: 1 }} />

      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '20px',
          transition: 'var(--transition)',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}