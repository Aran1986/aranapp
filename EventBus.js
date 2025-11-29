class EventBus {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
    
    return () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
    }
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data))
    }
  }

  off(eventName) {
    delete this.events[eventName]
  }
}

export default new EventBus()
