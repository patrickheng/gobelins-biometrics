import OrbitControls from '../Utils/OrbitControls';
import Container from 'Container';

/**
 * Camera class
 */
class Camera extends THREE.PerspectiveCamera {

  /**
   * Constructor function
   * @param  {object} configuration Configuration
   * @return {void}
   */
  constructor( configuration ) {

    const { fov, aspect, near, far, position, target, orbitControls } = configuration.get('camera');

    super( fov, aspect, near, far );
    this.position.set( position.x, position.y, position.z );
    this.lookAt(target);

    if( orbitControls ) {
      console.log('orbit control');
      this.controls = new OrbitControls( this, Container.get('Configuration').get('canvas') );
    }

    this.bindEvents();

    TweenMax.from(this.position, 10, {x: 0, y: -100, z: 0 , ease: Expo.easeOut});
  }

  /**
   * BindEvents function
   * @return {void}
   */
  bindEvents() {
    document.addEventListener( 'resize', ::this.resize, false);
  }

  /**
   * Resize function
   * @return {void}
   */
  resize() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  }
}

export default Camera;