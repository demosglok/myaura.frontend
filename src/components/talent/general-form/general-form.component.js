export default {
   name: 'GeneralForm',
   data: function() {
      return {
         info: { }
      };
   },
   computed: function() {
      return { };
   },
   methods: {
      autofillLinkedin: function() {
         this.$store.dispatch('authLinkedin');
      }
   },
   created() {
      this.info = this.$store.getters.general;
   }
};
