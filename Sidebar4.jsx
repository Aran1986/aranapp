import { useGlobal } from './GlobalState'

export default function Sidebar4() {
  const { activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar4'

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar4')}
        style={{
          position: 'fixed',
          left: isOpen ? 'var(--sidebar-width)' : 0,
          top: 'calc(var(--header-height) + 20px)',
          width: '40px',
          height: '100px',
          background: 'rgba(16, 185, 129, 0.3)',
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
        پروفایل
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
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #34d399)',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px'
        }}>
          👤
        </div>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>کاربر مهمان</p>
      </div>
    </>
  )
}