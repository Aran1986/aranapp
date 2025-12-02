/**
 * Module Loader - سیستم مرکزی مدیریت ماولها
 * 
 * 🔴 هر وقت ماول جدید ساختی اسمش رو به INSTALLED_MODULES اضافه کن
 */

const INSTALLED_MODULES = [
  'wallet',
  'notifications', 
  'calculator',
  'investment'
]

export const MODULE_REGISTRY = {
  // ==================== هدر اصلی ====================
  profile: {
    id: 'profile',
    name: 'پروفایل',
    icon: '👤',
    category: 'core',
    sidebar: 'header-main',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  settings: {
    id: 'settings',
    name: 'تنظیمات',
    icon: '⚙️',
    category: 'core',
    sidebar: 'header-main',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  notifications: {
    id: 'notifications',
    name: 'اعلانها',
    icon: '🔔',
    category: 'core',
    sidebar: 'header-main',
    apiKey: '',
    dependencies: [],
    events: {
      emit: ['notification:shown'],
      listen: ['wallet:balance-changed', 'payment:completed']
    }
  },
  'video-call': {
    id: 'video-call',
    name: 'تماس ویدئویی',
    icon: '📹',
    category: 'core',
    sidebar: 'header-main',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  'quick-chat': {
    id: 'quick-chat',
    name: 'چت سریع',
    icon: '💬',
    category: 'core',
    sidebar: 'header-main',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  language: {
    id: 'language',
    name: 'تغییر زبان',
    icon: '🌐',
    category: 'core',
    sidebar: 'header-main',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  bookmarks: {
    id: 'bookmarks',
    name: 'نشانکها',
    icon: '⭐',
    category: 'core',
    sidebar: 'header-main',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },

  // ==================== هدر فرعی: ابزار کاری ====================
  'code-editor': {
    id: 'code-editor',
    name: 'ویرایشگر کد',
    icon: '💻',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  terminal: {
    id: 'terminal',
    name: 'ترمینال',
    icon: '⌨️',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  'api-tester': {
    id: 'api-tester',
    name: 'تست API',
    icon: '🔌',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  database: {
    id: 'database',
    name: 'دیتابیس',
    icon: '🗄️',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  git: {
    id: 'git',
    name: 'گیت',
    icon: '🔀',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  word: {
    id: 'word',
    name: 'ورد',
    icon: '📄',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  excel: {
    id: 'excel',
    name: 'اکسل',
    icon: '📊',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  powerpoint: {
    id: 'powerpoint',
    name: 'پاورپوینت',
    icon: '📽️',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  'pdf-editor': {
    id: 'pdf-editor',
    name: 'ویرایشگر PDF',
    icon: '📕',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  designer: {
    id: 'designer',
    name: 'طراحی گرافیک',
    icon: '🎨',
    category: 'work-tools',
    sidebar: 'header-secondary',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },

  // ==================== سایدبار 1: مالی ====================
  wallet: {
    id: 'wallet',
    name: 'کیف پول',
    icon: '💰',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: [],
    events: {
      emit: ['wallet:balance-changed', 'wallet:payment-completed'],
      listen: []
    }
  },
  exchange: {
    id: 'exchange',
    name: 'صرافی',
    icon: '💱',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['exchange:trade-completed'],
      listen: ['wallet:balance-changed']
    }
  },
  payment: {
    id: 'payment',
    name: 'پرداخت',
    icon: '💳',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['payment:request', 'payment:completed'],
      listen: ['wallet:balance-changed']
    }
  },
  investment: {
    id: 'investment',
    name: 'سرمایهگذاری',
    icon: '📈',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['investment:order-placed'],
      listen: ['wallet:balance-changed']
    }
  },
  budget: {
    id: 'budget',
    name: 'بودجه',
    icon: '💵',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['budget:alert'],
      listen: ['payment:completed']
    }
  },
  insurance: {
    id: 'insurance',
    name: 'بیمه',
    icon: '🛡️',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['insurance:claim'],
      listen: []
    }
  },
  loan: {
    id: 'loan',
    name: 'وام',
    icon: '🏦',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['loan:approved'],
      listen: []
    }
  },
  crowdfunding: {
    id: 'crowdfunding',
    name: 'سرمایهجمعی',
    icon: '🤝',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['crowdfunding:campaign-created'],
      listen: []
    }
  },
  staking: {
    id: 'staking',
    name: 'استیکینگ',
    icon: '⛏️',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['staking:rewards'],
      listen: []
    }
  },
  tax: {
    id: 'tax',
    name: 'مالیات',
    icon: '📋',
    category: 'financial',
    sidebar: 'sidebar1',
    apiKey: '',
    dependencies: ['wallet'],
    events: {
      emit: ['tax:report-generated'],
      listen: []
    }
  },

  // ==================== سایدبار 2: ابزار ====================
  calculator: {
    id: 'calculator',
    name: 'ماشینحساب',
    icon: '🔢',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  calendar: {
    id: 'calendar',
    name: 'تقویم',
    icon: '📅',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  notes: {
    id: 'notes',
    name: 'یادداشت',
    icon: '📝',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  chart: {
    id: 'chart',
    name: 'نمودار',
    icon: '📊',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  converter: {
    id: 'converter',
    name: 'تبدیل واحد',
    icon: '🔄',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  timer: {
    id: 'timer',
    name: 'زمانسنج',
    icon: '⏱️',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  scanner: {
    id: 'scanner',
    name: 'اسکنر',
    icon: '📷',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  qr: {
    id: 'qr',
    name: 'QR کد',
    icon: '⚡',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  weather: {
    id: 'weather',
    name: 'آبوهوا',
    icon: '🌤️',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  maps: {
    id: 'maps',
    name: 'نقشه',
    icon: '🗺️',
    category: 'tools',
    sidebar: 'sidebar2',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },

  // ==================== سایدبار 3: خرید ====================
  market: {
    id: 'market',
    name: 'فروشگاه',
    icon: '🛒',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  'food-delivery': {
    id: 'food-delivery',
    name: 'سفارش غذا',
    icon: '🍔',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  hotel: {
    id: 'hotel',
    name: 'رزرو هتل',
    icon: '🏨',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  flight: {
    id: 'flight',
    name: 'بلیط پرواز',
    icon: '✈️',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  ticket: {
    id: 'ticket',
    name: 'بلیط رویداد',
    icon: '🎫',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  grocery: {
    id: 'grocery',
    name: 'خرید مواد غذایی',
    icon: '🛍️',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  fashion: {
    id: 'fashion',
    name: 'مد و پوشاک',
    icon: '👔',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  electronics: {
    id: 'electronics',
    name: 'لوازم الکترونیک',
    icon: '📱',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  furniture: {
    id: 'furniture',
    name: 'مبلمان',
    icon: '🛋️',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  auction: {
    id: 'auction',
    name: 'حراج',
    icon: '🔨',
    category: 'shopping',
    sidebar: 'sidebar3',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },

  // ==================== سایدبار 4: شخصیسازی ====================
  'personal-wallet': {
    id: 'personal-wallet',
    name: 'کیف پول شخصی',
    icon: '💰',
    category: 'personal',
    sidebar: 'sidebar4',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  'personal-calculator': {
    id: 'personal-calculator',
    name: 'ماشینحساب شخصی',
    icon: '🔢',
    category: 'personal',
    sidebar: 'sidebar4',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  'personal-health': {
    id: 'personal-health',
    name: 'سلامت شخصی',
    icon: '🏥',
    category: 'personal',
    sidebar: 'sidebar4',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  'personal-games': {
    id: 'personal-games',
    name: 'بازیهای شخصی',
    icon: '🎮',
    category: 'personal',
    sidebar: 'sidebar4',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },

  // ==================== سایدبار 5: سلامت ====================
  health: {
    id: 'health',
    name: 'سلامت',
    icon: '🏥',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  fitness: {
    id: 'fitness',
    name: 'تناسب اندام',
    icon: '💪',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  nutrition: {
    id: 'nutrition',
    name: 'تغذیه',
    icon: '🥗',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  pharmacy: {
    id: 'pharmacy',
    name: 'داروخانه',
    icon: '💊',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  meditation: {
    id: 'meditation',
    name: 'مدیتیشن',
    icon: '🧘',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  mental: {
    id: 'mental',
    name: 'سلامت روان',
    icon: '🧠',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  beauty: {
    id: 'beauty',
    name: 'زیبایی',
    icon: '💄',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  skincare: {
    id: 'skincare',
    name: 'مراقبت پوست',
    icon: '🧴',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  doctor: {
    id: 'doctor',
    name: 'پزشک',
    icon: '👨⚕️',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  lab: {
    id: 'lab',
    name: 'آزمایشگاه',
    icon: '🔬',
    category: 'health',
    sidebar: 'sidebar5',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },

  // ==================== سایدبار 6: سرگرمی ====================
  games: {
    id: 'games',
    name: 'بازی',
    icon: '🎮',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  movies: {
    id: 'movies',
    name: 'فیلم',
    icon: '🎬',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  music: {
    id: 'music',
    name: 'موسیقی',
    icon: '🎵',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  books: {
    id: 'books',
    name: 'کتاب',
    icon: '📚',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  events: {
    id: 'events',
    name: 'رویداد',
    icon: '🎪',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: ['wallet'],
    events: { emit: [], listen: [] }
  },
  podcast: {
    id: 'podcast',
    name: 'پادکست',
    icon: '🎙️',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  sports: {
    id: 'sports',
    name: 'ورزش',
    icon: '⚽',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  streaming: {
    id: 'streaming',
    name: 'پخش زنده',
    icon: '📺',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  social: {
    id: 'social',
    name: 'شبکه اجتماعی',
    icon: '👥',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  },
  news: {
    id: 'news',
    name: 'اخبار',
    icon: '📰',
    category: 'entertainment',
    sidebar: 'sidebar6',
    apiKey: '',
    dependencies: [],
    events: { emit: [], listen: [] }
  }
}

export function isModuleInstalled(moduleId) {
  return INSTALLED_MODULES.includes(moduleId)
}

export async function loadModule(moduleId) {
  try {
    const module = await import(`./modules/${moduleId}/index.jsx`)
    return module.default
  } catch (error) {
    console.error(`خطا در بارگذاری ماول ${moduleId}:`, error)
    return null
  }
}

export function getModuleStatus(moduleId) {
  const module = MODULE_REGISTRY[moduleId]
  if (!module) return 'unknown'
  
  const installed = isModuleInstalled(moduleId)
  if (!installed) return 'not-installed'
  
  const missingDeps = module.dependencies.filter(dep => !isModuleInstalled(dep))
  if (missingDeps.length > 0) return 'missing-dependencies'
  
  return 'ready'
}

export function getModulesBySidebar(sidebarId) {
  return Object.values(MODULE_REGISTRY).filter(m => m.sidebar === sidebarId)
}

export function getInstalledModulesCount() {
  return INSTALLED_MODULES.length
}

export function getTotalModulesCount() {
  return Object.keys(MODULE_REGISTRY).length
}