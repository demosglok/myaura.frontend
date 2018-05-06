export default {
   name: 'SkillsForm',
   // eslint-disable-next-line
   data: function() {
      return { };
   },
   // eslint-disable-next-line
   computed: function(){
      return {
         skills: this.$store.getters.skills
      };
   },
   methods: {
      // eslint-disable-next-line
      autofillLinkedin: function() {
         this.$store.dispatch('authLinkedin');
      },
      // eslint-disable-next-line
      autofillGithub: function() {
         this.$store.dispatch('authGithub');
      }
   }
};
