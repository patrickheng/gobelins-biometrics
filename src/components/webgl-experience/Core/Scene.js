import raf from 'raf';

import Container from 'Container';

import Emitter from 'utils/Emitter';

import concat from 'lodash.concat';

import 'gsap';

import {
	WEBGL_MESH_LOADED,
  WEBGL_IS_INTERSECTING,
  WEBGL_IS_NOT_INTERSECTING
} from 'config/messages';

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

    this.wasIntersecting = false;
    this.isIntersecting = false;

    this.meshCount = 0;
    this.meshNb = 2;
    this.meshesAreLoaded = false;

    this.addEventListeners();

    this.createScene();

    this.initGUI();
  }

  addEventListeners() {
    Emitter.on(WEBGL_MESH_LOADED, ::this.onMeshLoad);
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

    if(this.meshCount >= this.meshNb) {

      this.meshesAreLoaded = true;

      const hotSpotsLight = concat(this.head.hotSpots, this.hand.hotSpots);

      hotSpotsLight.map((hotSpot)=> {
        this.hotSpots.push(hotSpot.mesh);
      })
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

    this.wasIntersecting = this.isIntersecting;

    if(intersects.length > 0) {

      this.isIntersecting = true;

      if(this.wasIntersecting !== this.isIntersecting) {
        Emitter.emit(WEBGL_IS_INTERSECTING, intersects[0]);
      }

    } else {

      this.isIntersecting = false;

      if(this.wasIntersecting !== this.isIntersecting) {
        Emitter.emit(WEBGL_IS_NOT_INTERSECTING);
      }

    }



    this.camera.update();
    this.nodeGarden.update();
    this.postProcessing.update();
  }
}

export default Scene;