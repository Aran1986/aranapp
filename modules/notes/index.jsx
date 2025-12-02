// E:\projects\aranapp\modules\utils\calculator\index.jsx
import { useState } from 'react'
import EventBus from '../../EventBus'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previous, setPrevious] = useState('')
  const [operation, setOperation] = useState('')
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPrevious('')
    setOperation('')
    setWaitingForNewValue(false)
  }

  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previous === '') {
      setPrevious(display)
    } else if (operation) {
      const currentValue = parseFloat(previous)
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPrevious(String(newValue))
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '×': return firstValue * secondValue
      case '÷': return firstValue / secondValue
      case '%': return firstValue % secondValue
      default: return secondValue
    }
  }

  const performEquals = () => {
    const inputValue = parseFloat(display)

    if (previous && operation) {
      const currentValue = parseFloat(previous)
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPrevious('')
      setOperation('')
      setWaitingForNewValue(true)

      EventBus.emit('calculator:result', {
        expression: `${currentValue} ${operation} ${inputValue} = ${newValue}`,
        result: newValue
      })
    }
  }

  return (
    <div style={{
      padding: '30px',
      maxWidth: '420px',
      margin: '0 auto',
      fontFamily: 'Vazirmatn, sans-serif'
    }}>
      {/* عنوان */}
      <div style={{
        textAlign: 'center',
        marginBottom: '24px',
        color: '#e0e0ff'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #00d4ff, #ff2eff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ماشین حساب هوشمند
        </h2>
        <small style={{ color: '#888', fontSize: '14px' }}>
          آران‌اپ — دقیق، سریع، زیبا
        </small>
      </div>

      {/* نمایشگر */}
      <div style={{
        background: '#1a1a2e',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: 'inset 0 8px 20px rgba(0,0,0,0.4)',
        border: '1px solid #383850'
      }}>
        <div style={{
          textAlign: 'left',
          fontSize: '16px',
          color: '#888',
          marginBottom: '8px'
        }}>
          {previous && `${previous} ${operation}`}
        </div>
        <div style={{
          textAlign: 'right',
          fontSize: '42px',
          fontWeight: '600',
          color: 'white',
          wordBreak: 'break-all'
        }}>
          {display}
        </div>
      </div>

      {/* دکمه‌ها */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '14px'
      }}>
        <button onClick={clear} style={btnStyle('danger')}>
          C
        </button>
        <button onClick={deleteLast} style={btnStyle('warning')}>
          ⌫
        </button>
        <button onClick={() => performOperation('%')} style={btnStyle('operator')}>
          %
        </button>
        <button onClick={() => performOperation('÷')} style={btnStyle('operator')}>
          ÷
        </button>

        <button onClick={() => inputNumber(7)} style={btnStyle('number')}>7</button>
        <button onClick={() => inputNumber(8)} style={btnStyle('number')}>8</button>
        <button onClick={() => inputNumber(9)} style={btnStyle('number')}>9</button>
        <button onClick={() => performOperation('×')} style={btnStyle('operator')}>
          ×
        </button>

        <button onClick={() => inputNumber(4)} style={btnStyle('number')}>4</button>
        <button onClick={() => inputNumber(5)} style={btnStyle('number')}>5</button>
        <button onClick={() => inputNumber(6)} style={btnStyle('number')}>6</button>
        <button onClick={() => performOperation('-')} style={btnStyle('operator')}>
          −
        </button>

        <button onClick={() => inputNumber(1)} style={btnStyle('number')}>1</button>
        <button onClick={() => inputNumber(2)} style={btnStyle('number')}>2</button>
        <button onClick={() => inputNumber(3)} style={btnStyle('number')}>3</button>
        <button onClick={() => performOperation('+')} style={btnStyle('operator')}>
          +
        </button>

        <button onClick={() => inputNumber(0)} style={btnStyle('number', 'span2')}>
          0
        </button>
        <button onClick={inputDot} style={btnStyle('number')}>.</button>
        <button onClick={performEquals} style={btnStyle('equals')}>
          =
        </button>
      </div>
    </div>
  )

  // استایل‌های دکمه
  function btnStyle(type, extra = '') {
    const base = {
      height: '68px',
      borderRadius: '18px',
      border: 'none',
      fontSize: '24px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }

    if (type === 'number') {
      return { ...base, background: '#2a2a3a', color: 'white', gridColumn: extra }
    }
    if (type === 'operator') {
      return { ...base, background: '#ff9500', color: 'white' }
    }
    if (type === 'equals') {
      return { ...base, background: '#00d4ff', color: 'black', fontWeight: 'bold' }
    }
    if (type === 'danger') {
      return { ...base, background: '#ff3b30', color: 'white' }
    }
    if (type === 'warning') {
      return { ...base, background: '#ffcc00', color: 'black' }
    }
  }
}