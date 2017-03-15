<script>
  import {mapState} from 'vuex'
  import Pusher from 'pusher-js'
  export default {
    created () {
      this.pusher = new Pusher('ab311b2d858131028218', {
        encrypted: true,
        cluster: 'MT1'
      })
      let that = this
      this.channel = this.pusher.subscribe('chat_channel')
      this.channel.bind('chat_saved', function (data) {
        that.$emit('incoming_chat', data)
      })
      this.$on('incoming_chat', function (chatMessage) {
        this.incomingChat(chatMessage)
      })
    },
    computed: {
      ...mapState({
        chatStore: state => state.chatStore,
        userStore: state => state.userStore
      })
    },
    data () {
      return {
        message: null,
        pusher: null,
        channel: null
      }
    },
    methods: {
      handleAddChat () {
        if (this.message != null) {
          let postData = {
            'receiver_id': this.chatStore.currentChatUser.id,
            'chat': this.message
          }
          this.$store.dispatch('addNewChatToConversation', postData)
              .then(response => {
                this.message = null
                let element = document.getElementById('chat-widget-wrapper')
                element.scrollIntoView(false)
              })
        }
      },

      incomingChat (chatMessage) {
        if (this.chatStore.currentChatUser.id === chatMessage.message.sender_id) {
          if (chatMessage.message.receiver.email === this.userStore.authUser.email) {
            this.$store.dispatch('newIncommingChat', chatMessage.message)
              .then(res => {
                let element = document.getElementById('chat-widget-wrapper')
                element.scrollIntoView(false)
              })
          }
        }
      }
    }
  }
</script>

<template>
    <div id="chat-add-widget" v-if="chatStore.currentChatUser != null">
        <form v-on:submit.prevent="handleAddChat()">
            <div class="form-group">
              <input
                    type="text"
                    class="form-control"
                    placeholder="Type your text"
                    v-model="message"
                  >
            </div>
        </form>
    </div>
</template>
<style lang="scss">
    #chat-add-widget {
      position: fixed;
      bottom: 0;
      width: 80%;
    }
</style>
