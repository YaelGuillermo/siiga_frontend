import { createRouter, createWebHistory } from 'vue-router';
// VIEWS
import HomeView from '../views/pages/HomeView.vue';
import AboutView from '../views/pages/AboutView.vue'; 
// AUTHENTIFICATION
import LogIn from '../views/auth/LogIn.vue';
import SignUp from '../views/auth/SignUp.vue'; 
import RecoverPassword from '../views/auth/RecoverPassword.vue';
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

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/recoverPassword',
    name: 'recoverPassword',
    component: RecoverPassword
  },
  {
    path: '/registerStudent',
    name: 'studentCreate',
    component: StudentCreate
  },
  {
    path: '/modifyStudent/:id',
    name: 'studentEdit',
    component: StudentUpdate
  },
  {
    path: '/quitStudent/:id',
    name: 'studentDelete',
    component: StudentDelete
  },
  {
    path: '/detailStudent/:id',
    name: 'studentView',
    component: StudentSearch
  },
  {
    path: '/registerUser',
    name: 'userCreate',
    component: UserCreate
  },
  {
    path: '/modifyUser/:id',
    name: 'userEdit',
    component: UserUpdate
  },
  {
    path: '/quitUser/:id',
    name: 'userDelete',
    component: UserDelete
  },
  {
    path: '/detailPayment/:id',
    name: 'paymentView',
    component: PaymentSearch
  },
  {
    path: '/registerPayment',
    name: 'paymentCreate',
    component: PaymentCreate
  },
  {
    path: '/modifyPayment/:id',
    name: 'paymentEdit',
    component: PaymentUpdate
  },
  {
    path: '/quitPayment/:id',
    name: 'paymentDelete',
    component: PaymentDelete
  },
  {
    path: '/detailUser/:id',
    name: 'userView',
    component: UserSearch
  },
  {
    path: '/listStudentActive',
    name: 'studentActiveShow',
    component: StudentActiveShow
  },
  {
    path: '/listStudentInactive',
    name: 'studentInactiveShow',
    component: StudentInactiveShow
  },
  {
    path: '/listAdministrator',
    name: 'administratorShow',
    component: AdministratorShow
  },
  {
    path: '/listParent',
    name: 'parentShow',
    component: ParentShow
  },
  {
    path: '/listPayment',
    name: 'paymentShow',
    component: PaymentShow
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
