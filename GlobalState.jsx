import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [activeTabs, setActiveTabs] = useState([])
  const [activeAccordion, setActiveAccordion] = useState(null)

  const addTab = (tab) => {
    if (!activeTabs.find(t => t.id === tab.id)) {
      setActiveTabs([...activeTabs, tab])
    }
  }

  const removeTab = (tabId) => {
    setActiveTabs(activeTabs.filter(t => t.id !== tabId))
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