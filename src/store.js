import Vue from 'vue';
import Vuex from 'vuex';

import http from './http-interceptor';
import router from './router';

const authUrls = {
   fb : 'https://landing.myaura.io/auth/facebook',
   linkedin: 'https://landing.myaura.io/auth/linkedin',
   github: 'https://landing.myaura.io/auth/github'
};

Vue.use(Vuex);

const store = new Vuex.Store({
   state: {
      IsAuthorized: localStorage.getItem('authorized'),
      Role: localStorage.getItem('role'),
      profileData: {}
   },
   getters: {
      user(state) {
         return state.profileData.user;
      },
      skills(state) {
         return state.profileData.skills;
      },
      about(state) {
         return state.profileData.about;
      },
      general(state) {
         return state.profileData.general;
      }
   },
   mutations: {
      setAuthorized (state, authorized) {
         state.IsAuthorized = authorized;
         if (authorized) {
            state.IsAuthorized = authorized;
            localStorage.setItem('authorized', authorized);
         } else {
            state.IsAuthorized = null;
            localStorage.removeItem('authorized');
            router.go('./login');
         }
      },
      setRole (state, role) {
         state.Role = role ? role : '';
         if (role) {
            localStorage.setItem('role', role);
         } else {
            localStorage.removeItem('role');
         }
      },
      setProfileData(state, profileData) {
         state.profileData = profileData;
      }
   },
   actions : {
      checkAccess({commit}) {
         return http.get('user/jobRole')
            .then(response => {
               commit('setRole', response.job_role);
               commit('setAuthorized', true);
            });
      },
      chooseRole({commit}, role) {
         return http.post('user/jobRole', {jobRole: role})
            .then((response) => {
               if (response.success) {
                  commit('setRole', role);
               }
               return response;
            });
      },
      getTalentAbout() {
         return http.get('/talent/profile/about');
      },
      getTalentSkills() {
         return http.get('/talent/profile/skills');
      },
      getTalentInfo() {
         return http.get('/talent/profile/general');
      },
      initTalentProfile({commit}) {
         return http.get('/talent/profile')
            .then(response => {
               commit('setProfileData', response);
               return response;
            });
      },
      authLinkedin() {
         window.location.href = authUrls.linkedin;
      },
      authFb() {
         window.location.href = authUrls.fb;
      },
      authGithub() {
         window.location.href = authUrls.github;
      }
   }
});

export default store;
