import { useGlobal } from './GlobalState'

export default function Sidebar3() {
  const { addTab, activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar3'
  const isAnyRightOpen = ['sidebar1', 'sidebar2', 'sidebar3'].includes(activeAccordion)

  const items = [
    { id: 'market', title: 'فروشگاه', icon: '🛒' },
    { id: 'food-delivery', title: 'سفارش غذا', icon: '🍔' },
    { id: 'hotel', title: 'رزرو هتل', icon: '🏨' },
    { id: 'flight', title: 'بلیط پرواز', icon: '✈️' },
    { id: 'ticket', title: 'بلیط رویداد', icon: '🎫' },
    { id: 'grocery', title: 'خرید مواد غذایی', icon: '🛍️' },
    { id: 'fashion', title: 'مد و پوشاک', icon: '👔' },
    { id: 'electronics', title: 'لوازم الکترونیک', icon: '📱' },
    { id: 'furniture', title: 'مبلمان', icon: '🛋️' },
    { id: 'auction', title: 'حراج', icon: '🔨' }
  ]

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar3')}
        style={{
          position: 'fixed',
          right: isAnyRightOpen ? '220px' : 0,
          bottom: 'calc(var(--footer-height) + 20px)',
          width: '35px',
          height: '70px',
          background: isOpen ? 'rgba(59, 130, 246, 0.95)' : 'rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px 0 0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'right 0.3s ease, background 0.3s ease',
          writingMode: 'vertical-rl',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          boxShadow: isOpen ? '0 4px 12px rgba(59, 130, 246, 0.5)' : 'none'
        }}
      >
        خرید
      </div>

      <div style={{
        position: 'fixed',
        right: isOpen ? 0 : '-220px',
        top: 'var(--header-height)',
        bottom: 'var(--footer-height)',
        width: '220px',
        background: 'rgba(248, 250, 252, 0.98)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid var(--border)',
        zIndex: 99,
        padding: '10px',
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
              e.currentTarget.style.transform = 'translateX(-3px)'
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