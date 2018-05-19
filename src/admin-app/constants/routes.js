import {
  ADMIN_APP,
  ADMIN_APP_CATEGORIES,
  ADMIN_APP_PAGES,
  ADMIN_APP_PICTURES,
  ADMIN_APP_VIDEOS,
  ADMIN_APP_USERS,
  ADMIN_APP_ANALYTICS,
  ADMIN_APP_SETTINGS,
  ADMIN_APP_DATA_SETTINGS
} from './paths'

const ROUTES = [
  {
    key: 0,
    tilte: 'Home',
    iconSource: 'store',
    name: 'مركز التحكم',
    link: ADMIN_APP,
    active: true,
    component: ADMIN_APP
  },
  {
    key: 1,
    tilte: 'Categories',
    iconSource: 'columns',
    name: 'إدارة الأقسام',
    link: ADMIN_APP_CATEGORIES,
    active: true,
    component: ADMIN_APP_CATEGORIES
  },
  {
    key: 2,
    tilte: '',
    iconSource: 'newspaper',
    name: 'إداؤة الصغحات',
    link: ADMIN_APP_PAGES,
    active: true,
    component: ADMIN_APP_PAGES
  },
  {
    key: 3,
    tilte: '',
    iconSource: 'image',
    name: 'مكتبة الصور',
    link: ADMIN_APP_PICTURES,
    active: true,
    component: ADMIN_APP_PICTURES
  },
  {
    key: 4,
    tilte: '',
    iconSource: 'video',
    name: 'مكتبة الفديو',
    link: ADMIN_APP_VIDEOS,
    active: true,
    component: ADMIN_APP_VIDEOS
  },
  {
    key: 5,
    tilte: '',
    iconSource: 'cogs',
    name: 'إعدادات الموقع',
    link: ADMIN_APP_SETTINGS,
    active: true,
    component: ADMIN_APP_SETTINGS
  },
  {
    key: 6,
    tilte: '',
    iconSource: 'users',
    name: 'المستخدمين',
    link: ADMIN_APP_USERS,
    active: true,
    component: ADMIN_APP_USERS
  },
  {
    key: 7,
    tilte: 'chart-area',
    iconSource: 'database',
    name: 'تحليل البيانات',
    link: ADMIN_APP_ANALYTICS,
    active: true,
    component: ADMIN_APP_ANALYTICS
  },
  {
    key: 8,
    tilte: '',
    iconSource: 'database',
    name: 'إدارة البيانات',
    link: ADMIN_APP_DATA_SETTINGS,
    active: true,
    component: ADMIN_APP_DATA_SETTINGS
  }
]

export default ROUTES
