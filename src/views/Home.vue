<template>
  <div>
    <TitleScreenBackground class="title"></TitleScreenBackground>
    <HomeComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'
import TitleScreenBackground from '@/components/TitleScreenBackground.vue'

export default {
  name: 'home',
  components: {
    HomeComponent,
    TitleScreenBackground,
  }
}
</script>

<style scoped>
.title{
  position: absolute;
  z-index: -1;
  top: 0px;
}
</style>
