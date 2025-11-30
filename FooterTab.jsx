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
          height: '25px',
          background: isOpen ? 'rgba(14, 165, 233, 0.95)' : 'rgba(14, 165, 233, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px 10px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 101,
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'white',
          transition: 'bottom 0.3s ease, background 0.3s ease',
          boxShadow: isOpen ? '0 -2px 8px rgba(14, 165, 233, 0.3)' : 'none'
        }}
      >
        📊 اطلاعات سیستم
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
        justifyContent: 'space-around',
        padding: '0 30px',
        color: 'white',
        fontSize: '12px',
        transition: 'height 0.3s ease',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💻</span>
          <span>CPU: 45%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🧠</span>
          <span>RAM: 8.2/16 GB</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🌡️</span>
          <span>دما: 52°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📶</span>
          <span>سرعت: 45 Mbps</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💽</span>
          <span>دیسک: 256/512 GB</span>
        </div>
      </div>
    </>
  )
}