<template>
  <div class="home">
    <div class="mnuItem d-flex flex-row justify-content-between">
      <h3>Main Wepon</h3>
      <h2>1/1</h2>
    </div>
    <div class="mnuItem d-flex flex-row justify-content-between">
      <h3>Off Wepon</h3>
      <h2>1/1</h2>
    </div>
    <div class="mnuItem d-flex flex-row justify-content-between">
      <h3>Implant</h3>
      <h2>1/1</h2>
    </div>
    <div class="mnuItem d-flex flex-row justify-content-between">
      <h3>Color</h3>
      <h2>1/1</h2>
    </div>
  </div>
</template>

<script>

export default{
  name: 'CustomizeUi',
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
.mnuItem{
  border: 2px solid rgba(20, 20, 100, 0.7);
  margin-top: 1rem;
  background-color: rgba(100, 100, 150, 0.7);
  padding: .5rem;
  border-radius: 5px;
  width: 30rem;
}
.home{
  margin-left: 1.5rem;
}
h3{
    font-size: 2rem;
}
</style>
