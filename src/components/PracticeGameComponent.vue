<template>
  <div >
    <div id="blocker">

      <div id="instructions">
        <span style="font-size:40px">Click to play</span>
        <br />
        (W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
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
        walls:{},
        celings: {},  
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

			let camera, scene, renderer, controls;

			let objects = [];

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

			let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;
			let canJump = false;

			let prevTime = performance.now();
			let velocity = new THREE.Vector3();
			let direction = new THREE.Vector3();
			let vertex = new THREE.Vector3();
			let color = new THREE.Color();

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );
				scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

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
							if ( canJump === true ) velocity.y += 50;
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

				document.addEventListener( 'keydown', onKeyDown, false );
				document.addEventListener( 'keyup', onKeyUp, false );

				self.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

				// floor

				let floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
				floorGeometry.rotateX( - Math.PI / 2 );


        let redColor = {
          color:"rgba(255,0,0,1)",
          emissive:"rgba(255,0,0,1)",
          reflectivity: 1,
          metalness: 1
        }
        let floorMaterial = new THREE.MeshStandardMaterial({wireframe: true})
				let floor = new THREE.Mesh(floorGeometry, floorMaterial )
				scene.add( floor );

        let geometry = new THREE.CubeGeometry(200,35,20)
        let material = new THREE.MeshPhysicalMaterial(redColor)
        let wallTest = new THREE.Mesh(geometry, material)
        wallTest.position.set(0, 17.5, -250)

        scene.add(wallTest)

        objects.push(wallTest)

        let jumpGeometry = new THREE.CubeGeometry(200,6,20)
        let jumpMaterial = new THREE.MeshPhysicalMaterial(redColor)
        let jumpTest = new THREE.Mesh(jumpGeometry, jumpMaterial)
        jumpTest.position.set(0, 3, -100)

        scene.add(jumpTest)

        objects.push(jumpTest)

        console.log(objects)
        console.log(self.raycaster.intersectObjects( objects ));
				renderer = new THREE.WebGLRenderer( {canvas: document.getElementById('three'), antialias: true} );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );



			}

			function animate() {

				requestAnimationFrame( animate );

				if ( controlsEnabled === true ) {

					self.raycaster.ray.origin.copy( controls.getObject().position );
					self.raycaster.ray.origin.y -= 10;

					let intersections = self.raycaster.intersectObjects( objects );

          // console.log(intersections);
					let onObject = intersections.length > 0;


					let time = performance.now();
					let delta = ( time - prevTime ) / 1000

					velocity.x -= velocity.x * 5.0 * delta
					velocity.z -= velocity.z * 5.0 * delta

					velocity.y -= 9.8 * 15.0 * delta;

					direction.z = Number( moveForward ) - Number( moveBackward );
					direction.x = Number( moveLeft ) - Number( moveRight );
					direction.normalize(); // this ensures consistent movements in all directions

					if ( moveForward || moveBackward ) velocity.z -= direction.z * 200.0 * delta;
					if ( moveLeft || moveRight ) velocity.x -= direction.x * 200.0 * delta;

					if ( onObject === true ) {
						velocity.y = Math.max( 0, velocity.y );
						canJump = true;

					}

					controls.getObject().translateX( velocity.x * delta );
					controls.getObject().translateY( velocity.y * delta );
					controls.getObject().translateZ( velocity.z * delta );

					if ( controls.getObject().position.y < 10 ) {

						velocity.y = 0;
						controls.getObject().position.y = 10;

						canJump = true;

					}

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
