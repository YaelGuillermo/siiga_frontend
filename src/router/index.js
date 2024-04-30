import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/pages/HomeView.vue';
import AboutView from '../views/pages/AboutView.vue';
import LogIn from '../views/auth/LogIn.vue';
import SignUp from '../views/auth/SignUp.vue';
import RecoverPassword from '../views/auth/RecoverPassword.vue';
import ChildrenShow from '../views/modelStudent/ChildrenShow.vue';
import ChildrenCreate from '../views/modelStudent/ChildrenCreate.vue';
import ChildrenUpdate from '../views/modelStudent/ChildrenUpdate.vue';
import ParentUpdate from '../views/modelUser/ParentUpdate.vue';
import StudentCreate from '../views/modelStudent/StudentCreate.vue';
import StudentUpdate from '../views/modelStudent/StudentUpdate.vue';
import StudentSearch from '../views/modelStudent/StudentSearch.vue';
import StudentDelete from '../views/modelStudent/StudentDelete.vue';
import UserCreate from '../views/modelUser/UserCreate.vue';
import UserUpdate from '../views/modelUser/UserUpdate.vue';
import UserSearch from '../views/modelUser/UserSearch.vue';
import UserDelete from '../views/modelUser/UserDelete.vue';
import PaymentCreate from '../views/modelPayment/PaymentCreate.vue';
import PaymentUpdate from '../views/modelPayment/PaymentUpdate.vue';
import PaymentSearch from '../views/modelPayment/PaymentSearch.vue';
import PaymentDelete from '../views/modelPayment/PaymentDelete.vue';
import StudentActiveShow from '../views/modelStudent/StudentActiveShow.vue';
import StudentInactiveShow from '../views/modelStudent/StudentInactiveShow.vue';
import AdministratorShow from '../views/modelUser/AdministratorShow.vue';
import ParentShow from '../views/modelUser/ParentShow.vue';
import PaymentShow from '../views/modelPayment/PaymentShow.vue';
import PageNotFound from '@/views/pages/PageNotFound.vue';
import AdminMain from '@/views/modelSeparator/AdminMain.vue';
import ParentMain from '@/views/modelSeparator/ParentMain.vue';

