export default {
   name: 'TalentMenu',
   data: function() {
      return {
         user: {}
      };
   },
   created() {
      this.$store.dispatch('initTalentProfile')
         .then(() => {
            this.user = this.$store.getters.user;
         });
   }
};
