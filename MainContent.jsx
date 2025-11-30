import { useGlobal } from './GlobalState'
import { useState } from 'react'

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
      {/* کادر فریم اصلی */}
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
        {/* دکمه ماکزیمایز */}
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

        {/* محتوای اصلی */}
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          padding: '20px'
        }}>
          {activeTab?.isWelcome ? (
            // صفحه خوشآمدگویی
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '20px'
            }}>
              <div style={{
                fontSize: '80px',
                marginBottom: '20px'
              }}>
                🌐
              </div>
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
                سوپراپ ماولار شما آماده است. از نوار کناری یک ماول انتخاب کنید یا از آدرس بار برای جستجو استفاده کنید.
              </p>
              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '30px'
              }}>
                <div style={{
                  padding: '15px 20px',
                  background: 'var(--surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>مالی</div>
                </div>
                <div style={{
                  padding: '15px 20px',
                  background: 'var(--surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔢</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>ابزار</div>
                </div>
                <div style={{
                  padding: '15px 20px',
                  background: 'var(--surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛒</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>خرید</div>
                </div>
                <div style={{
                  padding: '15px 20px',
                  background: 'var(--surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏥</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>سلامت</div>
                </div>
              </div>
            </div>
          ) : (
            // نمایش تب فعال
            <div>
              {activeTabs.map(tab => (
                <div 
                  key={tab.id} 
                  style={{ 
                    display: tab.active ? 'block' : 'none',
                    height: '100%'
                  }}
                >
                  <div style={{
                    padding: '30px',
                    background: 'var(--surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                  }}>
                    <h2 style={{ 
                      fontSize: '28px', 
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{ fontSize: '36px' }}>{tab.icon}</span>
                      {tab.title}
                    </h2>
                    <p style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '15px',
                      lineHeight: '1.8'
                    }}>
                      محتوای ماول {tab.title} اینجا نمایش داده میشود.
                      <br />
                      این ماول هنوز ساخته نشده و فقط قالب آن آماده است.
                    </p>
                    
                    <div style={{
                      marginTop: '30px',
                      padding: '20px',
                      background: 'var(--background)',
                      borderRadius: '8px',
                      border: '1px dashed var(--border)'
                    }}>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        📌 این فضا برای بارگذاری ماول واقعی آماده است
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* حالت تمام صفحه */}
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
          
          <div style={{ marginTop: '60px' }}>
            {activeTab && !activeTab.isWelcome && (
              <div>
                <h1 style={{ 
                  fontSize: '48px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <span>{activeTab.icon}</span>
                  {activeTab.title}
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
                  نمای تمام صفحه فعال است
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}