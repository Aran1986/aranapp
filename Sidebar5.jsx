import { useGlobal } from './GlobalState'

export default function Sidebar5() {
  const { theme, setTheme, activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar5'

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar5')}
        style={{
          position: 'fixed',
          left: isOpen ? 'var(--sidebar-width)' : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '100px',
          background: 'rgba(251, 146, 60, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0 10px 10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'left 0.3s ease',
          writingMode: 'vertical-rl',
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        تنظیمات
      </div>

      <div style={{
        position: 'fixed',
        left: isOpen ? 0 : '-280px',
        top: 'var(--header-height)',
        bottom: 'var(--footer-height)',
        width: 'var(--sidebar-width)',
        background: 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--border)',
        zIndex: 99,
        padding: '20px',
        overflowY: 'auto',
        transition: 'left 0.3s ease'
      }}>
        <h3 style={{ marginBottom: '20px' }}>⚙️ تنظیمات</h3>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{
            width: '100%',
            padding: '15px',
            background: 'var(--primary-color)',
            color: 'white',
            borderRadius: 'var(--border-radius)',
            fontWeight: 'bold'
          }}
        >
          {theme === 'light' ? '🌙 حالت تاریک' : '☀️ حالت روشن'}
        </button>
      </div>
    </>
  )
}