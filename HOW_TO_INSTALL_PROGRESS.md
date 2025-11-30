# راهنمای نصب ProgressTracker در Header

## مرحله 1: وارد کردن ماول
در فایل Header.jsx این خط رو اضافه کن:

\\\javascript
import ProgressTracker from './ProgressTracker/ProgressTracker'
\\\

## مرحله 2: اضافه کردن به UI
داخل return در Header.jsx بعد از نام AranApp این کد رو اضافه کن:

\\\javascript
<ProgressTracker />
\\\

## مثال کامل Header.jsx:

\\\javascript
import { useGlobal } from './GlobalState'
import ProgressTracker from './ProgressTracker/ProgressTracker'

export default function Header() {
  const { theme, setTheme } = useGlobal()

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 30px',
      gap: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '1px'
      }}>
        🌐 AranApp
      </div>

      {/* اضافه کردن ProgressTracker اینجا */}
      <ProgressTracker />

      <div style={{ flex: 1 }} />

      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '20px',
          transition: 'var(--transition)',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
\\\

## نکته مهم:
فایل roadmaptocomplete.txt باید در پوشه public کپی بشه تا مرورگر بتونه بخونه:

\\\powershell
Copy-Item "E:\projects\aranapp\roadmaptocomplete.txt" -Destination "E:\projects\aranapp\public\" -Force
\\\

## حذف بعد از تکمیل:
وقتی 100 ماول تکمیل شد:
1. خط import رو از Header.jsx حذف کن
2. کامپوننت <ProgressTracker /> رو حذف کن
3. پوشه ProgressTracker رو حذف کن
4. فایل roadmaptocomplete.txt رو حذف کن