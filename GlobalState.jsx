import { createContext, useContext, useState, useEffect } from 'react'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [activeTabs, setActiveTabs] = useState([
    { id: 'welcome', title: 'خوشآمدید', icon: '🏠', active: true, isWelcome: true }
  ])
  const [activeAccordion, setActiveAccordion] = useState(null)

  const addTab = (tab) => {
    // حذف تب خوشآمدگویی وقتی اولین ماول باز میشه
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
    openAccordion
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