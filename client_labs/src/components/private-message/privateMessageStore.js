import Vue from 'vue'
import {getHeader, getUserPrivateMessages, getUserPrivateMessagesSent, getUserPrivateMessageById} from './../../config'

const state = {
  notifications: [],
  messagesRec: [],
  messagesSent: [],
  messages: {
    subject: '',
    message: '',
    sender: ''
  }
}

const mutations = {
  SET_MESSAGES_REC (state, messages) {
    state.messagesRec = messages
  },
  SET_MESSAGES_SENT (state, messages) {
    state.messagesSent = messages
  },
  SET_MESSAGES_VIEW (state, messages) {
    state.messages = messages
  },
  CLEAR_MESSAGES_VIEW (state) {
    state.message = {
      subject: '',
      message: '',
      sender: ''
    }
  }
}

const actions = {
  setUserMessagesRec: ({commit}) => {
    let postData = {}
    return Vue.http.post(getUserPrivateMessages, postData, {headers: getHeader()})
      .then(response => {
        Vue.$logger('info', 'setUserMessageRec response', response)
        commit('SET_MESSAGES_REC', response.body.data)
      })
  },
  setUserMessagesSent: ({commit}) => {
    let postData = {}
    return Vue.http.post(getUserPrivateMessagesSent, postData, {headers: getHeader()})
      .then(response => {
        Vue.$logger('info', 'setUserMessageSent response', response)
        commit('SET_MESSAGES_SENT', response.body.data)
      })
  },
  getPrivateMessageById: ({commit}, id) => {
    let postData = {'id': id}
    return Vue.http.post(getUserPrivateMessageById, postData, {headers: getHeader()})
      .then(response => {
        Vue.$logger('info', 'getUserPrivateMessageById response', response)
        commit('SET_MESSAGES_VIEW', response.body.data)
      })
  },
  clearMessageView: ({commit}) => {
    commit('CLEAR_MESSAGES_VIEW')
  }
}

export default {
  state, mutations, actions
}
