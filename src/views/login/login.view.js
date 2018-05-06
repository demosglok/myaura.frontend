export default {
   name: 'login',
   data : {
      authUrls : {}
   },
   methods: {
      // eslint-disable-next-line
      loginFb: function() {
         this.$store.dispatch('authFb');
      },
      // eslint-disable-next-line
      loginLinkedin: function() {
         this.$store.dispatch('authLinkedin');
      }
   }
};
