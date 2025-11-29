import { useGlobal } from './GlobalState'

export default function HeaderTab() {
  const { activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'header'

  return (
    <>
      <div
        onClick={() => openAccordion('header')}
        style={{
          position: 'fixed',
          top: isOpen ? 'calc(var(--header-height) * 2 - 5px)' : 'calc(var(--header-height) - 5px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '30px',
          background: 'rgba(139, 92, 246, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 101,
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          transition: 'top 0.3s ease'
        }}
      >
        📌 ابزار سریع
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
        padding: '0 30px',
        gap: '15px',
        color: 'white',
        transition: 'height 0.3s ease',
        overflow: 'hidden'
      }}>
        <button style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>🔍 جستجو</button>
        <button style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>⭐ علاقهمندیها</button>
        <button style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>📂 فایلها</button>
      </div>
    </>
  )
}