<template>
  <div>
    <GameComponent></GameComponent>
    <!-- <PracticeGameComponent></PracticeGameComponent> -->
  </div>
</template>

<script>
// @ is an alias to /src
import GameComponent from '@/components/GameComponent.vue'

export default {
  name: 'Play',
  components: {
    GameComponent
  }
}
</script>

<style scoped>
</style>
