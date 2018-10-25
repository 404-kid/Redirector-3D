<template>
  <div >
    <div id="blocker">
      <div id="instructions">
      </div>
    </div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>

export default{
  name: 'GameComponent',
  data(){
      return {
        player: {},
        walls:[],
        celings: [],
        floors: [],
        objects: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const self = this
      THREE.PointerLockControls = function ( camera ) {

			let scope = this

			camera.rotation.set( 0, 0, 0 )

			let pitchObject = new THREE.Object3D()
			pitchObject.add( camera )

			let yawObject = new THREE.Object3D()
			yawObject.position.y = 10
			yawObject.add( pitchObject )

			let PI_2 = Math.PI / 2

			let onMouseMove = function ( event ) {

				if ( scope.enabled === false ) return

				let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
				let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0

				yawObject.rotation.y -= movementX * 0.0004
				pitchObject.rotation.x -= movementY * 0.0004

				pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) )

			}

			this.dispose = function () {

				document.removeEventListener( 'mousemove', onMouseMove, false )

			};

			document.addEventListener( 'mousemove', onMouseMove, false )

			this.enabled = false

			this.getObject = function () {

				return yawObject

			};

			this.getDirection = function () {

				// assumes the camera itself is not rotated

				let direction = new THREE.Vector3( 0, 0, - 1 );
				let rotation = new THREE.Euler( 0, 0, 0, 'YXZ' );

				return function ( v ) {

					rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

					v.copy( direction ).applyEuler( rotation );

					return v;

				};

			}();

		};


		//Butt

			let camera, scene, renderer, controls, playerBox

			let blocker = document.getElementById( 'blocker' );
			let instructions = document.getElementById( 'instructions' );


			let havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

			if ( havePointerLock ) {

				let element = document.body;

				let pointerlockchange = function ( event ) {

					if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

						controlsEnabled = true;
						controls.enabled = true;

						blocker.style.display = 'none';

					} else {

						controls.enabled = false;

						blocker.style.display = 'block';

						instructions.style.display = '';

					}

				};

				let pointerlockerror = function ( event ) {

					instructions.style.display = '';

				};

				// Hook pointer lock state change events
				document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

				document.addEventListener( 'pointerlockerror', pointerlockerror, false );
				document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
				document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

				instructions.addEventListener( 'click', function ( event ) {

					instructions.style.display = 'none';

					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
					element.requestPointerLock();

				}, false );

			} else {

				instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

			}

			let controlsEnabled = true;

      let falling = false
			let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;
			let canJump = true;

			let prevTime = performance.now();
			let velocity = new THREE.Vector3();
			let direction = new THREE.Vector3();
			let vertex = new THREE.Vector3();
			let color = new THREE.Color();

      function resolveCollision(obj_1, obj_2) {

      }

      function updatePostions(phyObj, hitBox, index) {
        hitBox.highX = 0
        hitBox.lowX = 0
        hitBox.highZ = 0
        hitBox.lowZ = 0
        hitBox.top = 0
        hitBox.bottom = 0
        for (var i = 0; i < phyObj.geometry.vertices.length; i++) {
          if (phyObj.geometry.vertices[i].x > hitBox.highX) {
            hitBox.highX = phyObj.geometry.vertices[i].x + phyObj.position.x
          }
          if ( phyObj.geometry.vertices[i].x < hitBox.lowX) {
            hitBox.lowX = phyObj.geometry.vertices[i].x + phyObj.position.x
          }
          if (phyObj.geometry.vertices[i].z > hitBox.highZ) {
            hitBox.highZ = phyObj.geometry.vertices[i].z + phyObj.position.z
          }
          if (phyObj.geometry.vertices[i].z < hitBox.lowZ){
            hitBox.lowZ = phyObj.geometry.vertices[i].z + phyObj.position.z
          }
          if (phyObj.geometry.vertices[i].y > hitBox.top){
            hitBox.top = phyObj.geometry.vertices[i].y + phyObj.position.y
          }
          if (phyObj.geometry.vertices[i].y < hitBox.bottom){
            hitBox.bottom = phyObj.geometry.vertices[i].y + phyObj.position.y
          }
        }
        self.walls.splice(index, 1, hitBox)
      }

      function isCollision(obj_1, obj_2) {
          if (obj_1.lowZ <= obj_2.highZ &&
              obj_1.highZ >= obj_2.lowZ &&
              obj_1.lowX <= obj_2.highX &&
              obj_1.highX >= obj_2.lowX &&
              obj_1.bottom <= obj_2.top &&
              obj_1.top >= obj_2.bottom) {
                if (obj_1.name === "player") {
                  resolveCollision(obj_1, obj_2)
                }
            }
      }

      function buildColision(geo, name) {
        let highX = 0
        let highZ = 0
        let lowX = 0
        let lowZ = 0
        let top = 0
        let bottom = 0
        let objectT = {}
        for (var i = 0; i < geo.geometry.vertices.length; i++) {
          if (geo.geometry.vertices[i].x > highX) {
            highX = geo.geometry.vertices[i].x + geo.position.x
          }
          if ( geo.geometry.vertices[i].x < lowX) {
            lowX = geo.geometry.vertices[i].x + geo.position.x
          }
          if (geo.geometry.vertices[i].z > highZ) {
            highZ = geo.geometry.vertices[i].z + geo.position.z
          }
          if (geo.geometry.vertices[i].z < lowZ){
            lowZ = geo.geometry.vertices[i].z + geo.position.z
          }
          if (geo.geometry.vertices[i].y > top){
            top = geo.geometry.vertices[i].y + geo.position.y
          }
          if (geo.geometry.vertices[i].y < bottom){
            bottom = geo.geometry.vertices[i].y + geo.position.y
          }
        }
        objectT.name = name
        objectT.highX = highX
        objectT.highZ = highZ
        objectT.lowX = lowX
        objectT.lowZ = lowZ
        objectT.top = top
        objectT.bottom = bottom
        self.walls.push(objectT)
      }

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				let light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
				light.position.set( 0.5, 1, 0.75 );
				scene.add( light );

				controls = new THREE.PointerLockControls( camera );
				scene.add( controls.getObject() );

				let onKeyDown = function ( event ) {

					switch ( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = true;
							break;

						case 37: // left
						case 65: // a
							moveLeft = true;
              break;

						case 40: // down
						case 83: // s
							moveBackward = true;
							break;

						case 39: // right
						case 68: // d
							moveRight = true;
							break;

						case 32: // space
							if ( canJump === true ) velocity.y += 250;
							canJump = false;
							break;

					}

				};

				let onKeyUp = function ( event ) {

					switch( event.keyCode ) {

						case 38: // up
						case 87: // w
							moveForward = false;
							break;

						case 37: // left
						case 65: // a
							moveLeft = false;
							break;

						case 40: // down
						case 83: // s
							moveBackward = false;
							break;

						case 39: // right
						case 68: // d
							moveRight = false;
							break;
					}

				}

				document.addEventListener( 'keydown', onKeyDown, false )
				document.addEventListener( 'keyup', onKeyUp, false )


        let redColor = {
          color:"rgba(255,0,0,1)",
          emissive:"rgba(255,0,0,1)",
          reflectivity: 1,
          metalness: 1
        }
        let greenColor = {
          color:"rgba(0,255,0,1)",
          emissive:"rgba(0,255,0,1)",
          reflectivity: 1,
          metalness: 1
        }
        let floorGeometry = new THREE.CubeGeometry(1000,-1,1000)
        let floorMaterial = new THREE.MeshStandardMaterial({wireframe: true})
				let floor = new THREE.Mesh(floorGeometry, floorMaterial )
				scene.add( floor );
        // buildColision(floor)

        // let geometry = new THREE.CubeGeometry(200,35,20)
        // let material = new THREE.MeshPhysicalMaterial(redColor)
        // let wallTest = new THREE.Mesh(geometry, material)
        // wallTest.position.set(0, 17.5, -250)
        //
        // scene.add(wallTest)
        //
        // // self.objects.push(wallTest)

        let jumpGeometry = new THREE.CubeGeometry(200,6,20)
        let jumpMaterial = new THREE.MeshPhysicalMaterial(redColor)
        let jumpTest = new THREE.Mesh(jumpGeometry, jumpMaterial)
        jumpTest.position.set(0, 3, -100)

        buildColision(jumpTest, "map")

        scene.add(jumpTest)


        self.objects.push(jumpTest)



        let playerBoxG = new THREE.CubeGeometry(7,8,7)
        let playerBoxM = new THREE.MeshPhysicalMaterial(greenColor)
        self.player = new THREE.Mesh(playerBoxG, playerBoxM)
        self.player.position.set(0,4,0)
        scene.add(self.player)

        buildColision(self.player, "player")
        // self.objects.push(self.player)

				renderer = new THREE.WebGLRenderer( {canvas: document.getElementById('three'), antialias: true} );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight )


			}

			function animate() {

				requestAnimationFrame( animate );

				if ( controlsEnabled === true ) {
          let time = performance.now();
          let delta = ( time - prevTime ) / 1000

          direction.z = Number( moveForward ) - Number( moveBackward );
          direction.x = Number( moveLeft ) - Number( moveRight );
          direction.normalize(); // this ensures consistent movements in all directions

          velocity.x -= velocity.x * 5.0 * delta
          velocity.z -= velocity.z * 5.0 * delta

          if ( moveForward || moveBackward ) velocity.z -= direction.z * 200.0 * delta;
          if ( moveLeft || moveRight ) velocity.x -= direction.x * 200.0 * delta;

          for (var i = 0; i < self.walls.length; i++) {
            if (self.walls[i].name === "player") {
              updatePostions(self.player, self.walls[i], i)
            }
          }


          for (var i = 0; i < self.walls.length; i++) {
            for (var j = 0; j < self.walls.length; j++) {
              if(i != j){
                isCollision(self.walls[i],self.walls[j])
              }
            }
          }


          controls.getObject().translateX( velocity.x * delta );
          controls.getObject().translateZ( velocity.z * delta );


          self.player.position.set(controls.getObject().position.x, controls.getObject().position.y - 4, controls.getObject().position.z)

					prevTime = time;

				}

				renderer.render( scene, camera );

			}
    },

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #blocker {

      position: absolute;

      width: 100%;
      height: 100%;

      background-color: rgba(0,0,0,0.5);

    }

    #instructions {

      width: 100%;
      height: 100%;

      display: -webkit-box;
      display: -moz-box;
      display: box;

      -webkit-box-orient: horizontal;
      -moz-box-orient: horizontal;
      box-orient: horizontal;

      -webkit-box-pack: center;
      -moz-box-pack: center;
      box-pack: center;

      -webkit-box-align: center;
      -moz-box-align: center;
      box-align: center;

      color: #ffffff;
      text-align: center;

      cursor: pointer;

    }
</style>
