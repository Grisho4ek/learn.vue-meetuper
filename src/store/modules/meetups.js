import axios from 'axios'
import axiosInstance from '@/services/axios'
import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchMeetups ({state, commit}) {
      commit('setItems', {resource: 'meetups', items: []}, {root: true})
      return axios.get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data
          commit('setItems', {resource: 'meetups', items: meetups}, {root: true})
          return state.items
        })
    },
    fetchMeetupById ({state, commit}, meetupId) {
      commit('setItem', {resource: 'meetups', item: {}}, {root: true})
      return axios.get(`/api/v1/meetups/${meetupId}`)
        .then(res => {
          const meetup = res.data
          commit('setItem', {resource: 'meetups', item: meetup}, {root: true})
          return state.item
        })
    },
    createMeetup ({rootState}, meetupToCreate) {
      meetupToCreate.meetupCreator = rootState.auth.user
      meetupToCreate.processedLocation = meetupToCreate.location.toLowerCase().replace(/[\s,]+/g,'').trim()

      return axiosInstance.post('/api/v1/meetups', meetupToCreate)
        .then(res => res.data)
    },
    joinMeetup({ state, rootState, commit, dispatch}, meetupId) {
      const user = rootState.auth.user

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/join`)
              .then(() => {
                dispatch('auth/addMeetuptoAuthUser', meetupId, {root: true})

                const joinedPeople = state.item.joinedPeople
                commit('updateUserMeetup', [...joinedPeople, user])
                return true
              })
    },
    leaveMeetup({state, rootState, dispatch, commit}, meetupId){
      const user = rootState.auth.user

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/leave`)
              .then(() => {
                dispatch('auth/removeMeetupFromAuthUser', meetupId, {root: true})

                let joinedPeople = state.item.joinedPeople                
                joinedPeople = joinedPeople.filter(el => el._id !== user._id)
                commit('updateUserMeetup', joinedPeople)
              })
      
    }
  },
  mutations: {
    updateUserMeetup(state, joinedPeople) {
      Vue.set(state.item, 'joinedPeople', joinedPeople)
    }
  }
}
