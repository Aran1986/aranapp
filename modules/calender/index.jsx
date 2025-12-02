// E:\projects\aranapp\modules\calendar\index.jsx
import { useState, useEffect } from 'react'
import EventBus from '../../EventBus'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([
    { date: '1404/09/06', title: 'جلسه تیم', color: '#ef4444' },
    { date: '1404/09/08', title: 'تولد دوست', color: '#10b981' },
    { date: '1404/09/15', title: 'آخرین مهلت پروژه', color: '#f59e0b' }
  ])

  useEffect(() => {
    EventBus.emit('calendar:opened', {
      date: currentDate.toLocaleDateString('fa-IR'),
      eventsCount: events.length
    })
  }, [])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return new Date(year, month, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)

    const days = []
    const today = new Date()
    const todayStr = today.toLocaleDateString('fa-IR')

    // روزهای خالی قبل از روز اول
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // روزهای ماه
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}/${String(month + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`
      const dayEvents = events.filter(e => e.date === dateStr)
      const isToday = dateStr === todayStr

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${selectedDate.toLocaleDateString('fa-IR') === dateStr ? 'selected' : ''}`}
          onClick={() => setSelectedDate(new Date(year, month, day))}
        >
          <span className="day-number">{day}</span>
          {dayEvents.map((event, i) => (
            <div key={i} className="event-dot" style={{ backgroundColor: event.color }}></div>
          ))}
        </div>
      )
    }

    return days
  }

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1))
  }

  return (
    <div style={{
      padding: '30px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'Vazirmatn, sans-serif'
    }}>
      {/* عنوان */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          تقویم شمسی آران
        </h1>
        <p style={{ color: '#aaa', fontSize: '18px', marginTop: '8px' }}>
          امروز: {new Date().toLocaleDateString('fa-IR')} — {new Date().toLocaleTimeString('fa-IR')}
        </p>
      </div>

      {/* کنترل ماه */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '0 20px'
      }}>
        <button onClick={() => changeMonth(1)} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#00d4ff' }}>
          ←
        </button>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#e0e0ff' }}>
          {currentDate.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' })}
        </h2>
        <button onClick={() => changeMonth(-1)} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#00d4ff' }}>
          →
        </button>
      </div>

      {/* شبکه تقویم */}
      <div style={{
        background: '#1a1a2e',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '12px',
          textAlign: 'center',
          marginBottom: '16px',
          fontWeight: 'bold',
          color: '#888'
        }}>
          <div>شنبه</div>
          <div>یک‌شنبه</div>
          <div>دوشنبه</div>
          <div>سه‌شنبه</div>
          <div>چهارشنبه</div>
          <div>پنج‌شنبه</div>
          <div>جمعه</div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '12px'
        }}>
          {renderCalendar()}
        </div>
      </div>

      {/* استایل داخلی */}
      <style jsx>{`
        .calendar-day {
          height: 80px;
          background: #2a2a3a;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .calendar-day:hover {
          background: #3a3a4a;
          transform: translateY(-4px);
        }
        .today {
          background: #00d4ff !important;
          color: black !important;
          font-weight: bold;
        }
        .selected {
          border: 3px solid #ff2eff;
          box-shadow: 0 0 20px rgba(255,46,255,0.4);
        }
        .day-number {
          font-size: 18px;
          font-weight: 600;
        }
        .event-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 4px;
        }
        .empty {
          background: transparent !important;
        }
      `}</style>
    </div>
  )
}