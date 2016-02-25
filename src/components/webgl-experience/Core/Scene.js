import raf from 'raf';

import Container from 'Container';

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
    this.directionalLight.position.set( 0, -96, 170 );
    this.directionalLight.intensity = this.directionalConfig.intensity;
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
    this.enterTl = new TimelineMax();

    this.enterTl
      .from(this.head.rotation, 6, {y: 3, ease: Back.easeOut}, 0)
      .from(this.camera.position, 8, {x: 0, y: 100, z: 100 , ease: Expo.easeOut}, 0)
      .from(this.directionalLight.position, 4, {x: -500, y: -500, z: -500, ease: Expo.easeOut}, 3);
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

    directionalFolder.add(this.directionalLight.position, 'x', -1000, 1000);

    directionalFolder.add(this.directionalLight.position, 'y', -1000, 1000);

    directionalFolder.add(this.directionalLight.position, 'z', -1000, 1000);

    directionalFolder.add(this.directionalLight, 'intensity', 0, 0.3);
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
    this.nodeGarden.update();
    this.postProcessing.update();
  }
}

export default Scene;