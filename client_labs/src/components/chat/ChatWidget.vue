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

<style lang="scss">
    @import './../../assets/css/variables.scss';
    .conversation {
        border-bottom: 1px solid $border-color;
        padding-bottom: 5px;
        margin-bottom: 10px;
    .sender-data .name {
        float: left;
        font-weight: bold;
        font-size: 1.1em;
    }
    .sender-data .time {
        font-size: 0.8em;
        float: left;
        margin-left: 10px;
        line-height: 21px;
    }
    &:last-child {
         border-bottom: none;
         padding-bottom: 6em;
     }
    }
</style>
