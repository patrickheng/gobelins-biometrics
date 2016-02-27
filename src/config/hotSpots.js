export default {
  head : [
    {
      name: "Reconnaissance oculaire",
      ref: "oculaire",
      position: new THREE.Vector3( 22, 8.7, 45 ),
      hex: 0xffffff,
      intensity: 2,
      distance: 7.1
    }, {
      name: "Reconnaissance vocale",
      ref: "vocale",
      position: new THREE.Vector3( -7, -34, 56 ),
      lookAt: new THREE.Vector3( -7, -34, 56 ),
      hex: 0xffffff,
      intensity: 1.8,
      distance: 4.4
    }, {
      name: 'Reconnaissance faciale',
      ref: 'faciale',
      position: new THREE.Vector3( -30, -15, 45 ),
      lookAt: new THREE.Vector3( -30, -15, 45 ),
      hex: 0xffffff,
      intensity: 1,
      distance: 5.2
    }
  ],

  hand : [
    {
      name: "Réseaux veineux",
      ref: "veineux",
      position: new THREE.Vector3( -26, 207, -6 ),
      lookAt: new THREE.Vector3( 47, -26, 93 ),
      hex: 0xffffff,
      intensity: 1.5,
      distance: 7
    },
    {
      name: "Empreinte digitale",
      ref: "digitale",
      position: new THREE.Vector3( -21, 317, -18 ),
      lookAt: new THREE.Vector3( -21, 317, -18 ),
      hex: 0xffffff,
      intensity: 2,
      distance: 5.9
    }
  ]
};