<template>
  <div class="column is-one-third">
    <!-- <router-link :to="'/meetups' + meetup._id" class="card large"> -->
    <router-link :to="{ name: 'PageMeetupDetail', params: { id: meetup._id } }" class="card large">
      <div class="card-image">
        <figure class="image is-4by3">
            <!-- get here meetup image -->
            <img :src="meetup.image" alt="Image">
        </figure>
      </div>
      <div class="card-content">
        <div class="level m-b-md">
          <div class="media-left">
            <div class="level-item has-text-centered">
              <div>
                <!-- get here startDate -->
                <p class="title">{{ meetup.startDate | formatDate('MMM') }}</p>
                <p class="title">{{ meetup.startDate | formatDate('D') }}</p>
              </div>
            </div>
          </div>
          <div class="media-content">
            <!-- meetup title -->
              <p class="title is-4 no-padding is-marginless">{{ meetup.title }}</p>
                <!-- meetup category -->
              <span class="tag is-success">{{ meetup.category.name }}</span>
              <!-- location -->
              <p class="subtitle is-7">{{ meetup.location }}</p>
          </div>
        </div>
        <!-- dsecription -->
        <div class="content">
            {{ meetup.description }}
            <div class="background-icon"><span class="icon-barcode"></span></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MeetupItem',
  props: {
    meetup: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>


