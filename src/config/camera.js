export default {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 10000,
  position: new THREE.Vector3( 0, 10, 300 ),
  target: new THREE.Vector3( 0, 0 , 0 ),
  orbitControls: false,
  movements: {
    oculaire: {
      position: new THREE.Vector3( 0, 0, 160 ),
      lookAt: new THREE.Vector3( 22, 8.7, 45 )
    },
    vocale: {
      position: new THREE.Vector3( 0, 0, 160 ),
      lookAt: new THREE.Vector3( -7, -34, 56 )
    },
    faciale: {
      position: new THREE.Vector3( 0, 0, 160 ),
      lookAt: new THREE.Vector3( -30, -15, 45 )
    },
    veineux: {
      position: new THREE.Vector3( -11, -8, 180 ),
      lookAt: new THREE.Vector3( 28, -6, 147 )
    },
    digitale: {
      position: new THREE.Vector3( -12, -40, 140 ),
      lookAt: new THREE.Vector3( 68, -6, 86 )
    }
  }
};