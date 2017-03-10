<script>
    import {mapState} from 'vuex'
    import {loginUrl, getHeader, userUrl} from './../config'
    import {clientId, clientSecret} from './../env'
    export default {
      computed: {
        ...mapState({
          userStore: state => state.userStore
        })
      },
      data () {
        return {
          login: {
            email: 'gorebro@gmail.com',
            passord: 'secret'
          }
        }
      },
      methods: {
        handleLoginFormSubmit () {
          const postData = {
            grant_type: 'password',
            client_id: clientId,
            client_secret: clientSecret,
            username: this.login.email,
            password: this.login.password,
            scope: ''
          }
          const authUser = {}
          this.$http.post(loginUrl, postData)
             .then(response => {
               if (response.status === 200) {
                 console.log('OAUTH token', response)
                 authUser.access_token = response.data.access_token
                 authUser.refresh_token = response.data.refresh_token
                 window.localStorage.setItem('authUser', JSON.stringify(authUser))
                 this.$http.get(userUrl, {headers: getHeader()})
                   .then(response => {
                     console.log('user object', response)
                     authUser.email = response.body.email
                     authUser.name = response.body.name
                     window.localStorage.setItem('authUser', JSON.stringify(authUser))
                     this.$store.dispatch('setUserObject', authUser)
                     this.$router.push({name: 'dashboard'})
                   })
               }
             })
        }
      }
    }
</script>
<template>
    <div class="wrapper" id="login-wrapper">
        <div class="login">
            <div class="row">
                <div class="col-md-6 col-md-push-3">
                    <div class="panel panel-default">
                        <div class="panel-heading"><strong>Login</strong></div>
                        <div class="panel-body">
                            <form v-on:submit.prevent="handleLoginFormSubmit()">
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input type="text" class="form-control" placeholder="Enter email address"
                                           v-model="login.email">
                                </div>

                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" placeholder="Your Password Here"
                                           v-model="login.password">
                                </div>

                                <button class="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass">
    #login-wrapper
      margin-top: 50px
</style>
