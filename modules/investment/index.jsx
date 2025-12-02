// E:\projects\aranapp\modules\financial\investment\index.jsx
import { useState, useEffect } from 'react'
import EventBus from '../../EventBus'

export default function Investment() {
  const [message, setMessage] = useState('در حال بارگذاری...')

  useEffect(() => {
    // ارسال ایونت برای تست
    EventBus.emit('investment:loaded', {
      module: 'investment',
      status: 'ready',
      timestamp: new Date().toISOString()
    })

    // پیام نهایی
    setMessage('من گروک هستم برای چک رو! 🚀')
  }, [])

  return (
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Vazirmatn, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        borderRadius: '30px',
        padding: '60px 40px',
        color: 'white',
        boxShadow: '0 20px 50px rgba(139, 92, 246, 0.4)',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '900',
          marginBottom: '20px',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          {message}
        </h1>
        <p style={{ fontSize: '22px', opacity: 0.95 }}>
          ماژول سرمایه‌گذاری با موفقیت لود شد
        </p>
      </div>

      <div style={{
        background: '#1f2937',
        borderRadius: '24px',
        padding: '32px',
        color: '#e0e0ff',
        border: '1px solid #374151'
      }}>
        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
          این ماژول فقط برای تست لود شدن بود.<br />
          ساختار دقیقاً مثل والت و ماشین حساب است:<br />
          ✅ EventBus دارد<br />
          ✅ useEffect دارد<br />
          ✅ کاملاً سازگار با ماژول لودر تو
        </p>
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#10b981',
          color: 'white',
          borderRadius: '16px',
          fontWeight: 'bold'
        }}>
          وضعیت: کاملاً فعال و آماده ✅
        </div>
      </div>
    </div>
  )
}