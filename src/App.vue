<template>
  <div class="d-flex flex-column align-items-start all">
    <div class="top d-flex flex-row justify-content-between align-items-center">
      <div class="title">
        <h1>Redirector</h1>
        <div class="d-flex flex-row justify-content-between">
          <p>version</p>
          <p>0.001</p>
        </div>
      </div>
      <router-link to="/profile"><h3>name here</h3></router-link>
    </div>
    <router-view/>
    <router-link to="/"><h6>home</h6></router-link>
    <ChatComponent class="mt-auto"></ChatComponent>
  </div>
</template>

<script type="text/javascript">
import ChatComponent from '@/components/ChatComponent.vue'

export default {
  name: 'app',
  components: {
    ChatComponent
  },
  data () {
    return {

    }
  }
}
</script>

<style>
.top{
  margin: 1.5rem;
  margin-bottom: 8rem;
  width: 97vw;
}
.all{
  height: 100vh
}
</style>
