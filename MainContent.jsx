import { useGlobal } from './GlobalState'

export default function MainContent() {
  const { activeTabs } = useGlobal()

  return (
    <main style={{
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      background: 'var(--background)'
    }}>
      {activeTabs.length === 0 ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '18px',
          color: 'var(--text-secondary)'
        }}>
          یک ماول از نوار کناری انتخاب کنید
        </div>
      ) : (
        <div>
          {activeTabs.map(tab => (
            <div key={tab.id} style={{ marginBottom: '20px' }}>
              <h2>{tab.icon} {tab.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
                محتوای ماول {tab.title} اینجا نمایش داده میشود
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
