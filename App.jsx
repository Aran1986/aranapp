import { useEffect } from 'react'
import { GlobalProvider, useGlobal } from './GlobalState'
import Header from './Header'
import Footer from './Footer'
import Sidebar1 from './Sidebar1'
import Sidebar2 from './Sidebar2'
import Sidebar3 from './Sidebar3'
import Sidebar4 from './Sidebar4'
import Sidebar5 from './Sidebar5'
import Sidebar6 from './Sidebar6'
import HeaderTab from './HeaderTab'
import FooterTab from './FooterTab'
import TabSystem from './TabSystem'
import MainContent from './MainContent'

function AppContent() {
  const { theme } = useGlobal()
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <HeaderTab />
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <TabSystem />
        <MainContent />
      </div>
      <Footer />
      <FooterTab />
      
      <Sidebar1 />
      <Sidebar2 />
      <Sidebar3 />
      <Sidebar4 />
      <Sidebar5 />
      <Sidebar6 />
    </div>
  )
}

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  )
}

export default App