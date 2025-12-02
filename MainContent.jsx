import { useGlobal } from './GlobalState'
import { useState, Suspense } from 'react'

export default function MainContent() {
  const { activeTabs } = useGlobal()
  const [isMaximized, setIsMaximized] = useState(false)

  const activeTab = activeTabs.find(t => t.active) || null

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: '#f0f0f0',
      position: 'relative',
      padding: '10px'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        border: '3px solid #667eea',
        borderRadius: '12px',
        background: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)'
      }}>
        <button
          onClick={() => setIsMaximized(!isMaximized)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'white',
            border: '2px solid var(--border)',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'var(--transition)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          title={isMaximized ? 'بازگرداندن' : 'تمام صفحه'}
        >
          {isMaximized ? '📉' : '📈'}
        </button>

        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          padding: '20px'
        }}>
          {activeTab?.isWelcome ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '20px'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌐</div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                به AranApp خوش آمدید
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                lineHeight: '1.8'
              }}>
                ماول کیف پول 💰 و اعلانها 🔔 نصب شدهاند!
                <br />
                از نوار کناری راست کیف پول را باز کنید و آن را شار کنید تا اعلان دریافت کنید.
              </p>
            </div>
          ) : activeTab?.component ? (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>در حال بارگذاری...</div>}>
              <activeTab.component />
            </Suspense>
          ) : (
            <div style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>
                <span style={{ fontSize: '36px', marginLeft: '10px' }}>{activeTab?.icon}</span>
                {activeTab?.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                این ماول هنوز ساخته نشده است
              </p>
            </div>
          )}
        </div>
      </div>

      {isMaximized && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 1000,
          padding: '20px',
          overflow: 'auto'
        }}>
          <button
            onClick={() => setIsMaximized(false)}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              fontSize: '20px',
              zIndex: 1001
            }}
          >
            ✕
          </button>
          
          {activeTab?.component && (
            <div style={{ marginTop: '60px' }}>
              <Suspense fallback={<div>در حال بارگذاری...</div>}>
                <activeTab.component />
              </Suspense>
            </div>
          )}
        </div>
      )}
    </main>
  )
}