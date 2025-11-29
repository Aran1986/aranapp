import { useGlobal } from './GlobalState'

export default function Sidebar1() {
  const { addTab, activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar1'

  const items = [
    { id: 'wallet', title: 'کیف پول', icon: '💰' },
    { id: 'exchange', title: 'صرافی', icon: '💱' }
  ]

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar1')}
        style={{
          position: 'fixed',
          right: isOpen ? 'var(--sidebar-width)' : 0,
          top: 'calc(var(--header-height) + 20px)',
          width: '40px',
          height: '100px',
          background: 'rgba(102, 126, 234, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px 0 0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'right 0.3s ease',
          writingMode: 'vertical-rl',
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        مالی
      </div>

      <div style={{
        position: 'fixed',
        right: isOpen ? 0 : '-280px',
        top: 'var(--header-height)',
        bottom: 'var(--footer-height)',
        width: 'var(--sidebar-width)',
        background: 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid var(--border)',
        zIndex: 99,
        padding: '20px',
        overflowY: 'auto',
        transition: 'right 0.3s ease'
      }}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => {
              addTab({ ...item, active: true })
              openAccordion(null)
            }}
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '10px',
              background: 'white',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'var(--transition)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateX(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
          >
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </>
  )
}