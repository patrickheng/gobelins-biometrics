import Emitter from 'utils/Emitter';

import OrbitControls from '../Utils/OrbitControls';

import Container from 'Container';

import Clamp from 'utils/math/clamp';

import {
  WEBGL_CLICK_ON_OBJECT
} from 'config/messages';

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

    this.gui = Container.get('GUI');

    if( orbitControls ) {
      this.controls = new OrbitControls( this, Container.get('Configuration').get('canvas') );
    }

    this.mouseX = 0;
    this.mouseY = 0;

    this.initGUI();
    this.addEventListeners();
  }

  /**
   * BindEvents function
   * @return {void}
   */
  addEventListeners() {

    document.addEventListener( 'resize', ::this.resize, false);
    document.addEventListener( 'mousemove', ::this.onMouseMove, false );

    Emitter.on(WEBGL_CLICK_ON_OBJECT, ::this.onClickOnObject);

  }

  onMouseMove(event) {

    this.mouseX = ( event.pageX - window.innerWidth / 2 ) / 2;
    this.mouseY = ( event.pageY - window.innerHeight / 2 ) / 2;

  }

  onClickOnObject(objectRef) {
    console.log(objectRef);
  }

  initGUI() {
    const folder = this.gui.addFolder('Camera');

    folder.add(this.position, 'x');
    folder.add(this.position, 'y');
    folder.add(this.position, 'z');

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

    this.lookAt(this.target);
  }
}

export default Camera;