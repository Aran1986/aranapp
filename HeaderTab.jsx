import { useGlobal } from './GlobalState'

export default function HeaderTab() {
  const { activeAccordion, openAccordion, addTab } = useGlobal()
  const isOpen = activeAccordion === 'header'

  const workTools = [
    { id: 'code-editor', title: 'ویرایشگر کد', icon: '💻' },
    { id: 'terminal', title: 'ترمینال', icon: '⌨️' },
    { id: 'api-tester', title: 'تست API', icon: '🔌' },
    { id: 'database', title: 'دیتابیس', icon: '🗄️' },
    { id: 'git', title: 'گیت', icon: '🔀' },
    { id: 'word', title: 'ورد', icon: '📄' },
    { id: 'excel', title: 'اکسل', icon: '📊' },
    { id: 'powerpoint', title: 'پاورپوینت', icon: '📽️' },
    { id: 'pdf-editor', title: 'ویرایشگر PDF', icon: '📑' },
    { id: 'designer', title: 'طراحی گرافیک', icon: '🎨' }
  ]

  return (
    <>
      <div
        onClick={() => openAccordion('header')}
        style={{
          position: 'fixed',
          top: isOpen ? 'calc(var(--header-height) * 2 - 5px)' : 'calc(var(--header-height) - 5px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '130px',
          height: '25px',
          background: isOpen ? 'rgba(139, 92, 246, 0.95)' : 'rgba(139, 92, 246, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 101,
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'white',
          transition: 'top 0.3s ease, background 0.3s ease',
          boxShadow: isOpen ? '0 2px 8px rgba(139, 92, 246, 0.3)' : 'none'
        }}
      >
        🛠️ ابزار کاری
      </div>

      <div style={{
        position: 'fixed',
        top: 'var(--header-height)',
        left: 0,
        right: 0,
        height: isOpen ? 'var(--header-height)' : '0',
        background: 'rgba(139, 92, 246, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 30px',
        gap: '10px',
        color: 'white',
        transition: 'height 0.3s ease',
        overflow: 'hidden'
      }}>
        {workTools.map(tool => (
          <button
            key={tool.id}
            onClick={() => {
              addTab({ ...tool, active: true })
              openAccordion(null)
            }}
            style={{
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              border: 'none',
              color: 'white',
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span style={{ fontSize: '16px' }}>{tool.icon}</span>
            <span>{tool.title}</span>
          </button>
        ))}
      </div>
    </>
  )
}