<template>
  <div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>

export default{
  name: 'CustomizeComponent',
  data(){
      return {
        mouse:{
          startY:0,
          currentY:0,
          activated: false,
        },
        rotate:0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let self = this
      let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('three'), antialias: true})
      renderer.setClearColor(0x2B3E50)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      let camera = new THREE.PerspectiveCamera(35,window.innerWidth / window.innerHeight, 1, 15000)
      let scene = new THREE.Scene()
      let light = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(light)
      let light1 = new THREE.PointLight(0xffffff, 0.5)
      scene.add(light1)
      let geometry = new THREE.CubeGeometry(150,350,150)
      let material = new THREE.MeshLambertMaterial()
      let mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(150, -100, -1000)
      scene.add(mesh)

      document.onmousemove = function(event) {
        self.mouse.currentY = event.clientY
        if (self.mouse.activated === true) {
          if (self.mouse.startY > self.mouse.currentY) {
            self.rotate = -((self.mouse.startY - self.mouse.currentY)/10)
          }else if (self.mouse.startY < self.mouse.currentY) {
            self.rotate = ((self.mouse.startY - self.mouse.currentY)/10)
          }
        }
      }

      document.onmousedown = function(event) {
        self.mouse.activated = true
        self.mouse.startY = event.clientY
      }
      document.onmouseup = function(event) {
        self.mouse.activated = false
      }

      requestAnimationFrame(render)
      function render() {
        mesh.rotation.y = self.rotate
        renderer.render(scene,camera)
        requestAnimationFrame(render)
      }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