const routes = [
  { path: '/error404', component: PageNotFound },
  { path: '/:catchAll(.*)', redirect: '/error404' },
  { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: false } },
  { path: '/about', name: 'about', component: AboutView, meta: { requiresAuth: false } },
  { path: '/', alias: '/login', name: 'login', component: LogIn, meta: { requiresAuth: false } },
  { path: '/signup', name: 'signup', component: SignUp, meta: { requiresAuth: false } },
  { path: '/recoverPassword', name: 'recoverPassword', component: RecoverPassword, meta: { requiresAuth: false } },
  { 
    path: '/admin', 
    component: AdminMain, 
    children: [
      { path: 'registerStudent', name: 'studentCreate', component: StudentCreate, meta: { requiresAuth: true, admin: true } },
      { path: 'modifyStudent/:id', name: 'studentEdit', component: StudentUpdate, meta: { requiresAuth: true, admin: true } },
      { path: 'quitStudent/:id', name: 'studentDelete', component: StudentDelete, meta: { requiresAuth: true, admin: true } },
      { path: 'detailStudent/:id', name: 'studentView', component: StudentSearch, meta: { requiresAuth: true, admin: true } },
      { path: 'registerUser', name: 'userCreate', component: UserCreate, meta: { requiresAuth: true, admin: true } },
      { path: 'modifyUser/:id', name: 'userEdit', component: UserUpdate, meta: { requiresAuth: true, admin: true } },
      { path: 'quitUser/:id', name: 'userDelete', component: UserDelete, meta: { requiresAuth: true, admin: true } },
      { path: 'detailPayment/:id', name: 'paymentView', component: PaymentSearch, meta: { requiresAuth: true, admin: true } },
      { path: 'registerPayment', name: 'paymentCreate', component: PaymentCreate, meta: { requiresAuth: true, admin: true } },
      { path: 'modifyPayment/:id', name: 'paymentEdit', component: PaymentUpdate, meta: { requiresAuth: true, admin: true } },
      { path: 'quitPayment/:id', name: 'paymentDelete', component: PaymentDelete, meta: { requiresAuth: true, admin: true } },
      { path: 'detailUser/:id', name: 'userView', component: UserSearch, meta: { requiresAuth: true, admin: true } },
      { path: 'listStudentActive', name: 'studentActiveShow', component: StudentActiveShow, meta: { requiresAuth: true, admin: true } },
      { path: 'listStudentInactive', name: 'studentInactiveShow', component: StudentInactiveShow, meta: { requiresAuth: true, admin: true } },
      { path: 'listAdministrator', name: 'administratorShow', component: AdministratorShow, meta: { requiresAuth: true, admin: true } },
      { path: 'listParent', name: 'parentShow', component: ParentShow, meta: { requiresAuth: true, admin: true } },
      { path: 'listPayment', name: 'paymentShow', component: PaymentShow, meta: { requiresAuth: true, admin: true } }
    ]
  },
  {
    path: '/parent', component: ParentMain,
    children: [
      { path: 'modifyParent/:id', name: 'parentEdit', component: ParentUpdate, meta: { requiresAuth: true, parent: true } },
      { path: 'listChildren', name: 'childrenShow', component: ChildrenShow, meta: { requiresAuth: true, parent: true } },
      { path: 'registerChildren', name: 'childrenCreate', component: ChildrenCreate, meta: { requiresAuth: true, parent: true } },
      { path: 'modifyChildren/:id', name: 'childrenEdit', component: ChildrenUpdate, meta: { requiresAuth: true, parent: true } },      
    ]
  }  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  if (to.meta.requiresAuth && !user) {
    next({ name: 'login' });
  } else if (to.meta.admin && user && user.role !== 'A') {
    next({ name: 'error404' });
  } else if (to.meta.parent && user && user.role !== 'P') {
    next({ name: 'error404' });
  } else {
    next();
  }
});

export default router;

