import Vue from 'vue';
import Router from 'vue-router';

import store from './store.js';

// views
import Login from './views/login/login.view.vue';
import Register from './views/register/register.view.vue';
import FirstTime from './views/first-time/first-time.view.vue';
import Talent from './views/talent/talent.view.vue';
import Company from './views/company/company.view.vue';

// Company's views
import CompanyProfile from './views/company/company-profile/company-profile.view.vue';
import CompanyAbout from './views/company/company-profile/about/company-about.view.vue';
import CompanyInfo from './views/company/company-profile/company/company-info.view.vue';
import CompanyContacts from './views/company/company-profile/contacts/company-contacts.view.vue';
import CompanyPersonal from './views/company/company-profile/personal/company-personal.view.vue';
import TechStack from './views/company/company-profile/tech-stack/company-tech-stack.view.vue';

// Talent's views
import TalentProfile from './views/talent/talent-profile/talent-profile.view.vue';
import GeneralForm from './views/talent/talent-profile/general/talent-general.view.vue';
import SkillsForm from './views/talent/talent-profile/skills/talent-skills.view.vue';
import TalentAbout from './views/talent/talent-profile/about/talent-about.view.vue';

Vue.use(Router);

const router = new Router({
   routes: [
      {
         path: '/_=_' // workaround - fb redirect
      },
      {
         path: '/',
         beforeEnter: (to, from, next) => {
            if (store.state.Role === 'talent') {
               next('/talent');
            } else if (store.state.Role === 'company') {
               next('/company');
            }
         }
      },
      {
         path: '/login',
         name: 'login',
         beforeEnter: (to, from, next) => {
            if (store.state.IsAuthorized) {
               next('./');
            } else {
               next();
            }
         },
         component: Login
      },
      {
         path: '/register',
         name: 'register',
         component: Register
      },
      {
         path: '/first-time',
         name: 'first-time',
         component: FirstTime,
         beforeEnter: (to, from, next) => {
            if (store.state.Role) {
               next('./');
            } else {
               next();
            }
         }
      },
      {
         path: '/talent',
         component: Talent,
         redirect: '/talent/profile',
         beforeEnter: (to, from, next) => {
            if (store.state.Role === 'talent') {
               next();
            } else {
               next('./');
            }
         },
         children: [
            {
               path: 'profile',
               name: 'talent-profile',
               component: TalentProfile,
               children: [
                  {
                     path: 'about',
                     component: TalentAbout
                  },
                  {
                     path: 'skills',
                     component: SkillsForm
                  },
                  {
                     path: 'general',
                     component: GeneralForm
                  }
               ]
            }
         ]
      },
      {
         path: '/company',
         component: Company,
         beforeEnter: (to, from, next) => {
            if (store.state.Role === 'company') {
               next();
            } else {
               next('./');
            }
         },
         redirect: '/company/profile',
         children: [
            {
               path: 'profile',
               name: 'company-profile',
               component: CompanyProfile,
               children: [
                  {
                     path: 'about',
                     component: CompanyAbout
                  },
                  {
                     path: 'tech-stack',
                     component: TechStack
                  },
                  {
                     path: 'contacts',
                     component: CompanyContacts
                  },
                  {
                     path: 'personal',
                     component: CompanyPersonal
                  },
                  {
                     path: 'company',
                     component: CompanyInfo
                  }
               ]
            }
         ]
      }
   ]
});

router.beforeEach((to, from, next) => {
   if (store.state.IsAuthorized) {
      if (store.state.Role === null && to.path !== '/first-time') {
         next('/first-time');
      } else {
         next();
      }
   } else if (to.path === '/_=_') {
      store.dispatch('checkAccess')
         .then(() => next('./'))
         .catch(() => next('./'));
   } else if (to.path !== '/login' && to.path !== '/register') {
      store.dispatch('checkAccess')
         .then(() => {
            if (store.state.IsAuthorized) {
               next();
            } else {
               next('./login');
            }
         })
         .catch(() => next('./login'));
   } else {
      next();
   }
});

export default router;
