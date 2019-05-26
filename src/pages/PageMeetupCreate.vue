<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirmed="createNewMeetup" />
      </div>
    </section>
  </div>
</template>

<script>
  import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard'
  export default {
    components: {
      MeetupCreateWizard
    },
    methods: {
    createNewMeetup(newMeetup) {

      this.$store.dispatch('meetups/createMeetup', newMeetup)
        .then((createdMeetup) => {
          this.$router.push(`/meetups/${createdMeetup._id}`)
        })
        .catch((errorMessage) => {
          this.$toasted.error(errorMessage, {duration: 5000})
        })
      }
    }
}
</script>

<style scoped lang="scss">
  .meetup-create-page {
    min-height: 100vh;
  }
</style>