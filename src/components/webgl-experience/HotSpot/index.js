import ObjLoader from '../Utils/ObjLoader';

import Container from 'Container';

import 'gsap';

/**
 * HotSpot class
 */
class HotSpot extends THREE.PointLight {

  /**
   * Constructor function
   * @return {void}
   */
  constructor( { ref = "", name = "", position, hex = 0xffffff, intensity = 1, distance = 0, decay = 1 } ) {

    super( hex, intensity, distance, decay );

    this.name = name;

    this.ref = ref;

    this.hex = hex;

    // Set default value before tween intro
    this.intensity = 0;

    this.toIntensity = intensity;

    this.introTlDone = false;

    this.gui = Container.get( 'GUI' );

    this.position.set(position.x, position.y, position.z);

    this.addSphere();

    this.initGUI();

  }

  initGUI() {
    const folder = this.gui.addFolder( 'Hotspot ' + this.ref );

    folder.add(this.position, 'x');
    folder.add(this.position, 'y');
    folder.add(this.position, 'z');
    folder.add(this, 'intensity');
    folder.add(this, 'distance');
  }

  hotSpotDisplay() {
    this.introTl = new TimelineMax({ onComplete: ()=> {
      this.introTlDone = true;
    }});

    this.introTl
      .to(this.mesh.scale, 2, { x: 1, y: 1, z: 1, ease: Back.easeOut})
      .to(this, 4, { intensity: this.toIntensity, ease: Expo.easeOut}, 0);
  }

  addSphere() {
    this.geom = new THREE.SphereGeometry(3, 5, 5);
    this.mat = new THREE.MeshBasicMaterial({
      color: this.hex,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.mesh.name = this.name;

    this.mesh.ref = this.ref;

    this.add(this.mesh);

    this.mesh.scale.set( 0.001, 0.001, 0.001 );
  }

  update(time) {
    const t = time * 2;

    if(this.introTlDone) {
      this.scale.x += Math.sin(t) / 250;
      this.scale.y += Math.sin(t) / 250;
      this.scale.z += Math.sin(t) / 250;
      this.distance += Math.sin(t * 2) / 50;
    }
  }

}

export default HotSpot;