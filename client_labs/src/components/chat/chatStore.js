import Vue from 'vue'
import {userListUrl, getHeader, getUserConversation, saveChatMessageUrl} from './../../config'

const state = {
  userList: {},
  currentChatUser: null,
  conversation: null
}

const mutations = {
  SET_USER_LIST (state, userList) {
    state.userList = userList
  },
  SET_CURRENT_CHAT_USER (state, user) {
    state.currentChatUser = user
  },
  SET_CONVERSATION (state, conversation) {
    state.conversation = conversation
  },
  ADD_CHAT_T0_CONVERSATION (state, chat) {
    state.conversation.push(chat)
  }
}

const actions = {
  setUserList: ({commit}, userList) => {
    return Vue.http.get(userListUrl, {headers: getHeader()})
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          commit('SET_USER_LIST', response.body.data)
          return response.body.data
        }
      })
  },
  setCurrentChatUser: ({commit}, user) => {
    let postData = {id: user.id}
    return Vue.http.post(getUserConversation, postData, {headers: getHeader()})
      .then(response => {
        console.log(response.body.data)
        if (response.status === 200) {
          commit('SET_CURRENT_CHAT_USER', user)
          commit('SET_CONVERSATION', response.body.data)
          // return response.body.data
        }
      })
  },
  addNewChatToConversation: ({commit}, postData) => {
    return Vue.http.post(saveChatMessageUrl, postData, {headers: getHeader()})
      .then(response => {
        // Vue.$logger('info', 'addNewChatToConversation response', response)
        commit('ADD_CHAT_T0_CONVERSATION', response.body.data)
      })
  },
  newIncommingChat: ({commit}, message) => {
    commit('ADD_CHAT_T0_CONVERSATION', message)
  }
}

export default {
  state, mutations, actions
}
