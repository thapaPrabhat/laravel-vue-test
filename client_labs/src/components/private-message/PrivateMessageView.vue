<script>
  import {mapState} from 'vuex'
  import PrivateMessageSidebar from './PrivateMessageSidebar'

  export default {
    computed: {
      ...mapState({
        pmStore: state => state.privateMessageStore
      })
    },
    created () {
      this.$store.dispatch('getPrivateMessageById', this.$route.params.id)
    },
    components: {
      'private-message-sidebar': PrivateMessageSidebar
    },
    destroy () {
      this.$store.dispatch('clearMessageView')
    }
  }
</script>
<template>
    <div class="PrivateMessage PrivateMessage-View">
        <section class="header">
            <h1 class="page-title">Private Messages - View <small>My private messages.</small></h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-md-2 col-sm-2 col-with-right-border">
                    <private-message-sidebar></private-message-sidebar>
                </div>

                <div class="col-sm-8">
                    <h3> {{ pmStore.messages.subject }} </h3>
                    <p> {{ pmStore.messages.sender.email }} <span class="pull-right"> {{ pmStore.messages.created_at }} </span></p>
                    <p> {{ pmStore.messages.message }} </p>
                </div>
            </div>
        </section>

    </div>
</template>
