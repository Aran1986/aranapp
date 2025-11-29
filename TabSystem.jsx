import { useGlobal } from './GlobalState'

export default function TabSystem() {
  const { activeTabs, removeTab, setCurrentTab } = useGlobal()

  if (activeTabs.length === 0) return null

  return (
    <div style={{
      display: 'flex',
      gap: '5px',
      padding: '10px 15px',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      overflowX: 'auto',
      minHeight: '50px'
    }}>
      {activeTabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 20px',
            background: tab.active ? 'var(--primary-color)' : 'var(--background)',
            color: tab.active ? 'white' : 'var(--text-primary)',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--border)',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          <span style={{ fontSize: '20px' }}>{tab.icon}</span>
          <span style={{ fontWeight: tab.active ? 'bold' : 'normal' }}>{tab.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              removeTab(tab.id)
            }}
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: tab.active ? 'rgba(255,255,255,0.3)' : 'var(--border)',
              color: tab.active ? 'white' : 'var(--text-primary)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)'
            }}
            onMouseEnter={(e) => e.target.style.background = tab.active ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)'}
            onMouseLeave={(e) => e.target.style.background = tab.active ? 'rgba(255,255,255,0.3)' : 'var(--border)'}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}