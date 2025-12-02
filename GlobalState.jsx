import { createContext, useContext, useState, useEffect } from 'react'
import EventBus from './EventBus'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  const [activeTabs, setActiveTabs] = useState([
    { id: 'welcome', title: 'خوشآمدید', icon: '🏠', active: true, isWelcome: true }
  ])
  const [activeAccordion, setActiveAccordion] = useState(null)
  
  // 🔥 لود از localStorage
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('aranapp-notifications')
    return saved ? JSON.parse(saved) : []
  })
  const [unreadCount, setUnreadCount] = useState(() => {
    const saved = localStorage.getItem('aranapp-unread-count')
    return saved ? parseInt(saved) : 0
  })

  // ذخیره تم
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  // 🔥 ذخیره نوتیفها
  useEffect(() => {
    localStorage.setItem('aranapp-notifications', JSON.stringify(notifications))
    localStorage.setItem('aranapp-unread-count', unreadCount.toString())
  }, [notifications, unreadCount])

  useEffect(() => {
    console.log('🌍 GlobalState: شروع گوش دادن به wallet events')
    
    const unsubscribe = EventBus.on('wallet:balance-changed', (data) => {
      console.log('🎯 GlobalState دریافت کرد:', data)
      
      const newNotification = {
        id: Date.now(),
        title: data.type === 'charge' ? '✅ شار موفق' : '🔤 برداشت انجام شد',
        message: data.type === 'charge' 
          ? `کیف پول شما ${data.amount}$ شار شد`
          : `${Math.abs(data.amount)}$ از کیف پول شما برداشت شد`,
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        type: data.type === 'charge' ? 'success' : 'info',
        read: false,
        data: data
      }

      setNotifications(prev => [newNotification, ...prev])
      setUnreadCount(prev => prev + 1)

      if (Notification.permission === 'granted') {
        new Notification('AranApp - کیف پول', {
          body: newNotification.message,
          icon: '💰'
        })
      }
    })

    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }

    return () => unsubscribe()
  }, [])

  const addTab = (tab) => {
    const filteredTabs = activeTabs.filter(t => !t.isWelcome)
    
    if (!filteredTabs.find(t => t.id === tab.id)) {
      setActiveTabs([...filteredTabs.map(t => ({ ...t, active: false })), { ...tab, active: true }])
    } else {
      setActiveTabs(filteredTabs.map(t => ({ ...t, active: t.id === tab.id })))
    }
  }

  const removeTab = (tabId) => {
    const newTabs = activeTabs.filter(t => t.id !== tabId)
    if (newTabs.length === 0) {
      setActiveTabs([{ id: 'welcome', title: 'خوشآمدید', icon: '🏠', active: true, isWelcome: true }])
    } else {
      if (activeTabs.find(t => t.id === tabId)?.active) {
        newTabs[newTabs.length - 1].active = true
      }
      setActiveTabs(newTabs)
    }
  }

  const setCurrentTab = (tabId) => {
    setActiveTabs(activeTabs.map(t => ({ ...t, active: t.id === tabId })))
  }

  const openAccordion = (accordionId) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId)
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  const value = {
    user,
    setUser,
    theme,
    setTheme,
    activeTabs,
    addTab,
    removeTab,
    setCurrentTab,
    activeAccordion,
    openAccordion,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobal باید داخل GlobalProvider استفاده بشه')
  }
  return context
}