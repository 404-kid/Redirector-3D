<template>
  <div class="home d-flex flex-column">
    <div class="chatOutput">

    </div>
    <div class="chatInput mt-auto">
      <input type="text" placeholder="Chat"/>
    </div>

  </div>
</template>

<script>

export default{
  name: 'ChatComponent',
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
