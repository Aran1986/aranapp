import { useGlobal } from './GlobalState'
import { useState, useEffect } from 'react'
import { getModulesBySidebar, getModuleStatus, loadModule } from './moduleLoader'

export default function Sidebar2() {
  const { addTab, activeAccordion, openAccordion } = useGlobal()
  const isOpen = activeAccordion === 'sidebar2'
  const isAnyRightOpen = ['sidebar1', 'sidebar2', 'sidebar3'].includes(activeAccordion)

  const [modules, setModules] = useState([])
  const [loadedModules, setLoadedModules] = useState({})

  useEffect(() => {
    const sidebarModules = getModulesBySidebar('sidebar2')
    const modulesWithStatus = sidebarModules.map(m => ({
      ...m,
      status: getModuleStatus(m.id)
    }))
    setModules(modulesWithStatus)
  }, [])

  const handleModuleClick = async (module) => {
    if (module.status === 'ready') {
      if (!loadedModules[module.id]) {
        const ModuleComponent = await loadModule(module.id)
        if (ModuleComponent) {
          setLoadedModules(prev => ({
            ...prev,
            [module.id]: ModuleComponent
          }))
          
          addTab({ 
            id: module.id,
            title: module.name,
            icon: module.icon,
            active: true,
            component: ModuleComponent
          })
        }
      } else {
        addTab({ 
          id: module.id,
          title: module.name,
          icon: module.icon,
          active: true,
          component: loadedModules[module.id]
        })
      }
      openAccordion(null)
    } else if (module.status === 'not-installed') {
      alert(`ماول ${module.name} هنوز نصب نشده است`)
    }
  }

  return (
    <>
      <div
        onClick={() => openAccordion('sidebar2')}
        style={{
          position: 'fixed',
          right: isAnyRightOpen ? '220px' : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '35px',
          height: '70px',
          background: isOpen ? 'rgba(118, 75, 162, 0.95)' : 'rgba(118, 75, 162, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px 0 0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'right 0.3s ease, background 0.3s ease',
          writingMode: 'vertical-rl',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          boxShadow: isOpen ? '0 4px 12px rgba(118, 75, 162, 0.5)' : 'none'
        }}
      >
        ابزار
      </div>

      <div style={{
        position: 'fixed',
        right: isOpen ? 0 : '-220px',
        top: 'var(--header-height)',
        bottom: 'var(--footer-height)',
        width: '220px',
        background: 'var(--surface)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid var(--border)',
        zIndex: 99,
        padding: '10px',
        overflowY: 'auto',
        transition: 'right 0.3s ease'
      }}>
        {modules.map(module => {
          return (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module)}
              disabled={module.status !== 'ready'}
              style={{
                width: '100%',
                padding: '8px 12px',
                marginBottom: '6px',
                background: module.status === 'ready' ? 'var(--background)' : 'var(--surface)',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'var(--transition)',
                fontSize: '12px',
                textAlign: 'right',
                cursor: module.status === 'ready' ? 'pointer' : 'not-allowed',
                opacity: module.status === 'ready' ? 1 : 0.5,
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                if (module.status === 'ready') {
                  e.currentTarget.style.transform = 'translateX(-3px)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                  e.currentTarget.style.background = 'var(--primary-color)'
                  e.currentTarget.style.color = 'white'
                }
              }}
              onMouseLeave={(e) => {
                if (module.status === 'ready') {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'var(--background)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }
              }}
            >
              <span style={{ 
                fontSize: '18px', 
                filter: module.status === 'ready' ? 'none' : 'grayscale(1)',
                opacity: module.status === 'ready' ? 1 : 0.3
              }}>
                {module.icon}
              </span>
              <span style={{ flex: 1 }}>{module.name}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}