import { useGlobal } from './GlobalState'
import { useState } from 'react'

export default function Sidebar4() {
  const { activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar4'
  const isAnyLeftOpen = ['sidebar4', 'sidebar5', 'sidebar6'].includes(activeAccordion)
  const [searchQuery, setSearchQuery] = useState('')

  const allModules = [
    { id: 'wallet', title: 'کیف پول', icon: '💰' },
    { id: 'calculator', title: 'ماشینحساب', icon: '🔢' },
    { id: 'health', title: 'سلامت', icon: '🏥' },
    { id: 'games', title: 'بازی', icon: '🎮' }
  ]

  const filteredModules = allModules.filter(m => 
    m.title.includes(searchQuery)
  )

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar4')}
        style={{
          position: 'fixed',
          left: isAnyLeftOpen ? '220px' : 0,
          top: 'calc(var(--header-height) + 20px)',
          width: '35px',
          height: '70px',
          background: isOpen ? 'rgba(16, 185, 129, 0.95)' : 'rgba(16, 185, 129, 0.3)',
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
          boxShadow: isOpen ? '0 4px 12px rgba(16, 185, 129, 0.5)' : 'none'
        }}
      >
        شخصی
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
        <div style={{ 
          padding: '15px',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '13px',
          marginBottom: '15px'
        }}>
          ابزارهای شخصی خود را اضافه کنید
        </div>

        <input
          type="text"
          placeholder="جستجوی ابزار..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            fontSize: '12px',
            textAlign: 'right'
          }}
        />

        {filteredModules.map(item => (
          <button
            key={item.id}
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
              e.currentTarget.style.background = 'var(--primary-color)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.title}</span>
            <span style={{ fontSize: '16px' }}>📌</span>
          </button>
        ))}
      </div>
    </>
  )
}