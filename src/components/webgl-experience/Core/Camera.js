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
      this.controls = new OrbitControls( this, Container.get('Configuration').get('canvas') );
    }

    this.bindEvents();
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
  resize(width, height) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

export default Camera;