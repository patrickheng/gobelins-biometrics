import OrbitControls from '../Utils/OrbitControls';

import Container from 'Container';

import Clamp from 'utils/math/clamp';

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

    this.target = target;

    this.lookAt(this.target);

    if( orbitControls ) {
      this.controls = new OrbitControls( this, Container.get('Configuration').get('canvas') );
    }

    this.mouseX = 0;
    this.mouseY = 0;

    this.addEventListeners();
  }

  /**
   * BindEvents function
   * @return {void}
   */
  addEventListeners() {

    document.addEventListener( 'resize', ::this.resize, false);
    document.addEventListener( 'mousemove', ::this.onMouseMove, false );
  }

  onMouseMove(event) {

    this.mouseX = ( event.pageX - window.innerWidth / 2 ) / 2;
    this.mouseY = ( event.pageY - window.innerHeight / 2 ) / 2;

  }

  /**
   * Resize function
   * @return {void}
   */
  resize(width, height) {

    this.aspect = width / height;
    this.updateProjectionMatrix();
  }

  update() {

    this.position.x = Clamp(-30, 30, this.position.x + ( this.mouseX - this.position.x ) * .003);

    this.position.y = Clamp(-40, 50, this.position.y + ( -this.mouseY - this.position.y ) * .010);

    console.log(this.position.x, this.position.y);

    this.lookAt(this.target);
  }
}

export default Camera;