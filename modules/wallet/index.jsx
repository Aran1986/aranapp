import { useState, useEffect } from 'react'
import EventBus from '../../EventBus'

export default function Wallet() {
  const [balance, setBalance] = useState(() => {
    const saved = sessionStorage.getItem('wallet-balance')
    return saved ? parseFloat(saved) : 1000
  })
  const [amount, setAmount] = useState('')
  const [history, setHistory] = useState(() => {
    const saved = sessionStorage.getItem('wallet-history')
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'شار', amount: 1000, date: new Date().toLocaleString('fa-IR') }
    ]
  })

  useEffect(() => {
    sessionStorage.setItem('wallet-balance', balance.toString())
    sessionStorage.setItem('wallet-history', JSON.stringify(history))
  }, [balance, history])

  const handleAddMoney = () => {
    const value = parseFloat(amount)
    if (value && value > 0) {
      const newBalance = balance + value
      setBalance(newBalance)
      
      const newHistory = {
        id: Date.now(),
        type: 'شار',
        amount: value,
        date: new Date().toLocaleString('fa-IR')
      }
      setHistory([newHistory, ...history])
      
      console.log('💰 Wallet: شار انجام شد - emit میکنم')
      const eventData = {
        oldBalance: balance,
        newBalance: newBalance,
        amount: value,
        type: 'charge'
      }
      console.log('📤 داده ارسالی:', eventData)
      
      EventBus.emit('wallet:balance-changed', eventData)
      
      setAmount('')
    }
  }

  const handleWithdraw = () => {
    const value = parseFloat(amount)
    if (value && value > 0 && value <= balance) {
      const newBalance = balance - value
      setBalance(newBalance)
      
      const newHistory = {
        id: Date.now(),
        type: 'برداشت',
        amount: -value,
        date: new Date().toLocaleString('fa-IR')
      }
      setHistory([newHistory, ...history])
      
      console.log('💸 Wallet: برداشت انجام شد - emit میکنم')
      const eventData = {
        oldBalance: balance,
        newBalance: newBalance,
        amount: -value,
        type: 'withdraw'
      }
      console.log('📤 داده ارسالی:', eventData)
      
      EventBus.emit('wallet:balance-changed', eventData)
      
      setAmount('')
    }
  }

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '40px',
        color: 'white',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '10px' }}>
          موجودی کیف پول
        </div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
          ${balance.toLocaleString()}
        </div>
        <div style={{ fontSize: '13px', opacity: 0.8 }}>
          💰 دلار آمریکا (USD)
        </div>
      </div>

      <div style={{
        background: 'var(--background)',
        borderRadius: '16px',
        padding: '25px',
        border: '1px solid var(--border)',
        marginBottom: '25px'
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'var(--text-primary)' }}>
          💸 تراکنش جدید
        </h3>
        
        <input
          type="number"
          placeholder="مبلغ را وارد کنید..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '12px',
            border: '2px solid var(--border)',
            fontSize: '16px',
            marginBottom: '15px',
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'var(--surface)',
            color: 'var(--text-primary)'
          }}
        />

        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={handleAddMoney}
            disabled={!amount || parseFloat(amount) <= 0}
            style={{
              flex: 1,
              padding: '15px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: !amount || parseFloat(amount) <= 0 ? 'not-allowed' : 'pointer',
              opacity: !amount || parseFloat(amount) <= 0 ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            ➕ شار کیف پول
          </button>

          <button
            onClick={handleWithdraw}
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
            style={{
              flex: 1,
              padding: '15px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance) ? 'not-allowed' : 'pointer',
              opacity: (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance) ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            ➖ برداشت
          </button>
        </div>
      </div>

      <div style={{
        background: 'var(--background)',
        borderRadius: '16px',
        padding: '25px',
        border: '1px solid var(--border)'
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'var(--text-primary)' }}>
          📋 تاریخچه تراکنشها
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {history.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                background: 'var(--surface)',
                borderRadius: '12px',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: item.amount > 0 ? '#d1fae5' : '#fee2e2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {item.amount > 0 ? '🔥' : '🔤'}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--text-primary)' }}>
                    {item.type}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {item.date}
                  </div>
                </div>
              </div>
              <div style={{
                fontWeight: 'bold',
                fontSize: '16px',
                color: item.amount > 0 ? '#10b981' : '#ef4444'
              }}>
                {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()} $
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}