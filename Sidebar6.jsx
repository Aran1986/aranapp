import { useGlobal } from './GlobalState'

export default function Sidebar6() {
  const { activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar6'

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar6')}
        style={{
          position: 'fixed',
          left: isOpen ? 'var(--sidebar-width)' : 0,
          bottom: 'calc(var(--footer-height) + 20px)',
          width: '40px',
          height: '100px',
          background: 'rgba(236, 72, 153, 0.3)',
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
        اجتماعی
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
        <h3 style={{ marginBottom: '20px' }}>👥 شبکه اجتماعی</h3>
        <p style={{ color: 'var(--text-secondary)' }}>به زودی...</p>
      </div>
    </>
  )
}