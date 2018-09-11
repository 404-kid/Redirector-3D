<template>
  <div class="title">
    <div class="card">
      <router-link to="/play"><h1 class="mnuItem">Play</h1></router-link>
    </div>
  </div>
</template>

<script>

export default{
  name: 'PracticeMenuComponent',
  data(){
      return {

    }
  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  background-color: "white";
  width: 10rem;
  height: 30rem;
}
</style>
