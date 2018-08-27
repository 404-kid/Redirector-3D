<template>
  <div >
    <canvas id="three"></canvas>
  </div>
</template>

<script>

export default{
  name: 'TitleScreenBackground',
  data(){
      return {
        forward: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let forward = self.forward
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

      let geometry = new THREE.CubeGeometry(200,100,100)
      let material = new THREE.MeshLambertMaterial()
      let mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0, 0, -1000)


      scene.add(mesh)

      requestAnimationFrame(render)

      function render() {
        mesh.rotation.y += 0.03
        renderer.render(scene,camera)
        requestAnimationFrame(render)
      }

    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
