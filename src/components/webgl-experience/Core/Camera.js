import Emitter from 'utils/Emitter';

import OrbitControls from '../Utils/OrbitControls';

import Container from 'Container';

import clamp from 'utils/math/clamp';

import find from 'lodash.find';

import concat from 'lodash.concat';

import {
  SIDEBAR_CLOSE,
  WEBGL_CLICK_ON_OBJECT,
  NAVIGATION_SWITCH_CHAPTER
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

    const { fov, aspect, near, far, position, target, orbitControls, movements } = configuration.get('camera');

    super( fov, aspect, near, far );

    this.basePosition = position;

    this.position.set( position.x, position.y, position.z );

    this.baseTarget = target;

    this.target = target;

    this.movements = movements;

    this.hotSpotsData = concat(configuration.get('hotSpots.head'), configuration.get('hotSpots.hand'));

    this.lookAt(this.target);

    this.gui = Container.get('GUI');

    if( orbitControls ) {
      this.controls = new OrbitControls( this, Container.get('Configuration').get('canvas') );
    }

    this.mouseX = 0;
    this.mouseY = 0;

    this.isZoom = false;

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
    Emitter.on(SIDEBAR_CLOSE, ::this.onSidebarClose);
    Emitter.on(NAVIGATION_SWITCH_CHAPTER, ::this.onSwitchChapter);

  }

  onMouseMove(event) {

    this.mouseX = ( event.pageX - window.innerWidth / 2 ) / 2;
    this.mouseY = ( event.pageY - window.innerHeight / 2 ) / 2;

  }

  onClickOnObject(object) {

    const mvt = this.movements[object.ref].position;
    const direction = this.movements[object.ref].lookAt;

    // const direction = find(this.hotSpotsData, {ref: object.ref}).lookAt;

    this.isZoom = true;

    TweenMax.to(this.position, 6, {x: mvt.x, y: mvt.y, z: mvt.z, ease: Expo.easeOut});
    TweenMax.to(this.target, 6, {x: direction.x, y: direction.y, z: direction.z, ease: Expo.easeOut});
  }

  onSidebarClose() {
    this.isZoom = false;

    TweenMax.to(this.position, 2, {x: this.basePosition.x, y: this.basePosition.y, z: this.basePosition.z, ease: Expo.easeOut});
    TweenMax.to(this.target, 2, {x: 0, y: 0, z: 0, ease: Expo.easeOut});
  }

  onSwitchChapter(ref) {

    const mvt = this.movements[ref].position;
    const direction = this.movements[ref].lookAt;

    TweenMax.to(this.position, 6, {x: mvt.x, y: mvt.y, z: mvt.z, ease: Expo.easeOut});
    TweenMax.to(this.target, 6, {x: direction.x, y: direction.y, z: direction.z, ease: Expo.easeOut});
  }

  initGUI() {
    const folder = this.gui.addFolder('Camera');

    folder.add(this.position, 'x');
    folder.add(this.position, 'y');
    folder.add(this.position, 'z');
    folder.add(this.target, 'x').listen();
    folder.add(this.target, 'y').listen();
    folder.add(this.target, 'z').listen();
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
    if(!this.isZoom) {
      this.position.x = clamp(-30, 30, this.position.x + ( this.mouseX - this.position.x ) * .003);

      this.position.y = clamp(-40, 50, this.position.y + ( -this.mouseY - this.position.y ) * .010);
    }

    this.lookAt(this.target);

  }
}

export default Camera;