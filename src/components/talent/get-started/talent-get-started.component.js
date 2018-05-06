import GeneralForm from './../general-form/general-form.component.vue';
import SkillsForm from './../skills-form//skills-form.component.vue';
import TalentAboutForm from './../talent-about-form/talent-about-form.component.vue';

export default {
   name: 'TalentGetStarted',
   components : {
      'skills-form' : SkillsForm,
      'general-form' : GeneralForm,
      'about-form' : TalentAboutForm
   },
   data() {
      return {
         open: false,
         step : 0,
         stepData: [
            { title: '', footer : ''},
            {
               title: 'General Info',
               footer : 'Worth 25 Coins if  filled, 150 if filled with LinkedIn'
            },
            {
               title: 'Skill Set',
               footer : 'Worth 25 Coins if  filled, 150 if filled with LinkedIn or GitHub'
            },
            {
               title: 'Tell us something about yourself',
               footer : 'Worth 25 Coins if  filled, 150 if filled with Facebook or Chatbot'
            }
         ]
      };
   },
   methods: {
      showModal() {
         this.open = true;
         this.step = 1;
      },
      close() {
         this.open = false;
         this.step = 0;
      },
      next() {
         this.step += 1;
      },
      back() {
         this.step -= 1;
      },
      finish() {
         this.open = false;
         this.step = 0;
      },
      skip() {
         this.step += 1;
      }
   }
};
