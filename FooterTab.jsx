import { useGlobal } from './GlobalState'

export default function FooterTab() {
  const { activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'footer'

  return (
    <>
      <div
        onClick={() => openAccordion('footer')}
        style={{
          position: 'fixed',
          bottom: isOpen ? 'calc(var(--footer-height) * 2 - 5px)' : 'calc(var(--footer-height) - 5px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '30px',
          background: 'rgba(14, 165, 233, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px 10px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 101,
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          transition: 'bottom 0.3s ease'
        }}
      >
        📊 وضعیت
      </div>

      <div style={{
        position: 'fixed',
        bottom: 'var(--footer-height)',
        left: 0,
        right: 0,
        height: isOpen ? 'var(--footer-height)' : '0',
        background: 'rgba(14, 165, 233, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 30px',
        gap: '20px',
        color: 'white',
        fontSize: '13px',
        transition: 'height 0.3s ease',
        overflow: 'hidden'
      }}>
        <span>🌐 آنلاین</span>
        <span>•</span>
        <span>💾 10.2 GB آزاد</span>
        <span>•</span>
        <span>🔋 75%</span>
      </div>
    </>
  )
}