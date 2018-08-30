import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io('localhost:3001'),
    user:{
      name:"test",
      // model:{
      //   head: "0",
      //   body: "0",
      //   arms: "0",
      //   legs: "0",
      //   feet: "0",
      //   color: "0",
      //   equipment:{
      //     main: "pistol",
      //     off: "blade",
      //     special: "blink"
      //   },
      // },
    },

  },
  mutations: {

  },
  actions: {

  }
})
