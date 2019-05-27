import axiosInstancs from '@/services/axios'

export default {
  namespaced: true,
  state:{
    meetups: {
      data: [],
      count: null
    },
    threads: {
      data: [],
      count: null
    },
    posts: {
      data: [],
      count: null
    }
  },
  actions: {
    fetchUserStats({ commit }) {
      return axiosInstancs.get('/api/v1/users/me/activity')
              .then(res => {
                const stats = res.data
                commit('setStats', stats)
                return stats
              })
              .catch(errors => errors)
    }
  },
  mutations: {
    setStats(state, stats) {
      return Object.assign(state, {}, stats)
    }
  }
}