import { useState } from 'react'

export default function Footer() {
  const [message, setMessage] = useState('')

  return (
    <footer style={{
      height: 'var(--footer-height)',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 15px',
      gap: '15px',
      fontSize: '12px'
    }}>
      {/* اطلاعات سیستم - سمت راست */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', minWidth: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
          <span>🕐</span>
          <span>{new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
          <span>📅</span>
          <span>{new Date().toLocaleDateString('fa-IR', { day: '2-digit', month: '2-digit' })}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981' }}>
          <span>🌐</span>
          <span>متصل</span>
        </div>
      </div>

      {/* چت باکس - وسط */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        background: 'var(--background)',
        borderRadius: '10px',
        padding: '6px 10px',
        border: '1px solid var(--border)',
        gap: '8px'
      }}>
        <button style={chatIconStyle} title="الصاق فایل">
          📎
        </button>
        <button style={chatIconStyle} title="الصاق تصویر">
          🖼️
        </button>
        <button style={chatIconStyle} title="ایموجی">
          😊
        </button>
        
        <input
          type="text"
          placeholder="پیام خود را بنویسید..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            fontSize: '12px',
            color: 'var(--text-primary)',
            direction: 'rtl'
          }}
        />

        <button style={chatIconStyle} title="ضبط صدا">
          🎤
        </button>
        <button style={{
          ...chatIconStyle,
          background: 'var(--primary-color)',
          color: 'white'
        }} title="ارسال">
          ➤
        </button>
      </div>

      {/* اطلاعات اضافی - سمت چپ */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', minWidth: '200px', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
          <span>🔋</span>
          <span>85%</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
          <span>💾</span>
          <span>12 GB</span>
        </div>
      </div>
    </footer>
  )
}

const chatIconStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '6px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease'
}