import { useGlobal } from './GlobalState'
import ProgressTracker from './ProgressTracker/ProgressTracker'

export default function Header() {
  const { theme, setTheme } = useGlobal()

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* لوگو */}
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '1px',
        minWidth: '120px'
      }}>
        🌐 AranApp
      </div>

      <ProgressTracker />

      {/* گزینههای سمت راست (4 تا) */}
      <button style={iconButtonStyle} title="پروفایل">
        👤
      </button>
      <button style={iconButtonStyle} title="تنظیمات">
        ⚙️
      </button>
      <button style={iconButtonStyle} title="اعلانها">
        🔔
      </button>
      <button style={iconButtonStyle} title="تماس ویدئویی">
        📹
      </button>

      {/* آدرس بار - وسط */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '12px',
        padding: '8px 15px',
        backdropFilter: 'blur(10px)',
        maxWidth: '600px',
        margin: '0 15px'
      }}>
        <span style={{ marginLeft: '10px', fontSize: '16px' }}>🔍</span>
        <input
          type="text"
          placeholder="جستجو یا وارد کردن آدرس..."
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: '13px',
            direction: 'rtl'
          }}
        />
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
          ↗️
        </button>
      </div>

      {/* گزینههای سمت چپ (4 تا) */}
      <button style={iconButtonStyle} title="چت سریع">
        💬
      </button>
      <button style={iconButtonStyle} title="تغییر زبان">
        🌐
      </button>
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={iconButtonStyle}
        title={theme === 'light' ? 'حالت تاریک' : 'حالت روشن'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <button style={iconButtonStyle} title="نشانکها">
        ⭐
      </button>
    </header>
  )
}

const iconButtonStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  fontSize: '18px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}