<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">
      {{ currentStep}} of {{ allStepsCount}}
    </div>
    <!-- Form Steps -->
    <keep-alive>
      <component :is="currentComponent"
                 @stepUpdated="mergeStepData"
                 ref="currentComponent"
                 :meetupToCreate="form" />
    </keep-alive>
    <progress class="progress" :value="currentProgress" max="100">{{ currentProgress }} %</progress>
    <div class="controll-btns m-b-md">
      <button class="button is-primary m-r-sm" @click="moveToPreviousStep" v-if="currentStep !== 1">Back</button>
      <button class="button is-primary" @click="moveToNextStep"
                                        v-if="currentStep !== 4"
                                        :disabled="!canProceed">Next</button>
      <button class="button is-primary" v-if="currentStep === 4" @click="emitMeetupConfirm">Confirm</button>
      <!-- Confirm Data -->
      <!-- <button v-else
              class="button is-primary">Confirm</button> -->
    </div>
    <!-- Just To See Data in the Form -->
    <!-- <pre><code>{{form}}</code></pre> -->
  </div>
</template>

<script>
  import MeetupLocation from './MeetupLocation'
  import MeetupDetail from './MeetupDetail'
  import MeetupDescription from './MeetupDescription'
  import MeetupConfirmation from './MeetupConfirmation'
  export default {
    components: {
      MeetupLocation,
      MeetupDetail,
      MeetupDescription,
      MeetupConfirmation
    },
    data () {
      return {
        currentStep: 1,
        canProceed: false,
        formSteps: ['MeetupLocation', 'MeetupDetail' , 'MeetupDescription', 'MeetupConfirmation'],
        form: {
          location: null,
          title: null,
          startDate: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          timeTo: null,
          timeFrom: null
        }
      }
    },
    computed: {
      currentComponent() {
        return this.formSteps[this.currentStep - 1]
      },
      allStepsCount(){
        return this.formSteps.length
      },
      currentProgress() {
        return (100 / this.allStepsCount) * this.currentStep
      },
      categories() {
        return this.$store.state.categories.items
      },
    },
    created() {
      if(this.categories.length === 0) {
        this.$store.dispatch("categories/fetchCategories")
      }
    },
    methods: {
      emitMeetupConfirm(){
        this.$emit('meetupConfirmed', this.form)
      },
      mergeStepData(step) {
        this.form = {...this.form, ...step.data}
        this.canProceed = step.isValid
      },
      moveToNextStep(){
        this.currentStep++
        this.$nextTick(() => {
          this.canProceed = !this.$refs['currentComponent'].$v.$invalid
        })
      },
      moveToPreviousStep(){
        this.currentStep--
        this.canProceed = true
      }
    }
  }
</script>

<style scoped>
  .meetup-create-form {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 840px;
    padding: 24px 16px 8px;
    width: 100%;
  }
</style>