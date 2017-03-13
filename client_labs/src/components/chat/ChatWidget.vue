<script>
    import {mapState} from 'vuex'
    export default {
      computed: {
        ...mapState({
          chatStore: state => state.chatStore
        })
      }
    }
</script>

<template>
    <div id="chat-widget-wrapper">
        <div class="conversation" v-for = "chat in chatStore.conversation">

            <div class="sender-data clearfix">
                <div class="name">
                    {{ chat.sender.name}} <span class="time">{{ chat.sender.created_at}}</span>
                </div>
            </div>

            <div class="chat-body">
                {{ chat.chat }}
            </div>
        </div>
    </div>
</template>

<style lang="sass">
    .name
      font-weight: 600
    .time
      font-size: 80%
      font-weight: 500
</style>
