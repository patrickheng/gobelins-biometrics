import raf from 'raf';
import Container from 'Container';
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
    Container.get('Configuration').set('canvas', this.container);

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

    this.createScene();
  }

  /**
   * CreateScene function
   * @return {void}
   */
  createScene() {

    this.nodeGarden = Container.get( 'NodeGarden' );
    this.add(this.nodeGarden);

    this.head = Container.get( 'Head' );
    this.add(this.head);

    this.animate();

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