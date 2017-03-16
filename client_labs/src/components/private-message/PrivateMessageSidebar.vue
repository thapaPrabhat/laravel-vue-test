<script>
  export default {
  }
</script>

<template>
    <ul class="nav nav-pills nav-stacked PrivateMessage-Sidebar">
        <li><router-link :to="{name: 'new-pm'}">New Message</router-link></li>
        <li><router-link :to="{name: 'inbox-pms'}">Inbox</router-link></li>
        <li><router-link :to="{name: 'my-sent-pms'}">Sent</router-link></li>
    </ul>
</template>
