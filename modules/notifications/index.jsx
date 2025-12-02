import { useGlobal } from '../../GlobalState'

export default function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAllNotifications } = useGlobal()

  return (
    <div style={{
      padding: '30px',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div>
          <h2 style={{ fontSize: '28px', marginBottom: '5px', color: 'var(--text-primary)' }}>
            🔔 اعلانها
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {unreadCount > 0 ? `${unreadCount} اعلان خوانده نشده` : 'همه اعلانها خوانده شده'}
          </p>
        </div>

        {notifications.length > 0 && (
          <div style={{ display: 'flex', gap: '10px' }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  padding: '8px 16px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                ✓ خواندن همه
              </button>
            )}
            <button
              onClick={clearAllNotifications}
              style={{
                padding: '8px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              🗑️ پاک کردن همه
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--surface)',
          borderRadius: '16px',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔕</div>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            هیچ اعلانی وجود ندارد
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '10px' }}>
            برو کیف پول رو شار کن تا اعلان دریافت کنی! 💰
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => !notification.read && markAsRead(notification.id)}
              style={{
                padding: '20px',
                background: notification.read ? 'var(--surface)' : 'var(--background)',
                borderRadius: '12px',
                border: notification.read ? '1px solid var(--border)' : '2px solid var(--primary-color)',
                cursor: notification.read ? 'default' : 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                boxShadow: notification.read ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.15)'
              }}
              onMouseEnter={(e) => {
                if (!notification.read) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.2)'
                }
              }}
              onMouseLeave={(e) => {
                if (!notification.read) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)'
                }
              }}
            >
              {/* Badge جدید و خوانده نشده */}
              {!notification.read && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                }}>
                  جدید
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', alignItems: 'start' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: notification.type === 'success' ? '#d1fae5' : '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  {notification.type === 'success' ? '💰' : 'ℹ️'}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    marginBottom: '5px',
                    color: notification.read ? 'var(--text-secondary)' : 'var(--text-primary)'
                  }}>
                    {notification.title}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px'
                  }}>
                    {notification.message}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    🕐 {notification.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}