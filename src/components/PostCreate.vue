<template>
  <form class="post-create">
    <div class="field">
        <textarea v-model="text"
                  class="textarea textarea-post"
                  placeholder="Write a post"
                  rows="1"></textarea>
        <button @click.prevent="createPost"
                :disabled="!text"
                class="button is-primary m-t-sm">Send</button>   
    </div>
  </form>
</template>

<script>
  import autoExpand from '@/directives/autoExpand'
  export default {
    name: 'PostCreate',
    directives: {autoExpand},
    props: {
      threadId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        text: null
      }
    },
    computed: {
      meetup() {
        return this.$store.state.meetups.item
      }
    },
    methods: {
      createPost() {
        this.$store.dispatch('threads/sendPost', {text: this.text, threadId: this.threadId})
              .then((createdPost) => { 
          this.$socket.emit('meetup/postSaved',
           {...createdPost, meetup: this.meetup._id}
          )
          this.text = ''
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .textarea-post {
    padding-bottom: 30px;
  }

  .post-create {
    margin-bottom: 15px;
  }

  textarea {
    overflow: hidden;
  }
</style>


