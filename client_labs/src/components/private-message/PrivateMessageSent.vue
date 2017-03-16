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
        this.$store.dispatch('setUserMessagesSent')
      },
      components: {
        'private-message-sidebar': PrivateMessageSidebar
      }
    }
</script>

<template>
    <div class="PrivateMessage PrivateMessage-Sent">
        <section class="header">
            <h1 class="page-title">Private Messages - Sent <small>My private messages.</small></h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-md-2 col-sm-2 col-with-right-border">
                    <private-message-sidebar></private-message-sidebar>
                </div>

                <div class="col-sm-8">
                    <table class="table table-striped table-hover table-bordered table-condensed message-table">
                        <tbody>
                        <tr>
                            <th>Sent to</th>
                            <th>Subject</th>
                            <th>Time ago</th>
                        </tr>
                        <tr v-for="message in pmStore.messagesSent">
                            <td class="col-sm-3">{{message.receiver.name}}</td>
                            <td class="col-sm-7">
                                <router-link :to="{name: 'pm-view', params: { pmId: message.id }}">{{message.subject}}</router-link>
                            </td>
                            <td class="col-sm-2">{{message.created_at}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    </div>
</template>
