import { useState, useEffect } from 'react'
import { getInstalledModulesCount, getTotalModulesCount } from '../moduleLoader'

export default function ProgressTracker() {
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    checkProgress()
  }, [])

  const checkProgress = () => {
    try {
      const completedCount = getInstalledModulesCount()
      const totalCount = getTotalModulesCount()
      const percentage = Math.round((completedCount / totalCount) * 100)
      
      setCompleted(completedCount)
      setTotal(totalCount)
      setProgress(percentage)
    } catch (error) {
      console.error('خطا در بررسی پیشرفت:', error)
      setProgress(0)
      setCompleted(0)
      setTotal(0)
    }
  }

  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div 
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70px',
        height: '70px',
        marginLeft: '35px'
      }}
      title={`${completed} از ${total} ماول تکمیل شده`}
    >
      <svg width="70" height="70" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx="35"
          cy="35"
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="35"
          cy="35"
          r={radius}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))'
          }}
        />
      </svg>
      
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          lineHeight: '1'
        }}>
          {progress}%
        </span>
        <span style={{
          fontSize: '8px',
          color: 'rgba(255,255,255,0.8)',
          marginTop: '2px'
        }}>
          {completed}/{total}
        </span>
      </div>
    </div>
  )
}