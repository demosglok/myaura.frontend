export default {
   name: 'TalentAboutForm',
   // eslint-disable-next-line
   data: function() {
      return {
         about: {}
      };
   },
   // eslint-disable-next-line
   computed: function(){
      return { };
   },
   methods: {
      // eslint-disable-next-line
      autofillFb: function() {
         this.$store.dispatch('authFb');
      }
   },
   created() {
      this.about = this.$store.getters.about;
   }
};
