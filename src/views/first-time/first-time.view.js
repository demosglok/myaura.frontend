export default {
   name: 'first-time',
   methods: {
      chooseRole(role) {
         this.$store.dispatch('chooseRole', role)
            .then((response) => {
               if (response.success) {
                  this.$router.push('./');
               }
            });
      }
   }
};
