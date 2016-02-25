import raf from 'raf';

import Container from 'Container';

import concat from 'lodash.concat';

import 'gsap';

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * Constructor function
   */
  constructor() {
    super();

    this.camera;
    this.renderer;
  }

  /**
   * Begin function
   * @return {void}
   */
  begin(container) {

    this.container = container;

    this.configuration = Container.get( 'Configuration' );
    this.ambientConfig = this.configuration.get( 'lights.ambientLight' );
    this.directionalConfig = this.configuration.get( 'lights.directionalLight' );

    this.configuration.set('canvas', this.container);

     // Renderer
    this.renderer = Container.get( 'Renderer' );
    this.container.appendChild( this.renderer.domElement );

    // Camera
    this.camera = Container.get( 'Camera' );
    this.add( this.camera );

    // Post processing
    this.postProcessing = Container.get( 'PostProcessing' );

    // Texture loader
    this.textureLoader = Container.get( 'TextureLoader' );

    // Utils
    this.clock = Container.get( 'Clock' );

    this.gui = Container.get( 'GUI' );

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hotSpots = [];

    this.meshCount = 0;
    this.meshesNb = 2;
    this.meshesAreLoaded = false;

    this.createScene();

    this.initGUI();
  }

  /**
   * CreateScene function
   * @return {void}
   */
  createScene() {

    this.ambientLight = new THREE.AmbientLight( parseInt(this.ambientConfig.color, 16) );
    this.add( this.ambientLight );

    this.directionalLight = new THREE.DirectionalLight( parseInt(this.directionalConfig.color, 16) );
    this.directionalLight.position.set(this.directionalConfig.position.x, this.directionalConfig.position.y, this.directionalConfig.position.z);
    this.directionalLight.intensity = this.directionalConfig.intensity;
    this.directionalLight.color = this.directionalConfig.color;
    this.add( this.directionalLight );

    this.nodeGarden = Container.get( 'NodeGarden' );
    this.add(this.nodeGarden);

    this.head = Container.get( 'Head' );
    this.add(this.head);

    this.hand = Container.get( 'Hand' );
    this.add(this.hand);

    this.enterAnimation();

    this.animate();

  }

  enterAnimation() {
    this.enterTl = new TimelineMax({onComplete: ()=> {
    }});

    this.enterTl
      .from(this.head.rotation, 7, {y: 3, ease: Back.easeOut}, 0)
      .from(this.hand.rotation, 7, {y: 3, ease: Back.easeOut}, 0)
      .from(this.camera.position, 8, {x: 0, y: 100, z: 100 , ease: Expo.easeOut}, 0)
      .from(this.directionalLight.position, 5, {x: -200, y: -200, z: -200, ease: Expo.easeOut}, 1.5);

    setTimeout(()=> {
      this.head.hotSpotDisplay();
      this.hand.hotSpotDisplay();
    }, 3000);
  }

  onMouseMove(ev) {
    this.mouse.x = ( ev.clientX / window.innerWidth ) * 2 - 1;
	  this.mouse.y = - ( ev.clientY / window.innerHeight ) * 2 + 1;
  }

  onMeshLoad() {
    this.meshCount++;

    if(this.meshCount >= this.meshesNb) {

      this.meshesAreLoaded = true;

      this.hotSpots = concat(this.head.hotSpots, this.hand.hotSpots);

    }

  }

  initGUI() {

    const ambiantFolder = this.gui.addFolder('Ambient Light');
    const directionalFolder = this.gui.addFolder('Directional Light');

    ambiantFolder.addColor(this.ambientLight, 'color').onChange((c) => {

      return new THREE.Color(`rgb(${~~c.r},${~~c.g},${~~c.b})`);

    });

    directionalFolder.addColor(this.directionalLight, 'color').onChange((c) => {

      return new THREE.Color(`rgb(${~~c.r},${~~c.g},${~~c.b})`);

    });

    directionalFolder.add(this.directionalLight.position, 'x', -500, 500);

    directionalFolder.add(this.directionalLight.position, 'y', -500, 500);

    directionalFolder.add(this.directionalLight.position, 'z', -500, 500);

    directionalFolder.add(this.directionalLight, 'intensity', 0, 0.5);
  }

  /**
   * Animate function
   * @return {void}
   */
  animate() {

    raf( ::this.animate );

    this.render();
  }

  /**
   * Render function
   * @return {void}
   */
  render() {

    this.raycaster.setFromCamera( this.mouse, this.camera );

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects( this.hotSpots );

    for ( let i = 0; i < intersects.length; i++ ) {

    	console.log(intersects);

    }

    this.camera.update();
    this.nodeGarden.update();
    this.postProcessing.update();
  }
}

export default Scene;