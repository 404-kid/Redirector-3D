<template>
  <div class="home d-flex flex-column">
    <div class="chatOutput">
      <div class="message" v-for="(msg, index) in messages" :key="index">
        <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
      </div>
    </div>
    <form  @submit.prevent="sendMessage" class="chatInput mt-auto">
      <input @keyup.enter="submit" type="text" placeholder="Chat" v-model="message"/>
    </form>

  </div>
</template>

<script>

export default{
  name: 'ChatComponent',
  computed:{
    socket(){
      return this.$store.state.socket
    }
  },
  data(){
      return {
        user: 'Test',
        message: '',
        messages: [],
    }
  },
  methods: {
    sendMessage(e) {
        e.preventDefault()

        this.socket.emit('SEND_MESSAGE', {
            user: this.user,
            message: this.message
        })
        this.message = ''
    }
  },
  mounted() {
      this.socket.on('MESSAGE', (data) => {
          this.messages.push(data)
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
    margin: 0rem;
}
.chatOutput{
  margin: 0rem;
  overflow: auto;
  word-wrap: break-word;
}
input{
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: 0px solid red;
  padding: 0px;
  color: white;
}
.home{
  margin-left: 1.5rem;
  width: 22rem;
  background-color: rgba(0, 0, 0, 0);
  height: 11rem;
  margin-bottom: 1rem;
  border-radius: 3px;
  -webkit-transition: background-color .5s; /* Safari */
  transition: background-color .5s;
}
.home:hover{
  background-color: rgba(0, 0, 0, 0.45);
}
.home:active{
  background-color: rgba(0, 0, 0, 0.45);
}
h1{
  font-size: 5rem;
}
h2{
  font-size: 3rem;
}
</style>
