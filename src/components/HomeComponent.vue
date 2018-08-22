<template>
  <div class="home">
    <router-link to="/play"><h1 class="mnuItem">Play</h1></router-link>
    <router-link to="/practice"><h2 class="mnuItem">Practice</h2></router-link>
    <router-link to="/customize"><h3 class="mnuItem">Your Redirector</h3></router-link>
    <router-link to="/profile"><h3 class="mnuItem">Profile</h3></router-link>
    <h4 class="mnuItem" @click="close">Exit Game</h4>
  </div>
</template>

<script>
const remote = require('electron').remote

export default{
  name: 'HomeComponent',
  data(){
      return {
        w: remote.getCurrentWindow(),
    }
  },
  methods: {
      close() {
        this.w.close()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  text-decoration: none !important;

}
.mnuItem{
  color: rgba(50, 50, 100, .9) !important;
  padding-left: 0rem;
  text-shadow: 0px 0px .2rem #fff;
  transition-timing-function: ease;
  -webkit-transition-timing-function: ease;
  -webkit-transition: padding-left 1s; /* Safari */
  transition: padding-left 1s;
  font-weight: bold;
}
.mnuItem:hover {
    padding-left: 5rem;
    text-shadow:  0px 0px .2rem #fff, 0px 0px 1rem #fff;
}
.home{
  margin-left: 1.5rem;
}
h1{
  font-size: 5rem;
}
h2{
  font-size: 3rem;
}
</style>
