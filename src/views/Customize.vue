<template>
  <div>
    <CustomizeUi/>
    <CustomizeComponent class="title"></CustomizeComponent>
  </div>
</template>

<script>
// @ is an alias to /src
import CustomizeComponent from '@/components/CustomizeComponent.vue'
import CustomizeUi from '@/components/CustomizeUi.vue'

export default {
  name: 'Play',
  components: {
    CustomizeComponent,
    CustomizeUi,
  }
}
</script>

<style scoped>
.title{
  position: absolute;
  z-index: -1;
  top: 0;
}
</style>
