import { useGlobal } from './GlobalState'

export default function Sidebar6() {
  const { addTab, activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar6'
  const isAnyLeftOpen = ['sidebar4', 'sidebar5', 'sidebar6'].includes(activeAccordion)

  const items = [
    { id: 'games', title: 'بازی', icon: '🎮' },
    { id: 'movies', title: 'فیلم', icon: '🎬' },
    { id: 'music', title: 'موسیقی', icon: '🎵' },
    { id: 'books', title: 'کتاب', icon: '📚' },
    { id: 'events', title: 'رویداد', icon: '🎪' },
    { id: 'podcast', title: 'پادکست', icon: '🎙️' },
    { id: 'sports', title: 'ورزش', icon: '⚽' },
    { id: 'streaming', title: 'پخش زنده', icon: '📺' },
    { id: 'social', title: 'شبکه اجتماعی', icon: '👥' },
    { id: 'news', title: 'اخبار', icon: '📰' }
  ]

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar6')}
        style={{
          position: 'fixed',
          left: isAnyLeftOpen ? '220px' : 0,
          bottom: 'calc(var(--footer-height) + 20px)',
          width: '35px',
          height: '70px',
          background: isOpen ? 'rgba(236, 72, 153, 0.95)' : 'rgba(236, 72, 153, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0 10px 10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'left 0.3s ease, background 0.3s ease',
          writingMode: 'vertical-rl',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          boxShadow: isOpen ? '0 4px 12px rgba(236, 72, 153, 0.5)' : 'none'
        }}
      >
        سرگرمی
      </div>

      <div style={{
        position: 'fixed',
        left: isOpen ? 0 : '-220px',
        top: 'var(--header-height)',
        bottom: 'var(--footer-height)',
        width: '220px',
        background: 'rgba(248, 250, 252, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--border)',
        zIndex: 99,
        padding: '10px',
        overflowY: 'auto',
        transition: 'left 0.3s ease'
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
              padding: '8px 12px',
              marginBottom: '6px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'var(--transition)',
              fontSize: '12px',
              textAlign: 'right'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(3px)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
              e.currentTarget.style.background = 'var(--primary-color)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </>
  )
}