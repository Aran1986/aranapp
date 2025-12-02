import { useGlobal } from './GlobalState'
import ProgressTracker from './ProgressTracker/ProgressTracker'
import { useState, useEffect } from 'react'
import { getModuleStatus, loadModule } from './moduleLoader'

export default function Header() {
  const { theme, setTheme, addTab, unreadCount } = useGlobal()
  const [notificationStatus, setNotificationStatus] = useState('not-installed')

  useEffect(() => {
    const status = getModuleStatus('notifications')
    setNotificationStatus(status)
  }, [])

  const handleNotificationClick = async () => {
    if (notificationStatus === 'ready') {
      const NotificationComponent = await loadModule('notifications')
      if (NotificationComponent) {
        addTab({
          id: 'notifications',
          title: 'اعلانها',
          icon: '🔔',
          active: true,
          component: NotificationComponent
        })
      }
    } else {
      alert('ماول اعلانها هنوز نصب نشده است')
    }
  }

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '1px',
        minWidth: '120px'
      }}>
        🌐 AranApp
      </div>

      <ProgressTracker />

      <button style={iconButtonStyle} title="پروفایل">👤</button>
      <button style={iconButtonStyle} title="تنظیمات">⚙️</button>
      
      {/* دکمه نوتیفیکیشن با Badge */}
      <button 
        onClick={handleNotificationClick}
        style={{
          ...iconButtonStyle,
          opacity: notificationStatus === 'ready' ? 1 : 0.5,
          position: 'relative'
        }} 
        title={notificationStatus === 'ready' ? 'اعلانها' : 'ماول نصب نشده'}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: '#ef4444',
            color: 'white',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: 'bold',
            minWidth: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
      
      <button style={iconButtonStyle} title="تماس ویدئویی">📹</button>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '12px',
        padding: '8px 15px',
        backdropFilter: 'blur(10px)',
        maxWidth: '600px',
        margin: '0 15px'
      }}>
        <span style={{ marginLeft: '10px', fontSize: '16px' }}>🔍</span>
        <input
          type="text"
          placeholder="جستجو یا وارد کردن آدرس..."
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: '13px',
            direction: 'rtl'
          }}
        />
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
          ↗️
        </button>
      </div>

      <button style={iconButtonStyle} title="چت سریع">💬</button>
      <button style={iconButtonStyle} title="تغییر زبان">🌐</button>
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={iconButtonStyle}
        title={theme === 'light' ? 'حالت تاریک' : 'حالت روشن'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <button style={iconButtonStyle} title="نشانکها">⭐</button>
    </header>
  )
}

const iconButtonStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  fontSize: '18px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}