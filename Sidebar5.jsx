import { useGlobal } from './GlobalState'

export default function Sidebar5() {
  const { addTab, activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar5'
  const isAnyLeftOpen = ['sidebar4', 'sidebar5', 'sidebar6'].includes(activeAccordion)

  const items = [
    { id: 'health', title: 'سلامت', icon: '🏥' },
    { id: 'fitness', title: 'تناسب اندام', icon: '💪' },
    { id: 'nutrition', title: 'تغذیه', icon: '🥗' },
    { id: 'pharmacy', title: 'داروخانه', icon: '💊' },
    { id: 'meditation', title: 'مدیتیشن', icon: '🧘' },
    { id: 'mental', title: 'سلامت روان', icon: '🧠' },
    { id: 'beauty', title: 'زیبایی', icon: '💄' },
    { id: 'skincare', title: 'مراقبت پوست', icon: '🧴' },
    { id: 'doctor', title: 'پزشک', icon: '👨⚕️' },
    { id: 'lab', title: 'آزمایشگاه', icon: '🔬' }
  ]

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar5')}
        style={{
          position: 'fixed',
          left: isAnyLeftOpen ? '220px' : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '35px',
          height: '70px',
          background: isOpen ? 'rgba(251, 146, 60, 0.95)' : 'rgba(251, 146, 60, 0.3)',
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
          boxShadow: isOpen ? '0 4px 12px rgba(251, 146, 60, 0.5)' : 'none'
        }}
      >
        سلامت
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