/*
import { createRouter, createWebHistory } from 'vue-router';
// VIEWS
import HomeView from '../views/pages/HomeView.vue';
import AboutView from '../views/pages/AboutView.vue'; 
// AUTHENTIFICATION
import LogIn from '../views/auth/LogIn.vue';
import SignUp from '../views/auth/SignUp.vue'; 
import RecoverPassword from '../views/auth/RecoverPassword.vue';
// PARENT'S AND CHILDREN'S OPERATION
import ChildrenShow from '../views/modelStudent/ChildrenShow.vue';
import ChildrenCreate from '../views/modelStudent/ChildrenCreate.vue';
import ChildrenUpdate from '../views/modelStudent/ChildrenUpdate.vue';
import ParentUpdate from '../views/modelUser/ParentUpdate.vue';
// STUDENT'S OPERATION
import StudentCreate from '../views/modelStudent/StudentCreate.vue';
import StudentUpdate from '../views/modelStudent/StudentUpdate.vue';
import StudentSearch from '../views/modelStudent/StudentSearch.vue';
import StudentDelete from '../views/modelStudent/StudentDelete.vue';
// USER'S OPERATION
import UserCreate from '../views/modelUser/UserCreate.vue';
import UserUpdate from '../views/modelUser/UserUpdate.vue';
import UserSearch from '../views/modelUser/UserSearch.vue';
import UserDelete from '../views/modelUser/UserDelete.vue';
// PAYMENT'S OPERATION
import PaymentCreate from '../views/modelPayment/PaymentCreate.vue';
import PaymentUpdate from '../views/modelPayment/PaymentUpdate.vue';
import PaymentSearch from '../views/modelPayment/PaymentSearch.vue';
import PaymentDelete from '../views/modelPayment/PaymentDelete.vue';
// IMPORTANT VIEWS
import StudentActiveShow from '../views/modelStudent/StudentActiveShow.vue';
import StudentInactiveShow from '../views/modelStudent/StudentInactiveShow.vue';
import AdministratorShow from '../views/modelUser/AdministratorShow.vue';
import ParentShow from '../views/modelUser/ParentShow.vue';
import PaymentShow from '../views/modelPayment/PaymentShow.vue';
// ERROR 404
import PageNotFound from '@/views/pages/PageNotFound.vue';
// MAIN SEPARATOR
import AdminMain from '@/views/modelSeparator/AdminMain.vue';
import ParentMain from '@/views/modelSeparator/ParentMain.vue';

const routes = [
  { path: '/error404', component: PageNotFound },
  { path: '/:catchAll(.*)', redirect: '/error404' },
  {
    path: '/admin',
    name: 'admin',
    component: AdminMain,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/parent',
    name: 'parent',
    component: ParentMain,
    meta: { requiresAuth: true, parent: true }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'login',
    component: LogIn,
    meta: { requiresAuth: false, admin: false, parent: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: { requiresAuth: false, admin: false, parent: false }
  },
  {
    path: '/recoverPassword',
    name: 'recoverPassword',
    component: RecoverPassword,
    meta: { requiresAuth: false, admin: false, parent: false }
  },
  {
    path: '/listChildren',
    name: 'childrenShow',
    component: ChildrenShow,
    meta: { requiresAuth: true, parent: true }
  },
  {
    path: '/registerChildren',
    name: 'childrenCreate',
    component: ChildrenCreate,
    meta: { requiresAuth: true, parent: true }
  },
  {
    path: '/modifyChildren/:id',
    name: 'childrenEdit',
    component: ChildrenUpdate,
    meta: { requiresAuth: true, parent: true }
  },
  {
    path: '/modifyParent/:id',
    name: 'parentEdit',
    component: ParentUpdate,
    meta: { requiresAuth: true, parent: true }
  },
  {
    path: '/registerStudent',
    name: 'studentCreate',
    component: StudentCreate,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/modifyStudent/:id',
    name: 'studentEdit',
    component: StudentUpdate,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/quitStudent/:id',
    name: 'studentDelete',
    component: StudentDelete,
    meta: { requiresAuth: true, admin: true, parent: true }
  },
  {
    path: '/detailStudent/:id',
    name: 'studentView',
    component: StudentSearch,
    meta: { requiresAuth: true, admin: true, parent: true }
  },
  {
    path: '/registerUser',
    name: 'userCreate',
    component: UserCreate,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/modifyUser/:id',
    name: 'userEdit',
    component: UserUpdate,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/quitUser/:id',
    name: 'userDelete',
    component: UserDelete,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/detailPayment/:id',
    name: 'paymentView',
    component: PaymentSearch,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/registerPayment',
    name: 'paymentCreate',
    component: PaymentCreate,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/modifyPayment/:id',
    name: 'paymentEdit',
    component: PaymentUpdate,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/quitPayment/:id',
    name: 'paymentDelete',
    component: PaymentDelete,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/detailUser/:id',
    name: 'userView',
    component: UserSearch,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/listStudentActive',
    name: 'studentActiveShow',
    component: StudentActiveShow,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/listStudentInactive',
    name: 'studentInactiveShow',
    component: StudentInactiveShow,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/listAdministrator',
    name: 'administratorShow',
    component: AdministratorShow,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/listParent',
    name: 'parentShow',
    component: ParentShow,
    meta: { requiresAuth: true, admin: true }
  },
  {
    path: '/listPayment',
    name: 'paymentShow',
    component: PaymentShow,
    meta: { requiresAuth: true, admin: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {    
    next('/')
  } else {
    const user = JSON.parse(loggedIn)
    const isAdmin = user && user.role == 'A'
    const isParent = user && user.role == 'P'

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (isAdmin && to.meta.admin) {
        next()
      } else if (isParent && to.meta.parent) {
        next()
      } else {
        next('/')
      }
    } else {
      next()
    }
  }
})

export default router

*/